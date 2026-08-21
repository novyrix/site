# Novyrix Platform Operations

## Runtime

- PostgreSQL 17 runs only on the internal Docker network.
- The Fastify API listens on `127.0.0.1:8080` and the tunnel network.
- `api.novyrix.com` routes through the dedicated `novyrix-platform` Cloudflare Tunnel.
- Uptime Kuma checks both the public hostname and a tailnet-only HTTPS endpoint.
- Daily PostgreSQL backups run at 02:20 UTC with 14-day local retention.
- An off-site service is staged to validate the newest dump and replicate it as an encrypted Restic snapshot to private R2 storage at 03:20 UTC.
- The off-site timer stays disabled until the Cloudflare account provisions its R2 endpoint and a repository integrity check passes.
- Future cron and validation work runs as version-controlled systemd services from `/srv/novyrix/automation`.

## Cloudflare Route

- Public hostname: `api.novyrix.com`
- Tunnel ID: `e371af01-5bc6-4f73-91cb-3778d61cdbfa`
- Tunnel service: `http://api:8080`
- DNS type: proxied CNAME to the tunnel hostname

The tunnel and DNS zone must remain in the same Cloudflare account. Credentials are stored only in the ACL-protected `_ops/secrets` directory and the mode `600` server environment file.

The staged R2 credentials and Restic repository password are stored in `/etc/novyrix/secrets/restic-r2.env` and `/etc/novyrix/secrets/restic-password`. Both files are root-owned with mode `600`.

## Verification

```powershell
Invoke-RestMethod https://api.novyrix.com/health
ssh linux-vps "cd /srv/novyrix/deploy/novyrix-platform && docker compose ps"
ssh linux-vps "systemctl list-timers --all 'novyrix-*'"
```

Expected health response:

```json
{"status":"ok"}
```

## Connector Rollback

The pre-cutover environment is preserved at:

```text
/srv/novyrix/deploy/novyrix-platform/.env.before-cloudflare-20260819T183537Z
```

Use it only if the new tunnel must be rolled back:

```bash
cd /srv/novyrix/deploy/novyrix-platform
cp -p .env.before-cloudflare-20260819T183537Z .env
docker compose up -d --no-deps --force-recreate cloudflared
```

Restoring this file disconnects the public hostname from its active connector, so follow rollback with a matching DNS or tunnel correction.
