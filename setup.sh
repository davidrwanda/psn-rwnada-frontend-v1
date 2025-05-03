#!/bin/bash

# Setup script for PSN Rwanda Frontend Docker deployment

# Create the Docker network if it doesn't exist
echo "Creating psn-network Docker network..."
docker network create psn-network || echo "Network already exists"

# Start the containers
echo -e "\nStarting containers..."
docker compose -f docker-compose.prod.yml up -d

# Check container status
echo -e "\nChecking container status..."
docker compose -f docker-compose.prod.yml ps

# View container logs
echo -e "\nViewing logs..."
docker compose -f docker-compose.prod.yml logs

# Test if the service is responding
echo -e "\nTesting service (you should see HTTP/1.1 200 OK if successful)..."
curl -I http://localhost:8032 || echo "Service not responding yet, it may need more time to start."

echo -e "\nSetup complete. If the service is not responding, you can check logs with:"
echo "docker compose -f docker-compose.prod.yml logs -f" 