# Novyrix Server Workload Layout

The `linux-vps` host is the private application and operations plane for Novyrix. Public web rendering remains on Vercel. Cloudflare Tunnel publishes the platform API without exposing PostgreSQL to the internet.

## Runtime Responsibilities

| Responsibility | Location | Exposure |
| --- | --- | --- |
| PostgreSQL application data | Docker volume `novyrix-platform_postgres-data` | Docker network only |
| Platform API | `/srv/novyrix/platform-api` | `127.0.0.1:8080` and Cloudflare Tunnel |
| Deployment manifests | `/srv/novyrix/deploy/novyrix-platform` | Private filesystem |
| Database dumps | `/srv/novyrix/backups/postgres` | Private filesystem, 14-day local retention |
| Encrypted disaster-recovery snapshots | R2 bucket `novyrix-backups`, prefix `postgres` | Staged; activation awaits endpoint provisioning |
| Release archives | `/srv/novyrix/releases` | Private filesystem |
| Future scheduled jobs | `/srv/novyrix/automation/jobs` | Private filesystem |
| Future validation workers | `/srv/novyrix/automation/validators` | Private filesystem |
| Private working storage | `/srv/novyrix/storage/private` | Private filesystem |
| Generated exports and temporary uploads | `/srv/novyrix/storage/exports`, `/srv/novyrix/storage/uploads` | Private filesystem |

The VPS filesystem is suitable for databases, job state, generated exports, and bounded working storage. R2 is the durable object store for off-site backups and future user-owned files. Important objects must not exist only on the VPS disk.

## Scheduling Standard

Use systemd services and timers instead of root crontab entries. Each workload gets a version-controlled script, a oneshot service, a timer, explicit filesystem permissions, and logs in the system journal.

Current timer:

- `novyrix-postgres-backup.timer` creates a PostgreSQL custom-format dump each day.

Prepared timer:

- `novyrix-offsite-backup.timer` rejects dumps older than six hours, validates the newest dump, sends an encrypted Restic snapshot to R2, applies retention, and checks repository integrity. It must remain disabled until `rclone lsd r2:` succeeds and the Restic repository passes `restic check`.

Current activation blocker: Cloudflare API error `10042` reports that R2 must be enabled through the Cloudflare Dashboard.

Inspect jobs with:

```bash
systemctl list-timers --all 'novyrix-*'
journalctl -u novyrix-postgres-backup.service -u novyrix-offsite-backup.service
```

## Secret Boundaries

Runtime secrets belong in `/etc/novyrix/secrets` with mode `600` and root ownership. Restic repository credentials and its encryption password are also retained in the ACL-protected local operations directory for disaster recovery. Do not commit secret values to Git.

## Restore Check

After R2 endpoint provisioning and timer activation, list snapshots before selecting one to restore:

```bash
sudo systemctl start novyrix-offsite-backup.service
sudo bash -c 'set -a; source /etc/novyrix/secrets/restic-r2.env; set +a; restic snapshots'
```

Restore into an empty, temporary directory first. Never restore directly over the live PostgreSQL volume.
