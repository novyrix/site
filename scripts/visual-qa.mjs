import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9300 + (process.pid % 200);
const baseUrl = "http://127.0.0.1:4173";
const comparisonOnly = process.env.NOVYRIX_QA_COMPARISON === "1";
const outputDir = path.resolve(process.env.NOVYRIX_QA_OUTPUT || "../_design/screenshots");
const profileDir = path.resolve(
  process.env.NOVYRIX_QA_PROFILE || `../_design/edge-qa-profile-${process.pid}`
);

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
    `${baseUrl}/?theme=dark&capture=qa`,
  ],
  { stdio: "ignore", windowsHide: true }
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getPageTarget() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json`);
      const targets = await response.json();
      const target = targets.find(
        (item) => item.type === "page" && item.url.startsWith(baseUrl)
      );
      if (target) return target;
    } catch {
      // Edge is still opening its debugging endpoint.
    }
    await sleep(250);
  }
  throw new Error("Edge debugging target did not become available.");
}

const target = await getPageTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
const browserErrors = [];
let sequence = 0;

await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve, { once: true });
  ws.addEventListener("error", reject, { once: true });
});

ws.addEventListener("message", (event) => {
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
  ws.send(JSON.stringify({ id, method, params }));
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

async function waitFor(condition, description, attempts = 80) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (await evaluate(condition)) return;
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${description}.`);
}

async function waitForPage(selector = "h1") {
  await waitFor(
    `document.readyState === "complete" && document.fonts.status === "loaded" && Boolean(document.querySelector(${JSON.stringify(selector)}))`,
    selector
  );
  await sleep(900);
}

async function navigate(url, selector = "h1") {
  await send("Page.navigate", { url });
  await waitForPage(selector);
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

async function capture(filename) {
  const screenshot = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await writeFile(path.join(outputDir, filename), Buffer.from(screenshot.data, "base64"));
}

function viewportAudit() {
  return `({
    viewport: [window.innerWidth, window.innerHeight],
    pageSize: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    heading: document.querySelector("h1")?.textContent?.trim(),
    gridTop: Math.round(document.querySelector(".hero-grid")?.getBoundingClientRect().top || 0),
    copyTop: Math.round(document.querySelector(".hero-copy")?.getBoundingClientRect().top || 0),
    gridAlignment: document.querySelector(".hero-grid")
      ? getComputedStyle(document.querySelector(".hero-grid")).alignItems
      : null,
    gridPaddingTop: document.querySelector(".hero-grid")
      ? getComputedStyle(document.querySelector(".hero-grid")).paddingTop
      : null,
    headingTop: Math.round(document.querySelector("h1")?.getBoundingClientRect().top || 0),
    proofBottom: Math.round(document.querySelector(".hero-proof")?.getBoundingClientRect().bottom || 0)
  })`;
}

function serviceDetailAudit() {
  return `({
    viewport: [window.innerWidth, window.innerHeight],
    pageSize: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    pageTitle: document.querySelector("h1")?.textContent?.trim(),
    proposition: document.querySelector(".detail-intro h2")?.textContent?.trim(),
    propositionLines: (() => {
      const heading = document.querySelector(".detail-intro h2");
      if (!heading) return null;
      const lineHeight = Number.parseFloat(getComputedStyle(heading).lineHeight);
      return Math.round(heading.getBoundingClientRect().height / lineHeight);
    })(),
    detailColumns: getComputedStyle(document.querySelector(".detail-intro")).gridTemplateColumns,
    faqColumns: getComputedStyle(document.querySelector(".service-faq")).gridTemplateColumns
  })`;
}

async function run() {
  await send("Runtime.enable");
  await send("Page.enable");

  await setViewport(comparisonOnly ? 1536 : 1440, comparisonOnly ? 1024 : 1144);
  await navigate(`${baseUrl}/?theme=dark&capture=qa-dark`);
  const desktopDark = await evaluate(viewportAudit());
  await capture(
    comparisonOnly ? "rebuild-home-dark-1536x1024.png" : "rebuild-home-dark-cdp-1440.png"
  );

  await navigate(`${baseUrl}/?theme=light&capture=qa-light`);
  const desktopLight = await evaluate(viewportAudit());
  await capture(
    comparisonOnly ? "rebuild-home-light-1536x1024.png" : "rebuild-home-light-cdp-1440.png"
  );

  if (!comparisonOnly) {
    await evaluate(`(() => {
      const section = document.querySelector(".local-context");
      const header = document.querySelector(".site-header");
      if (!section) return;
      window.scrollTo({
        top: section.offsetTop - (header?.getBoundingClientRect().height || 0),
        behavior: "instant"
      });
    })()`);
    await sleep(450);
    await capture("rebuild-home-local-context-light-cdp-1440.png");
  }

  if (comparisonOnly) {
    return { desktopDark, desktopLight, browserErrors };
  }

  await navigate(`${baseUrl}/`);
  const beforeToggle = await evaluate(
    `document.documentElement.classList.contains("dark") ? "dark" : "light"`
  );
  await evaluate(`document.querySelector(".theme-toggle")?.click()`);
  await sleep(500);
  const afterToggle = await evaluate(
    `document.documentElement.classList.contains("dark") ? "dark" : "light"`
  );

  await evaluate(`document.querySelector('.desktop-nav a[href="/services"]')?.click()`);
  await waitFor(`location.pathname === "/services"`, "desktop navigation");
  await waitForPage();
  const navigationPath = await evaluate("location.pathname");
  const servicesDesktop = await evaluate(viewportAudit());
  await capture("rebuild-services-dark-cdp-1440.png");

  await navigate(`${baseUrl}/pricing?theme=light&capture=qa-pricing`);
  const pricingDesktop = await evaluate(viewportAudit());
  await capture("rebuild-pricing-light-cdp-1440.png");

  await navigate(`${baseUrl}/inquire?theme=dark&capture=qa-inquiry`);
  const inquiryDesktop = await evaluate(viewportAudit());
  await capture("rebuild-inquiry-dark-cdp-1440.png");

  await setViewport(1190, 744);
  await navigate(
    `${baseUrl}/services/custom-platform-engineering?theme=light&capture=qa-detail`
  );
  await evaluate(`(() => {
    const section = document.querySelector(".detail-intro")?.closest("section");
    const header = document.querySelector(".site-header");
    if (!section) return;
    window.scrollTo({
      top: section.offsetTop - (header?.getBoundingClientRect().height || 0) - 20,
      behavior: "instant"
    });
  })()`);
  await sleep(450);
  const serviceDetailDesktop = await evaluate(serviceDetailAudit());
  await capture("rebuild-service-detail-light-cdp-1190x744.png");
  await evaluate(`(() => {
    const section = document.querySelector(".service-depth");
    const header = document.querySelector(".site-header");
    if (!section) return;
    window.scrollTo({
      top: section.offsetTop - (header?.getBoundingClientRect().height || 0),
      behavior: "instant"
    });
  })()`);
  await sleep(450);
  await capture("rebuild-service-depth-light-cdp-1190x744.png");

  await setViewport(390, 844, true);
  await navigate(`${baseUrl}/?theme=dark&capture=qa-mobile`);
  const mobileBefore = await evaluate(`({
    ...${viewportAudit()},
    menuVisible: getComputedStyle(document.querySelector(".menu-button")).display !== "none",
    menuExpanded: document.querySelector(".menu-button")?.getAttribute("aria-expanded")
  })`);
  await capture("rebuild-home-dark-cdp-mobile-390.png");
  await evaluate(`document.querySelector(".menu-button")?.click()`);
  await sleep(350);
  const mobileMenuOpen = await evaluate(`({
    classOpen: document.querySelector(".mobile-nav")?.classList.contains("is-open"),
    ariaExpanded: document.querySelector(".menu-button")?.getAttribute("aria-expanded"),
    firstLinkVisible: Boolean(document.querySelector(".mobile-nav a")?.getClientRects().length)
  })`);
  await capture("rebuild-home-menu-cdp-mobile-390.png");

  await navigate(
    `${baseUrl}/services/custom-platform-engineering?theme=light&capture=qa-detail-mobile`
  );
  const serviceDetailMobile = await evaluate(serviceDetailAudit());
  await capture("rebuild-service-detail-light-cdp-mobile-390.png");
  await evaluate(`(() => {
    const section = document.querySelector(".service-depth");
    const header = document.querySelector(".site-header");
    if (!section) return;
    window.scrollTo({
      top: section.offsetTop - (header?.getBoundingClientRect().height || 0),
      behavior: "instant"
    });
  })()`);
  await sleep(450);
  await capture("rebuild-service-depth-light-cdp-mobile-390.png");

  await navigate(`${baseUrl}/inquire?theme=light&capture=qa-form`);
  await evaluate(`(() => {
    const setValue = (selector, value) => {
      const element = document.querySelector(selector);
      const prototype = element instanceof HTMLSelectElement
        ? HTMLSelectElement.prototype
        : element instanceof HTMLTextAreaElement
          ? HTMLTextAreaElement.prototype
          : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(prototype, "value").set.call(element, value);
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    };
    setValue('input[autocomplete="name"]', "QA Collaborator");
    setValue('input[autocomplete="email"]', "qa@example.com");
  })()`);
  await sleep(350);
  await evaluate(`document.querySelector(".inquiry-actions .button--primary")?.click()`);
  await waitFor(`Boolean(document.querySelector('input[autocomplete="organization"]'))`, "form step two");
  await evaluate(`(() => {
    const setValue = (selector, value) => {
      const element = document.querySelector(selector);
      const prototype = element instanceof HTMLSelectElement
        ? HTMLSelectElement.prototype
        : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(prototype, "value").set.call(element, value);
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    };
    setValue('input[autocomplete="organization"]', "Novyrix QA");
    setValue("select", "startup");
    setValue('input[autocomplete="country-name"]', "Kenya");
  })()`);
  await sleep(350);
  await evaluate(`document.querySelector(".inquiry-actions .button--primary")?.click()`);
  await waitFor(`Boolean(document.querySelector(".service-selector button"))`, "form step three");
  await evaluate(`document.querySelector(".service-selector button")?.click()`);
  await sleep(250);
  await evaluate(`(() => {
    const element = document.querySelector("textarea");
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set.call(
      element,
      "We need a resilient platform architecture that can scale across several markets safely."
    );
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  })()`);
  await sleep(350);
  await evaluate(`document.querySelector('button[type="submit"]')?.click()`);
  await waitFor(`Boolean(document.querySelector(".inquiry-success"))`, "form success", 120);
  const inquiryJourney = await evaluate(`({
    success: Boolean(document.querySelector(".inquiry-success")),
    referencePattern: /^NVX-[A-F0-9]{8}$/.test(
      document.querySelector(".inquiry-success strong")?.textContent || ""
    ),
    overflowX: document.documentElement.scrollWidth > window.innerWidth
  })`);
  await evaluate(
    `document.querySelector(".inquiry-success")?.scrollIntoView({ block: "center", behavior: "instant" })`
  );
  await sleep(350);
  await capture("rebuild-inquiry-success-light-cdp-mobile-390.png");

  return {
    desktopDark,
    desktopLight,
    themeToggle: { before: beforeToggle, after: afterToggle, changed: beforeToggle !== afterToggle },
    navigationPath,
    servicesDesktop,
    pricingDesktop,
    inquiryDesktop,
    serviceDetailDesktop,
    serviceDetailMobile,
    mobileBefore,
    mobileMenuOpen,
    inquiryJourney,
    browserErrors,
  };
}

let exitCode = 0;
try {
  const report = await run();
  const reportJson = `${JSON.stringify(report, null, 2)}\n`;
  await writeFile(path.join(outputDir, "visual-qa-report.json"), reportJson);
  process.stdout.write(reportJson);
} catch (error) {
  exitCode = 1;
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
} finally {
  ws.close();
  edge.kill();
  setTimeout(() => process.exit(exitCode), 100);
}
