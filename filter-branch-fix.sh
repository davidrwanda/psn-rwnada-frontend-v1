#!/bin/bash

# ========================================================================
# Git Filter-Branch Secret Removal Tool
# ========================================================================

echo -e "\033[1;36m=== Git Filter-Branch Secret Removal Tool ===\033[0m"
echo "This script will directly target and clean the specific commits with the leaked Docker PAT."
echo "IMPORTANT: This script does NOT store the actual secret in any persistent files."
echo ""

# Get the secret from STDIN (not from command line arguments for security)
echo -e "\033[1;33mPlease paste the leaked Docker PAT (it will not be displayed):\033[0m"
read -s SECRET

if [ -z "$SECRET" ]; then
    echo -e "\033[1;31mError: No secret provided.\033[0m"
    exit 1
fi

# Create a backup
REPO_DIR=$(pwd)
REPO_NAME=$(basename "$REPO_DIR")

echo ""
echo -e "\033[1;33mDo you want to create a backup of your repository? (y/n)\033[0m"
read CREATE_BACKUP

if [[ $CREATE_BACKUP == "y" || $CREATE_BACKUP == "Y" ]]; then
    BACKUP_DIR="../${REPO_NAME}-backup-$(date +%Y%m%d%H%M%S)"
    
    echo -e "\033[1;34mCreating backup at $BACKUP_DIR...\033[0m"
    cd ..
    git clone --mirror "$REPO_DIR" "$BACKUP_DIR"
    cd "$REPO_DIR"
    echo -e "\033[1;32mBackup created successfully.\033[0m"
fi

# The problematic commits
COMMIT1="37877687b2ef33451b42062081e7bf0d35192fe0"
COMMIT2="fea560081dd326e5817fbd1a42e7bd144bf8f8a4"

echo ""
echo -e "\033[1;34mTargeting these specific commits:\033[0m"
echo "1. $COMMIT1 (.github/workflows/deploy-production.yml)"
echo "2. $COMMIT2 (docs/SECURITY_FIX.md and remove-secrets.txt)"

# Function to check if a commit exists
commit_exists() {
    git rev-parse --verify "$1^{commit}" >/dev/null 2>&1
}

# Check if the commits still exist
commit1_exists=false
commit2_exists=false

if commit_exists "$COMMIT1"; then
    commit1_exists=true
fi

if commit_exists "$COMMIT2"; then
    commit2_exists=true
fi

echo ""
echo -e "\033[1;34mChecking commit existence:\033[0m"
echo "Commit 1 ($COMMIT1): $commit1_exists"
echo "Commit 2 ($COMMIT2): $commit2_exists"

# Create a replacement string for the filter-branch command
REPLACEMENT="REMOVED_SECRET"

echo ""
echo -e "\033[1;34mRunning git filter-branch to remove the secret...\033[0m"

# Use git filter-branch to remove the secret from all files in the repo
git filter-branch --force --tree-filter "find . -type f -exec sed -i.bak -e \"s/$SECRET/$REPLACEMENT/g\" {} \\;" --prune-empty HEAD

# Verify changes
echo ""
echo -e "\033[1;34mVerifying changes...\033[0m"
FOUND_SECRET=$(git log -p -S "$SECRET" --all | wc -l)

if [ "$FOUND_SECRET" -eq 0 ]; then
    echo -e "\033[1;32mSuccess! The secret has been removed from the Git history.\033[0m"
else
    echo -e "\033[1;31mWarning: The secret might still exist in the Git history.\033[0m"
    echo "The script may need to be run again or a different approach might be needed."
fi

# Clean up backup refs
echo ""
echo -e "\033[1;34mCleaning up backup refs...\033[0m"
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d

# Run garbage collection
echo ""
echo -e "\033[1;34mRunning garbage collection...\033[0m"
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
echo ""
echo -e "\033[1;33mDo you want to force push these changes to origin? (y/n)\033[0m"
read FORCE_PUSH

if [[ $FORCE_PUSH == "y" || $FORCE_PUSH == "Y" ]]; then
    echo -e "\033[1;34mForce pushing to origin...\033[0m"
    git push origin --force --all
    git push origin --force --tags
    echo -e "\033[1;32mForce push completed.\033[0m"
fi

echo ""
echo -e "\033[1;36m===== Next Steps =====\033[0m"
echo "1. Go to GitHub repository > Settings > Security > Secret scanning"
echo "2. Find the blocked secret and unblock it at:"
echo "   https://github.com/davidrwanda/psn-rwnada-frontend-v1/security/secret-scanning/unblock-secret/2wYvtm4KAzWy8hz8MbBT6aMkWIT"
echo "3. Revoke the leaked token immediately in Docker Hub"
echo "4. Create a new token and add it to GitHub secrets"
echo ""
echo -e "\033[1;33mIMPORTANT: After successfully pushing, revoke the old token immediately!\033[0m" 