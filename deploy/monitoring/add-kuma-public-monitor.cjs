const { io } = require("socket.io-client");

for (const name of ["KUMA_USERNAME", "KUMA_PASSWORD", "KUMA_NOTIFICATION_ID"]) {
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

async function addPublicMonitor() {
  await new Promise((resolve, reject) => {
    socket.once("connect", resolve);
    socket.once("connect_error", reject);
  });

  await call("login", {
    username: process.env.KUMA_USERNAME,
    password: process.env.KUMA_PASSWORD,
    token: "",
  });

  const notificationId = Number(process.env.KUMA_NOTIFICATION_ID);
  const monitor = {
    active: true,
    type: "http",
    name: "Novyrix Public API",
    description: "External DNS, TLS, tunnel, API, and PostgreSQL health check.",
    parent: null,
    url: "https://api.novyrix.com/health",
    method: "GET",
    protocol: null,
    location: "world",
    ipFamily: null,
    interval: 60,
    retryInterval: 20,
    resendInterval: 60,
    maxretries: 2,
    retryOnlyOnStatusCodeFailure: false,
    notificationIDList: { [notificationId]: true },
    ignoreTls: false,
    upsideDown: false,
    expiryNotification: true,
    domainExpiryNotification: true,
    maxredirects: 5,
    accepted_statuscodes: ["200-299"],
    saveResponse: false,
    saveErrorResponse: true,
    responseMaxLength: 1024,
    dns_resolve_type: "A",
    dns_resolve_server: "",
    port: null,
    hostname: null,
    packetSize: 56,
    headers: "{}",
    body: "",
    basic_auth_user: "",
    basic_auth_pass: "",
    bearer_token: "",
    authMethod: null,
    conditions: [],
    kafkaProducerBrokers: [],
    kafkaProducerSaslOptions: { mechanism: "None" },
    rabbitmqNodes: [],
  };

  const savedMonitor = await call("add", monitor);
  process.stdout.write(
    JSON.stringify({
      monitorId: savedMonitor.monitorID,
      monitorName: monitor.name,
      monitorUrl: monitor.url,
      monitorActive: monitor.active,
    }) + "\n"
  );
}

addPublicMonitor()
  .then(() => socket.close())
  .catch((error) => {
    console.error(error.message);
    socket.close();
    process.exitCode = 1;
  });
