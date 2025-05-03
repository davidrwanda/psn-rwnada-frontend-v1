#!/bin/bash

# ========================================================================
# Commit Removal Tool - Deletes specific commits from Git history
# ========================================================================

echo -e "\033[1;36m=== Commit Removal Tool ===\033[0m"
echo "This script will COMPLETELY REMOVE the problematic commits from Git history."
echo "WARNING: This will alter Git history substantially. Make sure you have a backup."
echo ""

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

# Function to check if a commit exists
commit_exists() {
    git rev-parse --verify "$1^{commit}" >/dev/null 2>&1
}

# Check if the commits still exist
echo -e "\033[1;34mChecking for problematic commits...\033[0m"

if commit_exists "$COMMIT1"; then
    echo "Found problematic commit 1: $COMMIT1"
    HAS_PROBLEMS=true
else
    echo "Commit 1 not found or already removed."
fi

if commit_exists "$COMMIT2"; then
    echo "Found problematic commit 2: $COMMIT2"
    HAS_PROBLEMS=true
else
    echo "Commit 2 not found or already removed."
fi

if [ "$HAS_PROBLEMS" != true ]; then
    echo -e "\033[1;32mNo problematic commits found! Your repository might already be clean.\033[0m"
    echo "Would you still like to proceed with the cleaning process? (y/n)"
    read CONTINUE
    if [[ $CONTINUE != "y" && $CONTINUE != "Y" ]]; then
        echo "Exiting without changes."
        exit 0
    fi
fi

echo ""
echo -e "\033[1;34mStarting history cleanup procedure...\033[0m"

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $CURRENT_BRANCH"

# Get a list of all branches to clean
ALL_BRANCHES=$(git branch --format="%(refname:short)")

# First, we'll create a completely new history without those commits
echo ""
echo -e "\033[1;34mCreating new clean history...\033[0m"

# Create a new orphan branch (completely unrelated to existing history)
git checkout --orphan temp_clean_branch

# Add all files from latest state
git add -A

# Commit with a clean message
git commit -m "Clean repository state - security fix"

# Now we'll force all branches to point to this new clean state
echo ""
echo -e "\033[1;34mUpdating all branches to clean state...\033[0m"

# For each branch, reset it to the clean state
for branch in $ALL_BRANCHES; do
    if [ "$branch" != "temp_clean_branch" ]; then
        echo "Cleaning branch: $branch"
        git checkout "$branch" 2>/dev/null || continue
        git reset --hard temp_clean_branch
    fi
done

# Go back to the original branch
git checkout "$CURRENT_BRANCH"

# Delete the temporary branch
git branch -D temp_clean_branch

# Clean up refs and perform garbage collection
echo ""
echo -e "\033[1;34mCleaning up references and running garbage collection...\033[0m"
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Verify no trace of commit remains
echo ""
echo -e "\033[1;34mVerifying commits have been removed...\033[0m"

FOUND1=$(git log --all --grep="$COMMIT1" | wc -l)
FOUND2=$(git log --all --grep="$COMMIT2" | wc -l)

if [ "$FOUND1" -eq 0 ] && [ "$FOUND2" -eq 0 ]; then
    echo -e "\033[1;32mSuccess! The problematic commits have been completely removed.\033[0m"
else
    echo -e "\033[1;31mWarning: Some references to the commits might still exist.\033[0m"
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
echo ""
echo -e "\033[1;33mIMPORTANT: After successfully pushing, revoke the old token immediately!\033[0m"
echo -e "\033[1;33mNote: This script created a completely new history. All commit history was collapsed into one commit.\033[0m" 