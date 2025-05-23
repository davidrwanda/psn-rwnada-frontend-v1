# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy all files
COPY . .

# Set environment to production
ENV NODE_ENV=production
ENV REACT_APP_API_URL=${REACT_APP_API_URL:-https://backend.psnrwanda.com/api/v1}

# Build the app
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f https://backend.psnrwanda.com/ || exit 1

# Expose port 8032
EXPOSE 8032

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 