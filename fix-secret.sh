#!/bin/bash

# ========================================================================
# Improved Secret Removal Tool - Removes leaked secrets from Git history
# ========================================================================

echo -e "\033[1;36m=== Advanced Secret Removal Tool ===\033[0m"
echo "This script will help you remove leaked secrets from your Git history."
echo "IMPORTANT: This script does NOT store the actual secret in any persistent files."
echo ""

# Check if git-filter-repo is installed
if ! command -v git-filter-repo &> /dev/null; then
    echo -e "\033[1;31mError: git-filter-repo is not installed.\033[0m"
    echo "Please install it with: pip install git-filter-repo"
    exit 1
fi

# Create a temporary file for the replacement pattern
TEMP_FILE=$(mktemp)

# Make sure the temp file is deleted on exit, even if the script is interrupted
trap "rm -f $TEMP_FILE; echo -e '\n\033[1;33mCleaned up temporary files.\033[0m'" EXIT

# Get the secret from STDIN (not from command line arguments for security)
echo -e "\033[1;33mPlease paste the leaked secret (it will not be displayed):\033[0m"
read -s SECRET

if [ -z "$SECRET" ]; then
    echo -e "\033[1;31mError: No secret provided.\033[0m"
    exit 1
fi

# Create the replacement pattern with exact match
echo "${SECRET}==>REMOVED_SECRET" > $TEMP_FILE

echo ""
echo -e "\033[1;32mReplacement pattern created.\033[0m"

# Get repository information
REPO_DIR=$(pwd)
REPO_NAME=$(basename "$REPO_DIR")
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Create a backup
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

# Show files that contain the secret before cleaning
echo ""
echo -e "\033[1;34mFiles currently containing the secret:\033[0m"
git grep -l "$SECRET" || echo "No files in the current state contain the secret."

# Run git-filter-repo
echo ""
echo -e "\033[1;34mRunning git-filter-repo to remove the secret from history...\033[0m"
git filter-repo --replace-text $TEMP_FILE

# Verify the changes
echo ""
echo -e "\033[1;34mVerifying changes...\033[0m"
FOUND_SECRET=$(git log -p -S "$SECRET" --all | wc -l)

if [ "$FOUND_SECRET" -eq 0 ]; then
    echo -e "\033[1;32mSuccess! The secret has been removed from the Git history.\033[0m"
else
    echo -e "\033[1;31mWarning: The secret might still exist in the Git history.\033[0m"
    echo "Please check manually with: git log -p -S \"$SECRET\" --all"
fi

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
echo "5. Make sure all collaborators pull the updated repository"
echo ""
echo -e "\033[1;33mIMPORTANT: Never commit sensitive information again. Use GitHub Secrets for CI/CD credentials.\033[0m" 