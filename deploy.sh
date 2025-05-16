#!/bin/bash

# Deploy PSN Rwanda Frontend with Docker Compose
set -e

echo "Checking if Docker is running..."
if ! docker info > /dev/null 2>&1; then
  echo "Docker is not running. Please start Docker and try again."
  exit 1
fi

echo "Checking if psn-network exists..."
if ! docker network ls | grep -q psn-network; then
  echo "Creating psn-network..."
  docker network create psn-network
fi

echo "Pulling latest image..."
docker compose -f docker-compose.prod.yml pull

echo "Starting containers..."
docker compose -f docker-compose.prod.yml up -d --force-recreate

echo "Checking container status..."
docker compose -f docker-compose.prod.yml ps

echo "Viewing container logs..."
docker compose -f docker-compose.prod.yml logs

echo "Cleaning up unused images..."
docker image prune -f

echo "Testing service (you should see HTTP/1.1 200 OK if successful)..."
sleep 5 # Give the container a moment to start up
curl -I http://localhost:8032 || echo "Service not responding yet, it may need more time to start."

echo "Deployment complete! Your application should be running at http://localhost:8032"
echo "To view logs in real-time, run: docker compose -f docker-compose.prod.yml logs -f" 