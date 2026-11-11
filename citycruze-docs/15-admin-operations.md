# CityCruze Admin and Operations Console

## 1. Purpose

The admin console is the internal control plane for the marketplace. It
should make operational status visible while enforcing role separation
and auditability.

## 2. Dashboard

Show: - Bookings today and upcoming. - Pending vendor approvals. -
Vehicles pending review. - Document expiry alerts. - Payment failures. -
Refunds awaiting action. - Settlements awaiting reconciliation. - Open
customer incidents. - GMV and commission summaries.

## 3. Main modules

### Vendors

-   Review applications.
-   Verify required documents.
-   Approve, reject or suspend.
-   View performance and agreement status.

### Vehicles

-   Review vehicle submissions.
-   Verify eligibility evidence.
-   Approve, reject or suspend.
-   Track document expiry.
-   View inspection history.

### Bookings

-   Search and filter.
-   View state history.
-   Handle exceptions.
-   Record authorized changes with reason.

### Payments and settlements

-   View payment transactions.
-   Reconcile provider references.
-   Review refunds.
-   Approve settlements under maker-checker rules.
-   Export finance reports.

### Support and disputes

-   Create and assign tickets.
-   Record customer/vendor communication.
-   Attach relevant evidence with access controls.
-   Track resolution and outcome.

## 4. Role permissions

  Role               Typical permissions
  ------------------ ----------------------------------------------------
  Super admin        System configuration and access administration
  Operations         Booking and fulfilment exceptions
  Vendor reviewer    Vendor application review
  Vehicle reviewer   Vehicle and document review
  Finance            Payment, refund and settlement workflows
  Support            Customer support with limited personal-data access

## 5. Audit requirements

Record: - Actor. - Action. - Resource. - Before/after values for
important changes. - Reason. - Timestamp. - Request/correlation ID.

Never allow privileged users to erase audit history through the normal
application.
