#### Student Name: Oshadha Sankalpa Thambavita
#### Student Number: 241711043
#### Slack Handle: Oshadha Thambavita
#### GCP Project ID: project-84bf5412-62ae-4b65-919

# Capstone Project — Platform Components

This repository manages the **platform components** of the Capstone Project. It serves as the parent repository for the infrastructure-level services required to support and connect the project's microservices.

The platform consists of the following independently managed repositories:

* **API Gateway** — Provides a single entry point for client requests and routes traffic to the appropriate microservices.
* **Config Server** — Centralizes and provides configuration properties to the microservices.
* **Service Registry** — Maintains information about the microservices registered within the platform network and enables service discovery.

Each of these components is maintained in its own Git repository and included in this repository as a **Git submodule**.

---


## Repository Structure

The platform components are included as Git submodules:

```text
platform/
├── api-gateway/
├── config-server/
├── service-registry/
├── pom.xml
├── ecosystem.config.js
└── README.md

```

Each directory represents a separate Git repository managed independently from this parent repository.

### Git Submodules

The repositories are added as submodules so that each platform component can be:

* Developed and versioned independently.
* Maintained in its own repository.
* Updated without duplicating source code.
* Pulled together through the parent platform repository.
* Easily deployed as part of the overall platform infrastructure.

The parent repository tracks the specific commit of each submodule, ensuring that a deployment can use known versions of each platform component.

---

## Platform Components

### API Gateway

The **API Gateway** acts as the entry point for requests coming from clients.

Its primary responsibilities include:

* Receiving client requests.
* Routing requests to the appropriate microservices.
* Providing a centralized entry point to the backend services.
* Integrating with the service discovery mechanism.
* Supporting scalable deployments through a configured load balancer.

Multiple API Gateway instances can be deployed behind a load balancer to distribute incoming traffic across available instances.

---

### Config Server

The **Config Server** provides centralized configuration management for the microservices.

Instead of maintaining configuration independently within every microservice, services can retrieve their configuration from the Config Server.

This provides:

* Centralized configuration management.
* Consistent configuration across services.
* Easier configuration updates.
* Reduced duplication of configuration files.
* Simplified deployment and environment management.

The Config Server is also deployed with a configured load balancer so that multiple instances can serve configuration requests when required.

---

### Service Registry

The **Service Registry** is responsible for service discovery within the platform.

Microservices register themselves with the Service Registry, allowing other services and platform components to discover available service instances dynamically.

The registry maintains information such as:

* Registered microservices.
* Available service instances.
* Network locations of service instances.
* Service availability within the platform network.

The platform is deployed using an **instance group**, allowing multiple instances of platform services to operate within the network. Service Registry instances can therefore communicate with each other and maintain service registration information across the platform.

This allows microservices to discover services dynamically rather than relying on hard-coded hostnames or IP addresses.

---

## Deployment Architecture

The platform is designed to simplify deployment of the Capstone Project to a cloud virtual machine environment.

Instead of separately cloning and managing every platform repository, the parent repository contains references to the required platform components through Git submodules.

A deployment can therefore follow this general process:




This structure makes it easier to clone the complete platform onto a cloud virtual machine while keeping each component independently versioned and maintained.

---

## Load Balancing

Load balancers are configured for the **API Gateway** and **Config Server** components.

This allows requests to be distributed across multiple running instances.

The general architecture is:



Load balancing improves the scalability and availability of the platform components by preventing all requests from being handled by a single instance.

---

## Service-to-Service Communication

The microservices use the platform components for configuration and service discovery.

A simplified flow is:


When a microservice starts:

1. It retrieves its configuration from the **Config Server**.
2. It registers itself with the **Service Registry**.
3. Other services can discover its available instances through the registry.
4. Requests can be routed through the **API Gateway**.
5. Load balancers distribute traffic across available platform instances.

---

## Cloning the Repository

Because this repository contains Git submodules, the submodules should be initialized when cloning the repository.

Use:

```bash
git clone --recurse-submodules <repository-url>
```

If the repository has already been cloned without initializing the submodules, run:

```bash
git submodule init
git submodule update
```

Alternatively, the submodules can be initialized and updated with:

```bash
git submodule update --init --recursive
```

---

## Updating Submodules

Each platform component is maintained in its own repository.

To update the submodules to their latest referenced commits:

```bash
git submodule update --remote
```

After updating a submodule, the parent repository will detect the change in the submodule reference.

Commit the updated reference in the parent repository:

```bash
git add .
git commit -m "Update platform submodules"
git push
```

---

## Benefits of This Structure

Using a parent repository with Git submodules provides several benefits:

* **Independent development** — Each platform component has its own repository and development lifecycle.
* **Version control** — The parent repository tracks the exact version of each component.
* **Simplified deployment** — The complete platform can be pulled onto a cloud virtual machine from a single parent repository.
* **Centralized platform management** — Platform components can be managed together while remaining independently maintained.
* **Scalability** — Load balancing and instance groups allow platform services to run across multiple instances.
* **Service discovery** — Microservices can dynamically discover one another through the Service Registry.
* **Centralized configuration** — Microservices retrieve their configuration from the Config Server.

---

## Technologies

The platform architecture is based on technologies and infrastructure such as:

* Git
* GitHub
* Git Submodules
* API Gateway
* Config Server
* Service Registry
* Load Balancing
* Cloud Virtual Machines
* Instance Groups
* Microservices Architecture
* PM2
* SDK man
* Maven


---

## Related Repositories

The platform consists of the following independently managed repositories:

* `api-gateway`
* `config-server`
* `service-registry`

These repositories are included in this repository as Git submodules.

---

## Purpose

The primary purpose of this repository is to provide a **single platform-level entry point** for managing and deploying the infrastructure components required by the Capstone Project.

By combining independently maintained platform repositories through Git submodules, the platform can be versioned, cloned, configured, and deployed more efficiently in a cloud environment while maintaining separation between individual components.
