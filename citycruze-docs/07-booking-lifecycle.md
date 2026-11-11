# CityCruze Booking Lifecycle

## 1. Design principles

-   Backend is the source of truth.
-   Booking state changes are explicit and audited.
-   Payment success is confirmed server-side.
-   Inventory conflicts are prevented at database level.
-   State transitions are validated by business rules.
-   Manual overrides require permissions and a reason.

## 2. Suggested booking states

-   DRAFT
-   INVENTORY_HELD
-   PENDING_PAYMENT
-   PAYMENT_PROCESSING
-   PAID
-   PENDING_VENDOR_CONFIRMATION
-   CONFIRMED
-   HANDOVER_READY
-   VEHICLE_HANDED_OVER
-   IN_PROGRESS
-   RETURNED
-   COMPLETED

Exception states: - PAYMENT_FAILED - VENDOR_REJECTED - EXPIRED -
CUSTOMER_CANCELLED - VENDOR_CANCELLED - REFUND_PENDING - REFUNDED -
DISPUTED

## 3. Typical flow

`DRAFT → INVENTORY_HELD → PENDING_PAYMENT → PAID → PENDING_VENDOR_CONFIRMATION → CONFIRMED → VEHICLE_HANDED_OVER → IN_PROGRESS → RETURNED → COMPLETED`

The precise order of payment and vendor confirmation must be selected as
a product policy. If payment is taken before vendor confirmation,
clearly define authorization/capture/refund handling with the payment
provider.

## 4. Inventory hold

-   Hold must have an expiry timestamp.
-   Hold is created atomically with the availability check.
-   Expired holds are released by a background worker.
-   Payment processing must not permit another booking to claim the same
    vehicle/time interval.
-   Use database constraints or transaction-safe locking to prevent
    overlapping confirmed/held intervals.

## 5. Cancellation

Cancellation rules must depend on: - Who cancels. - Time before
pickup. - Whether payment was captured. - Whether the vehicle was handed
over. - Published cancellation terms. - Applicable law and
payment-provider rules.

Store: - Cancellation actor. - Reason. - Timestamp. - Policy version. -
Refund calculation. - Approval and processing status.

## 6. Audit history

Every transition records: - Booking ID. - Previous state. - New state. -
Actor type and ID. - Timestamp. - Reason. - Related payment or support
ticket, if applicable.

## 7. Idempotency

Use idempotency keys for booking creation and payment-related
operations. Repeated requests must not create duplicate bookings,
charges, refunds or settlements.
