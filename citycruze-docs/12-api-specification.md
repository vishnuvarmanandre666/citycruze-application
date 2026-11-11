# CityCruze API Specification

## 1. API conventions

-   Base path: `/api/v1`
-   Format: JSON
-   Authentication: secure session or bearer-token strategy selected
    during implementation.
-   Validate all inputs on the server.
-   Use pagination for collection endpoints.
-   Return consistent error structures.
-   Apply role and permission checks.
-   Publish an OpenAPI/Swagger specification.

## 2. Authentication

  Method   Endpoint             Purpose
  -------- -------------------- -----------------------
  POST     `/auth/send-otp`     Request OTP
  POST     `/auth/verify-otp`   Verify OTP
  POST     `/auth/refresh`      Refresh session/token
  POST     `/auth/logout`       End session

OTP rate limits, expiry, replay protection and abuse controls are
required.

## 3. Vendor endpoints

  Method   Endpoint                  Purpose
  -------- ------------------------- --------------------------------------
  POST     `/vendors`                Submit vendor registration
  GET      `/vendors/me`             Get own vendor profile
  PATCH    `/vendors/me`             Update permitted profile fields
  POST     `/vendors/me/documents`   Upload vendor documents
  GET      `/vendors/me/vehicles`    List own vehicles
  GET      `/vendors/me/bookings`    List partner bookings
  GET      `/vendors/me/earnings`    View earnings and settlement summary

## 4. Vehicle endpoints

  Method   Endpoint                       Purpose
  -------- ------------------------------ --------------------------
  GET      `/vehicles`                    Search approved vehicles
  GET      `/vehicles/:id`                Vehicle details
  POST     `/vehicles`                    Submit vehicle
  PATCH    `/vehicles/:id`                Update own vehicle
  POST     `/vehicles/:id/documents`      Submit vehicle documents
  GET      `/vehicles/:id/availability`   Check availability

Public search must return only approved, publishable listings and must
not expose private vendor documents.

## 5. Booking endpoints

  Method   Endpoint                    Purpose
  -------- --------------------------- --------------------------
  POST     `/bookings/quote`           Calculate quote
  POST     `/bookings`                 Create booking/hold
  GET      `/bookings/:id`             Get authorized booking
  GET      `/bookings/me`              Customer booking history
  POST     `/bookings/:id/cancel`      Request cancellation
  POST     `/bookings/:id/extension`   Request extension
  POST     `/bookings/:id/handover`    Record handover
  POST     `/bookings/:id/return`      Record return

## 6. Vendor booking actions

  Method   Endpoint                          Purpose
  -------- --------------------------------- ------------------------
  POST     `/vendor/bookings/:id/accept`     Accept request
  POST     `/vendor/bookings/:id/reject`     Reject request
  POST     `/vendor/bookings/:id/handover`   Submit handover record
  POST     `/vendor/bookings/:id/return`     Submit return record

## 7. Payments

  Method   Endpoint                         Purpose
  -------- -------------------------------- -------------------------------
  POST     `/payments/orders`               Create provider order
  GET      `/payments/:id`                  Get authorized payment status
  POST     `/webhooks/payments/:provider`   Receive provider event
  POST     `/admin/refunds`                 Authorized refund initiation

Webhook routes must verify signatures and be idempotent.

## 8. Admin endpoints

-   `GET /admin/dashboard`
-   `GET /admin/vendors`
-   `POST /admin/vendors/:id/approve`
-   `POST /admin/vendors/:id/reject`
-   `GET /admin/vehicles`
-   `POST /admin/vehicles/:id/approve`
-   `POST /admin/vehicles/:id/suspend`
-   `GET /admin/bookings`
-   `GET /admin/settlements`
-   `GET /admin/audit-logs`

## 9. Error format

Example:

``` json
{
  "statusCode": 409,
  "code": "VEHICLE_NOT_AVAILABLE",
  "message": "The selected vehicle is no longer available.",
  "requestId": "request-id"
}
```

Do not expose stack traces, secrets, internal database errors or
sensitive personal data.

## 10. API safeguards

-   DTO/schema validation.
-   Authorization on every private resource.
-   Object-level access checks.
-   Rate limits.
-   Idempotency for booking/payment actions.
-   Audit logs for privileged operations.
-   OpenAPI documentation.
-   Automated contract and integration tests.
