# UniHub

A university marketplace platform built around two products that share one account system, one
authorization model, and one PostgreSQL schema:

- **CardinalCart** — buying and selling items between students.
- **DormDrop** — listing and finding dorm subleases.

Java 21 / Spring Boot REST API, React + TypeScript front end, PostgreSQL, all runnable with a single
`docker compose up`.

---

## Stack

| Layer | Technology |
|---|---|
| API | Java 21, Spring Boot 3.5.4, Spring Security, Spring Data JPA |
| Auth | Stateless JWT (JJWT 0.11.5) + Google OAuth2, email verification tokens |
| Database | PostgreSQL 17 |
| Storage | AWS S3 (listing and sublease images) |
| Front end | React, TypeScript, Vite, Tailwind CSS, React Router, Axios |
| Packaging | Docker Compose (Postgres + API + Nginx-served front end) |

---

## Authorization model

Access is layered in four tiers rather than keyed to roles alone, so the same resource exposes
different surfaces depending on who is asking. The tier is visible in the package structure
(`publicaccess`, `user`, `owneraccess`, `admin`).

| Tier | Who | Example |
|---|---|---|
| **Public** | unauthenticated | browse listings and subleases, sign up, log in |
| **User** | any authenticated account | manage own profile, transact |
| **Owner** | the account that owns the resource | edit or delete *their* listing or sublease |
| **Admin** | `ROLE_ADMIN` | account administration |

Enforcement is split between a `SecurityFilterChain` that decides which paths are public, a
`JwtAuthenticationFilter` that runs ahead of Spring's `UsernamePasswordAuthenticationFilter` to
establish the caller, and a `CurrentAccountProvider` that owner-scoped controllers use to confirm the
caller actually owns the resource they are mutating.

Sessions are `STATELESS` and CSRF protection is disabled deliberately — there is no cookie-based
session to forge, since every authenticated request carries a bearer token.

---

## API surface

33 REST endpoints across 9 controllers:

| Method | Count |
|---|---|
| `GET` | 16 |
| `POST` | 7 |
| `PUT` | 6 |
| `DELETE` | 4 |

Controllers are grouped by access tier rather than by entity, so the authorization boundary is
structural instead of something each handler has to remember:

```
account/publicaccess/auth/login/AuthController
account/publicaccess/auth/signup/PublicAccountController
account/user/UserAccountController
account/admin/AdminAccountController
cardinalcart/listing/publicaccess/PublicListingController
cardinalcart/listing/owneraccess/OwnerListingController
dormdrop/sublease/publicaccess/PublicSubleaseController
dormdrop/sublease/owneraccess/OwnerSubleaseController
verification/VerificationController
```

Public routes are `/api/v1/public/**`, `/api/v2/public/**`, `/api/auth/**`, `/api/v1/verify*`, and
`/oauth2/**`. Everything else requires authentication.

---

## Data model

Six JPA entities over a normalized PostgreSQL schema, each with a corresponding Spring Data
repository so persistence logic is not duplicated across the endpoints that use it:

| Entity | Purpose |
|---|---|
| `Account` | user identity, roles, credentials |
| `Listing` | CardinalCart item listing |
| `Sublease` | DormDrop sublease listing |
| `SubleaseImage` | images belonging to a sublease |
| `Transaction` | record of a completed exchange |
| `VerificationToken` | email verification |

---

## Running locally

Requires Docker and Docker Compose.

```bash
git clone https://github.com/Ryuichi-Yamafuji-Lun/UniHub.git
cd UniHub
cp .env.example .env    # then fill in the values below
docker compose up --build
```

| Service | URL |
|---|---|
| Front end | http://localhost:8081 |
| API | http://localhost:8080 |
| PostgreSQL | localhost:5432 |

### Environment variables

`.env` is git-ignored and is read by all three services. Nothing in this repository contains real
credentials.

**Database**

```
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
```

**Auth**

```
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Image storage**

```
S3_BUCKET_NAME=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

**Email verification**

```
EMAIL_USER=
EMAIL_PASS=
```

**Front end** (consumed at build time as Docker build args)

```
FRONTEND_BASE_URL=
VITE_API_BASE_URL=
VITE_GOOGLE_CLIENT_ID=
```

### Running the pieces directly

```bash
# API
cd backend && ./mvnw spring-boot:run

# Front end
cd frontend && npm install && npm run dev
```

---

## Layout

```
UniHub/
├── backend/                     Spring Boot API
│   └── src/main/java/com/unihub/api/unihub_backend/
│       ├── account/             identity, split by access tier
│       ├── cardinalcart/        item listings
│       ├── dormdrop/            subleases
│       ├── security/            JWT filter, security config, current-account resolution
│       ├── transaction/
│       └── verification/        email verification
├── frontend/                    React + TypeScript + Vite
└── docker-compose.yml
```

---

## Status

A personal full-stack project, not a deployed service. It is public as a code sample — the areas
worth looking at are the tiered authorization model in `security/` and `account/`, and the
repository layer that keeps persistence logic out of the controllers.
