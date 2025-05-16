# Setting Up GitHub Secrets for CI/CD

This guide will help you set up the necessary secrets for the GitHub Actions CI/CD workflow.

## Required Secrets

You need to configure the following secrets in your GitHub repository:

### Docker Hub Credentials
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PAT`: Your Docker Hub Personal Access Token (not your password)

### Server Credentials
- `SERVER_HOST`: Your server's IP address or hostname
- `SERVER_USERNAME`: SSH username to access your server
- `SERVER_PASSWORD`: SSH password to access your server

## How to Add Secrets to Your Repository

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click on **Secrets and variables** → **Actions**
4. Click on the **New repository secret** button
5. Add each of the secrets mentioned above, one by one

## Testing Your SSH Connection

Before running the workflow, test your SSH connection to make sure your credentials work:

```bash
ssh username@your-server-ip
```

If you're able to connect, the GitHub Actions workflow should also be able to connect.

## Important Security Notes

- Never commit your actual secrets to any files in the repository
- Regularly rotate your Docker Hub PAT and server credentials
- Consider using SSH keys instead of passwords for more secure server access
- Use the least privileged account necessary for deploying your application

## Troubleshooting SSH Connection Issues

If the GitHub Actions workflow cannot connect to your server, try these steps:

1. Verify your server allows password authentication (check `/etc/ssh/sshd_config`)
2. Ensure your server's firewall allows SSH connections
3. Check that the provided username and password are correct
4. Try connecting from another machine to confirm SSH is working properly

By following these steps, you should have your GitHub Actions CI/CD pipeline successfully connecting to your server. 