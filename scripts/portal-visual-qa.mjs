import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9600 + (process.pid % 150);
const baseUrl = process.env.NOVYRIX_AUDIT_URL || "http://127.0.0.1:4173";
const outputDir = path.resolve(process.env.NOVYRIX_QA_OUTPUT || "../_design/screenshots");
const profileDir = path.resolve(`../_design/edge-portal-qa-${process.pid}`);
const routes = [
  { route: "/portal?preview=qa&theme=light", name: "dashboard", selector: ".portal-metrics", expectedTheme: "light" },
  { route: "/portal/project/ENG-PREVIEW?preview=qa&theme=light", name: "project", selector: ".portal-detail", expectedTheme: "light", checksPayments: true },
  { route: "/portal/invoices?preview=qa&theme=light", name: "invoices", selector: ".portal-invoice-list", expectedTheme: "light", checksPayments: true },
  { route: "/portal/messages?preview=qa&theme=light", name: "messages", selector: ".portal-thread", expectedTheme: "light" },
  { route: "/portal/invoices?preview=qa&theme=dark", name: "invoices-dark", selector: ".portal-invoice-list", expectedTheme: "dark", checksPayments: true },
];

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
    `${baseUrl}/portal?preview=qa`,
  ],
  {
    env: {
      ...process.env,
      NOVYRIX_PORTAL_PREVIEW_ENABLED: "true",
    },
    stdio: "ignore",
    windowsHide: true,
  },
);

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function pageTarget() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${port}/json`).then((response) => response.json());
      const target = targets.find((item) => item.type === "page" && item.url.startsWith(baseUrl));
      if (target) return target;
    } catch {
      // Edge is still opening its debugging endpoint.
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

async function navigate(route, selector) {
  await send("Page.navigate", { url: `${baseUrl}${route}` });
  await waitFor(
    `document.readyState === "complete" && document.fonts.status === "loaded" && Boolean(document.querySelector(${JSON.stringify(selector)}))`,
    route,
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

function auditExpression() {
  return `(() => ({
    route: location.pathname,
    viewport: [window.innerWidth, window.innerHeight],
    pageSize: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
    overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    h1: document.querySelector("h1")?.textContent?.trim(),
    h1Count: document.querySelectorAll("h1").length,
    mainTargetCount: document.querySelectorAll("main#main-content").length,
    headerHidden: getComputedStyle(document.querySelector(".site-header") || document.body).display === "none",
    navItems: document.querySelectorAll(".workspace-navigation__links a, .workspace-navigation__footer > a, .workspace-navigation__footer > button").length,
    projectCards: document.querySelectorAll(".portal-project-card").length,
    invoiceCards: document.querySelectorAll(".portal-invoice-card").length,
    messages: document.querySelectorAll(".portal-message").length,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    paymentRoutes: document.querySelectorAll(".portal-pay-route").length,
    paymentRouteHeights: Array.from(document.querySelectorAll(".portal-pay-route"), (element) => Math.round(element.getBoundingClientRect().height)),
    paymentBlockContrast: (() => {
      const block = document.querySelector(".portal-payment-block");
      const card = document.querySelector(".portal-invoice-card");
      return !block || !card || getComputedStyle(block).backgroundColor !== getComputedStyle(card).backgroundColor;
    })(),
    invoiceAmountsFit: Array.from(
      document.querySelectorAll(".portal-invoice-card h2, .portal-invoice-card h3"),
      (element) => element.scrollWidth <= element.clientWidth + 1,
    ).every(Boolean),
    errorOverlay: Boolean(document.querySelector("[data-nextjs-dialog-overlay], [data-nextjs-error-overlay]"))
  }))()`;
}

try {
  await send("Runtime.enable");
  await send("Page.enable");

  const audits = [];
  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000, mobile: false },
    { name: "mobile", width: 390, height: 844, mobile: true },
  ]) {
    await setViewport(viewport.width, viewport.height, viewport.mobile);
    for (const item of routes) {
      await navigate(item.route, item.selector);
      const audit = await evaluate(auditExpression());
      const paymentHeightsMatch =
        !item.checksPayments ||
        (audit.paymentRoutes === 2 &&
          audit.paymentRouteHeights.every((height) => height >= 100) &&
          Math.max(...audit.paymentRouteHeights) - Math.min(...audit.paymentRouteHeights) <= 1);
      audits.push({
        breakpoint: viewport.name,
        ...audit,
        passed:
          !audit.overflowX &&
          audit.h1Count === 1 &&
          audit.mainTargetCount === 1 &&
          audit.navItems >= 5 &&
          audit.theme === item.expectedTheme &&
          audit.paymentBlockContrast &&
          audit.invoiceAmountsFit &&
          paymentHeightsMatch &&
          !audit.errorOverlay,
      });
      await screenshot(`portal-${item.name}-${viewport.name}-${viewport.width}.png`);
      if (item.checksPayments) {
        await evaluate(`document.querySelector(".portal-payment-block")?.scrollIntoView({ block: "center" })`);
        await sleep(350);
        await screenshot(`portal-${item.name}-payment-${viewport.name}-${viewport.width}.png`);
      }
    }
  }

  await setViewport(390, 844, true);
  await navigate("/portal/invoices?preview=qa&theme=light", ".portal-invoice-list");
  await evaluate(`document.querySelector(".portal-pay-actions button")?.click()`);
  await waitFor(
    `document.querySelector(".portal-feedback")?.textContent?.includes("Preview mode only")`,
    "preview checkout message",
  );
  const previewCheckout = await evaluate(`({
    url: location.href,
    message: document.querySelector(".portal-feedback")?.textContent?.trim() || null
  })`);

  await navigate("/portal/messages?preview=qa&theme=light", ".portal-message-form");
  await evaluate(`(() => {
    const textarea = document.querySelector(".portal-message-form textarea");
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set.call(
      textarea,
      "Preview confirmation from visual QA."
    );
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.dispatchEvent(new Event("change", { bubbles: true }));
    document.querySelector(".portal-message-form button")?.click();
  })()`);
  await waitFor(
    `document.querySelector(".portal-feedback")?.textContent?.includes("Preview mode only")`,
    "preview message form note",
  );
  const previewMessage = await evaluate(`({
    message: document.querySelector(".portal-feedback")?.textContent?.trim() || null
  })`);

  const failedAudits = audits.filter((audit) => !audit.passed);
  const report = {
    auditedAt: new Date().toISOString(),
    baseUrl,
    summary: {
      audits: audits.length,
      failedAudits: failedAudits.length,
      browserErrors: browserErrors.length,
      previewCheckoutSafe: previewCheckout.message?.includes("Preview mode only") || false,
      previewMessageSafe: previewMessage.message?.includes("Preview mode only") || false,
    },
    failedAudits,
    audits,
    previewCheckout,
    previewMessage,
    browserErrors,
    passed:
      failedAudits.length === 0 &&
      browserErrors.length === 0 &&
      Boolean(previewCheckout.message?.includes("Preview mode only")) &&
      Boolean(previewMessage.message?.includes("Preview mode only")),
  };
  await writeFile(path.join(outputDir, "portal-visual-qa-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!report.passed) process.exitCode = 1;
} finally {
  socket.close();
  edge.kill();
}
