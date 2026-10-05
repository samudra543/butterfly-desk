# Butterfly Desk

A frontend pitch demo for The Rainbow Butterflies. No backend or paid services are required.

## Open the demo

The easiest option is `../Butterfly-Desk-Demo.html`: open it in Chrome, Safari or Edge. The complete application and 3D renderer are embedded. Fonts use Google Fonts when online, with system font fallbacks offline.

The local preview is also available at http://127.0.0.1:4173 while the preview server is running.

To develop:

```sh
npm install
npm run dev
```

To build and serve:

```sh
npm run build
npm run preview
```

## Five-minute meeting walkthrough

1. **Overview:** “Everything from the first enquiry to departure lives here.” Drag the floating landscape to rotate it.
2. **Review incoming enquiries → Arjun Mehta:** Show a seven-day Meghalaya request for four travellers, with budget, interests, pace, source, owner and next action.
3. **Build proposal:** Review seven itinerary days, add a local experience or slower day, adjust costs and markup, then save a version. Preview or download the proposal.
4. **Enquiries → Arjun → Confirm booking:** The proposal becomes a booking with a departure checklist and internal tasks.
5. **Record payment:** Record a sample deposit, then show the balance in Payments. This is a ledger only; no actual payment is processed.
6. **Suppliers and Automations:** Update a partner confirmation and review a follow-up draft. Nothing is sent automatically.
7. **Insights:** Show enquiry sources, conversion and follow-up completion. Explain that these are calculations over sample data, not claims about his business.

Reset before the meeting using the gear icon beside the founder profile → Restore sample data. A confirmation panel appears first. Changes persist in this browser; opening the file or a different URL uses a separate local workspace.

## Included

- Responsive dashboard and real interactive 3D floating landscape, with SVG rendering when WebGL is unavailable.
- Enquiry pipeline and list, source filters, global traveller search, assigned teammate, next action and traveller timeline.
- Intake for leisure, group, corporate and educational trips, including dates, flexibility, budget, group size, destination, contact preference, institution, objectives and assistance needs.
- Approved template library for routes, stays, activities and quote templates, with team review and apply-to-proposal actions.
- Internal channel inbox simulation plus a staff-only manual logging form.
- Day-by-day itinerary editor, reusable components, custom days, reorder/remove controls, quote calculation, version snapshots, proposal preview, HTML download and print/PDF.
- Booking conversion, departure checklist and partner confirmation overview.
- Receipt and supplier-payment ledger, balances and CSV export.
- Payment reminder drafts with approval, and sample bank-to-ledger matching with reconciliation status.
- Supplier records with indicative rate, unit, validity, contact, booking assignment and status.
- Internal automation switches, follow-up approval queue and a sample planning-assistant review experience.
- Derived source/conversion/task metrics, a clearly labelled illustrative pilot scorecard, JSON export and demo reset.

## Prototype boundaries

All names, rates and transactions are fictional examples. Data is saved in local browser storage. There is no login, shared database, payment gateway, messaging delivery or live AI integration. The planning assistant uses a visible template. Rule switches run on demo actions; there is no scheduled backend worker. Proposal versions capture snapshots locally but do not implement historical rollback. Before real use, quotes need verified suppliers, route/accessibility review, taxes, inclusions and final terms.

## Verification

Production build passes; dependency audit reports zero known vulnerabilities at build time. Browser checks covered enquiry submission, corporate fields, proposal saving, booking conversion, payment entry, persistence after refresh, supplier confirmation and draft approval. Additional demo checks covered template approval and application, balance-reminder approval, and bank-entry matching. The final browser run had no console errors. Mobile was checked for horizontal overflow and layout.

Icons: Lucide, ISC license (see LUCIDE-LICENSE). 3D: Three.js, MIT license (see THREE-LICENSE).
