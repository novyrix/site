const { io } = require("socket.io-client");

const required = [
  "KUMA_USERNAME",
  "KUMA_PASSWORD",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "RESEND_TO_EMAIL",
];

for (const name of required) {
  if (!process.env[name]) {
    throw new Error(`${name} is required`);
  }
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

async function connect() {
  await new Promise((resolve, reject) => {
    socket.once("connect", resolve);
    socket.once("connect_error", reject);
  });
}

async function configure() {
  await connect();
  await call("login", {
    username: process.env.KUMA_USERNAME,
    password: process.env.KUMA_PASSWORD,
    token: "",
  });

  const notification = {
    name: "Novyrix Resend alerts",
    type: "Resend",
    isDefault: true,
    applyExisting: false,
    resendApiKey: process.env.RESEND_API_KEY,
    resendFromEmail: process.env.RESEND_FROM_EMAIL,
    resendFromName: "Novyrix Infrastructure",
    resendToEmail: process.env.RESEND_TO_EMAIL,
    resendSubject: "Novyrix infrastructure alert",
  };

  await call("testNotification", notification);
  const savedNotification = await call("addNotification", notification, null);

  const monitor = {
    active: process.env.KUMA_MONITOR_ACTIVE === "true",
    type: "http",
    name: "Novyrix Platform API",
    description: "Independent health check for the private API and PostgreSQL connection.",
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
    notificationIDList: { [savedNotification.id]: true },
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
      login: "ok",
      resendTest: "sent",
      notificationId: savedNotification.id,
      monitorId: savedMonitor.monitorID,
      monitorActive: monitor.active,
    }) + "\n"
  );
}

configure()
  .then(() => socket.close())
  .catch((error) => {
    console.error(error.message);
    socket.close();
    process.exitCode = 1;
  });
