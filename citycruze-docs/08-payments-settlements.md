# CityCruze Payments and Settlements

## 1. Payment principles

Use a payment provider approved for the actual marketplace business
model. Confirm its marketplace, split settlement, vendor onboarding and
payout capabilities directly with the provider.

Do not assume a standard merchant account permits collection and onward
distribution of funds belonging to multiple independent vendors.

## 2. Payment flow

1.  Backend calculates the final quote.
2.  Backend creates a payment order with the provider.
3.  Customer completes payment.
4.  Provider sends a signed webhook.
5.  Backend verifies signature and event authenticity.
6.  Backend stores the event and processes it idempotently.
7.  Booking state is updated only after authoritative confirmation.
8.  Reconciliation compares internal records with provider reports.

## 3. Financial ledger

Keep immutable, auditable financial entries. Do not rely only on a
mutable `vendorBalance` field.

Track: - Customer charge. - Tax components. - Marketplace commission. -
Vendor payable. - Discounts and who funds them. - Payment gateway
fees. - Refunds. - Chargebacks. - Adjustments. - Settlement payout.

The example below is illustrative only: - Rental charge: ₹4,000. -
Commission assumption: 15% = ₹600. - Vendor payable before other agreed
deductions: ₹3,400.

## 4. Settlement controls

-   Settle only after the agreed completion and reconciliation
    conditions.
-   Verify beneficiary account ownership.
-   Maintain payout status and provider reference.
-   Reconcile failed and reversed payouts.
-   Require approval for manual adjustments.
-   Maintain maker-checker approval for high-risk payouts.
-   Do not use customer funds for unrelated operating expenses.

## 5. Refund workflow

1.  Refund request created.
2.  Policy and booking reviewed.
3.  Refund amount calculated.
4.  Approval recorded where required.
5.  Refund requested from provider.
6.  Provider response/webhook recorded.
7.  Customer notified.
8.  Ledger reconciled.

## 6. Security

-   Never store card numbers or CVV.
-   Store provider tokens/references only where appropriate.
-   Keep API secrets server-side.
-   Verify webhook signatures.
-   Protect against replay and duplicate processing.
-   Log financial events without exposing sensitive payment data.

## 7. Finance and legal review

Before production, obtain advice on: - Payment aggregator/marketplace
structure. - Vendor settlement mechanics. - GST and invoicing. - Tax
collection obligations, if applicable. - TDS or other withholding, if
applicable. - Refund and chargeback responsibility. - Accounting
recognition of commission versus GMV.
