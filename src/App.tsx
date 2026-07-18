import { useEffect, useMemo, useState } from "react";
import {
  AirplaneTilt,
  ArrowClockwise,
  ArrowLeft,
  ArrowRight,
  Bed,
  Bell,
  BoundingBox,
  CalendarBlank,
  CaretDown,
  CaretRight,
  CaretUp,
  ChartBar,
  Check,
  CheckCircle,
  ClipboardText,
  Clock,
  Copy,
  FileArrowDown,
  FileText,
  Flag,
  ForkKnife,
  Funnel,
  Gear,
  Info,
  ListChecks,
  MagnifyingGlass,
  Minus,
  NotePencil,
  Paperclip,
  PaperPlaneTilt,
  Plus,
  Scan,
  SealCheck,
  ShieldCheck,
  SignOut,
  SlidersHorizontal,
  Taxi,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import { claim, initialAuditEvents, mealPolicy, queueClaims } from "./data";
import type {
  AuditEvent,
  ClaimStatus,
  ClarificationRequest,
  Expense,
  ReviewerAssessment,
} from "./types";

type Screen = "queue" | "workspace" | "compare" | "policy" | "clarify" | "decision" | "complete";
type Modal = "none" | "duplicate-reason" | "reject" | "note";

const money = (value: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(value);

const categoryIcon = {
  hotel: Bed,
  taxi: Taxi,
  meal: ForkKnife,
  flight: AirplaneTilt,
};

export function App() {
  const [screen, setScreen] = useState<Screen>("queue");
  const [selectedExpenseId, setSelectedExpenseId] = useState("hotel");
  const [duplicateAssessment, setDuplicateAssessment] = useState<ReviewerAssessment | null>(null);
  const [policyAssessment, setPolicyAssessment] = useState<ReviewerAssessment | null>(null);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(initialAuditEvents);
  const [claimStatus, setClaimStatus] = useState<ClaimStatus>("needs-review");
  const [modal, setModal] = useState<Modal>("none");
  const [toast, setToast] = useState<string | null>(null);

  const selectedExpense = claim.expenses.find((expense) => expense.id === selectedExpenseId) ?? claim.expenses[0];
  const findingsReviewed = Number(Boolean(duplicateAssessment)) + Number(Boolean(policyAssessment));
  const readyForDecision = findingsReviewed === 2;
  const excludedAmount = policyAssessment?.adjustedAmount === 50 ? 18 : policyAssessment?.decision === "Noncompliant" ? 68 : 0;
  const reimbursable = claim.total - excludedAmount;

  const addAudit = (event: Omit<AuditEvent, "id">) => {
    setAuditEvents((current) => [...current, { ...event, id: `audit-${current.length + 1}` }]);
  };

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const navigateToExpense = (expense: Expense) => {
    setSelectedExpenseId(expense.id);
    if (expense.id === "dinner") setScreen("policy");
  };

  const resolveDuplicate = (reason: string) => {
    const assessment: ReviewerAssessment = {
      findingId: "duplicate",
      decision: "Not a duplicate",
      reason,
      assessedAt: "15 July 2026, 10:24",
    };
    setDuplicateAssessment(assessment);
    setClaimStatus(policyAssessment ? "ready-for-decision" : "finding-reviewed");
    addAudit({
      label: "Duplicate finding dismissed",
      detail: `Separate conference attendee — ${reason}.`,
      actor: claim.reviewer,
      timestamp: "15 July 2026, 10:24",
    });
    setModal("none");
    setToast("Finding resolved and added to the audit trail");
    setScreen("workspace");
  };

  const resolvePolicy = (decision: string, adjustedAmount?: number) => {
    const assessment: ReviewerAssessment = {
      findingId: "policy",
      decision,
      reason:
        decision === "Reimburse policy limit"
          ? "International meal allowance applied"
          : decision === "Accepted exception"
            ? "Business-hosting exception accepted"
            : "Expense marked outside policy",
      adjustedAmount,
      assessedAt: "15 July 2026, 10:29",
    };
    setPolicyAssessment(assessment);
    setClaimStatus(duplicateAssessment ? "ready-for-decision" : "finding-reviewed");
    addAudit({
      label: "Policy finding reviewed",
      detail:
        adjustedAmount === 50
          ? "€50.00 marked reimbursable; €18.00 excluded under policy."
          : `${decision} recorded for the dinner expense.`,
      actor: claim.reviewer,
      timestamp: "15 July 2026, 10:29",
    });
    setToast("Policy decision saved");
    setScreen("workspace");
  };

  const sendClarification = (request: ClarificationRequest) => {
    setClaimStatus("awaiting-clarification");
    addAudit({
      label: "Clarification requested",
      detail: `${request.reasons.join(", ")}. Response requested by ${request.dueDate}.`,
      actor: claim.reviewer,
      timestamp: "15 July 2026, 10:27",
    });
    setToast("Clarification request sent to Maya Chen");
  };

  return (
    <div className="app-shell">
      {screen === "queue" ? (
        <QueueScreen onOpen={() => setScreen("workspace")} />
      ) : screen === "compare" ? (
        <ComparisonScreen
          onBack={() => setScreen("workspace")}
          onResolve={() => setModal("duplicate-reason")}
          onClarify={() => setScreen("clarify")}
        />
      ) : screen === "policy" ? (
        <PolicyScreen
          onBack={() => setScreen("workspace")}
          onResolve={resolvePolicy}
          onClarify={() => setScreen("clarify")}
        />
      ) : screen === "clarify" ? (
        <ClarificationScreen
          status={claimStatus}
          onBack={() => setScreen("workspace")}
          onSend={sendClarification}
          onReturn={() => setScreen("queue")}
        />
      ) : screen === "decision" ? (
        <DecisionScreen
          duplicateAssessment={duplicateAssessment!}
          policyAssessment={policyAssessment!}
          reimbursable={reimbursable}
          excludedAmount={excludedAmount}
          onBack={() => setScreen("workspace")}
          onReject={() => setModal("reject")}
          onApprove={() => {
            setClaimStatus("approved");
            addAudit({
              label: "Claim approved",
              detail: `${money(reimbursable)} approved; ${money(excludedAmount)} excluded.`,
              actor: claim.reviewer,
              timestamp: "15 July 2026, 10:32",
            });
            setScreen("complete");
          }}
        />
      ) : screen === "complete" ? (
        <CompleteScreen
          reimbursable={reimbursable}
          excludedAmount={excludedAmount}
          auditEvents={auditEvents}
          onNext={() => {
            setScreen("queue");
            setToast("Moved to the next claim in the queue");
          }}
        />
      ) : (
        <WorkspaceScreen
          selectedExpense={selectedExpense}
          selectedExpenseId={selectedExpenseId}
          onSelectExpense={setSelectedExpenseId}
          onOpenFinding={(type) => setScreen(type === "duplicate" ? "compare" : "policy")}
          duplicateAssessment={duplicateAssessment}
          policyAssessment={policyAssessment}
          findingsReviewed={findingsReviewed}
          readyForDecision={readyForDecision}
          claimStatus={claimStatus}
          auditEvents={auditEvents}
          onClarify={() => setScreen("clarify")}
          onReject={() => setModal("reject")}
          onDecision={() => setScreen("decision")}
          onBackQueue={() => setScreen("queue")}
          onAddNote={() => setModal("note")}
          onNavigateExpense={navigateToExpense}
        />
      )}

      {modal === "duplicate-reason" && (
        <ReasonDialog onClose={() => setModal("none")} onSubmit={resolveDuplicate} />
      )}
      {modal === "reject" && (
        <RejectDialog
          onClose={() => setModal("none")}
          onSubmit={(reason) => {
            addAudit({
              label: "Claim rejected",
              detail: reason,
              actor: claim.reviewer,
              timestamp: "15 July 2026, 10:32",
            });
            setModal("none");
            setToast("Rejection recorded in the audit trail");
          }}
        />
      )}
      {modal === "note" && (
        <NoteDialog
          onClose={() => setModal("none")}
          onSubmit={(note) => {
            addAudit({
              label: "Internal note added",
              detail: note,
              actor: claim.reviewer,
              timestamp: "15 July 2026, 10:26",
            });
            setModal("none");
            setToast("Internal note saved");
          }}
        />
      )}
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}

function Rail({ active = "workspace", onQueue }: { active?: string; onQueue?: () => void }) {
  const items = [
    { id: "workspace", label: "Workspace", icon: ClipboardText },
    { id: "search", label: "Search", icon: MagnifyingGlass },
    { id: "checks", label: "My reviews", icon: ListChecks },
    { id: "flag", label: "Clarifications", icon: Flag },
    { id: "files", label: "Documents", icon: FileText },
    { id: "reports", label: "Reports", icon: ChartBar },
    { id: "settings", label: "Settings", icon: Gear },
  ];
  return (
    <aside className="rail" aria-label="Primary navigation">
      <button className="rail-logo" aria-label="Verification Workspace" onClick={onQueue}>
        <ShieldCheck size={28} weight="duotone" />
      </button>
      <nav>
        {items.map(({ id, label, icon: Icon }) => (
          <button key={id} className={active === id ? "active" : ""} aria-label={label} title={label}>
            <Icon size={23} weight={active === id ? "fill" : "regular"} />
          </button>
        ))}
      </nav>
      <div className="rail-bottom">
        <button aria-label="Sign out" title="Sign out"><SignOut size={23} /></button>
        <button aria-label="Collapse navigation" title="Collapse navigation"><CaretRight size={22} /></button>
      </div>
    </aside>
  );
}

function TopBar({ title = "Verification Workspace", onBack }: { title?: string; onBack?: () => void }) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        {onBack && <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft size={19} /></button>}
        <span>{title}</span>
      </div>
      <div className="topbar-actions">
        <button className="text-button muted"><CalendarBlank size={18} /> Jul 15, 2026</button>
        <button className="icon-button" aria-label="Notifications"><Bell size={19} /></button>
        <button className="avatar" aria-label="Olivia Harper profile">OH</button>
        <CaretDown size={15} />
      </div>
    </header>
  );
}

function ClaimHeader() {
  const [historyOpen, setHistoryOpen] = useState(false);
  return (
    <section className="claim-header">
      <div className="claim-identity">
        <div className="claim-avatar">{claim.employeeInitials}</div>
        <div className="claim-identity-copy">
          <div className="claimant-name-row"><strong>{claim.employee}</strong><button className="history-trigger" onClick={() => setHistoryOpen(!historyOpen)} aria-expanded={historyOpen}>Maya’s previous claims (4) <CaretDown size={14} /></button></div>
          <div className="claim-reference"><span>Claim {claim.id} · {claim.purpose}</span><button className="copy-button" aria-label="Copy claim ID"><Copy size={15} /></button></div>
          <small>{claim.department} · {claim.office} · {claim.tripDates}</small>
        </div>
        {historyOpen && <aside className="claimant-history" aria-label="Maya Chen claim history">
          <div className="claimant-history-head"><div><span className="eyebrow">Previous reimbursement claims</span><strong>{claim.employee}</strong></div><button className="icon-button" aria-label="Close claimant history" onClick={() => setHistoryOpen(false)}><X size={17} /></button></div>
          <p>Recent reimbursement claims provide context only; this review applies to {claim.id}.</p>
          <div className="history-list">
            <HistoryRow id="EXP-2719" label="Client dinner · London" amount="€124.00" status="Approved" />
            <HistoryRow id="EXP-2632" label="Airport transport · Berlin" amount="€54.00" status="Approved" />
            <HistoryRow id="EXP-2510" label="Training materials" amount="€216.50" status="Approved" />
            <HistoryRow id="EXP-2448" label="Workshop travel · Paris" amount="€438.00" status="Clarified" />
          </div>
        </aside>}
      </div>
      <HeaderMetric label="Total requested" value={money(claim.total)} amount />
      <HeaderMetric label="Status" value="Needs review" status />
      <HeaderMetric label="Queue position" value={`${claim.queuePosition}`} detail={`of ${claim.queueTotal}`} />
    </section>
  );
}

function HeaderMetric({ label, value, detail, amount, status }: { label: string; value: string; detail?: string; amount?: boolean; status?: boolean }) {
  return <div className={`header-metric ${amount ? "amount" : ""} ${status ? "status" : ""}`}><span className="eyebrow">{label}</span><strong>{status && <i />} {value}</strong>{detail && <small>{detail}</small>}</div>;
}

function HistoryRow({ id, label, amount, status }: { id: string; label: string; amount: string; status: string }) {
  return <div className="history-row"><div><strong>{id}</strong><span>{label}</span></div><div><strong>{amount}</strong><span>{status}</span></div></div>;
}

function ProgressSteps({ reviewed = 0, decision = false }: { reviewed?: number; decision?: boolean }) {
  const active = decision ? 3 : reviewed === 0 ? 1 : 2;
  return (
    <div className="progress-steps" aria-label={`Step ${active} of 3`}>
      {["Review evidence", "Resolve findings", "Make decision"].map((label, index) => (
        <div className={`progress-step ${active > index ? "active" : ""} ${active === index + 1 ? "current" : ""}`} key={label}>
          <div className="step-line"><span>{active > index + 1 ? <Check size={14} weight="bold" /> : index + 1}</span></div>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}

function QueueScreen({ onOpen }: { onOpen: () => void }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [risk, setRisk] = useState("All risk");
  const [sortAscending, setSortAscending] = useState(true);
  const filtered = useMemo(() => {
    return queueClaims
      .filter((row) => `${row.employee} ${row.id} ${row.purpose}`.toLowerCase().includes(search.toLowerCase()))
      .filter((row) => status === "All statuses" || row.status === status)
      .filter((row) => risk === "All risk" || row.risk === risk)
      .sort((a, b) => (sortAscending ? b.amount - a.amount : a.amount - b.amount));
  }, [search, status, risk, sortAscending]);

  return (
    <div className="screen-frame queue-frame">
      <Rail active="workspace" />
      <div className="screen-content">
        <TopBar />
        <main className="queue-page">
          <div className="queue-heading">
            <div><span className="eyebrow">Operations</span><h1>Verification queue</h1><p>Review the claims that need human judgment.</p></div>
            <div className="queue-summary"><strong>138</strong><span>awaiting review</span><i /><strong>23</strong><span>completed today</span></div>
          </div>
          <div className="queue-toolbar">
            <label className="search-field"><MagnifyingGlass size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search employee, claim or purpose" /></label>
            <label className="select-field"><SlidersHorizontal size={17} /><select value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option><option>Needs review</option><option>Ready</option><option>Employee responded</option></select></label>
            <label className="select-field"><Funnel size={17} /><select value={risk} onChange={(event) => setRisk(event.target.value)}><option>All risk</option><option>Low</option><option>Medium</option><option>High</option></select></label>
            <span className="result-count">{filtered.length} claims</span>
          </div>
          <div className="queue-table-wrap">
            <table className="queue-table">
              <thead><tr><th>Employee</th><th>Claim</th><th>Submitted</th><th><button onClick={() => setSortAscending(!sortAscending)}>Amount <CaretDown size={13} /></button></th><th>AI review</th><th>Risk</th><th>Status</th><th /></tr></thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className={row.id === claim.id ? "featured" : ""} onClick={row.id === claim.id ? onOpen : undefined} tabIndex={row.id === claim.id ? 0 : undefined} onKeyDown={(event) => event.key === "Enter" && row.id === claim.id && onOpen()}>
                    <td><div className="person-cell"><span>{row.initials}</span><strong>{row.employee}</strong></div></td>
                    <td><strong>{row.id}</strong><small>{row.purpose}</small></td>
                    <td>{row.submitted}</td><td className="amount-cell">{money(row.amount)}</td>
                    <td><span className={row.ai.includes("passed") ? "ai-passed" : "ai-findings"}>{row.ai}</span></td>
                    <td><RiskBadge risk={row.risk} /></td><td><span className="status-pill">{row.status}</span></td>
                    <td>{row.id === claim.id && <button className="open-row" aria-label={`Open ${row.id}`}><ArrowRight size={18} /></button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  return <span className={`risk-badge ${risk.toLowerCase()}`}><span />{risk}</span>;
}

interface WorkspaceProps {
  selectedExpense: Expense;
  selectedExpenseId: string;
  onSelectExpense: (id: string) => void;
  onOpenFinding: (type: "duplicate" | "policy") => void;
  duplicateAssessment: ReviewerAssessment | null;
  policyAssessment: ReviewerAssessment | null;
  findingsReviewed: number;
  readyForDecision: boolean;
  claimStatus: ClaimStatus;
  auditEvents: AuditEvent[];
  onClarify: () => void;
  onReject: () => void;
  onDecision: () => void;
  onBackQueue: () => void;
  onAddNote: () => void;
  onNavigateExpense: (expense: Expense) => void;
}

function WorkspaceScreen(props: WorkspaceProps) {
  const [zoom, setZoom] = useState(92);
  const [ocr, setOcr] = useState(true);
  const [tab, setTab] = useState<"receipt" | "details" | "history">("receipt");
  const [passedOpen, setPassedOpen] = useState(false);
  const currentFinding = props.selectedExpense.id === "hotel" ? "duplicate" : props.selectedExpense.id === "dinner" ? "policy" : null;
  const currentAssessment = currentFinding === "duplicate" ? props.duplicateAssessment : currentFinding === "policy" ? props.policyAssessment : null;
  return (
    <div className="screen-frame">
      <Rail onQueue={props.onBackQueue} />
      <div className="screen-content">
        <TopBar />
        <ClaimHeader />
        <main className="workspace-grid">
          <ExpenseSidebar selectedId={props.selectedExpenseId} onSelect={props.onSelectExpense} duplicateAssessment={props.duplicateAssessment} policyAssessment={props.policyAssessment} />
          <section className="evidence-column">
            <div className="evidence-tabs">
              <div>{(["receipt", "details", "history"] as const).map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item === "receipt" ? "Evidence" : item === "details" ? "Extracted details" : "Audit trail"}</button>)}</div>
              <button className="icon-button" aria-label="Download document"><FileArrowDown size={18} /></button>
            </div>
            {tab === "receipt" ? (
              <DocumentViewer expense={props.selectedExpense} zoom={zoom} setZoom={setZoom} ocr={ocr} setOcr={setOcr} />
            ) : tab === "details" ? (
              <ExtractedDetails expense={props.selectedExpense} onHighlight={() => setOcr(true)} />
            ) : (
              <AuditTimeline events={props.auditEvents} />
            )}
          </section>
          <aside className="review-panel">
            <ProgressSteps reviewed={props.findingsReviewed} />
            {currentFinding ? (
              <div className="finding-detail">
                <div className="finding-kicker"><span className={currentAssessment ? "resolved-dot" : "review-dot"} />{currentAssessment ? "Reviewed" : `Finding ${currentFinding === "duplicate" ? "1" : "2"} of 2`}<CaretUp size={15} /></div>
                <div className="finding-heading"><h2>{currentFinding === "duplicate" ? "Possible duplicate" : "Policy exception"}</h2><span className="confidence">{currentFinding === "duplicate" ? "82" : "94"}% confidence</span></div>
                {currentAssessment ? (
                  <AssessmentResult assessment={currentAssessment} />
                ) : currentFinding === "duplicate" ? (
                  <>
                    <p>A similar hotel expense was found in Jonas Weber’s claim EXP-2798. Review the matching and conflicting evidence before deciding.</p>
                    <EvidenceMatrix />
                    <button className="primary full" onClick={() => props.onOpenFinding("duplicate")}>Open comparison <ArrowRight size={17} /></button>
                  </>
                ) : (
                  <>
                    <p>The dinner amount is above the international evening meal allowance.</p>
                    <div className="policy-mini"><div><span>Submitted</span><strong>€68.00</strong></div><div><span>Policy limit</span><strong>€50.00</strong></div><div className="over"><span>Above limit</span><strong>+€18.00</strong></div></div>
                    <button className="primary full" onClick={() => props.onOpenFinding("policy")}>Review policy <ArrowRight size={17} /></button>
                  </>
                )}
              </div>
            ) : (
              <div className="clean-expense">
                <CheckCircle size={38} weight="duotone" />
                <h2>All checks passed</h2>
                <p>Receipt details match the submitted expense and no policy exceptions were found.</p>
                <div className="clean-list"><span><Check size={15} /> Amount matched</span><span><Check size={15} /> Date within trip</span><span><Check size={15} /> Required document present</span></div>
              </div>
            )}
            <button className="accordion-row" onClick={() => props.onNavigateExpense(claim.expenses[2])}><span><WarningCircle size={18} /> Policy exception</span><span>{props.policyAssessment ? "Reviewed" : "Finding 2"}<CaretRight size={14} /></span></button>
            <button className="accordion-row" onClick={() => setPassedOpen(!passedOpen)}><span><CheckCircle size={18} /> Passed checks</span><span>6 {passedOpen ? <CaretUp size={14} /> : <CaretDown size={14} />}</span></button>
            {passedOpen && <div className="passed-list"><span><Check size={14} /> Identity matched</span><span><Check size={14} /> Currency identified</span><span><Check size={14} /> Dates within trip</span><span><Check size={14} /> Documents legible</span><span><Check size={14} /> Merchant extracted</span><span><Check size={14} /> Totals matched</span></div>}
            <div className="review-actions">
              <button className="primary" disabled={!props.readyForDecision} onClick={props.onDecision}>{props.readyForDecision ? "Review final decision" : "Approve"}</button>
              <button className="secondary" onClick={props.onClarify}>Request clarification</button>
              <button className="secondary danger" onClick={props.onReject}>Reject</button>
              <button className="text-button" onClick={props.onAddNote}><NotePencil size={17} /> Add internal note</button>
              <p><ShieldCheck size={16} /> You are responsible for the final decision.</p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

function ExpenseSidebar({ selectedId, onSelect, duplicateAssessment, policyAssessment }: { selectedId: string; onSelect: (id: string) => void; duplicateAssessment: ReviewerAssessment | null; policyAssessment: ReviewerAssessment | null }) {
  return (
    <aside className="expense-sidebar">
      <div className="expense-sidebar-head"><strong>Expenses (4)</strong><span>{Number(!duplicateAssessment) + Number(!policyAssessment)} findings</span></div>
      <div className="expense-list">
        {claim.expenses.map((expense, index) => {
          const Icon = categoryIcon[expense.category];
          const reviewed = expense.id === "hotel" ? duplicateAssessment : expense.id === "dinner" ? policyAssessment : true;
          return (
            <button className={`expense-row ${selectedId === expense.id ? "selected" : ""}`} onClick={() => onSelect(expense.id)} key={expense.id}>
              <span className="expense-index">{index + 1}</span><span className="expense-icon"><Icon size={18} weight="duotone" /></span>
              <span className="expense-copy"><strong>{expense.merchant}</strong><small>{expense.date}</small><StatusLine expense={expense} reviewed={Boolean(reviewed)} /></span>
              <span className="expense-amount">{money(expense.amount)}</span>
            </button>
          );
        })}
      </div>
      <div className="expense-total"><div><span>Total submitted</span><strong>{money(claim.total)}</strong></div><div><span>Documents</span><strong>4 of 4</strong></div></div>
    </aside>
  );
}

function StatusLine({ expense, reviewed }: { expense: Expense; reviewed: boolean }) {
  if (expense.status === "verified") return <span className="status-line verified"><CheckCircle size={14} weight="fill" /> Verified</span>;
  if (reviewed) return <span className="status-line resolved"><CheckCircle size={14} weight="fill" /> Reviewed</span>;
  return <span className="status-line review"><span />{expense.status === "possible-duplicate" ? "Possible duplicate" : "Policy exception"}</span>;
}

function DocumentViewer({ expense, zoom, setZoom, ocr, setOcr }: { expense: Expense; zoom: number; setZoom: (value: number) => void; ocr: boolean; setOcr: (value: boolean) => void }) {
  const [rotation, setRotation] = useState(0);
  return (
    <div className="document-viewer">
      <div className="document-meta"><div><strong>{expense.document.name}</strong><span>1 of 1 · {expense.document.id}</span></div><span className="document-status"><CheckCircle size={15} weight="fill" /> Data extracted</span></div>
      <div className="viewer-canvas">
        <div className="viewer-toolbar">
          <button onClick={() => setZoom(Math.max(55, zoom - 10))} aria-label="Zoom out"><Minus size={17} /></button><span>{zoom}%</span><button onClick={() => setZoom(Math.min(130, zoom + 10))} aria-label="Zoom in"><Plus size={17} /></button>
          <i /><button onClick={() => setRotation((rotation + 90) % 360)} aria-label="Rotate document"><ArrowClockwise size={17} /></button><button onClick={() => setZoom(92)} aria-label="Fit document"><BoundingBox size={17} /></button><button className={ocr ? "active" : ""} onClick={() => setOcr(!ocr)}><Scan size={17} /> OCR</button>
        </div>
        <div className="document-stage" style={{ width: `${zoom}%` }}>
          <ReceiptImage asset={expense.document.asset} alt={`${expense.merchant} supporting document`} imageStyle={{ transform: `rotate(${rotation}deg)` }} />
          {ocr && <div className="ocr-overlay" aria-label="OCR highlights"><span className="ocr-box one" /><span className="ocr-box two" /><span className="ocr-box three" /><span className="ocr-box four" /></div>}
        </div>
      </div>
    </div>
  );
}

function ExtractedDetails({ expense, onHighlight }: { expense: Expense; onHighlight: () => void }) {
  return (
    <div className="details-view"><div className="details-heading"><div><h2>Extracted details</h2><p>Select a value to locate it on the document.</p></div><span>98% extraction quality</span></div>
      <div className="details-grid">{expense.document.extractedFields.map((field) => <button onClick={onHighlight} key={field.label}><span>{field.label}</span><strong>{field.value}</strong><Scan size={16} /></button>)}</div>
      <div className="details-card"><Info size={20} /><div><strong>How extraction is used</strong><p>These values support automated checks. The original document remains the source of truth.</p></div></div>
    </div>
  );
}

function AuditTimeline({ events }: { events: AuditEvent[] }) {
  return <div className="audit-view"><div className="details-heading"><div><h2>Audit trail</h2><p>Every system and reviewer action on this claim is traceable.</p></div><span>{events.length} events</span></div><div className="timeline">{[...events].reverse().map((event) => <div className="timeline-event" key={event.id}><span className="timeline-dot" /><div><strong>{event.label}</strong><p>{event.detail}</p><small>{event.actor} · {event.timestamp}</small></div></div>)}</div></div>;
}

function EvidenceMatrix() {
  return <div className="evidence-matrix"><div><span><CheckCircle size={18} /> Matching signals</span><p>Hotel</p><p>Conference dates</p><p>Nightly rate</p></div><div><span><Minus size={18} /> Conflicting signals</span><p>Guest</p><p>Room & invoice</p><p>Payment reference</p></div></div>;
}

function AssessmentResult({ assessment }: { assessment: ReviewerAssessment }) {
  return <div className="assessment-result"><CheckCircle size={22} weight="fill" /><div><strong>{assessment.decision}</strong><p>{assessment.reason}</p>{assessment.adjustedAmount !== undefined && <span>{money(assessment.adjustedAmount)} reimbursable</span>}<small>{assessment.assessedAt}</small></div></div>;
}

function ComparisonScreen({ onBack, onResolve, onClarify }: { onBack: () => void; onResolve: () => void; onClarify: () => void }) {
  const [zoom, setZoom] = useState(64);
  return (
    <div className="screen-frame comparison-frame">
      <Rail />
      <div className="screen-content">
        <TopBar title="Possible duplicate comparison" onBack={onBack} />
        <div className="comparison-heading"><div><span className="eyebrow">Claim EXP-2841 · Finding 1 of 2</span><h1>Compare the supporting evidence</h1><p>AI found matching booking signals, but the documents contain important differences.</p></div><span className="confidence">82% confidence</span></div>
        <main className="comparison-layout">
          <div className="comparison-docs">
            <ComparisonDocument label="Current claim" title="Maya Chen · EXP-2841 · RGH-847362" asset="/assets/hotel-maya.png" zoom={zoom} />
            <ComparisonDocument label="Potential match" title="Jonas Weber · EXP-2798 · RGH-847351" asset="/assets/hotel-jonas.png" zoom={zoom} />
            <div className="sync-toolbar"><button onClick={() => setZoom(Math.max(45, zoom - 8))}><Minus size={17} /></button><span>{zoom}% · Synchronized zoom</span><button onClick={() => setZoom(Math.min(88, zoom + 8))}><Plus size={17} /></button></div>
          </div>
          <aside className="comparison-summary">
            <span className="eyebrow">Comparison result</span><h2>Similar trip, different expense</h2><p>The documents share a template and booking context. Four identifiers indicate separate stays.</p>
            <div className="comparison-rows"><CompareRow label="Hotel" current="Riverside Grand Hotel" match /><CompareRow label="Stay dates" current="8–10 May 2026" match /><CompareRow label="Nightly rate" current="€390.00" match /><CompareRow label="Guest" current="Maya Chen / Jonas Weber" /><CompareRow label="Room" current="712 / 718" /><CompareRow label="Invoice" current="847362 / 847351" /><CompareRow label="Payment reference" current="7733 / 1099" /></div>
            <div className="ai-disclaimer"><Info size={19} /><p>AI surfaced the potential match. Your assessment determines whether this finding affects reimbursement.</p></div>
            <div className="comparison-actions"><button className="primary full" onClick={onResolve}>Not a duplicate</button><button className="secondary full" onClick={onClarify}>Request clarification</button><button className="text-button full">Confirm duplicate</button></div>
          </aside>
        </main>
      </div>
    </div>
  );
}

function ComparisonDocument({ label, title, asset, zoom }: { label: string; title: string; asset: string; zoom: number }) {
  return <section className="comparison-document"><div><span>{label}</span><strong>{title}</strong></div><div className="compare-canvas"><ReceiptImage asset={asset} alt={`${label} hotel invoice`} frameStyle={{ width: `${zoom}%` }} /></div></section>;
}

function ReceiptImage({ asset, alt, frameStyle, imageStyle }: { asset: string; alt: string; frameStyle?: React.CSSProperties; imageStyle?: React.CSSProperties }) {
  const optimizedAsset = asset.replace(/\.png$/, ".avif");
  return <picture className="receipt-picture" style={frameStyle}>
    <source srcSet={optimizedAsset} type="image/avif" />
    <img src={asset} alt={alt} style={imageStyle} loading="eager" decoding="async" fetchPriority="high" />
  </picture>;
}

function CompareRow({ label, current, match = false }: { label: string; current: string; match?: boolean }) {
  return <div className={match ? "match" : "different"}><span>{match ? <CheckCircle size={16} weight="fill" /> : <Minus size={16} />}{label}</span><strong>{current}</strong></div>;
}

function PolicyScreen({ onBack, onResolve, onClarify }: { onBack: () => void; onResolve: (decision: string, amount?: number) => void; onClarify: () => void }) {
  const [choice, setChoice] = useState("limit");
  const [reason, setReason] = useState("");
  return (
    <div className="screen-frame policy-frame">
      <Rail />
      <div className="screen-content"><TopBar title="Policy exception review" onBack={onBack} />
        <main className="policy-layout">
          <section className="policy-evidence"><div className="section-heading"><div><span className="eyebrow">Expense 3 of 4</span><h1>The Foundry Kitchen</h1><p>9 May 2026 · Business dinner</p></div><strong>€68.00</strong></div><div className="policy-receipt"><ReceiptImage asset="/assets/dinner.png" alt="The Foundry Kitchen receipt" /></div></section>
          <aside className="policy-panel"><ProgressSteps reviewed={1} /><div className="finding-heading"><h2>Meal allowance exceeded</h2><span className="confidence">94% confidence</span></div><p>The submitted dinner is €18.00 above the applicable international allowance.</p>
            <div className="amount-comparison"><div><span>Submitted</span><strong>€68.00</strong></div><div><span>Policy limit</span><strong>€50.00</strong></div><div><span>Difference</span><strong>+€18.00</strong></div></div>
            <div className="policy-excerpt"><div><FileText size={19} /><strong>{mealPolicy.name}</strong><span>Effective {mealPolicy.effectiveDate}</span></div><p>“{mealPolicy.excerpt}”</p><button className="text-link">View full policy <ArrowRight size={15} /></button></div>
            <div className="employee-context"><span className="eyebrow">Employee context</span><strong>Dinner with regional implementation partners</strong><p>4 attendees · Receipt paid in full by Maya</p></div>
            <fieldset className="decision-options"><legend>Reviewer decision</legend><label className={choice === "limit" ? "selected" : ""}><input type="radio" name="policy" checked={choice === "limit"} onChange={() => setChoice("limit")} /><span><strong>Reimburse policy limit only</strong><small>Approve €50.00 and exclude €18.00</small></span></label><label className={choice === "accept" ? "selected" : ""}><input type="radio" name="policy" checked={choice === "accept"} onChange={() => setChoice("accept")} /><span><strong>Accept as a valid exception</strong><small>Reimburse the full €68.00 with justification</small></span></label><label className={choice === "noncompliant" ? "selected" : ""}><input type="radio" name="policy" checked={choice === "noncompliant"} onChange={() => setChoice("noncompliant")} /><span><strong>Mark as noncompliant</strong><small>Exclude the full expense</small></span></label></fieldset>
            {choice === "accept" && <label className="field-label">Exception justification<textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Explain why this business-hosting exception is valid" /></label>}
            <div className="policy-actions"><button className="primary" disabled={choice === "accept" && !reason.trim()} onClick={() => onResolve(choice === "limit" ? "Reimburse policy limit" : choice === "accept" ? "Accepted exception" : "Noncompliant", choice === "limit" ? 50 : choice === "accept" ? 68 : 0)}>Save decision</button><button className="secondary" onClick={onClarify}>Request clarification</button></div>
          </aside>
        </main>
      </div>
    </div>
  );
}

function ClarificationScreen({ status, onBack, onSend, onReturn }: { status: ClaimStatus; onBack: () => void; onSend: (request: ClarificationRequest) => void; onReturn: () => void }) {
  const [reasons, setReasons] = useState<string[]>(["Possible duplicate", "Policy exception"]);
  const [docs, setDocs] = useState<string[]>(["Hotel booking confirmation"]);
  const [dueDate, setDueDate] = useState("18 July 2026");
  const [message, setMessage] = useState("Hello Maya,\n\nWe need a little more information before completing our review of claim EXP-2841. The hotel invoice appears similar to another conference booking. Please confirm that it relates to your stay and share the booking confirmation.\n\nPlease also add context for the €68.00 dinner, which is €18.00 above the international meal allowance.\n\nThank you,\nOlivia");
  const sent = status === "awaiting-clarification";
  const toggle = (value: string, values: string[], setter: (next: string[]) => void) => setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  if (sent) return <div className="screen-frame"><Rail /><div className="screen-content"><TopBar title="Request clarification" /><div className="clarification-sent"><div className="success-icon"><PaperPlaneTilt size={34} weight="fill" /></div><span className="eyebrow">Request sent</span><h1>Waiting for Maya’s response</h1><p>The claim is paused and will return to the verification queue when Maya replies.</p><div className="sent-summary"><div><span>Claim</span><strong>EXP-2841</strong></div><div><span>Response requested by</span><strong>{dueDate}</strong></div><div><span>Status</span><strong>Awaiting clarification</strong></div></div><button className="primary" onClick={onReturn}>Return to queue</button><button className="text-button" onClick={onBack}>View claim</button></div></div></div>;
  return (
    <div className="screen-frame clarification-frame"><Rail /><div className="screen-content"><TopBar title="Request clarification" onBack={onBack} /><main className="clarification-layout">
      <section className="clarification-context"><span className="eyebrow">Claim EXP-2841</span><h1>What do you need from Maya?</h1><p>Select the unresolved questions. The message draft remains fully editable before it is sent.</p><div className="context-claim"><div className="person-cell"><span>MC</span><div><strong>Maya Chen</strong><small>Operations · Berlin</small></div></div><strong>€1,248.00</strong></div>
        <fieldset className="check-group"><legend>Clarification reasons</legend>{["Possible duplicate", "Policy exception", "Missing document", "Expense purpose unclear", "Amount mismatch"].map((item) => <label key={item}><input type="checkbox" checked={reasons.includes(item)} onChange={() => toggle(item, reasons, setReasons)} /><span><Check size={13} />{item}</span></label>)}</fieldset>
        <fieldset className="check-group"><legend>Request supporting documents</legend>{["Hotel booking confirmation", "Attendee list", "Payment statement"].map((item) => <label key={item}><input type="checkbox" checked={docs.includes(item)} onChange={() => toggle(item, docs, setDocs)} /><span><Paperclip size={14} />{item}</span></label>)}</fieldset>
      </section>
      <section className="composer"><div className="composer-head"><div><span className="ai-label"><SealCheck size={16} weight="fill" /> AI-assisted draft</span><h2>Message to Maya Chen</h2></div><button className="text-button" onClick={() => setMessage("")}>Clear draft</button></div><label className="field-label">Message<textarea className="message-area" value={message} onChange={(event) => setMessage(event.target.value)} /></label><div className="composer-row"><label className="field-label">Response due<input value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></label><button className="attachment-button"><Paperclip size={18} /> Add attachment</button></div><div className="composer-footer"><span><Info size={17} /> You control and send this message.</span><div><button className="secondary">Save draft</button><button className="primary" disabled={!reasons.length || !message.trim()} onClick={() => onSend({ reasons, requestedDocuments: docs, dueDate, message })}>Send request <PaperPlaneTilt size={17} /></button></div></div></section>
    </main></div></div>
  );
}

function DecisionScreen({ duplicateAssessment, policyAssessment, reimbursable, excludedAmount, onBack, onReject, onApprove }: { duplicateAssessment: ReviewerAssessment; policyAssessment: ReviewerAssessment; reimbursable: number; excludedAmount: number; onBack: () => void; onReject: () => void; onApprove: () => void }) {
  const [acknowledged, setAcknowledged] = useState(false);
  return (
    <div className="screen-frame decision-frame"><Rail /><div className="screen-content"><TopBar title="Final decision review" onBack={onBack} /><main className="decision-page"><div className="decision-heading"><ProgressSteps reviewed={2} decision /><span className="eyebrow">Ready for your decision</span><h1>Review the final reimbursement</h1><p>AI findings have been assessed. Confirm the evidence and outcome before approving.</p></div>
      <div className="decision-grid"><section className="review-summary"><h2>Review results</h2><DecisionFinding title="Possible duplicate" result={duplicateAssessment.decision} detail={duplicateAssessment.reason} /><DecisionFinding title="Policy exception" result={policyAssessment.decision} detail={policyAssessment.adjustedAmount === 50 ? "€50.00 reimbursable · €18.00 excluded" : policyAssessment.reason} /><DecisionFinding title="Automated checks" result="6 checks passed" detail="Identity, dates, currency, document quality, merchant and totals" passed /></section>
        <aside className="reimbursement-card"><span className="eyebrow">Reimbursement</span><div><span>Submitted</span><strong>{money(claim.total)}</strong></div><div><span>Excluded</span><strong className="negative">−{money(excludedAmount)}</strong></div><i /><div className="final-amount"><span>Final reimbursement</span><strong>{money(reimbursable)}</strong></div><p><Info size={16} /> Maya will be notified of the €18.00 policy adjustment.</p></aside></div>
      <label className="acknowledgement"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} /><span><Check size={14} /></span><p>I have reviewed the supporting evidence and AI findings and am making this decision based on the available information.</p></label>
      <div className="final-actions"><button className="secondary danger" onClick={onReject}>Reject claim</button><button className="secondary" onClick={onBack}>Return to review</button><button className="primary large" disabled={!acknowledged} onClick={onApprove}>Approve {money(reimbursable)} <ArrowRight size={18} /></button></div>
    </main></div></div>
  );
}

function DecisionFinding({ title, result, detail, passed = false }: { title: string; result: string; detail: string; passed?: boolean }) {
  return <div className="decision-finding"><span className={passed ? "passed" : "reviewed"}>{passed ? <Check size={17} /> : <SealCheck size={17} />}</span><div><strong>{title}</strong><p>{detail}</p></div><span>{result}</span></div>;
}

function CompleteScreen({ reimbursable, excludedAmount, auditEvents, onNext }: { reimbursable: number; excludedAmount: number; auditEvents: AuditEvent[]; onNext: () => void }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  return (
    <div className="screen-frame complete-frame"><Rail /><div className="screen-content"><TopBar /><main className="complete-page"><div className="complete-hero"><div className="success-icon"><Check size={38} weight="bold" /></div><span className="eyebrow">Decision recorded</span><h1>Claim approved</h1><p>{money(reimbursable)} is approved for reimbursement. Maya has been notified of the policy adjustment.</p></div>
      <div className="complete-card"><div className="approved-amount"><span>Approved reimbursement</span><strong>{money(reimbursable)}</strong></div><div className="complete-details"><div><span>Submitted</span><strong>{money(claim.total)}</strong></div><div><span>Excluded under policy</span><strong>{money(excludedAmount)}</strong></div><div><span>Decision by</span><strong>{claim.reviewer}</strong></div><div><span>Recorded</span><strong>15 July 2026, 10:32</strong></div></div><div className="notification-row"><CheckCircle size={19} weight="fill" /><div><strong>Employee notification sent</strong><p>Decision details and the €18.00 adjustment were sent to Maya Chen.</p></div></div></div>
      <div className="complete-actions"><button className="secondary" onClick={() => setHistoryOpen(!historyOpen)}>View audit history {historyOpen ? <CaretUp size={16} /> : <CaretDown size={16} />}</button><button className="primary large" onClick={onNext}>Review next claim <ArrowRight size={18} /></button></div>{historyOpen && <div className="complete-timeline"><AuditTimeline events={auditEvents} /></div>}</main></div></div>
  );
}

function ReasonDialog({ onClose, onSubmit }: { onClose: () => void; onSubmit: (reason: string) => void }) {
  const [reason, setReason] = useState("");
  const reasons = ["Different employee / attendee", "Separate legitimate expense", "Shared group booking", "AI incorrectly matched"];
  return <ModalShell title="Why is this not a duplicate?" onClose={onClose}><p className="modal-intro">Your reason becomes part of the audit trail and helps improve future matching.</p><div className="reason-list">{reasons.map((item) => <label className={reason === item ? "selected" : ""} key={item}><input type="radio" name="reason" checked={reason === item} onChange={() => setReason(item)} /><span>{item}</span></label>)}</div><div className="modal-actions"><button className="secondary" onClick={onClose}>Cancel</button><button className="primary" disabled={!reason} onClick={() => onSubmit(reason)}>Resolve finding</button></div></ModalShell>;
}

function RejectDialog({ onClose, onSubmit }: { onClose: () => void; onSubmit: (reason: string) => void }) {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  return <ModalShell title="Reject claim" onClose={onClose} danger><p className="modal-intro">Maya will see the rejection reason. The internal note remains visible only to reviewers.</p><label className="field-label">Rejection reason<select value={reason} onChange={(event) => setReason(event.target.value)}><option value="">Select a reason</option><option>Confirmed duplicate expense</option><option>Unsupported business purpose</option><option>Expense outside company policy</option><option>Insufficient evidence</option></select></label><label className="field-label">Internal note<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add the evidence behind this decision" /></label><div className="modal-actions"><button className="secondary" onClick={onClose}>Cancel</button><button className="primary destructive" disabled={!reason || !note.trim()} onClick={() => onSubmit(`${reason}: ${note}`)}>Reject claim</button></div></ModalShell>;
}

function NoteDialog({ onClose, onSubmit }: { onClose: () => void; onSubmit: (note: string) => void }) {
  const [note, setNote] = useState("");
  return <ModalShell title="Add internal note" onClose={onClose}><p className="modal-intro">Only Verification Officers and Finance administrators can see this note.</p><label className="field-label">Note<textarea autoFocus value={note} onChange={(event) => setNote(event.target.value)} placeholder="Capture context for another reviewer" /></label><div className="modal-actions"><button className="secondary" onClick={onClose}>Cancel</button><button className="primary" disabled={!note.trim()} onClick={() => onSubmit(note)}>Save note</button></div></ModalShell>;
}

function ModalShell({ title, children, onClose, danger = false }: { title: string; children: React.ReactNode; onClose: () => void; danger?: boolean }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className={`modal ${danger ? "danger-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title"><header><div className="modal-icon">{danger ? <WarningCircle size={22} /> : <SealCheck size={22} />}</div><h2 id="modal-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={19} /></button></header>{children}</section></div>;
}

function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return <div className="toast" role="status"><CheckCircle size={20} weight="fill" /><span>{message}</span><button onClick={onDismiss} aria-label="Dismiss"><X size={16} /></button></div>;
}
