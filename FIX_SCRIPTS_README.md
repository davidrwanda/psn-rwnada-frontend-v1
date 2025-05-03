# Git Secret Removal Scripts

We've created several scripts to help fix the issue with the leaked Docker PAT in the repository history. Choose the one that best suits your needs.

## Option 1: Targeted Secret Removal (Recommended First)

```bash
./fix-commits.sh
```

This script:
- Specifically targets the problematic files in the known commits
- Replaces the secret with a placeholder
- Preserves most of the Git history
- Has minimal impact on the codebase

## Option 2: Filter-Branch Approach

```bash
./filter-branch-fix.sh
```

This script:
- Uses `git filter-branch` instead of `git-filter-repo`
- Searches all files in all commits for the secret
- Is more thorough but slower
- May have more impact on Git history

## Option 3: Nuclear Option (Last Resort)

```bash
./remove-commits.sh
```

This script:
- Completely removes all Git history
- Creates a single new clean commit with current state
- Is guaranteed to remove the secret
- Loses all commit history

## How to Use

1. Choose the appropriate script based on your needs
2. Make it executable if needed: `chmod +x script-name.sh`
3. Run the script: `./script-name.sh`
4. When prompted, paste the secret (it will not be displayed)
5. Create a backup when prompted (recommended)
6. Let the script run and fix the history
7. Choose to force push when prompted

## After Running Any Script Successfully

1. Visit the GitHub URL to unblock the secret:
   https://github.com/davidrwanda/psn-rwnada-frontend-v1/security/secret-scanning/unblock-secret/2wYvtm4KAzWy8hz8MbBT6aMkWIT

2. Immediately revoke the leaked token in Docker Hub

3. Create a new token and add it to GitHub secrets

4. Update all team members to pull the latest changes or clone fresh

## Recommended Order

1. Try Option 1 first (most targeted approach)
2. If that fails, try Option 2 (more thorough)
3. Only use Option 3 as a last resort (when all else fails)

All scripts include verification steps to ensure the secret has been properly removed. 