# PSN Rwanda CI/CD Workflows

This directory contains GitHub Actions workflows for Continuous Integration and Continuous Deployment of the PSN Rwanda application.

## Frontend CI/CD (`deploy-production.yml`)

This workflow handles the build and deployment process for the frontend application.

### Triggers
- Push to `main` branch (excluding documentation changes)
- Pull requests to `main` branch (excluding documentation changes)
- Manual trigger via workflow_dispatch

### Process
1. **Build Stage**:
   - Checkout the code
   - Set up Node.js 18
   - Install dependencies
   - Build the React application with production environment variables
   - Build a Docker image using `Dockerfile.prod`
   - Push the image to Docker Hub with both `latest` and commit SHA tags

2. **Deploy Stage**:
   - Connect to the production server via SSH
   - Pull the latest code
   - Pull the latest Docker image
   - Update the containers using docker-compose
   - Clean up unused Docker images

### Required Secrets
- `DOCKER_HUB_USERNAME`: Docker Hub username
- `DOCKER_HUB_PAT`: Docker Hub personal access token
- `SERVER_HOST`: Production server hostname or IP
- `SERVER_USERNAME`: Production server SSH username
- `SERVER_PASSWORD`: Production server SSH password

## Notes
- The workflow uses caching to speed up builds
- Documentation changes (markdown files, etc.) don't trigger the workflow
- The frontend is served on port 8032
- The frontend connects to the backend API on port 8082 