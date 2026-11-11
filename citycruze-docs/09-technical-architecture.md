# CityCruze Technical Architecture

## 1. Architecture recommendation

Start with a modular monolith in a monorepo. This is simpler to build
and operate than microservices for an early marketplace, while
preserving clear module boundaries.

## 2. Proposed stack

  Layer             Technology
  ----------------- ----------------------------------------------
  Customer web      Next.js + TypeScript
  Vendor portal     Next.js + TypeScript
  Admin portal      Next.js + TypeScript
  API               NestJS + TypeScript
  Database          PostgreSQL
  ORM               Prisma
  Cache/queue       Redis
  Background jobs   BullMQ or equivalent
  Animations        GSAP and ScrollTrigger
  UI styling        Tailwind CSS
  File storage      Private object storage
  Payments          Approved payment provider
  Monitoring        Centralized logs, metrics and error tracking

## 3. High-level architecture

``` mermaid
flowchart TD
    C[Customer Next.js] --> API[NestJS API]
    V[Vendor Next.js] --> API
    A[Admin Next.js] --> API
    API --> AUTH[Auth and RBAC]
    API --> VEH[Vehicle and Vendor Modules]
    API --> BOOK[Availability and Booking]
    API --> PAY[Payment and Ledger]
    API --> DOC[Document Management]
    API --> NOTIFY[Notifications]
    AUTH --> DB[(PostgreSQL)]
    VEH --> DB
    BOOK --> DB
    PAY --> DB
    DOC --> DB
    API --> REDIS[(Redis / Jobs)]
    API --> STORE[Private Object Storage]
    API --> PSP[Payment Provider]
    API --> MSG[SMS / Email / WhatsApp]
```

## 4. Backend module boundaries

-   AuthModule
-   UsersModule
-   VendorsModule
-   VehiclesModule
-   VehicleDocumentsModule
-   AvailabilityModule
-   PricingModule
-   BookingsModule
-   PaymentsModule
-   LedgerModule
-   SettlementsModule
-   ReviewsModule
-   NotificationsModule
-   AdminModule
-   AuditModule

Each module should own its business rules and expose services through
explicit interfaces.

## 5. Important cross-cutting services

-   Authentication and role/permission checks.
-   Request validation.
-   Idempotency.
-   Audit logging.
-   Rate limiting.
-   File upload validation.
-   Webhook signature verification.
-   Background job processing.
-   Centralized exception handling.
-   Structured logs and correlation IDs.

## 6. Availability and concurrency

Availability must be checked and reserved in a database transaction. A
frontend availability result is advisory only.

Use an appropriate overlap-prevention strategy, such as PostgreSQL
range/exclusion constraints where suitable, or transaction-safe locking
and constraints. Test concurrent booking attempts.

## 7. Environments

Maintain separate: - Local development. - Automated test. - Staging. -
Production.

Use separate databases, storage buckets, payment credentials and webhook
endpoints for each environment.

## 8. Scalability path

First scale the modular monolith vertically and optimize database
queries. Introduce separate services only when there is a measurable
operational or scaling reason, such as notifications, search or payment
reconciliation volume.
