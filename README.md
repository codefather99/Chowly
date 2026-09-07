# Chowly

An in-restaurant ordering platform: customers browse a menu, place an order, and pay on the spot; waiters pick up incoming orders, assign staff, and mark them served. Built for the TeSA Africa Software Architecture assignment — BUILD phase.

**Live app:** https://chowly-rho.vercel.app
**Live API:** https://chowly-app-qz6s.onrender.com

---

## Stack

| | |
|---|---|
| **Backend** | Java 21 · Spring Boot 4 · Spring Data JPA / Hibernate · PostgreSQL · Maven |
| **Frontend** | React 19 (Vite) · React Router · Tailwind CSS · Axios |
| **Deployment** | Backend: Docker image on Render, with a managed Render PostgreSQL instance · Frontend: static build on Vercel |

The two are independently deployed and talk to each other over HTTPS — the frontend has no server of its own, and the backend serves JSON only.

---

## Repository structure

```
Chowly/
├── src/main/java/com/example/chowly/   # Spring Boot backend
│   ├── controller/                     # REST controllers, one per resource
│   ├── service/ + service/impl/        # business logic
│   ├── repository/                     # Spring Data JPA repositories
│   ├── entity/                         # JPA entities
│   ├── dto/request/ + dto/response/    # API contract, separate from persistence
│   ├── enums/                          # OrderStatus, PaymentMethod, StaffRole, etc.
│   ├── config/CorsConfig.java          # global CORS policy
│   └── exception/                      # global exception handling
├── src/main/resources/
│   └── application.properties          # datasource config, all via env vars
├── Dockerfile                          # two-stage build: Maven → JRE runtime
├── chowly-frontend2/                   # React frontend (deployed to Vercel)
│   ├── src/api/                        # one Axios wrapper per backend resource
│   ├── src/pages/                      # one component per route
│   ├── src/components/                 # shared UI + modals
│   ├── src/context/CartContext.jsx     # cart state (persisted to localStorage)
│   ├── src/session.js                  # stands in for auth (no login endpoint exists)
│   └── src/role.js                     # customer/waiter mode switch
└── README.md
```

---

## Features

- **Menu browsing** — restaurants, menus, and menu items loaded from the database.
- **Order placement** — a customer builds a cart, checks out, and is shown the order's details and waiting time.
- **Order assignment** — a waiter opens an incoming order, assigns a staff member from the restaurant's staff list, and marks it served.
- **Complaint & rating** — a customer can file a complaint or leave a 1–5 rating against any order.
- **Payment** — a clearly-labelled *pretend* payment is recorded against the order (no real money moves, by design).
- **Two roles, no login** — a pill switch in the navbar toggles the whole UI between customer and waiter mode.
- **Real persistence** — every entity is a PostgreSQL table; refreshing the page never loses data.

---

## Data model

| Entity | Purpose |
|---|---|
| `Restaurant` | id, name, location |
| `Customer` | id, first/last name, phone — created on first checkout, no login |
| `Menu` / `MenuItem` | a restaurant's menus (FOOD/DRINKS) and their items |
| `Order` / `OrderItem` | a placed order and its line items |
| `Staff` | chef / waiter / bartender, tied to a restaurant |
| `OrderAssignment` | links **one** staff member to an order (see note below) |
| `Payment` | a recorded pretend payment against an order |
| `Rating` / `CustomerComplaint` | customer feedback against an order |
| `WaitingTime` | estimated/actual prep time for an order |

**Note on a model deviation:** `OrderAssignment.order_id` is unique, so an order can only be linked to one staff member — not a separate chef and bartender at once, as originally planned. The waiter UI was built around this real constraint rather than the original spec. Full rationale is in the project's deliverable document.

---

## Running locally

### Backend
```bash
# requires a local PostgreSQL instance
export SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:5432/<db>
export SPRING_DATASOURCE_USERNAME=<user>
export SPRING_DATASOURCE_PASSWORD=<password>
./mvnw spring-boot:run
```
Runs on `http://localhost:8080`, API under `/api/**`.

### Frontend
```bash
cd chowly-frontend2
npm install
# .env
echo "VITE_API_BASE_URL=http://localhost:8080/api" > .env
npm run dev
```
Runs on `http://localhost:5173`.

---

## Environment variables

**Backend (Render):** `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` — injected via the platform, never hardcoded in `application.properties`.

**Frontend (Vercel):** `VITE_API_BASE_URL` — set to the deployed backend's `/api` base URL at build time.

---

## Deployment

- **Backend:** Docker image (`Dockerfile` at repo root) pushed and deployed as a Render web service, backed by a managed Render PostgreSQL database. `spring.jpa.hibernate.ddl-auto=update` creates/updates the schema on startup.
- **Frontend:** static Vite build deployed to Vercel directly from this repo's `chowly-frontend2` subdirectory.

---

## AI usage

This project was built with Claude (Anthropic) as an active collaborator — frontend scaffolding, wiring the API layer to the real backend DTOs, deployment troubleshooting on Render/Docker, and this documentation were all done in collaboration with it. Full detail on what was asked, accepted, and corrected is in the project's deliverable document.
