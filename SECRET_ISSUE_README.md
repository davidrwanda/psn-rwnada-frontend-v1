# Secret Leak - URGENT FIX

## Problem

A Docker Personal Access Token (PAT) has been accidentally committed to the Git repository and is now visible in the Git history. GitHub is blocking pushes to protect this secret.

## Quick Solution

1. **Run the secure removal script:**
   ```bash
   chmod +x fix-secret.sh
   ./fix-secret.sh
   ```

2. **When prompted:**
   - Enter the secret (it won't be displayed or stored in any file)
   - Create a backup if you want (recommended)
   - Let the script fix the Git history
   - Choose to force push when prompted

3. **After running the script:**
   - Visit the GitHub URL shown in the script to unblock the secret
   - Revoke the leaked token in Docker Hub immediately
   - Create a new token and set up the secrets in GitHub

## What This Script Does

- Finds all instances of the secret in the Git history
- Removes them completely using `git-filter-repo`
- Verifies all instances have been removed
- Handles the secret securely without saving it to any file

## Important Notes

1. **DO NOT create any more files or documentation containing the actual token**
2. **DO NOT use the old `remove-secrets.txt` instructions or manual steps in `docs/SECURITY_FIX.md`**
3. The script is the safest method to remove the secret

## For Team Members

After the fix has been applied and pushed, you'll need to:

```bash
# Either clone a fresh copy
git clone https://github.com/davidrwanda/psn-rwnada-frontend-v1.git

# Or reset your existing repository
git fetch origin
git reset --hard origin/main
```

## Setting Up GitHub Secrets After Fix

You'll need these secrets in your GitHub repository:
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PAT` - A new Docker Personal Access Token (not the leaked one)
- `SERVER_HOST` - Deployment server hostname
- `SERVER_USERNAME` - SSH username
- `SERVER_PASSWORD` - SSH password 