# CityCruze Notifications and Webhooks

## 1. Notification channels

Potential channels: - Email. - SMS. - WhatsApp, subject to consent,
templates and provider rules. - In-app notifications.

Use notifications for operationally important events, not every internal
state change.

## 2. Event catalogue

  Event                     Recipient         Action
  ------------------------- ----------------- --------------------
  Vendor submitted          Admin             Review alert
  Vendor approved           Vendor            Activation notice
  Vehicle submitted         Reviewer          Review task
  Document expiring         Vendor/admin      Renewal reminder
  Booking request created   Vendor            Booking request
  Booking confirmed         Customer/vendor   Confirmation
  Pickup approaching        Customer/vendor   Reminder
  Return approaching        Customer/vendor   Reminder
  Payment failed            Customer          Retry/help message
  Refund processed          Customer          Refund update
  Settlement processed      Vendor            Settlement notice

## 3. Event architecture

Use an outbox pattern: 1. Business transaction writes state change and
outbox event in one database transaction. 2. Background worker reads
pending events. 3. Notification provider is called. 4. Delivery attempt
and provider reference are recorded. 5. Retry transient failures with
backoff. 6. Dead-letter repeated failures for review.

## 4. Payment webhooks

-   Verify provider signature using raw request body as required by
    provider.
-   Validate timestamp/replay protections where available.
-   Store event ID and payload securely.
-   Deduplicate provider event IDs.
-   Process state changes idempotently.
-   Return appropriate response quickly.
-   Perform longer work asynchronously.
-   Reconcile with provider reports.

## 5. Notification controls

-   Respect user preferences and consent.
-   Use approved message templates where required.
-   Avoid exposing sensitive identity or payment details.
-   Include support contact and booking reference.
-   Do not state a booking is confirmed until backend rules say it is
    confirmed.
