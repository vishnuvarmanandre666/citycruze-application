# CityCruze Decisions and Open Questions

## 1. Current working decisions

  Area               Working decision                Status
  ------------------ ------------------------------- ---------------------
  Brand              CityCruze                       Selected by founder
  Tagline            Every Journey. Your Way.        Proposed
  Business model     Multi-vendor marketplace        Selected
  Rental type        Self-drive only                 Selected
  Initial market     Hyderabad                       Selected
  Expansion          Across India                    Strategic ambition
  Supply model       Onboard existing fleet owners   Selected
  Frontend           Next.js + TypeScript            Proposed
  Backend            NestJS + TypeScript             Proposed
  Database           PostgreSQL + Prisma             Proposed
  Animation          GSAP                            Proposed
  Initial platform   Web-first                       Recommended
  Architecture       Modular monolith / monorepo     Recommended

## 2. Brand and intellectual property

-   Complete Indian trademark search for CityCruze and similar marks.
-   Obtain legal advice on relevant trademark classes.
-   Confirm domain registration and renewal costs.
-   Check social handle availability.
-   Approve final logo artwork.

Domain availability is not trademark clearance.

## 3. Business questions

-   Will CityCruze contract directly with customers, act as an
    intermediary, or use another approved structure?
-   Who is legally the rental operator for each booking?
-   Which vehicle classes will be supported first?
-   What are the pickup and return models?
-   Who handles roadside assistance and claims?
-   What is the customer cancellation policy?
-   How will deposits and damage claims work?
-   What partner response time is operationally realistic?

## 4. Compliance questions

-   Which licences and authorizations are required for CityCruze?
-   Which licences and authorizations are required for each partner?
-   Which vehicle registration and permit categories are eligible?
-   What insurance policy wording is required?
-   Which customer eligibility checks are mandatory?
-   What are the GST and e-commerce operator obligations?
-   Which payment settlement model is permitted and supported?

## 5. Product questions

-   Instant booking or vendor approval?
-   Which payment methods?
-   Is a security deposit required?
-   Are extensions allowed?
-   Are intercity trips allowed?
-   What kilometre limits apply?
-   What is the late-return policy?
-   Will pickup delivery be supported?

## 6. Technical questions

-   Monorepo tool: pnpm or npm workspaces?
-   One Next.js app with role-based areas or separate
    customer/vendor/admin apps?
-   OTP provider?
-   Object storage provider?
-   Payment provider and approved marketplace model?
-   Maps and geocoding provider?
-   Notification providers?
-   Hosting and observability stack?

## 7. Decisions log template

For each decision, record: - Decision ID. - Date. - Context. - Options
considered. - Decision. - Reason. - Owner. - Revisit trigger.

Do not treat proposed assumptions as finalized until the founder and
relevant professional advisers approve them.
