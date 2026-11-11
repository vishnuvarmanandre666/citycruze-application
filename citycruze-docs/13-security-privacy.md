# CityCruze Security and Privacy Requirements

## 1. Security objectives

Protect customer, vendor, vehicle, identity, booking and financial
information. Prevent unauthorized access, fraud, duplicate charges and
booking manipulation.

## 2. Authentication

-   Use secure OTP or passwordless authentication with abuse protection.
-   Use short-lived access credentials and secure refresh/session
    handling.
-   Store password hashes using a modern password-hashing algorithm if
    passwords are used.
-   Secure cookies with HttpOnly, Secure and appropriate SameSite
    settings where cookie sessions are used.
-   Revoke sessions after account compromise or sensitive account
    changes.
-   Apply login and OTP rate limits.

## 3. Authorization

Use role-based access control with resource-level permissions.

Roles may include: - CUSTOMER - VENDOR - ADMIN - OPERATIONS - FINANCE -
COMPLIANCE_REVIEWER

Examples: - Vendor can access only their own vehicles and bookings. -
Customer can access only their own bookings and verification records. -
Finance can access settlement functions but need not access identity
documents. - Compliance reviewers can access required documents but not
payment secrets. - Admin actions are audited.

## 4. File security

-   Store identity and vehicle documents in private object storage.
-   Validate file type, size and content.
-   Scan uploads for malware.
-   Use random storage keys.
-   Use short-lived signed download URLs.
-   Do not expose raw storage paths publicly.
-   Restrict document access by role and purpose.

## 5. Payment security

-   Never store card CVV or raw card data.
-   Keep provider secrets server-side.
-   Verify webhook signatures.
-   Implement idempotency and replay protection.
-   Reconcile payment status with provider records.
-   Separate customer payment, commission and vendor payable ledger
    entries.

## 6. Application security

-   Enforce server-side validation.
-   Protect against injection and cross-site scripting.
-   Configure CORS narrowly.
-   Apply CSRF protection where relevant.
-   Rate-limit sensitive endpoints.
-   Keep dependencies patched.
-   Use security headers.
-   Avoid leaking secrets in logs.
-   Maintain backups and test restores.

## 7. Privacy principles

-   Collect only information needed for a defined purpose.
-   Explain why identity and driving-licence data is required.
-   Restrict staff access.
-   Define retention and deletion periods.
-   Encrypt data in transit and at rest.
-   Maintain access logs for sensitive documents.
-   Provide a process for privacy requests and incidents.
-   Review applicable Indian data-protection requirements with counsel.

## 8. Incident response

Maintain a written response plan for: - Account takeover. -
Personal-data exposure. - Payment fraud. - Vendor compromise. -
Unauthorized document access. - Ransomware or infrastructure compromise.

The plan should define incident owner, containment, evidence
preservation, notifications, recovery and post-incident review.
