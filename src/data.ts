import type { AuditEvent, Claim, Policy } from "./types";

export const claim: Claim = {
  id: "EXP-2841",
  employee: "Maya Chen",
  employeeInitials: "MC",
  employeeId: "EMP-314159",
  department: "Operations",
  office: "Berlin",
  purpose: "London implementation workshop",
  tripDates: "8–12 May 2026",
  submittedAt: "13 May 2026, 09:42",
  total: 1248,
  status: "needs-review",
  queuePosition: 24,
  queueTotal: 138,
  reviewer: "Olivia Harper",
  expenses: [
    {
      id: "hotel",
      merchant: "Riverside Grand Hotel",
      category: "hotel",
      date: "8–10 May 2026",
      amount: 780,
      status: "possible-duplicate",
      document: {
        id: "DOC-847362",
        name: "Riverside Grand Hotel — Invoice RGH-847362",
        type: "invoice",
        asset: "/assets/hotel-maya.png",
        extractedFields: [
          { label: "Guest", value: "Maya Chen" },
          { label: "Invoice number", value: "RGH-847362" },
          { label: "Room", value: "712" },
          { label: "Total", value: "€780.00" },
        ],
      },
    },
    {
      id: "taxi",
      merchant: "CityCab",
      category: "taxi",
      date: "8 May 2026",
      amount: 68.4,
      status: "verified",
      document: {
        id: "DOC-CC7481",
        name: "CityCab — Receipt CC-LHR-80526-7481",
        type: "receipt",
        asset: "/assets/taxi.png",
        extractedFields: [
          { label: "Passenger", value: "Maya Chen" },
          { label: "Route", value: "LHR → Riverside Grand Hotel" },
          { label: "Paid", value: "€68.40" },
          { label: "Reference", value: "CC-LHR-80526-7481" },
        ],
      },
    },
    {
      id: "dinner",
      merchant: "The Foundry Kitchen",
      category: "meal",
      date: "9 May 2026",
      amount: 68,
      status: "policy-exception",
      document: {
        id: "DOC-FK4817",
        name: "The Foundry Kitchen — Receipt FK-090526-4817",
        type: "receipt",
        asset: "/assets/dinner.png",
        extractedFields: [
          { label: "Meal total", value: "€68.00" },
          { label: "Date", value: "9 May 2026" },
          { label: "Payment", value: "Corporate Visa •••• 1836" },
          { label: "Reference", value: "FK-090526-4817" },
        ],
      },
    },
    {
      id: "flight",
      merchant: "Lufthansa",
      category: "flight",
      date: "12 May 2026",
      amount: 331.6,
      status: "verified",
      document: {
        id: "DOC-LH6K2P",
        name: "Lufthansa — E-ticket LH6K2P",
        type: "ticket",
        asset: "/assets/flight.png",
        extractedFields: [
          { label: "Passenger", value: "Maya Chen" },
          { label: "Route", value: "LHR → BER" },
          { label: "Flight", value: "LH 921" },
          { label: "Total", value: "€331.60" },
        ],
      },
    },
  ],
  findings: [
    {
      id: "duplicate",
      expenseId: "hotel",
      title: "Possible duplicate",
      confidence: 82,
      summary: "Same hotel, conference dates and nightly rate as Jonas Weber’s claim EXP-2798.",
      status: "unreviewed",
    },
    {
      id: "policy",
      expenseId: "dinner",
      title: "Policy exception",
      confidence: 94,
      summary: "Dinner is €18.00 above the international meal allowance.",
      status: "unreviewed",
    },
  ],
};

export const mealPolicy: Policy = {
  id: "POL-MEAL-INTL-04",
  name: "International evening meal allowance",
  limit: 50,
  submitted: 68,
  effectiveDate: "1 January 2026",
  excerpt:
    "Employees travelling internationally may claim up to €50 per person for an evening meal. Documented business-hosting exceptions require reviewer justification.",
};

export const initialAuditEvents: AuditEvent[] = [
  {
    id: "audit-1",
    label: "Claim submitted",
    detail: "Four expenses and four supporting documents received.",
    actor: "Maya Chen",
    timestamp: "13 May 2026, 09:42",
  },
  {
    id: "audit-2",
    label: "AI analysis completed",
    detail: "Eight checks completed: six passed and two require review.",
    actor: "Verification AI",
    timestamp: "13 May 2026, 09:43",
  },
  {
    id: "audit-3",
    label: "Review opened",
    detail: "Claim assigned from the verification queue.",
    actor: "Olivia Harper",
    timestamp: "15 July 2026, 10:18",
  },
];

export const queueClaims = [
  { employee: "Maya Chen", initials: "MC", id: "EXP-2841", purpose: "London implementation workshop", submitted: "13 May", amount: 1248, ai: "2 findings", risk: "Medium", status: "Needs review" },
  { employee: "Lena Hoffmann", initials: "LH", id: "EXP-2838", purpose: "Customer research — Paris", submitted: "13 May", amount: 864.2, ai: "All checks passed", risk: "Low", status: "Ready" },
  { employee: "Noah Williams", initials: "NW", id: "EXP-2835", purpose: "Partner summit — Dublin", submitted: "12 May", amount: 2183.55, ai: "3 findings", risk: "High", status: "Needs review" },
  { employee: "Amara Okafor", initials: "AO", id: "EXP-2829", purpose: "Operations offsite", submitted: "12 May", amount: 596.8, ai: "Response received", risk: "Medium", status: "Employee responded" },
  { employee: "Mateo Silva", initials: "MS", id: "EXP-2824", purpose: "Training — Amsterdam", submitted: "11 May", amount: 730, ai: "1 finding", risk: "Medium", status: "Needs review" },
  { employee: "Sofia Rossi", initials: "SR", id: "EXP-2816", purpose: "Field visit — Milan", submitted: "10 May", amount: 412.75, ai: "All checks passed", risk: "Low", status: "Ready" },
  { employee: "Daniel Weber", initials: "DW", id: "EXP-2812", purpose: "Supplier review — Hamburg", submitted: "10 May", amount: 988.4, ai: "All checks passed", risk: "Low", status: "Ready" },
  { employee: "Aline Mukiza", initials: "AM", id: "EXP-2807", purpose: "Client entertainment — Brussels", submitted: "9 May", amount: 1450, ai: "4 findings", risk: "High", status: "Needs review" },
  { employee: "Patrick Niyonzima", initials: "PN", id: "EXP-2803", purpose: "Software licences", submitted: "8 May", amount: 3200, ai: "All checks passed", risk: "Low", status: "Ready" },
  { employee: "Grace Uwase", initials: "GU", id: "EXP-2799", purpose: "Conference registration", submitted: "8 May", amount: 1850, ai: "2 findings", risk: "Medium", status: "Needs review" },
  { employee: "Sandra Kamanzi", initials: "SK", id: "EXP-2794", purpose: "Marketing materials", submitted: "7 May", amount: 520, ai: "1 finding", risk: "Medium", status: "Needs review" },
  { employee: "Robert Nsengimana", initials: "RN", id: "EXP-2788", purpose: "Office renovation", submitted: "7 May", amount: 1100, ai: "All checks passed", risk: "Low", status: "Ready" },
  { employee: "Marie Ingabire", initials: "MI", id: "EXP-2781", purpose: "Training workshop", submitted: "6 May", amount: 2750, ai: "Response received", risk: "Medium", status: "Employee responded" },
];
