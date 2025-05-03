#!/bin/bash

# Helpful commands for managing the PSN Rwanda Frontend Docker deployment

# Start the containers
echo "Starting containers..."
docker compose -f docker-compose.prod.yml up -d

# Check container status
echo -e "\nChecking container status..."
docker compose -f docker-compose.prod.yml ps

# View container logs
echo -e "\nViewing logs (press Ctrl+C to exit)..."
docker compose -f docker-compose.prod.yml logs -f

# Additional commands (commented out by default)

# Restart the containers
# docker compose -f docker-compose.prod.yml restart

# Stop the containers
# docker compose -f docker-compose.prod.yml down

# Check if the port is open and service is responding
# curl -I http://localhost:8032 