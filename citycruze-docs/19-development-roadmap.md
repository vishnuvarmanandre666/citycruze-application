# CityCruze Development Roadmap

## Guiding principle

Build a safe, operationally complete web MVP before adding mobile
applications or advanced marketplace features.

## Phase 0 --- Product and compliance discovery

Deliverables: - Approved product requirements. - Legal and insurance
assessment. - Payment-provider suitability assessment. - Vendor
agreement and customer policy requirements. - Brand/trademark clearance
workstream.

Exit criteria: - Written decisions on the operating model and launch
eligibility.

## Phase 1 --- Engineering foundation

Deliverables: - Monorepo. - Next.js customer application. - Next.js
vendor portal. - Next.js admin portal. - NestJS API. - PostgreSQL and
Prisma. - CI, linting, type checking and tests. - Authentication and
role-based access.

## Phase 2 --- Supply management

Deliverables: - Vendor registration. - Vendor verification queue. -
Vehicle submission. - Document storage and review. - Vehicle approval
and suspension. - Vendor agreement acceptance.

## Phase 3 --- Discovery and availability

Deliverables: - Vehicle search. - Filters and vehicle detail pages. -
Pricing quote. - Availability calendar. - Atomic inventory hold. -
Concurrency tests.

## Phase 4 --- Booking operations

Deliverables: - Booking lifecycle. - Vendor accept/reject. - Customer
booking dashboard. - Handover and return records. - Cancellation
workflow. - Notifications and audit history.

## Phase 5 --- Payments and finance

Deliverables: - Payment provider sandbox integration. - Signed webhook
processing. - Idempotent payment updates. - Refund workflow. - Ledger. -
Settlement reconciliation. - Finance permissions.

## Phase 6 --- Launch readiness

Deliverables: - Security testing. - Privacy review. - Load and
concurrency tests. - Backup and restore test. - Operational runbooks. -
Legal/insurance/tax sign-off. - Production monitoring.

## Phase 7 --- Growth

Potential features: - Native mobile applications. - Multi-city
support. - Corporate accounts. - Referral and loyalty programme. -
Advanced pricing. - Partner analytics. - Search optimization.

## Definition of done

A feature is not complete merely because the UI works. It must
include: - Server-side validation. - Authorization. - Error handling. -
Tests. - Audit requirements where relevant. - Accessibility and
responsive behaviour. - Documentation. - Monitoring for critical
workflows.
