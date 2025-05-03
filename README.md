# PSN Rwanda Frontend

Last deployment trigger: [Timestamp: 2025-05-03 13:30:44]

Professional legal and notary services, property management, leasing, and tax consultancy in Rwanda.

## Docker Setup

This project uses Docker for containerization and simplified deployment.

### Prerequisites

- Docker and Docker Compose installed on your machine
- Git for version control

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/kevlargroup/psn-rwanda-frontend.git
   cd psn-rwanda-frontend
   ```

2. Build and run the container:
   ```bash
   docker-compose up --build
   ```

3. Access the application at http://localhost:8032

### Production Deployment

The application uses GitHub Actions for CI/CD. When changes are pushed to the main branch, the workflow:

1. Builds the Docker image
2. Pushes it to Docker Hub
3. Deploys it to the production server

To manually deploy:

1. Make sure you have the correct access credentials
2. Run:
   ```bash
   docker-compose -f docker-compose.prod.yml pull
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Project Structure

- `/src` - Source code for the React application
- `/public` - Static assets and HTML entry point
- `Dockerfile` - Docker configuration for building the application
- `nginx.conf` - NGINX configuration for serving the application
- `docker-compose.yml` - Configuration for local development
- `docker-compose.prod.yml` - Configuration for production deployment

## Environment Variables

For local development, create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=http://localhost:8082/api/v1
```

For production, these variables should be set in the CI/CD pipeline or directly on the server.

## Features

- **Professional Services Showcase**: Display of various professional services offered by PSN Rwanda.
- **Online Booking System**: Allow users to book services directly through the website.
- **Booking Tracking**: Enable users to track the status of their service requests.
- **Responsive Design**: Mobile-friendly interface that works on all devices.
- **Modern UI**: Clean, professional design that aligns with the PSN Rwanda brand.

## Technology Stack

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: Typed JavaScript for better development experience
- **Tailwind CSS**: A utility-first CSS framework for styling
- **React Router**: For navigation and routing
- **React Icons**: For beautiful icons throughout the application

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/psn-rwanda-frontend.git
   cd psn-rwanda-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:8032`

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── Layout/     # Layout components (Navbar, Footer, etc.)
├── pages/          # Page components for each route
├── services/       # API services for data fetching
├── hooks/          # Custom React hooks
├── contexts/       # React context providers
├── utils/          # Utility functions
└── assets/         # Static assets like images
```

## Pages

- **Home**: Landing page with an overview of PSN Rwanda services
- **Services**: Detailed information about all services offered
- **About**: Company information and history
- **Contact**: Contact information and form
- **Book**: Service booking form
- **Track**: Booking status tracking

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Deployment

The application can be deployed using services like Netlify, Vercel, or AWS Amplify. The build command is:

```bash
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

PSN Rwanda Ltd - [info@psnrwanda.com](mailto:info@psnrwanda.com)

Project Link: [https://github.com/your-username/psn-rwanda-frontend](https://github.com/your-username/psn-rwanda-frontend)

## Continuous Integration and Deployment (CI/CD)

This project uses GitHub Actions for continuous integration and deployment:

1. When code is pushed to the main branch, GitHub Actions automatically:
   - Builds the Docker image
   - Tags it with both `latest` and the commit SHA
   - Pushes it to Docker Hub
   - Deploys it to the production server

2. The workflow is defined in `.github/workflows/deploy-production.yml`

3. The deployment process:
   - Connects to the production server via SSH
   - Pulls the latest code
   - Updates the Docker container using docker-compose
   - Cleans up unused images

4. Environment variables:
   - The API URL is configured during the build process
   - For local development, it uses values from `.env.development`
   - For production, it uses the value specified in the workflow file 