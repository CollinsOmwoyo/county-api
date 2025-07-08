
# 🌍 Unified County Services API (UCS-API)

> A modular, API-first backend designed to digitize public service delivery across Kenyan counties.

[📘 Explore API Docs](http://localhost:3001/api) • [🐞 Report Bug](https://github.com/collinsomwoyo/county-api/issues) • [✨ Request Feature](https://github.com/collinsomwoyo/county-api/issues)

---

## 🧩 About The Project

The UCS-API serves as the digital backbone for public service delivery in Kenya. It provides a scalable suite of backend APIs to accelerate digitization across counties.

**Key goals:**

- 💼 Reduce redundant development work across counties  
- 🏛 Promote standardized, efficient e-governance  
- ⚙️ Provide infrastructure for secure and scalable public services  

---

## ⚒ Built With

- **NestJS** – Scalable Node.js framework  
- **TypeScript** – Type-safe development  
- **PostgreSQL** – Relational database  
- **TypeORM** – Object-relational mapper  
- **Docker** – Containerization  
- **Redis & BullMQ** – Queued background jobs  
- **Passport.js** – Authentication strategies  
- **Swagger (OpenAPI)** – Beautiful auto-generated API docs  

---

## 🎯 Key Features

| ✅ Feature                | 📋 Description                                                      |
|--------------------------|---------------------------------------------------------------------|
| Authentication & RBAC    | Secure login system with roles (Citizen, Officer, Admin)           |
| User Registry            | Full CRUD for citizen/staff accounts                               |
| Service Catalog          | Dynamic creation of county services                                |
| Request Management       | Submit, track, and process service requests                        |
| Audit Trails             | Critical action logging for compliance                             |
| Secure File Uploads      | Document upload via Cloudinary                                     |
| Payment Gateway          | M-Pesa STK Push integration via Daraja API *(In Progress)*         |
| Notification Engine      | SMS/Email queuing framework *(In Progress)*                        |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have:

- Node.js `v18+`  
- Docker & Docker Compose  
- npm or yarn

### Installation

```bash
git clone https://github.com/collinsomwoyo/county-api.git
cd county-api
npm install
cp .env.example .env
```

Edit your `.env` file with your credentials.

### Start Services

```bash
docker-compose up -d
```

---

## 🧪 Running the App

### Development

```bash
npm run start:dev
```

Server runs on `http://localhost:3001`.

### Production

```bash
npm run build
npm run start:prod
```

---

## 📖 API Reference

Explore the Swagger documentation at:  
**<http://localhost:3001/api>**

---

## 🛣 Roadmap

✅ **Phase 1: Foundation**  

- Project scaffolding, Docker setup, JWT auth  

✅ **Phase 2: Core Services**  

- Service catalog, request workflow, audit logs  

⏳ **Phase 3: Integrations**  

- Secure uploads, M-Pesa payments, job queues  

🔜 **Phase 4: Polish & Deployment**  

- Analytics, CI/CD, cloud deployment

---

## 🤝 Contributing

I welcome contributions!

```bash
# Fork the repo
git checkout -b feature/AmazingFeature
git commit -m 'Add AmazingFeature'
git push origin feature/AmazingFeature
```

Then open a Pull Request.  
⭐ Don’t forget to star the repo if you like the project!

---

## 📄 License

Distributed under the **MIT License**.  
See `LICENSE.txt` for details.

---

## 📬 Contact

**Collins Omwoyo** — [collinsomwoyo@gmail.com](mailto:collinsomwoyo@gmail.com)  
GitHub: [https://github.com/collinsomwoyo/county-api](https://github.com/collinsomwoyo/county-api)

```

