# Removing Sensitive Information from Git History

## IMPORTANT: USE THE SCRIPT INSTEAD

**For the most secure approach, use the `fix-secret.sh` script in the root directory instead of these manual steps.**

The script automates this entire process in a more secure way without creating temporary files that might contain sensitive information.

## Manual Process (Less Secure)

Only use this process if you cannot use the script for some reason.

### Issue

GitHub is blocking pushes to the repository because a Docker PAT was accidentally committed in multiple files. This needs to be completely removed from Git history for security.

### Prerequisites

1. Install git-filter-repo:
   ```bash
   pip install git-filter-repo
   ```

2. Make sure you have a local clone of the repository:
   ```bash
   git clone https://github.com/davidrwanda/psn-rwnada-frontend-v1.git
   cd psn-rwnada-frontend-v1
   ```

### Step 1: Create a Backup

Before proceeding, create a backup of your repository:

```bash
# Navigate outside your repo
cd ..

# Clone a fresh copy as backup with timestamp
git clone --mirror https://github.com/davidrwanda/psn-rwnada-frontend-v1.git psn-rwanda-frontend-backup-$(date +%Y%m%d%H%M%S)
```

### Step 2: Create a Secure Replacement Pattern

SECURITY WARNING: This step is why using the script is safer - it manages this replacement without creating persistent files.

For the manual process, you'd need to create a temporary replacement file and securely delete it afterward.

### Step 3: Run git-filter-repo

Run git-filter-repo with the replacement pattern:

```bash
cd psn-rwnada-frontend-v1

# Run git filter-repo with your replacement pattern
git filter-repo --replace-text your-temp-replacement-file.txt

# Securely delete the replacement file
shred -zu your-temp-replacement-file.txt  # On Linux
# or
rm your-temp-replacement-file.txt  # Less secure but works on all systems
```

### Step 4: Verify the Changes

Check that the secret has been removed:

```bash
git log -p -S "your-secret-pattern" --all
```

This should return no results if the secret was successfully removed.

### Step 5: Push the Changes

Force push the changes to overwrite the history:

```bash
# Force push all branches
git push origin --force --all

# Force push all tags
git push origin --force --tags
```

### Step 6: Unblock in GitHub

Go to the unblock URL provided in the GitHub error message to unblock the secret after it's been properly removed.

### Step 7: Inform Collaborators

Since the Git history has been rewritten, inform all collaborators to:

1. Clone a fresh copy of the repository:
   ```bash
   git clone https://github.com/davidrwanda/psn-rwnada-frontend-v1.git
   ```

2. Or reset their local repository:
   ```bash
   git fetch origin
   git reset --hard origin/main
   ```

## Prevent Future Incidents

1. Use pre-commit hooks to scan for secrets
2. Never hardcode credentials in code or configuration files
3. Always use environment variables or secrets management
4. Consider using tools like git-secrets or detect-secrets in your workflow 