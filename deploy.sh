#!/bin/bash

# Deploy PSN Rwanda Frontend with Docker Compose

echo "Pulling latest image..."
docker compose -f docker-compose.prod.yml pull

echo -e "\nStarting containers..."
docker compose -f docker-compose.prod.yml up -d

echo -e "\nChecking container status..."
docker compose -f docker-compose.prod.yml ps

echo -e "\nViewing container logs..."
docker compose -f docker-compose.prod.yml logs

echo -e "\nTesting service (you should see HTTP/1.1 200 OK if successful)..."
curl -I http://localhost:8032 || echo "Service not responding yet, it may need more time to start."

echo -e "\nDeployment complete! Your application should be running at http://localhost:8032"
echo "To view logs in real-time, run: docker compose -f docker-compose.prod.yml logs -f" 