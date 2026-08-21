#!/usr/bin/env bash
set -euo pipefail
umask 077

stack_dir="${NOVYRIX_STACK_DIR:-/srv/novyrix/deploy/novyrix-platform}"
backup_dir="${NOVYRIX_BACKUP_DIR:-/srv/novyrix/backups/postgres}"
max_dump_age_seconds="${NOVYRIX_BACKUP_MAX_AGE_SECONDS:-21600}"

latest_dump="$(find "$backup_dir" -maxdepth 1 -type f -name 'novyrix-*.dump' -printf '%T@ %p\n' \
  | sort -nr \
  | sed -n '1s/^[^ ]* //p')"

if [[ -z "$latest_dump" ]]; then
  echo "No PostgreSQL backup is available for off-site replication." >&2
  exit 1
fi

dump_age_seconds="$(( $(date +%s) - $(stat -c %Y "$latest_dump") ))"
if (( dump_age_seconds > max_dump_age_seconds )); then
  echo "The newest PostgreSQL backup is too old for off-site replication." >&2
  exit 1
fi

cd "$stack_dir"
docker compose exec -T postgres pg_restore --list < "$latest_dump" > /dev/null

restic backup "$backup_dir" \
  --host linux-vps \
  --tag novyrix-postgres \
  --exclude '*.tmp'

restic forget \
  --host linux-vps \
  --tag novyrix-postgres \
  --keep-daily 14 \
  --keep-weekly 8 \
  --keep-monthly 12 \
  --prune

restic check
