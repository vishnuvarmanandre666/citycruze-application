# CityCruze Repository Structure

## 1. Recommended monorepo

Use pnpm workspaces or npm workspaces. For a growing TypeScript
repository, pnpm is a good default.

``` text
citycruze/
├── apps/
│   ├── customer-web/
│   ├── vendor-portal/
│   ├── admin-portal/
│   └── api/
├── packages/
│   ├── ui/
│   ├── types/
│   ├── validation/
│   ├── eslint-config/
│   └── tsconfig/
├── docs/
├── infrastructure/
│   ├── docker/
│   └── deployment/
├── .env.example
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## 2. Next.js application structure

``` text
apps/customer-web/src/
├── app/
│   ├── (marketing)/
│   ├── cars/
│   ├── booking/
│   ├── account/
│   └── layout.tsx
├── components/
├── features/
│   ├── search/
│   ├── vehicles/
│   ├── booking/
│   └── account/
├── lib/
└── styles/
```

Use similar feature-oriented structures for vendor and admin
applications.

## 3. NestJS API structure

``` text
apps/api/src/
├── main.ts
├── app.module.ts
├── common/
├── config/
├── auth/
├── users/
├── vendors/
├── vehicles/
├── vehicle-documents/
├── availability/
├── pricing/
├── bookings/
├── payments/
├── ledger/
├── settlements/
├── notifications/
├── reviews/
├── admin/
└── audit/
```

Each module may contain: - `*.module.ts` - `*.controller.ts` -
`*.service.ts` - `dto/` - `entities/` or Prisma types - `guards/` where
required - unit tests

## 4. Shared packages

-   `packages/types`: shared API contracts and enums.
-   `packages/validation`: shared schemas where safe and practical.
-   `packages/ui`: reusable design-system components.
-   `packages/config`: shared lint and TypeScript configuration.

Do not share server secrets or privileged backend code with frontend
packages.

## 5. Repository standards

-   Use feature branches.
-   Require pull-request review.
-   Run lint, typecheck and tests in CI.
-   Keep `.env` files out of Git.
-   Commit lockfiles.
-   Document setup and migrations.
-   Use conventional, descriptive commit messages.
