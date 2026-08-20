import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9500 + (process.pid % 150);
const baseUrl = process.env.NOVYRIX_AUDIT_URL || "http://127.0.0.1:4173";
const outputDir = path.resolve(process.env.NOVYRIX_QA_OUTPUT || "../_design/screenshots");
const profileDir = path.resolve(`../_design/edge-payment-qa-${process.pid}`);

await mkdir(outputDir, { recursive: true });
await mkdir(profileDir, { recursive: true });

const edge = spawn(
  edgePath,
  [
    "--headless",
    "--disable-gpu",
    "--disable-extensions",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    `${baseUrl}/pay/preview?theme=light&capture=payment-qa`,
  ],
  { stdio: "ignore", windowsHide: true },
);

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function pageTarget() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${port}/json`).then((response) => response.json());
      const target = targets.find((item) => item.type === "page" && item.url.startsWith(baseUrl));
      if (target) return target;
    } catch {
      // Edge is still starting its debugging endpoint.
    }
    await sleep(250);
  }
  throw new Error("Edge debugging target did not become available.");
}

const target = await pageTarget();
const socket = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
const browserErrors = [];
let sequence = 0;

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.exceptionThrown") {
    browserErrors.push(message.params.exceptionDetails.text);
  }
  if (!message.id || !pending.has(message.id)) return;
  const request = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});

function send(method, params = {}) {
  const id = ++sequence;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function waitFor(expression, description) {
  for (let attempt = 0; attempt < 300; attempt += 1) {
    if (await evaluate(expression)) return;
    await sleep(200);
  }
  throw new Error(`Timed out waiting for ${description}.`);
}

async function setViewport(width, height, mobile = false) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
    screenWidth: width,
    screenHeight: height,
  });
}

async function navigate(theme) {
  await send("Page.navigate", {
    url: `${baseUrl}/pay/preview?theme=${theme}&capture=payment-qa`,
  });
  await waitFor(
    `document.readyState === "complete" && document.fonts.status === "loaded" && Boolean(document.querySelector(".payment-ledger"))`,
    "payment page",
  );
  await waitFor(
    `document.documentElement.classList.contains(${JSON.stringify(theme)})`,
    `${theme} theme`,
  );
  await sleep(700);
}

async function screenshot(filename) {
  const result = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await writeFile(path.join(outputDir, filename), Buffer.from(result.data, "base64"));
}

async function audit() {
  return evaluate(`(() => {
    const heading = document.querySelector(".payment-hero h1");
    const headingStyle = heading ? getComputedStyle(heading) : null;
    const methodButtons = Array.from(document.querySelectorAll(".payment-method"));
    return {
      viewport: [window.innerWidth, window.innerHeight],
      pageSize: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
      theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
      title: document.title,
      heading: heading?.textContent?.trim(),
      headingLines: headingStyle ? Math.round(heading.getBoundingClientRect().height / Number.parseFloat(headingStyle.lineHeight)) : null,
      ledgerColumns: getComputedStyle(document.querySelector(".payment-ledger__grid")).gridTemplateColumns,
      providers: methodButtons.map((button) => ({ label: button.innerText.trim(), disabled: button.disabled })),
      amount: document.querySelector(".payment-lines__total strong")?.textContent?.trim(),
      setupNotice: document.querySelector(".payment-setup-note")?.textContent?.trim(),
      errorOverlay: Boolean(document.querySelector("[data-nextjs-dialog]")),
      meaningfulText: document.body.innerText.trim().length > 300,
    };
  })()`);
}

try {
  await send("Runtime.enable");
  await send("Page.enable");

  await setViewport(1440, 1000);
  await navigate("light");
  const desktopLight = await audit();
  await screenshot("rebuild-payment-light-cdp-1440x1000.png");
  await evaluate(`(() => {
    const target = document.querySelector(".payment-ledger");
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 96, behavior: "instant" });
  })()`);
  await sleep(450);
  await screenshot("rebuild-payment-ledger-light-cdp-1440x1000.png");

  await navigate("dark");
  const desktopDark = await audit();
  await screenshot("rebuild-payment-dark-cdp-1440x1000.png");

  await setViewport(390, 844, true);
  await navigate("light");
  const mobileLight = await audit();
  await screenshot("rebuild-payment-light-cdp-mobile-390x844.png");
  await evaluate(`(() => {
    const target = document.querySelector(".payment-methods");
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: "instant" });
  })()`);
  await sleep(450);
  await screenshot("rebuild-payment-methods-light-cdp-mobile-390x844.png");
  await evaluate(`document.querySelector(".payment-method")?.click()`);
  await waitFor(
    `document.querySelector(".payment-message")?.textContent?.includes("Preview mode only")`,
    "safe preview checkout message",
  );
  const previewClick = await evaluate(`(() => ({
    url: window.location.href,
    message: document.querySelector(".payment-message")?.textContent?.trim() || null,
  }))()`);

  const report = { desktopLight, desktopDark, mobileLight, previewClick, browserErrors };
  await writeFile(
    path.join(outputDir, "payment-visual-qa-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} finally {
  socket.close();
  edge.kill();
}
