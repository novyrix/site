import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9700 + (process.pid % 150);
const baseUrl = process.env.NOVYRIX_AUDIT_URL || "http://127.0.0.1:4173";
const outputDir = path.resolve(process.env.NOVYRIX_QA_OUTPUT || "../_design/screenshots");
const profileDir = path.resolve(`../_design/edge-admin-qa-${process.pid}`);
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
    `${baseUrl}/admin?preview=qa&theme=light&capture=admin-qa`,
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
    browserErrors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
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
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  }
  return result.result.value;
}

async function waitFor(expression, description, attempts = 300) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
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

async function navigate(url, selector) {
  await send("Page.navigate", { url });
  await waitFor(
    `document.readyState === "complete" && document.fonts.status === "loaded" && Boolean(document.querySelector(${JSON.stringify(selector)}))`,
    selector,
  );
  await sleep(650);
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
    const heading = document.querySelector("h1");
    const headingStyle = heading ? getComputedStyle(heading) : null;
    return {
      path: location.pathname,
      viewport: [window.innerWidth, window.innerHeight],
      pageSize: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
      theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
      title: document.title,
      heading: heading?.textContent?.trim(),
      headingLines: headingStyle ? Math.round(heading.getBoundingClientRect().height / Number.parseFloat(headingStyle.lineHeight)) : null,
      navigationLinks: Array.from(document.querySelectorAll(".workspace-navigation__links a")).map((link) => link.textContent.trim()),
      metricCount: document.querySelectorAll(".ops-metrics article").length,
      leadRows: document.querySelectorAll(".ledger-table__row, .ops-pipeline-row").length,
      workflowPanels: document.querySelectorAll(".ops-workflow__panel").length,
      errorOverlay: Boolean(document.querySelector("[data-nextjs-dialog]")),
      meaningfulText: document.body.innerText.trim().length > 250,
    };
  })()`);
}

let exitCode = 0;
try {
  await send("Runtime.enable");
  await send("Page.enable");

  await setViewport(1440, 1024);
  await navigate(`${baseUrl}/login?theme=light&capture=admin-qa`, ".admin-login");
  const login = await audit();
  await screenshot("rebuild-admin-login-light-cdp-1440x1024.png");

  await navigate(`${baseUrl}/admin?preview=qa&theme=light`, ".ops-metrics");
  const overviewLight = await audit();
  await screenshot("rebuild-admin-overview-light-cdp-1440x1024.png");

  await navigate(`${baseUrl}/admin?preview=qa&theme=dark`, ".ops-metrics");
  const overviewDark = await audit();
  await screenshot("rebuild-admin-overview-dark-cdp-1440x1024.png");

  await navigate(`${baseUrl}/admin/leads?preview=qa&theme=light`, ".ops-pipeline-table");
  const pipeline = await audit();
  await screenshot("rebuild-admin-pipeline-light-cdp-1440x1024.png");

  await navigate(`${baseUrl}/admin/leads/NVX-PREVIEW01?preview=qa&theme=light`, ".ops-workflow");
  const leadDetail = await audit();
  await screenshot("rebuild-admin-lead-light-cdp-1440x1024.png");
  await evaluate(`document.querySelector(".ops-workflow")?.scrollIntoView({ block: "start", behavior: "instant" })`);
  await sleep(350);
  await screenshot("rebuild-admin-workflow-light-cdp-1440x1024.png");

  await setViewport(390, 844, true);
  await navigate(`${baseUrl}/admin?preview=qa&theme=light`, ".ops-metrics");
  const overviewMobile = await audit();
  await screenshot("rebuild-admin-overview-light-cdp-mobile-390x844.png");

  await navigate(`${baseUrl}/admin/leads/NVX-PREVIEW02?preview=qa&theme=light`, ".ops-workflow");
  const leadMobile = await audit();
  await screenshot("rebuild-admin-lead-light-cdp-mobile-390x844.png");
  await evaluate(`document.querySelector(".ops-workflow")?.scrollIntoView({ block: "start", behavior: "instant" })`);
  await sleep(350);
  await screenshot("rebuild-admin-workflow-light-cdp-mobile-390x844.png");

  await evaluate(`document.querySelector(".ops-fit-actions button")?.click()`);
  await waitFor(`Boolean(document.querySelector(".ops-feedback"))`, "preview mutation feedback");
  const previewMutationMessage = await evaluate(`document.querySelector(".ops-feedback")?.textContent?.trim()`);

  const report = {
    login,
    overviewLight,
    overviewDark,
    pipeline,
    leadDetail,
    overviewMobile,
    leadMobile,
    previewMutationMessage,
    browserErrors,
  };
  await writeFile(
    path.join(outputDir, "admin-visual-qa-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} catch (error) {
  exitCode = 1;
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
} finally {
  socket.close();
  edge.kill();
  setTimeout(() => process.exit(exitCode), 100);
}
