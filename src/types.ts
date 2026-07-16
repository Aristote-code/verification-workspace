export type ClaimStatus =
  | "needs-review"
  | "finding-reviewed"
  | "ready-for-decision"
  | "clarification-requested"
  | "awaiting-clarification"
  | "approved";

export type ExpenseStatus = "verified" | "possible-duplicate" | "policy-exception";

export interface DocumentEvidence {
  id: string;
  name: string;
  type: "invoice" | "receipt" | "ticket";
  asset: string;
  extractedFields: Array<{ label: string; value: string }>;
}

export interface Expense {
  id: string;
  merchant: string;
  category: "hotel" | "taxi" | "meal" | "flight";
  date: string;
  amount: number;
  status: ExpenseStatus;
  document: DocumentEvidence;
}

export interface Finding {
  id: "duplicate" | "policy";
  expenseId: string;
  title: string;
  confidence: number;
  summary: string;
  status: "unreviewed" | "dismissed" | "adjusted" | "accepted" | "noncompliant";
}

export interface Policy {
  id: string;
  name: string;
  limit: number;
  submitted: number;
  effectiveDate: string;
  excerpt: string;
}

export interface ReviewerAssessment {
  findingId: Finding["id"];
  decision: string;
  reason: string;
  adjustedAmount?: number;
  assessedAt: string;
}

export interface ClarificationRequest {
  reasons: string[];
  requestedDocuments: string[];
  dueDate: string;
  message: string;
  sentAt?: string;
}

export interface AuditEvent {
  id: string;
  label: string;
  detail: string;
  actor: string;
  timestamp: string;
}

export interface Claim {
  id: string;
  employee: string;
  employeeInitials: string;
  employeeId: string;
  department: string;
  office: string;
  purpose: string;
  tripDates: string;
  submittedAt: string;
  total: number;
  status: ClaimStatus;
  queuePosition: number;
  queueTotal: number;
  reviewer: string;
  expenses: Expense[];
  findings: Finding[];
}
