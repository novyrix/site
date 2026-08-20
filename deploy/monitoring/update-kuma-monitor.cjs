const { io } = require("socket.io-client");

for (const name of ["KUMA_USERNAME", "KUMA_PASSWORD", "KUMA_MONITOR_ID", "KUMA_MONITOR_URL"]) {
  if (!process.env[name]) throw new Error(`${name} is required`);
}

const socket = io("http://127.0.0.1:3001", {
  reconnection: false,
  timeout: 10_000,
});

function call(event, ...args) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${event} timed out`)), 20_000);
    socket.emit(event, ...args, (response) => {
      clearTimeout(timer);
      if (response?.ok) resolve(response);
      else reject(new Error(response?.msg || `${event} failed`));
    });
  });
}

async function update() {
  await new Promise((resolve, reject) => {
    socket.once("connect", resolve);
    socket.once("connect_error", reject);
  });

  await call("login", {
    username: process.env.KUMA_USERNAME,
    password: process.env.KUMA_PASSWORD,
    token: "",
  });

  const monitorId = Number(process.env.KUMA_MONITOR_ID);
  const result = await call("getMonitor", monitorId);
  result.monitor.url = process.env.KUMA_MONITOR_URL;
  result.monitor.active = false;

  await call("editMonitor", result.monitor);
  await call("resumeMonitor", monitorId);

  process.stdout.write(
    JSON.stringify({ monitorId, monitorUrl: result.monitor.url, monitorActive: true }) + "\n"
  );
}

update()
  .then(() => socket.close())
  .catch((error) => {
    console.error(error.message);
    socket.close();
    process.exitCode = 1;
  });
