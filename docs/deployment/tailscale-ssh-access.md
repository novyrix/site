# Tailscale SSH access

## Purpose

`linux-vps` runs Tailscale SSH on tailnet port 22. OpenSSH remains healthy on the host, but it does not receive tailnet port 22 while `RunSSH` is enabled. The previous broad `check` rule required periodic browser reauthorization and reset headless sessions after the approval wait timed out.

## Production policy

- Source identity: `novyrix@github`
- Destination tag: `tag:novyrix-server`
- Destination device: `linux-vps` (`100.88.185.74`, device ID `3750769559248055`)
- Allowed Unix user: `novyrix`
- Denied Unix user: `root`
- Other user-owned devices: retain the existing interactive `autogroup:self` check rule

The server tag is owned by `novyrix@github`. The policy includes an SSH test asserting that `novyrix` is accepted and `root` is denied for the server tag. Tailscale evaluates a matching `check` rule more restrictively than an `accept` rule, so tagging the server also prevents the broad `autogroup:self` check from shadowing the server-specific rule.

The access rule follows the official Tailscale SSH policy model: <https://tailscale.com/docs/reference/syntax/policy-file#tailscale-ssh>.

## Verification

```powershell
ssh -o BatchMode=yes -o ControlMaster=no novyrix@linux-vps "id -un"
ssh -o BatchMode=yes -o ControlMaster=no root@linux-vps true
```

The first command must return `novyrix`. The second must fail with a tailnet-policy denial.

## Backups

The pre-change ACL and validated candidate are stored outside the repository in:

```text
X:\novyrix\_ops\backups\tailscale\acl-before-novyrix-ssh-20260821-082603.json
X:\novyrix\_ops\backups\tailscale\acl-candidate-novyrix-server-ssh.json
```

Do not commit API tokens or auth keys. The credential remains in the ACL-protected local secrets directory.

## Rollback

1. Fetch the current policy and ETag. Stop if the live policy differs from the expected deployed policy.
2. Remove `tag:novyrix-server` from the VPS device so it returns to its user-owned identity.
3. Restore the pre-change policy with the current ETag as `If-Match`.
4. Confirm the original `check` behavior and verify that network-level access remains unchanged.

Restore by forwarding the policy, not by disabling Tailscale SSH or deleting the device. Device deletion or reauthentication is not part of this rollback.
