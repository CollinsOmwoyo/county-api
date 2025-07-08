<div align="center">
<h1 align="center">Unified County Services API (UCS-API)</h1>
<p align="center">
A modular, API-first backend system designed to help Kenyan counties digitize public service delivery.
<br />
<a href="https://www.google.com/search?q=http://localhost:3000/api"><strong>Explore the API Docs »</strong></a>
<br />
<br />
<a href="https://github.com/[YOUR_GITHUB_USERNAME]/county-api/issues">Report Bug</a>
·
<a href="https://www.google.com/search?q=https://github.com/%5BYOUR_GITHUB_USERNAME%5D/county-api/issues">Request Feature</a>
</p>
</div>

About The Project
The Unified County Services API (UCS-API) is a robust, scalable, and secure backend solution designed to serve as the digital backbone for public service delivery in Kenya. It provides a comprehensive suite of APIs that handle the common, complex infrastructure required for digital services, allowing county development teams to focus on building excellent citizen-facing web and mobile applications.

Conceived as a white-label, multi-tenant-ready system, UCS-API aims to reduce redundant development efforts across counties, lower the barrier to digitization, and promote a standardized, efficient approach to e-governance.

Built With
This project leverages a modern, scalable, and type-safe technology stack:

NestJS: A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

TypeScript: For strong typing and improved developer experience.

PostgreSQL: A powerful, open-source object-relational database system.

TypeORM: An ORM that can run in NodeJS and can be used with TypeScript.

Docker: For containerization and consistent development/production environments.

Redis & BullMQ: For high-performance caching and robust background job processing.

Passport.js: For flexible and modular authentication.

Swagger (OpenAPI): For generating beautiful and interactive API documentation.

Key Features
Feature

Description

Status

Authentication & RBAC

Secure JWT-based auth with roles for Citizen, Officer, and Admin.

✅ Complete

User Registry

Full CRUD operations for managing citizen and staff profiles.

✅ Complete

Service Catalog

Admins can dynamically create and manage all offered county services.

✅ Complete

Request Management

End-to-end workflow for submitting, tracking, and processing service requests.

✅ Complete

Audit Trails

Automatic logging of critical actions for compliance and accountability.

✅ Complete

Secure File Uploads

Integration with Cloudinary for handling sensitive document uploads.

✅ Complete

Payment Gateway

Integration with Safaricom Daraja API for M-Pesa STK Push payments.

⏳ In Progress

Notification Engine

Foundation for SMS/Email notifications via a message queue.

⏳ In Progress

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Ensure you have the following installed on your local machine:

Node.js (v18 or later)

Docker and Docker Compose

npm or yarn

Installation
Clone the repository:

git clone https://github.com/[YOUR_GITHUB_USERNAME]/county-api.git
cd county-api

Install NPM packages:

npm install

Configure Environment Variables:
Create a .env file by copying the example and filling in your credentials.

cp .env.example .env

See the .env.example file for a full list of required variables.

Launch Docker Containers:
This command starts the PostgreSQL database and Redis cache in the background.

docker-compose up -d

Usage
Once the setup is complete, you can run the application.

Run in Development Mode:

npm run start:dev

The server will start with hot-reloading enabled at http://localhost:3000.

Run in Production Mode:

npm run build
npm run start:prod

API Reference
The complete, interactive API documentation is automatically generated and available at the /api endpoint.

Navigate to http://localhost:3001/api to explore all available endpoints.

Roadmap
The project is currently in Phase 3: Integrations.

[x] Phase 1: Foundation

[x] Project Scaffolding & Docker Setup

[x] User Module & Database Schema

[x] JWT Authentication & Role-Based Access Control (RBAC)

[x] Phase 2: Core Service Delivery

[x] Service Catalog Management

[x] Request Management Workflow

[x] Audit Trail Implementation

[ ] Phase 3: Integrations

[x] Secure Document Uploads (Cloudinary)

[ ] M-Pesa Payment Gateway (Safaricom Daraja)

[ ] Background Job Queues (Redis & BullMQ)

[ ] Phase 4: Polish & Deployment

[ ] Analytics & Reporting Endpoints

[ ] CI/CD Pipeline with GitHub Actions

[ ] Deployment to a Cloud Provider (e.g., Railway, Render)

See the open issues for a full list of proposed features (and known issues).

Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

License
Distributed under the MIT License. See LICENSE.txt for more information.

Contact
Collins Omwoyo - collinsomwoyo@gmail.com

Project Link: https://github.com/collinsomwoyo/county-api
