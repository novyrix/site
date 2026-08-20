import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const debuggingPort = 9500 + (process.pid % 200);
const baseUrl = process.env.NOVYRIX_AUDIT_URL || "http://127.0.0.1:4173";
const outputDir = path.resolve(process.env.NOVYRIX_QA_OUTPUT || "../_design/screenshots");
const profileDir = path.resolve(`../_design/edge-release-profile-${process.pid}`);
const routes = [
  "/",
  "/services",
  "/pricing",
  "/inquire",
  "/privacy",
  "/terms",
  "/blog",
  "/blog/mpesa-payment-reconciliation-kenya",
  "/this-route-does-not-exist",
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
    `--remote-debugging-port=${debuggingPort}`,
    `--user-data-dir=${profileDir}`,
    `${baseUrl}/?theme=light&capture=release-qa`,
  ],
  { stdio: "ignore", windowsHide: true },
);

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function pageTarget() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${debuggingPort}/json`);
      const targets = await response.json();
      const target = targets.find(
        (item) => item.type === "page" && item.url.startsWith(baseUrl),
      );
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
  const response = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
  }
  return response.result.value;
}

async function waitFor(condition, description, attempts = 300) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (await evaluate(condition)) return;
    await sleep(250);
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

async function navigate(route, theme = "light") {
  const separator = route.includes("?") ? "&" : "?";
  await send("Page.navigate", {
    url: `${baseUrl}${route}${separator}theme=${theme}&capture=release-qa`,
  });
  await waitFor(
    `document.readyState === "complete" && document.fonts.status === "loaded" && Boolean(document.querySelector("h1"))`,
    `${route} to render`,
  );
  await sleep(500);
}

async function screenshot(filename, fullPage = false) {
  const dimensions = fullPage
    ? await evaluate(`({ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight })`)
    : null;
  const response = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: fullPage,
    ...(dimensions
      ? { clip: { x: 0, y: 0, width: dimensions.width, height: dimensions.height, scale: 1 } }
      : {}),
  });
  await writeFile(path.join(outputDir, filename), Buffer.from(response.data, "base64"));
}

function pageAuditExpression() {
  return `(() => {
    const visible = (element) => Boolean(element.getClientRects().length) && getComputedStyle(element).visibility !== "hidden";
    const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].filter(visible);
    const headingJumps = headings.flatMap((heading, index) => {
      if (index === 0) return [];
      const previous = Number(headings[index - 1].tagName.slice(1));
      const current = Number(heading.tagName.slice(1));
      return current - previous > 1
        ? [headings[index - 1].tagName + " to " + heading.tagName + ": " + heading.textContent.trim()]
        : [];
    });
    const controlName = (element) => {
      const labels = element.labels ? [...element.labels].map((label) => label.textContent.trim()).join(" ") : "";
      return element.getAttribute("aria-label")
        || element.getAttribute("aria-labelledby")
        || labels
        || element.textContent.trim()
        || element.querySelector("img")?.alt
        || element.getAttribute("title")
        || "";
    };
    const controls = [...document.querySelectorAll('a[href], button, input:not([type="hidden"]), select, textarea')].filter(visible);
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    return {
      route: location.pathname,
      viewport: [innerWidth, innerHeight],
      documentWidth: document.documentElement.scrollWidth,
      overflowX: document.documentElement.scrollWidth > innerWidth + 1,
      h1Count: document.querySelectorAll("h1").length,
      mainTargetCount: document.querySelectorAll("main#main-content").length,
      skipTarget: document.querySelector(".skip-link")?.getAttribute("href") || null,
      missingImageAlt: [...document.querySelectorAll("img:not([alt])")].map((image) => image.currentSrc || image.src),
      unnamedControls: controls.filter((element) => !controlName(element)).map((element) => element.outerHTML.slice(0, 180)),
      duplicateIds: [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))],
      emptyHeadings: headings.filter((heading) => !heading.textContent.trim()).map((heading) => heading.outerHTML),
      headingJumps,
      nextErrorOverlay: Boolean(document.querySelector("[data-nextjs-dialog-overlay], [data-nextjs-error-overlay]")),
      theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    };
  })()`;
}

function auditPassed(audit, expectedTheme = "light") {
  return (
    !audit.overflowX
    && audit.h1Count === 1
    && audit.mainTargetCount === 1
    && audit.skipTarget === "#main-content"
    && audit.missingImageAlt.length === 0
    && audit.unnamedControls.length === 0
    && audit.duplicateIds.length === 0
    && audit.emptyHeadings.length === 0
    && audit.headingJumps.length === 0
    && !audit.nextErrorOverlay
    && audit.theme === expectedTheme
  );
}

async function run() {
  await send("Runtime.enable");
  await send("Page.enable");

  const pageAudits = [];
  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000, mobile: false },
    { name: "mobile", width: 390, height: 844, mobile: true },
  ]) {
    await setViewport(viewport.width, viewport.height, viewport.mobile);
    for (const route of routes) {
      await navigate(route);
      const audit = await evaluate(pageAuditExpression());
      pageAudits.push({ breakpoint: viewport.name, ...audit, passed: auditPassed(audit) });

      if (route === "/") {
        await screenshot(`release-home-light-${viewport.name}-${viewport.width}.png`);
      }
      if (route === "/privacy") {
        await screenshot(`release-privacy-light-${viewport.name}-${viewport.width}.png`);
        await evaluate(`(() => {
          const target = document.querySelector(".legal-copy");
          const header = document.querySelector(".site-header");
          if (!target) return;
          window.scrollTo({
            top: target.getBoundingClientRect().top + scrollY - (header?.getBoundingClientRect().height || 0) - 24,
            behavior: "instant"
          });
        })()`);
        await sleep(300);
        await screenshot(`release-privacy-body-light-${viewport.name}-${viewport.width}.png`);
      }
      if (route === "/blog") {
        await screenshot(`release-blog-light-${viewport.name}-${viewport.width}.png`);
      }
      if (route === "/blog/mpesa-payment-reconciliation-kenya") {
        await screenshot(`release-field-note-light-${viewport.name}-${viewport.width}.png`);
        await evaluate(`(() => {
          const target = document.querySelector(".field-note-copy");
          const header = document.querySelector(".site-header");
          if (!target) return;
          window.scrollTo({
            top: target.getBoundingClientRect().top + scrollY - (header?.getBoundingClientRect().height || 0) - 24,
            behavior: "instant"
          });
        })()`);
        await sleep(300);
        await screenshot(`release-field-note-body-light-${viewport.name}-${viewport.width}.png`);
      }
      if (route === "/this-route-does-not-exist") {
        await screenshot(`release-404-light-${viewport.name}-${viewport.width}.png`);
      }
      if (route === "/inquire" && viewport.name === "mobile") {
        await screenshot("release-inquiry-light-mobile-390.png");
        await evaluate(`(() => {
          const target = document.querySelector(".inquiry-form");
          const header = document.querySelector(".site-header");
          if (!target) return;
          window.scrollTo({
            top: target.getBoundingClientRect().top + scrollY - (header?.getBoundingClientRect().height || 0) - 24,
            behavior: "instant"
          });
        })()`);
        await sleep(300);
        await screenshot("release-inquiry-form-light-mobile-390.png");
      }
    }
  }

  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000, mobile: false },
    { name: "mobile", width: 390, height: 844, mobile: true },
  ]) {
    await setViewport(viewport.width, viewport.height, viewport.mobile);
    for (const route of ["/blog", "/blog/mpesa-payment-reconciliation-kenya"]) {
      await navigate(route, "dark");
      const audit = await evaluate(pageAuditExpression());
      pageAudits.push({
        breakpoint: `${viewport.name}-dark`,
        ...audit,
        passed: auditPassed(audit, "dark"),
      });

      const pageName = route === "/blog" ? "blog" : "field-note";
      await screenshot(`release-${pageName}-dark-${viewport.name}-${viewport.width}.png`);
    }
  }

  await setViewport(390, 844, true);
  await navigate("/");
  const menuClosedBefore = await evaluate(`({
    expanded: document.querySelector(".menu-button")?.getAttribute("aria-expanded"),
    hidden: document.querySelector(".mobile-nav")?.getAttribute("aria-hidden"),
    inert: document.querySelector(".mobile-nav")?.hasAttribute("inert")
  })`);
  await evaluate(`document.querySelector(".menu-button")?.click()`);
  await waitFor(
    `document.querySelector(".menu-button")?.getAttribute("aria-expanded") === "true"`,
    "mobile menu to open",
  );
  const menuOpen = await evaluate(`({
    expanded: document.querySelector(".menu-button")?.getAttribute("aria-expanded"),
    hidden: document.querySelector(".mobile-nav")?.getAttribute("aria-hidden"),
    inert: document.querySelector(".mobile-nav")?.hasAttribute("inert"),
    themeControl: Boolean(document.querySelector(".mobile-nav .theme-toggle"))
  })`);
  await screenshot("release-mobile-menu-light-390.png");
  await evaluate(`document.querySelector(".site-header")?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }))`);
  await waitFor(
    `document.querySelector(".menu-button")?.getAttribute("aria-expanded") === "false"`,
    "mobile menu to close with Escape",
  );
  const menuClosedAfter = await evaluate(`({
    expanded: document.querySelector(".menu-button")?.getAttribute("aria-expanded"),
    hidden: document.querySelector(".mobile-nav")?.getAttribute("aria-hidden"),
    inert: document.querySelector(".mobile-nav")?.hasAttribute("inert"),
    focusReturned: document.activeElement === document.querySelector(".menu-button")
  })`);

  await navigate("/inquire");
  await evaluate(`document.querySelector(".inquiry-actions .button--primary")?.click()`);
  await waitFor(`Boolean(document.querySelector(".form-error"))`, "inquiry validation error");
  const errorFocus = await evaluate(`({
    message: document.querySelector(".form-error")?.textContent.trim(),
    focused: document.activeElement === document.querySelector(".form-error")
  })`);
  await evaluate(`(() => {
    const setValue = (selector, value) => {
      const element = document.querySelector(selector);
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(element, value);
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    };
    setValue('input[name="contactName"]', "Accessibility QA");
    setValue('input[name="contactEmail"]', "qa@example.com");
  })()`);
  await evaluate(`document.querySelector(".inquiry-actions .button--primary")?.click()`);
  await waitFor(
    `document.querySelector(".inquiry-step legend strong")?.textContent.includes("organisation")`,
    "inquiry step two",
  );
  const stepFocus = await evaluate(`({
    heading: document.querySelector(".inquiry-step legend strong")?.textContent.trim(),
    focused: document.activeElement === document.querySelector(".inquiry-step legend strong"),
    currentStep: document.querySelector('[aria-current="step"]')?.textContent.trim()
  })`);

  await navigate("/");
  const revealBeforeScroll = await evaluate(`(() => {
    const element = document.querySelector(".local-context .reveal");
    return element ? Number.parseFloat(getComputedStyle(element).opacity) : null;
  })()`);
  await evaluate(`(() => {
    const target = document.querySelector(".local-context");
    const header = document.querySelector(".site-header");
    if (!target) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + scrollY - (header?.getBoundingClientRect().height || 0) - 24,
      behavior: "instant"
    });
  })()`);
  await sleep(500);
  const revealAfterScroll = await evaluate(`(() => {
    const element = document.querySelector(".local-context .reveal");
    if (!element) return null;
    const style = getComputedStyle(element);
    return { opacity: Number.parseFloat(style.opacity), transform: style.transform };
  })()`);
  await screenshot("release-home-context-light-mobile-390.png");

  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await navigate("/");
  const reducedMotion = await evaluate(`(() => {
    const parseDurations = (value) => value.split(",").map((item) => Number.parseFloat(item) || 0);
    const offenders = [...document.querySelectorAll("*")].flatMap((element) => {
      if (!element.getClientRects().length) return [];
      const style = getComputedStyle(element);
      const longest = Math.max(...parseDurations(style.animationDuration), ...parseDurations(style.transitionDuration));
      return longest > 0.02 ? [element.className || element.tagName] : [];
    });
    return {
      mediaMatches: matchMedia("(prefers-reduced-motion: reduce)").matches,
      longRunningElements: offenders.slice(0, 20)
    };
  })()`);

  const interactionPassed = (
    menuClosedBefore.expanded === "false"
    && menuClosedBefore.hidden === "true"
    && menuClosedBefore.inert
    && menuOpen.expanded === "true"
    && menuOpen.hidden === "false"
    && !menuOpen.inert
    && menuOpen.themeControl
    && menuClosedAfter.focusReturned
    && menuClosedAfter.inert
    && errorFocus.focused
    && stepFocus.focused
    && revealAfterScroll?.opacity > 0.99
    && reducedMotion.mediaMatches
    && reducedMotion.longRunningElements.length === 0
  );

  const failedPages = pageAudits.filter((audit) => !audit.passed);
  return {
    auditedAt: new Date().toISOString(),
    baseUrl,
    summary: {
      pageAudits: pageAudits.length,
      failedPages: failedPages.length,
      interactionsPassed: interactionPassed,
      browserErrors: browserErrors.length,
    },
    failedPages,
    pageAudits,
    interactions: {
      menuClosedBefore,
      menuOpen,
      menuClosedAfter,
      errorFocus,
      stepFocus,
      scrollReveal: { before: revealBeforeScroll, after: revealAfterScroll },
      reducedMotion,
    },
    browserErrors,
    passed: failedPages.length === 0 && interactionPassed && browserErrors.length === 0,
  };
}

let exitCode = 0;
try {
  const report = await run();
  const reportJson = `${JSON.stringify(report, null, 2)}\n`;
  await writeFile(path.join(outputDir, "release-browser-qa-report.json"), reportJson);
  process.stdout.write(reportJson);
  if (!report.passed) exitCode = 1;
} catch (error) {
  exitCode = 1;
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
} finally {
  socket.close();
  edge.kill();
  setTimeout(() => process.exit(exitCode), 100);
}
