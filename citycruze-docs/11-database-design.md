# CityCruze Database Design

## 1. Database principles

-   PostgreSQL is the source of truth.
-   Use UUID primary keys.
-   Use `Decimal` for money.
-   Store timestamps consistently in UTC; display local time using the
    relevant city timezone.
-   Use foreign keys and unique constraints.
-   Use migrations for schema changes.
-   Keep an audit trail for important state changes.

## 2. Core entities

### User

-   id
-   name
-   email
-   phone
-   passwordHash or external identity reference
-   status
-   createdAt
-   updatedAt

### Vendor

-   id
-   userId
-   legalName
-   businessName
-   businessAddress
-   verificationStatus
-   agreementVersion
-   approvedAt

### Vehicle

-   id
-   vendorId
-   registrationNumber
-   make
-   model
-   variant
-   year
-   transmission
-   fuelType
-   seats
-   dailyPrice
-   status
-   cityId

### VehicleDocument

-   id
-   vehicleId
-   documentType
-   storageKey
-   issueDate
-   expiryDate
-   reviewStatus
-   reviewedBy
-   reviewedAt

### VehicleAvailability

-   id
-   vehicleId
-   startAt
-   endAt
-   status
-   source

### Booking

-   id
-   customerId
-   vendorId
-   vehicleId
-   pickupAt
-   returnAt
-   pickupLocationId
-   returnLocationId
-   rentalAmount
-   feeAmount
-   taxAmount
-   discountAmount
-   totalAmount
-   status
-   policyVersion

### Payment

-   id
-   bookingId
-   provider
-   providerOrderId
-   providerPaymentId
-   amount
-   currency
-   status

### LedgerEntry

-   id
-   bookingId
-   accountType
-   entryType
-   amount
-   currency
-   reference
-   createdAt

### Settlement

-   id
-   vendorId
-   bookingId
-   amount
-   status
-   providerReference
-   processedAt

## 3. Additional tables

-   Role
-   Permission
-   UserRole
-   VendorBankAccount
-   VendorAgreement
-   CustomerVerification
-   VehicleInspection
-   BookingStatusHistory
-   PaymentWebhookEvent
-   Refund
-   CommissionRule
-   Coupon
-   Review
-   SupportTicket
-   Notification
-   AuditLog
-   City
-   Location

## 4. Data constraints

-   Registration number should be unique after normalization.
-   A booking's return time must be after pickup time.
-   Monetary values must be non-negative unless a specific ledger
    adjustment model allows otherwise.
-   Provider transaction references should be unique where applicable.
-   One review per eligible completed booking/customer, according to
    policy.
-   A vehicle cannot have overlapping active holds or bookings.
-   Mandatory document expiry should prevent listing/booking according
    to policy.

## 5. Booking overlap

Do not use a simple frontend check. Protect against concurrent requests
in PostgreSQL.

Possible approach: - Store pickup/return as a timestamp range. - Use an
exclusion constraint for conflicting active intervals, if the schema and
state model permit. - Alternatively use row-level locking and
transactional availability reservation. - Add integration tests that
submit simultaneous overlapping booking requests.

## 6. Privacy and retention

-   Store document object keys, not public URLs.
-   Use private storage and short-lived signed access URLs.
-   Define retention periods with legal advice.
-   Support correction and deletion workflows where required.
-   Avoid storing unnecessary identity data.
