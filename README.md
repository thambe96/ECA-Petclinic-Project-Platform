# Pet Clinic Infrastructure Platform

## 👤 Student & Project Metadata

- **Student Name**: Oshadha Sankalpa Thambavita
- **Student Number**: 241711043
- **Slack Handle**: Oshadha Thambavita
- **GCP ID**: eca-petclinic-241711043

This repository contains the core platform services for the **Pet Clinic Microservices Architecture**. Built with **Spring Boot 3.4.3**, **Java 23**, and **Spring Cloud 2024.0.0**, this module provides centralized configuration management, service registration/discovery, and API routing for the application.

---

## 🏛 Platform Architecture Overview

```text
                     ┌──────────────────┐
                     │   React Client   │
                     └────────┬─────────┘
                              │ HTTP (Port 8080)
                              ▼
                    ┌───────────────────┐
                    │    API Gateway    │ (Spring Cloud Gateway)
                    └─────────┬─────────┘
                              │ Dynamic Route Resolution
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
   ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
   │ Doctor Service │ │  Pet Service   │ │Appointment Svc │
   └───────┬────────┘ └───────┬────────┘ └───────┬────────┘
           │                  │                  │
           └──────────────────┼──────────────────┘
                              │ Registration & Heartbeats
                              ▼
                    ┌───────────────────┐
                    │ Service Registry  │ (Eureka Server)
                    └───────────────────┘
                              ▲
                              │ Configuration Sync
                    ┌───────────────────┐
                    │   Config Server   │ (Spring Cloud Config)
                    └───────────────────┘
```

---

## 🧩 Core Platform Components

| Component | Tech | Default Port | Description |
| :--- | :--- | :--- | :--- |
| ⚙ **`config-server`** | Spring Cloud Config Server | `8888` | Provides centralized external configuration properties to all microservices and infrastructure components. |
| 🔍 **`service-registry`** | Spring Cloud Netflix Eureka Server | `8761` | Dynamic service discovery server. All domain microservices register here to enable load balancing and routing. |
| 🌐 **`api-gateway`** | Spring Cloud Gateway | `8080` (or `80`) | Single entry point for frontend and client requests. Routes incoming `/api/**` traffic to downstream services registered with Eureka. |

---

## 🛠 Tech Stack & Dependencies

- **Language & JDK**: Java 23
- **Framework**: Spring Boot `3.4.3`
- **Spring Cloud Version**: `2024.0.0`
- **Infrastructure Modules**:
  - `spring-cloud-config-server`
  - `spring-cloud-starter-netflix-eureka-server`
  - `spring-cloud-starter-gateway`

---

## 📁 Directory Structure

```text
platform/
├── pom.xml                     # Parent Maven POM aggregating all platform modules
├── ecosystem.config.js         # PM2 configuration script for orchestration
├── config-server/              # Centralized configuration server
├── service-registry/           # Netflix Eureka discovery server
└── api-gateway/                # Spring Cloud API Gateway
```

---

## 🚀 Building & Startup Order

### Prerequisites
- **JDK 23** installed and configured in `JAVA_HOME`.
- **Apache Maven 3.8+**.

### 1. Build All Infrastructure Services
From the `platform/` root directory:

```bash
mvn clean package -DskipTests
```

This compiles and generates the target executable JAR files:
- `config-server/target/config-server-1.0.0.jar`
- `service-registry/target/service-registry-1.0.0.jar`
- `api-gateway/target/api-gateway-1.0.0.jar`

### 2. Manual Startup Sequence
It is critical to start platform services in the following order:

1. **Config Server** (must start first so others can pull configurations):
   ```bash
   cd config-server && mvn spring-boot:run
   ```
2. **Service Registry**:
   ```bash
   cd service-registry && mvn spring-boot:run
   ```
3. **API Gateway**:
   ```bash
   cd api-gateway && mvn spring-boot:run
   ```

---

## ⚙ PM2 Process Management

For production or single-command local orchestration, `ecosystem.config.js` is provided:

```bash
# Start all platform components using PM2
pm2 start ecosystem.config.js

# Check status of platform services
pm2 status

# View live aggregate logs
pm2 logs
```
