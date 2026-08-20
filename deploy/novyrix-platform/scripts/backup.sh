#!/usr/bin/env bash
set -euo pipefail
umask 077

stack_dir="${NOVYRIX_STACK_DIR:-/srv/novyrix/deploy/novyrix-platform}"
backup_dir="${NOVYRIX_BACKUP_DIR:-/srv/novyrix/backups/postgres}"
retention_days="${NOVYRIX_BACKUP_RETENTION_DAYS:-14}"
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"

mkdir -p "$backup_dir"
cd "$stack_dir"

docker compose exec -T postgres sh -c \
  'PGPASSWORD="$POSTGRES_PASSWORD" pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom --no-owner --no-privileges' \
  > "$backup_dir/novyrix-$timestamp.dump"

find "$backup_dir" -type f -name 'novyrix-*.dump' -mtime "+$retention_days" -delete
