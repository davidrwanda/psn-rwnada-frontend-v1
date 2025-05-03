# GitHub Secrets Setup

This document explains how to set up the required secrets for the GitHub Actions workflow to build and deploy the PSN Rwanda Frontend application.

## Required Secrets

You need to set up the following secrets in your GitHub repository:

1. `DOCKER_USERNAME`: Your Docker Hub username
2. `DOCKER_PAT`: Your Docker Hub Personal Access Token (NOT your password)
3. `SERVER_HOST`: The hostname or IP address of your production server
4. `SERVER_USERNAME`: The SSH username for your production server
5. `SERVER_PASSWORD`: The SSH password for your production server

## Setting Up Secrets in GitHub

1. Go to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click on "Secrets and variables" > "Actions"
4. Click on "New repository secret"
5. Add each of the required secrets:

   - Name: `DOCKER_USERNAME`
     Value: Your Docker Hub username

   - Name: `DOCKER_PAT`
     Value: Your Docker Hub Personal Access Token

   - Name: `SERVER_HOST`
     Value: Your server IP or hostname

   - Name: `SERVER_USERNAME`
     Value: Your server SSH username

   - Name: `SERVER_PASSWORD`
     Value: Your server SSH password

## Creating a Docker Hub Personal Access Token

1. Log in to your Docker Hub account
2. Click on your username > "Account Settings" > "Security"
3. Click "New Access Token"
4. Give your token a description (e.g., "GitHub Actions")
5. Select the appropriate permissions (typically "Read & Write")
6. Copy the generated token (you won't be able to see it again)
7. Add this token as the `DOCKER_PAT` secret in GitHub

## Important Security Notes

- NEVER commit secrets directly to your code
- Regularly rotate your tokens and secrets
- Consider using SSH keys instead of passwords for server authentication
- Add `.env` files to your `.gitignore` to prevent accidentally committing environment variables
- Use GitHub's secret scanning to detect accidentally committed secrets 