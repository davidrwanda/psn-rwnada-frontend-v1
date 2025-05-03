# Security Fix for Leaked Docker PAT

GitHub is blocking pushes because a Docker Personal Access Token (PAT) was accidentally committed to the repository and appears in multiple files in the Git history.

## URGENT: Use This Improved Method

We've created an enhanced script that safely removes secrets without storing them in any files:

```bash
# Make the script executable if needed
chmod +x fix-secret.sh

# Run the script
./fix-secret.sh
```

## What This Does

The script will:
1. Ask you to paste the leaked secret (it will not be displayed or stored)
2. Create a temporary replacement pattern (automatically deleted when done)
3. Find all instances of the secret in the Git history
4. Remove it completely from the history
5. Verify all instances have been removed
6. Optionally push the changes to GitHub

## Critical Steps After Running the Script

1. **Immediately** go to:
   https://github.com/davidrwanda/psn-rwnada-frontend-v1/security/secret-scanning/unblock-secret/2wYvtm4KAzWy8hz8MbBT6aMkWIT
   and unblock the secret

2. **Immediately** revoke the exposed token in Docker Hub

3. Create a new token and add it to GitHub as a secret named `DOCKER_PAT`

4. Make sure you also have the following secrets configured in GitHub:
   - `DOCKER_USERNAME` - Your Docker Hub username
   - `SERVER_HOST` - Your deployment server hostname
   - `SERVER_USERNAME` - SSH username for deployment
   - `SERVER_PASSWORD` - SSH password for deployment

## For Collaborators

After the Git history has been fixed and force-pushed:

```bash
# Option 1: Clone fresh
git clone https://github.com/davidrwanda/psn-rwnada-frontend-v1.git

# Option 2: Reset your existing repo
git fetch origin
git reset --hard origin/main
```

## Prevent Future Leaks

1. **Never** hardcode credentials in:
   - Source code
   - Documentation
   - Shell scripts
   - Git commit messages

2. Set up GitHub scanning alerts in repository settings

3. Consider using git pre-commit hooks to scan for secrets 