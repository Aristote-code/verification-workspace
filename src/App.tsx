import { useEffect, useMemo, useState } from "react";
import {
  AirplaneTakeOff01Icon,
  AiScanIcon,
  ArrowDown02Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowUp02Icon,
  BedDoubleIcon,
  Calendar01Icon,
  Cancel01Icon,
  CheckIcon,
  Copy01Icon,
  CreditCardIcon,
  Exchange01Icon,
  File01Icon,
  FilterIcon,
  Home01Icon,
  InformationCircleIcon,
  JusticeScale01Icon,
  Message01Icon,
  MinusSignIcon,
  Pdf01Icon,
  PlusSignIcon,
  Refresh01Icon,
  Restaurant01Icon,
  RotateLeft01Icon,
  RotateRight01Icon,
  Search01Icon,
  SlidersHorizontalIcon,
  SquareArrowDown01Icon,
  TaxiIcon,
  Ticket01Icon,
  UserGroupIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { FancyButton } from "./components/FancyButton";
import { Icon, type IconData } from "./components/Icon";

type IconProps = { size?: number; weight?: string; className?: string };

function FigmaIcon({
  name,
  size = 16,
  className,
  alt = "",
}: {
  name: string;
  size?: number;
  className?: string;
  alt?: string;
}) {
  return (
    <img
      alt={alt}
      className={`figma-icon${className ? ` ${className}` : ""}`}
      height={size}
      src={`/figma/icons/${name}.svg`}
      width={size}
    />
  );
}

function iconComponent(icon: IconData) {
  return function HugeIcon({ size = 16, className }: IconProps) {
    return <Icon icon={icon} size={size} className={className} />;
  };
}

const AirplaneTilt = iconComponent(AirplaneTakeOff01Icon);
const ArrowLeft = iconComponent(ArrowLeft02Icon);
const Bed = iconComponent(BedDoubleIcon);
const CalendarBlank = iconComponent(Calendar01Icon);
const CaretDown = iconComponent(ArrowDown02Icon);
const CaretRight = iconComponent(ArrowRight01Icon);
const CaretUp = iconComponent(ArrowUp02Icon);
const Check = iconComponent(CheckIcon);
const ClipboardText = iconComponent(Ticket01Icon);
const Copy = iconComponent(Copy01Icon);
const CreditCard = iconComponent(CreditCardIcon);
const FilePdf = iconComponent(Pdf01Icon);
const FileText = iconComponent(File01Icon);
const ForkKnife = iconComponent(Restaurant01Icon);
const Funnel = iconComponent(FilterIcon);
const House = iconComponent(Home01Icon);
const Info = iconComponent(InformationCircleIcon);
const MagnifyingGlass = iconComponent(Search01Icon);
const Minus = iconComponent(MinusSignIcon);
const Plus = iconComponent(PlusSignIcon);
const Scales = iconComponent(JusticeScale01Icon);
const SlidersHorizontal = iconComponent(SlidersHorizontalIcon);
const SquareArrowDown = iconComponent(SquareArrowDown01Icon);
const Taxi = iconComponent(TaxiIcon);
const User = iconComponent(UserIcon);
const Users = iconComponent(UserGroupIcon);
const X = iconComponent(Cancel01Icon);

type ReviewTab = "evidence" | "details" | "audit";
type Screen = "queue" | ReviewTab | "clarify" | "decision";
type Overlay = "none" | "policy" | "compare" | "approved" | "reject";

const expenses = [
  { id: "hotel", merchant: "Riverside Grand Hotel", icon: Bed, date: "8–10 May 2026", amount: "RWF 1,092,000", state: "Possible duplicate", tone: "danger" },
  { id: "taxi", merchant: "CityCab", icon: Taxi, date: "8 May 2026", amount: "RWF 95,200", state: "Verified", tone: "success" },
  { id: "meal", merchant: "The Foundry Kitchen", icon: ForkKnife, date: "9 May 2026", amount: "RWF 95,200", state: "Policy exception", tone: "warning" },
  { id: "flight", merchant: "Lufthansa", icon: AirplaneTilt, date: "12 May 2026", amount: "RWF 464,800", state: "Verified", tone: "success" },
] as const;

type ExpenseId = typeof expenses[number]["id"];

const expenseDocuments: Record<ExpenseId, {
  title: string;
  id: string;
  avif?: string;
  image: string;
  alt: string;
}> = {
  hotel: {
    title: "Riverside Grand Hotel — Invoice RGH-847362",
    id: "DOC-847362",
    avif: "/assets/hotel-jonas.avif",
    image: "/figma/hotel-jonas.png",
    alt: "Riverside Grand Hotel invoice",
  },
  taxi: {
    title: "CityCab — Receipt CC-LHR-80526-7481",
    id: "DOC-CC7481",
    avif: "/assets/taxi.avif",
    image: "/assets/taxi.png",
    alt: "CityCab airport transfer receipt",
  },
  meal: {
    title: "The Foundry Kitchen — Receipt FK-090526-4817",
    id: "DOC-FK4817",
    avif: "/assets/dinner.avif",
    image: "/assets/dinner.png",
    alt: "The Foundry Kitchen dinner receipt",
  },
  flight: {
    title: "Lufthansa — E-ticket LH6K2P",
    id: "DOC-LH6K2P",
    avif: "/assets/flight.avif",
    image: "/assets/flight.png",
    alt: "Lufthansa flight e-ticket",
  },
};

const queueRows = [
  ["Daniel Uwimana", "D", "EXP-3012", "Kigali office supplies", "02 March 2026", "RWF 980,000", "All checks passed", "Needs review"],
  ["Jean-Paul Habimana", "J", "EXP-3018", "Team building event", "14 March 2026", "RWF 2,150,000", "All checks passed", "Employee responded"],
  ["Aline Mukiza", "A", "EXP-3015", "Client entertainment", "08 March 2026", "RWF 1,450,000", "4 findings", "Needs review"],
  ["Claudine Ishimwe", "C", "EXP-3021", "Travel reimbursement", "19 March 2026", "RWF 675,000", "3 findings", "Employee responded"],
  ["Patrick Niyonzima", "P", "EXP-3024", "Software licences", "25 March 2026", "RWF 3,200,000", "All checks passed", "Resolved"],
  ["Grace Uwase", "G", "EXP-3027", "Conference registration", "03 April 2026", "RWF 1,850,000", "2 findings", "Needs review"],
  ["Sandra Kamanzi", "S", "EXP-3033", "Marketing materials", "22 April 2026", "RWF 520,000", "1 finding", "Ready"],
  ["Eric Mugisha", "E", "EXP-3030", "Equipment purchase", "11 April 2026", "RWF 4,500,000", "3 findings", "Needs review"],
  ["Robert Nsengimana", "R", "EXP-3036", "Office renovation", "05 May 2026", "RWF 1,100,000", "All checks passed", "Resolved"],
  ["Marie Ingabire", "M", "EXP-3039", "Training workshop", "18 May 2026", "RWF 2,750,000", "Response received", "Employee responded"],
  ["Thierry Bizimana", "T", "EXP-3042", "Vehicle maintenance", "29 May 2026", "RWF 1,320,000", "6 findings", "Needs review"],
  ["Francine Mutoni", "F", "EXP-3045", "Internet services", "07 June 2026", "RWF 5,600,000", "Response received", "Employee responded"],
  ["Bernard Rukundo", "B", "EXP-3048", "Security upgrade", "15 June 2026", "RWF 2,080,000", "All checks passed", "Ready"],
] as const;

const avatarGradients = [
  "linear-gradient(135deg, #80d9e5 0%, #59a6d9 70.711%)",
  "linear-gradient(135deg, #ffb273 0%, #f28073 70.711%)",
  "linear-gradient(135deg, #e58bd2 0%, #d968b6 70.711%)",
  "linear-gradient(135deg, #66d9c2 0%, #46bfa6 70.711%)",
  "linear-gradient(135deg, #738cf2 0%, #9966d9 70.711%)",
  "linear-gradient(135deg, #e58bd2 0%, #d968c8 70.711%)",
  "linear-gradient(135deg, #f2c15e 0%, #f2a65a 70.711%)",
  "linear-gradient(135deg, #f28b9d 0%, #e56899 70.711%)",
  "linear-gradient(135deg, #80d9e5 0%, #59a6d9 70.711%)",
  "linear-gradient(135deg, #ff9d80 0%, #f27c73 70.711%)",
  "linear-gradient(135deg, #e58bd2 0%, #d968b6 70.711%)",
  "linear-gradient(135deg, #ff9999 0%, #e573b2 70.711%)",
  "linear-gradient(135deg, #738cf2 0%, #9966d9 70.711%)",
];

export function App() {
  const initial = (window.location.hash.slice(1) || "queue") as Screen | Overlay;
  const screens: Screen[] = ["queue", "evidence", "details", "audit", "clarify", "decision"];
  const overlays: Overlay[] = ["policy", "compare", "approved", "reject"];
  const [screen, setScreen] = useState<Screen>(screens.includes(initial as Screen) ? initial as Screen : "queue");
  const [overlay, setOverlay] = useState<Overlay>(overlays.includes(initial as Overlay) ? initial as Overlay : "none");
  const [selectedExpense, setSelectedExpense] = useState<ExpenseId>("hotel");
  const [zoom, setZoom] = useState(92);

  const navigate = (next: Screen | Overlay) => {
    if (overlays.includes(next as Overlay)) {
      setOverlay(next as Overlay);
      if (screen === "queue") setScreen("evidence");
    } else {
      setScreen(next as Screen);
      setOverlay("none");
    }
    window.location.hash = next;
  };

  useEffect(() => {
    const onHash = () => {
      const next = (window.location.hash.slice(1) || "queue") as Screen | Overlay;
      if (overlays.includes(next as Overlay)) {
        setOverlay(next as Overlay);
        setScreen("evidence");
      } else {
        setScreen(next as Screen);
        setOverlay("none");
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className={`app${overlay !== "none" ? ` overlay-${overlay}` : ""}`}>
      {screen === "queue" ? (
        <Queue onOpen={() => { setSelectedExpense("hotel"); navigate("evidence"); }} />
      ) : screen === "clarify" ? (
        <>
          <ReviewShell
            screen="evidence"
            selectedExpense={selectedExpense}
            zoom={zoom}
            onZoom={setZoom}
            onSelectExpense={setSelectedExpense}
            onNavigate={navigate}
          />
          <ClarificationModal onClose={() => navigate("evidence")} onReturn={() => navigate("queue")} />
        </>
      ) : screen === "decision" ? (
        <>
          <ReviewShell
            screen="evidence"
            selectedExpense={selectedExpense}
            zoom={zoom}
            onZoom={setZoom}
            onSelectExpense={setSelectedExpense}
            onNavigate={navigate}
          />
          {overlay === "none" && <DecisionModal onBack={() => navigate("evidence")} onApprove={() => navigate("approved")} onReject={() => navigate("reject")} />}
        </>
      ) : (
        <ReviewShell
          screen={screen as ReviewTab}
          selectedExpense={selectedExpense}
          zoom={zoom}
          onZoom={setZoom}
          onSelectExpense={setSelectedExpense}
          onNavigate={navigate}
        />
      )}
      {overlay === "policy" && <PolicyOverlay onClose={() => navigate("evidence")} />}
      {overlay === "compare" && <ComparisonOverlay onClose={() => navigate("evidence")} />}
      {overlay === "approved" && <ApprovedOverlay onNext={() => navigate("queue")} />}
      {overlay === "reject" && <RejectOverlay onClose={() => navigate("decision")} onDone={() => navigate("queue")} />}
    </div>
  );
}

function Rail({ onQueue }: { onQueue?: () => void }) {
  return (
    <aside className="rail">
      <button className="brand" aria-label="Zemo" onClick={onQueue}>
        <FigmaIcon name="zemo-logo" size={20} />
      </button>
      <nav aria-label="Primary navigation">
        <button aria-label="Home" data-tooltip="Home"><FigmaIcon name="home" /></button>
        <button className="active" aria-label="Claims" data-tooltip="Claims"><FigmaIcon name="ticket" /></button>
        <button aria-label="Messages" data-tooltip="Messages"><FigmaIcon name="chat" /></button>
      </nav>
      <button className="profile" aria-label="Profile" data-tooltip="Profile"><FigmaIcon name="user" /></button>
    </aside>
  );
}

function Queue({ onOpen }: { onOpen: () => void }) {
  const [search, setSearch] = useState("");
  const rows = useMemo(
    () => queueRows.filter((row) => `${row[0]} ${row[2]} ${row[3]}`.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <div className="queue-screen">
      <Rail />
      <main className="queue-main">
        <header className="queue-heading">
          <div>
            <h1>Verification Queue</h1>
            <p>Review and verify employee expense claims.</p>
          </div>
          <div className="queue-counts">
            <strong>138</strong><span>Claims awaiting</span><i />
            <strong>23</strong><span>Claims completed</span>
          </div>
        </header>
        <div className="queue-toolbar">
          <label className="search-control">
            <FigmaIcon name="search" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Claims" />
            <kbd>⌘</kbd><kbd>P</kbd>
          </label>
          <div className="queue-filters">
            <button className="control-button">
              <FigmaIcon name="status-filter" />
              All Statuses
            </button>
            <button className="control-button">
              <FigmaIcon name="filter" />
              All risks
            </button>
          </div>
        </div>
        <div className="queue-table">
          <div className="queue-row queue-table-head">
            <span>Employee</span>
            <span>Claim</span>
            <span>Submitted <FigmaIcon name="sort" /></span>
            <span>Amount <FigmaIcon name="sort" /></span>
            <span>AI review</span>
            <span>Status</span>
          </div>
          {rows.map((row, index) => (
            <button className="queue-row" key={row[2]} onClick={onOpen}>
              <span className="employee-cell">
                <i style={{ backgroundImage: avatarGradients[index % avatarGradients.length] }}>{row[1]}</i>
                <b>{row[0]}</b>
                {[1, 3, 9, 11].includes(index) && <em><FigmaIcon name="message" size={10} /></em>}
              </span>
              <span className="claim-cell"><b>{row[2]}</b><small>{row[3]}</small></span>
              <span>{row[4]}</span>
              <span className="mono">{row[5]}</span>
              <ReviewBadge value={row[6]} />
              <StatusBadge value={row[7]} />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

function ReviewBadge({ value }: { value: string }) {
  const pass = value.includes("passed");
  const response = value.includes("Response");
  return <span className={`inline-status ${pass ? "green" : response ? "orange" : "amber"}`}>
    <i><FigmaIcon name={pass ? "check-square" : response ? "mail-validation" : "resolved"} size={18} /></i>
    {value}
  </span>;
}

function StatusBadge({ value }: { value: string }) {
  const tone = value === "Resolved" ? "mint" : value === "Ready" ? "lavender" : value.includes("responded") ? "peach" : "cream";
  const icon = value === "Resolved" ? "status-secondary" : value === "Ready" ? "minus-circle" : value.includes("responded") ? "mail" : "status-review";
  return <span><i className={`status-pill ${tone}`}><FigmaIcon name={icon} size={12} />{value}</i></span>;
}

type Navigate = (next: Screen | Overlay) => void;

function ReviewShell({
  screen,
  selectedExpense,
  zoom,
  onZoom,
  onSelectExpense,
  onNavigate,
}: {
  screen: ReviewTab;
  selectedExpense: ExpenseId;
  zoom: number;
  onZoom: (zoom: number) => void;
  onSelectExpense: (id: ExpenseId) => void;
  onNavigate: Navigate;
}) {
  return (
    <div className="review-screen" data-screen={screen}>
      <Rail onQueue={() => onNavigate("queue")} />
      <ClaimHeader onBack={() => onNavigate("queue")} />
      <main className="review-grid">
        <ExpensePanel selected={selectedExpense} onSelect={onSelectExpense} />
        <section className="evidence-panel">
          <div className="tabs">
            <button className={screen === "evidence" ? "active" : ""} onClick={() => onNavigate("evidence")}>Evidence</button>
            <button className={screen === "details" ? "active" : ""} onClick={() => onNavigate("details")}>Extracted details</button>
            <button className={screen === "audit" ? "active" : ""} onClick={() => onNavigate("audit")}>Audit trail</button>
          </div>
          {screen === "evidence" && <EvidenceView expense={selectedExpense} zoom={zoom} onZoom={onZoom} />}
          {screen === "details" && <ExtractedDetails expense={selectedExpense} />}
          {screen === "audit" && <AuditTrail />}
        </section>
        <ReviewPanel selected={selectedExpense} onNavigate={onNavigate} />
      </main>
    </div>
  );
}

function ClaimHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="review-header">
      <div className="claim-nav">
        <div className="claim-controls">
          <button onClick={onBack} aria-label="Back"><ArrowLeft size={14} /></button>
          <span className="nav-pair">
            <button aria-label="Previous claim"><SquareArrowDown className="rotate-180" size={14} /></button>
            <button aria-label="Next claim"><SquareArrowDown size={14} /></button>
          </span>
        </div>
        <span>23 of 138 claims</span>
      </div>
      <div className="claim-person">
        <span className="claim-avatar">J</span>
        <div>
          <strong>Jean-Paul Habimana</strong>
          <small><FigmaIcon name="scroll" size={11} /> Claim EXP-2841 · <FigmaIcon name="location" size={11} /> London workshop · 8–12 May 2026</small>
        </div>
      </div>
      <div className="requested"><span>Total requested</span><strong>RWF&nbsp; 1,747,200</strong></div>
    </header>
  );
}

function ExpensePanel({ selected, onSelect }: { selected: ExpenseId; onSelect: (id: ExpenseId) => void }) {
  return (
    <aside className="expense-panel">
      <div>
        <header><strong>Expenses (4)</strong><span>2 findings</span></header>
        <div className="expense-list">
          {expenses.map(({ id, merchant, date, amount, state, tone }) => (
            <button className={`expense ${selected === id ? "selected" : ""}`} key={id} onClick={() => onSelect(id)}>
              <span className="expense-icon">
                {id === "hotel"
                  ? <Bed size={18} />
                  : <FigmaIcon
                      className={id === "meal" ? "source-mirrored" : undefined}
                      name={id === "taxi" ? "car" : id === "meal" ? "meal" : "flight"}
                      size={18}
                    />}
              </span>
              <span className="expense-copy"><strong>{merchant}</strong><small>{date}</small><em className={tone}><i><FigmaIcon name={tone === "success" ? "status-secondary" : tone === "danger" ? "copy" : "receipt"} size={tone === "success" ? 10 : 14} /></i>{state}</em></span>
              <span className="expense-amount">{amount.replace(" ", "\u00a0")}</span>
            </button>
          ))}
        </div>
      </div>
      <footer>
        <span>Total submitted <b>RWF&nbsp; 1,747,200</b></span>
        <span>Documents <b>4 of 4</b></span>
      </footer>
    </aside>
  );
}

function EvidenceView({ expense, zoom, onZoom }: { expense: ExpenseId; zoom: number; onZoom: (zoom: number) => void }) {
  const document = expenseDocuments[expense];
  return (
    <div className="evidence-view">
      <DocumentTitle expense={expense} />
      <div className="document-stage">
        <div className="viewer-tools">
          <button onClick={() => onZoom(Math.max(50, zoom - 8))}><Minus size={15} /></button>
          <span>{zoom}%</span>
          <button onClick={() => onZoom(Math.min(130, zoom + 8))}><Plus size={15} /></button>
          <i />
          <button aria-label="Rotate right"><Icon icon={RotateRight01Icon} size={15} /></button>
          <i />
          <button aria-label="Rotate left"><Icon icon={RotateLeft01Icon} size={15} /></button>
          <i />
          <button><Icon icon={AiScanIcon} size={15} /> OCR</button>
        </div>
        <picture className="invoice-picture" style={{ width: `${Math.min(96, zoom * 1.02)}%` }}>
          {document.avif && <source srcSet={document.avif} type="image/avif" />}
          <img className="invoice invoice-main" src={document.image} alt={document.alt} />
        </picture>
      </div>
    </div>
  );
}

function DocumentTitle({ expense }: { expense: ExpenseId }) {
  const document = expenseDocuments[expense];
  return (
    <div className="document-title">
      <div><strong>{document.title}</strong><small>1 of 1 · {document.id}</small></div>
      <span><FileText size={13} weight="fill" /> Data extracted</span>
    </div>
  );
}

function ExtractedDetails({ expense }: { expense: ExpenseId }) {
  return (
    <div className="details-view">
      <DocumentTitle expense={expense} />
      <div className="details-content">
        <h2>Extracted details</h2>
        {expense === "hotel" && <>
          <DetailRow icon={Bed} label="Hotel" value={<span>Riverside Grand Hotel</span>} />
          <DetailRow icon="detail-calendar" label="Stay dates" value={<mark>8–10 May 2026</mark>} />
          <DetailRow icon="detail-card" label="Nightly rate" value={<span>RWF 546,000</span>} />
          <DetailRow icon="detail-user" label="Guest" value={<><mark className="blue"><i className="chip-avatar maya">J</i>Jean-Paul</mark><mark className="violet"><i className="chip-avatar jonas">J</i>Jonas W.</mark></>} />
          <DetailRow icon="detail-scroll" label="Room" value={<><mark className="amber">#4820</mark><mark className="mint">#4819</mark></>} />
          <DetailRow icon="detail-money" label="Invoice" value={<><mark className="amber">#847362</mark><mark className="mint">#847351</mark></>} />
          <DetailRow icon="detail-money" label="Payment reference" value={<span>7733 / 1099</span>} />
        </>}
        {expense === "taxi" && <>
          <DetailRow icon={Taxi} label="Provider" value={<span>CityCab</span>} />
          <DetailRow icon="detail-calendar" label="Trip date" value={<mark>8 May 2026, 18:42</mark>} />
          <DetailRow icon="detail-scroll" label="Route" value={<span>LHR → Riverside Grand Hotel</span>} />
          <DetailRow icon="detail-card" label="Fare" value={<span>RWF 95,200</span>} />
          <DetailRow icon="detail-user" label="Passenger" value={<mark className="blue"><i className="chip-avatar maya">J</i>Jean-Paul</mark>} />
          <DetailRow icon="detail-money" label="Reference" value={<span>CC-LHR-80526-7481</span>} />
        </>}
        {expense === "meal" && <>
          <DetailRow icon={ForkKnife} label="Restaurant" value={<span>The Foundry Kitchen</span>} />
          <DetailRow icon="detail-calendar" label="Date" value={<mark>9 May 2026, 20:14</mark>} />
          <DetailRow icon="detail-scroll" label="Category" value={<span>Business dinner · 4 attendees</span>} />
          <DetailRow icon="detail-card" label="Submitted" value={<mark className="amber">RWF 95,200</mark>} />
          <DetailRow icon="detail-money" label="Policy limit" value={<mark className="mint">RWF 70,000</mark>} />
          <DetailRow icon="detail-money" label="Difference" value={<span>+RWF 25,200</span>} />
        </>}
        {expense === "flight" && <>
          <DetailRow icon={AirplaneTilt} label="Airline" value={<span>Lufthansa</span>} />
          <DetailRow icon="detail-calendar" label="Travel date" value={<mark>12 May 2026, 17:25</mark>} />
          <DetailRow icon="detail-scroll" label="Route" value={<span>London Heathrow → Kigali</span>} />
          <DetailRow icon="detail-card" label="Fare" value={<span>RWF 464,800</span>} />
          <DetailRow icon="detail-user" label="Passenger" value={<mark className="blue"><i className="chip-avatar maya">J</i>Jean-Paul</mark>} />
          <DetailRow icon="detail-money" label="Booking reference" value={<span>LH6K2P</span>} />
        </>}
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: string | React.ComponentType<IconProps>; label: string; value: React.ReactNode }) {
  const RowIcon = typeof icon === "string" ? null : icon;
  return <div className="detail-row"><i>{RowIcon ? <RowIcon size={16} /> : <FigmaIcon name={icon as string} size={16} />}</i><b>{label}</b><div>{value}</div></div>;
}

function AuditTrail() {
  const events = [
    ["G", "linear-gradient(135deg,#80e5c4 0%,#4cc6a8 70.711%)", "Grace Uwase", "10 mins ago", "Submitted claim EXP-3027 for review"],
    ["D", "linear-gradient(135deg,#80d9e5 0%,#59a6d9 70.711%)", "Daniel Uwimana", "25 mins ago", "Approved claim EXP-3012 by Aline Mukiza"],
    ["P", "linear-gradient(135deg,#8e82ee 0%,#7961d6 70.711%)", "Patrick Niyonzima", "1 hour ago", "Attached a receipt to claim EXP-3024"],
    ["T", "linear-gradient(135deg,#f58ec0 0%,#e56ba0 70.711%)", "Thierry Bizimana", "6 hours ago", "Responded to claim EXP-3042"],
    ["E", "linear-gradient(135deg,#ff9b80 0%,#f27c73 70.711%)", "Eric Mugisha", "2 hours ago", "Attached a receipt to claim EXP-3030"],
    ["C", "linear-gradient(135deg,#ff9b80 0%,#f27c73 70.711%)", "Claudine Ishimwe", "3 hours ago", "Flagged 3 findings on claim EXP-3021"],
    ["S", "linear-gradient(135deg,#ffd06b 0%,#f2ad43 70.711%)", "Sandra Kamanzi", "4 hours ago", "Tagged claim EXP-3033 with categories"],
  ] as const;
  return (
    <div className="audit-view">
      <h2>Audit trail</h2>
      <div className="timeline">
        {events.map((event, index) => (
          <div
            className={`timeline-event${index === 2 || index === 4 ? " has-attachment" : index === 3 ? " has-quote" : index === 5 ? " has-tags" : ""}`}
            key={event[2]}
          >
            <i style={{ backgroundImage: event[1] }}>{event[0]}</i>
            <div><strong>{event[2]} <small>{event[3]}</small></strong><p>{event[4]}</p>
              {index === 2 && <PdfAttachment file="Hotel_invoice_March.pdf" size="1.2 MB" />}
              {index === 3 && <blockquote>“I have uploaded the updated mileage log and fuel receipts for the vehicle maintenance claim.”</blockquote>}
              {index === 4 && <PdfAttachment file="Equipment_receipt.pdf" size="845 KB" />}
              {index === 5 && <span className="audit-tags"><em>Duplicate</em><em>Over limit</em><em>Missing receipt</em></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PdfAttachment({ file, size }: { file: string; size: string }) {
  return (
    <span className="pdf-attachment">
      <span className="pdf-page">
        <FigmaIcon name="page" size={40} />
        <em>PDF</em>
      </span>
      <b>{file}<small>{size}</small></b>
    </span>
  );
}

function ReviewPanel({ selected, onNavigate }: { selected: ExpenseId; onNavigate: Navigate }) {
  return (
    <aside className="review-panel">
      <div>
        <Progress />
        {selected === "hotel" && <FindingCard title="Possible duplicate" confidence="82% confidence" onClick={() => onNavigate("compare")}>
          <div className="signals">
            <div>
              <strong>Matching signals</strong>
              <span><Bed size={12} /> Hotel</span>
              <span><FigmaIcon name="signal-calendar" size={12} /> Conference dates</span>
              <span><FigmaIcon name="signal-card" size={12} /> Nightly rate</span>
            </div>
            <div>
              <strong>Conflicting signals</strong>
              <span><FigmaIcon name="signal-user" size={12} /> Guest</span>
              <span><FigmaIcon name="signal-scroll" size={12} /> Room &amp; invoice</span>
              <span><FigmaIcon name="signal-money" size={12} /> Payment reference</span>
            </div>
          </div>
        </FindingCard>}
        {selected === "meal" && <FindingCard title="Policy exception" confidence="92% confidence" onClick={() => onNavigate("policy")}>
          <div className="policy-stats"><span>Submitted<b>RWF&nbsp; 95,200</b></span><span>Policy limit<b>RWF&nbsp; 70,000</b></span><span>Above limit<b>+RWF&nbsp; 25,200</b></span></div>
        </FindingCard>}
        {selected === "taxi" && <VerifiedExpenseCard title="CityCab receipt verified" />}
        {selected === "flight" && <VerifiedExpenseCard title="Lufthansa e-ticket verified" />}
      </div>
      <footer>
        <FancyButton.Root variant="basic" onClick={() => onNavigate("clarify")}>Clarification</FancyButton.Root>
        <FancyButton.Root variant="destructive" onClick={() => onNavigate("decision")}>Reject Claim</FancyButton.Root>
        <FancyButton.Root variant="success" onClick={() => onNavigate("decision")}>Approve Claim</FancyButton.Root>
      </footer>
    </aside>
  );
}

function VerifiedExpenseCard({ title }: { title: string }) {
  return (
    <article className="verified-expense-card">
      <header><i><FigmaIcon name="check-square" size={18} /></i><div><strong>{title}</strong><span>No findings require attention</span></div></header>
      <div>
        <span><FigmaIcon name="status-secondary" size={12} /> Receipt data matched</span>
        <span><FigmaIcon name="status-secondary" size={12} /> No duplicate found</span>
        <span><FigmaIcon name="status-secondary" size={12} /> Policy requirements met</span>
      </div>
      <footer>All automated checks passed</footer>
    </article>
  );
}

function Progress({ stage = "findings" }: { stage?: "findings" | "decision" }) {
  return <div className={`progress progress--${stage}`} data-node-id="6144:4677">
    <img aria-hidden="true" className="progress-connector progress-connector--left" src="/figma/progress/connector-left.svg" />
    <img aria-hidden="true" className="progress-connector progress-connector--right" src="/figma/progress/connector-right.svg" />

    <div className="progress-step progress-step--review done">
      <i className="progress-icon">
        <span className="progress-icon-core">
          <img aria-hidden="true" src="/figma/progress/review-evidence.svg" />
        </span>
      </i>
      <span>Review evidence</span>
    </div>

    <div className={`progress-step progress-step--resolve ${stage === "decision" ? "done" : "current"}`}>
      <i className="progress-icon">
        <span className="progress-icon-core">
          <img aria-hidden="true" src={stage === "decision" ? "/figma/progress/review-evidence.svg" : "/figma/progress/resolve-findings.svg"} />
        </span>
      </i>
      <span>Resolve findings</span>
    </div>

    <div className={`progress-step progress-step--decision ${stage === "decision" ? "current" : "upcoming"}`}>
      <i className="progress-icon">
        <span className="progress-icon-core">
          <img aria-hidden="true" src="/figma/progress/make-decision.svg" />
        </span>
      </i>
      <span>Make decision</span>
    </div>
  </div>;
}

function FindingCard({ title, confidence, onClick, children }: { title: string; confidence: string; onClick: () => void; children: React.ReactNode }) {
  return <article className="finding-card">
    <header><strong>{title}</strong><span>{confidence}</span></header>
    {children}
    <button onClick={onClick}>Make decision <CaretRight size={13} /></button>
  </article>;
}

function PolicyOverlay({ onClose }: { onClose: () => void }) {
  const [choice, setChoice] = useState("limit");
  return (
    <div className="overlay">
      <section className="policy-modal">
        <header><span className="modal-title-icon"><FigmaIcon name="policy-title" size={22} /></span><h1>Meal allowance exceeded</h1><button onClick={onClose}><X size={22} /></button></header>
        <div className="policy-body">
          <h2>Employee Context</h2>
          <div className="context-list">
            <ContextRow icon="policy-purpose" label="Purpose" value="Dinner with regional implementation partners" />
            <ContextRow icon="policy-attendees" label="Attendees" value="4 attendees" />
            <ContextRow icon="policy-money" label="Paid by" value="Receipt paid in full by Maya" />
            <ContextRow icon="policy-history" label="History" value="2 prior approved exceptions this quarter" />
          </div>
          <div className="amount-comparison"><span>Submitted<b>RWF&nbsp; 95,200</b></span><span>Policy limit<b>RWF&nbsp; 70,000</b></span><span>Difference<b>+RWF&nbsp; 25,200</b></span></div>
          <article className="policy-note"><FigmaIcon name="policy-file" size={24} /><div><strong>International evening meal allowance</strong><small>Effective 1 January 2026</small></div><button>View full policy</button><p>“Employees travelling internationally may claim up to RWF 70,000 per person for an evening meal. Documented business-hosting exceptions require reviewer justification.”</p></article>
          <h3>Reviewer decision</h3>
          <div className="radio-list">
            <Radio checked={choice === "limit"} onClick={() => setChoice("limit")} title="Reimburse policy limit only" detail="Approve RWF 70,000 and exclude RWF 25,200" />
            <Radio checked={choice === "exception"} onClick={() => setChoice("exception")} title="Accept as a valid exception" detail="Reimburse the full RWF 95,200 with justification" />
            <Radio checked={choice === "noncompliant"} onClick={() => setChoice("noncompliant")} title="Mark as noncompliant" detail="Exclude the full expense" />
          </div>
        </div>
        <footer>
          <FancyButton.Root variant="basic">Request clarification</FancyButton.Root>
          <FancyButton.Root variant="primary" onClick={onClose}>Save decision</FancyButton.Root>
        </footer>
      </section>
    </div>
  );
}

function ContextRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return <div><i><FigmaIcon name={icon} size={16} /></i><b>{label}</b><span>{value}</span></div>;
}

function Radio({ checked, onClick, title, detail }: { checked: boolean; onClick: () => void; title: string; detail: string }) {
  return <button className={checked ? "checked" : ""} onClick={onClick}><i>{checked && <FigmaIcon name="policy-radio" size={14} />}</i><span><strong>{title}</strong><small>{detail}</small></span></button>;
}

function ComparisonOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="overlay">
      <section className="compare-modal">
        <header><span className="modal-title-icon"><FigmaIcon name="compare-title" size={31} /></span><h1>Compare the supporting evidence</h1><button onClick={onClose}><X size={22} /></button></header>
        <main>
          <div className="compare-document">
            <div className="compare-label"><span>Current claim</span><strong>Maya Chen · EXP-2841 · RGH-847362</strong></div>
            <img src="/figma/hotel-maya.png" alt="Current claim hotel invoice" />
          </div>
          <div className="compare-document">
            <div className="compare-label"><span>Potential match</span><strong>Jonas Weber · EXP-2798 · RGH-847351</strong></div>
            <img src="/figma/hotel-jonas.png" alt="Potential matching hotel invoice" />
          </div>
          <div className="comparison-facts">
            <h2>Similarities</h2>
            <DetailRow icon={Bed} label="Hotel" value={<span>Riverside Grand Hotel</span>} />
            <DetailRow icon="signal-calendar" label="Stay dates" value={<mark>05 Sep 2025, 10:32 AM</mark>} />
            <DetailRow icon="signal-card" label="Nightly rate" value={<span>RWF 546,000</span>} />
            <h2>Differences</h2>
            <DetailRow icon="signal-user" label="Guest" value={<><mark className="blue"><i className="chip-avatar maya">M</i>Maya Chen</mark><mark className="violet"><i className="chip-avatar jonas">J</i>Jonas W.</mark></>} />
            <DetailRow icon="signal-scroll" label="Room" value={<><mark className="amber">#4820</mark><mark className="mint">#4819</mark></>} />
            <DetailRow icon="signal-card" label="Invoice" value={<><mark className="amber">#847362</mark><mark className="mint">#847351</mark></>} />
            <DetailRow icon="signal-money" label="Payment reference" value={<span>7733 / 1099</span>} />
          </div>
          <div className="sync-zoom"><Minus size={15} /><span>64% · Synchronized zoom</span><Plus size={15} /></div>
        </main>
        <footer>
          <FancyButton.Root variant="basic" onClick={onClose}>Confirm</FancyButton.Root>
          <FancyButton.Root variant="basic">Request clarification</FancyButton.Root>
          <FancyButton.Root variant="primary" onClick={onClose}>Not a duplicate</FancyButton.Root>
        </footer>
      </section>
    </div>
  );
}

function ApprovedOverlay({ onNext }: { onNext: () => void }) {
  return (
    <div className="overlay approved-overlay">
      <section className="approved-modal">
        <div className="approved-icon"><img src="/figma/success-icon.svg" alt="" /></div>
        <h1>Claim approved</h1>
        <p>RWF 1,722,000 is approved for reimbursement.<br />Maya has been notified of the policy adjustment.</p>
        <article>
          <header><strong>Approved reimbursement</strong><b>RWF&nbsp; 1,722,000</b></header>
          <div><span>Submitted</span><strong>RWF 1,747,200</strong></div>
          <div><span>Excluded under policy</span><strong>RWF 25,200</strong></div>
          <div><span>Decision by</span><strong>Olivia Harper</strong></div>
          <div><span>Recorded</span><strong>15 July 2026, 10:32</strong></div>
        </article>
        <div className="notification"><Info size={17} weight="fill" /><div><strong>Employee notification sent</strong><span>Decision details and the RWF 25,200 adjustment were sent to Maya Chen.</span></div></div>
        <FancyButton.Root variant="success" className="next-claim" onClick={onNext}>
          Review next claim
          <FancyButton.Icon><CaretRight size={16} /></FancyButton.Icon>
        </FancyButton.Root>
      </section>
    </div>
  );
}

function FlowPageShell({ children, onBack }: { children: React.ReactNode; onBack: () => void }) {
  return (
    <div className="flow-screen">
      <Rail onQueue={onBack} />
      <ClaimHeader onBack={onBack} />
      {children}
    </div>
  );
}

function ClarificationModal({ onClose, onReturn }: { onClose: () => void; onReturn: () => void }) {
  const [sent, setSent] = useState(false);
  const [reasons, setReasons] = useState(["Possible duplicate", "Policy exception"]);
  const [documents, setDocuments] = useState(["Hotel booking confirmation"]);
  const [dueDate, setDueDate] = useState("18 July 2026");
  const [openDropdown, setOpenDropdown] = useState<"reasons" | "documents" | null>(null);
  const [message, setMessage] = useState(
    "Hello Jean-Paul,\n\nWe need a little more information before completing our review of claim EXP-2841. The hotel invoice appears similar to another conference booking. Please confirm that it relates to your stay and share the booking confirmation.\n\nPlease also add context for the RWF 95,200 dinner, which is RWF 25,200 above the international meal allowance.\n\nThank you,\nOlivia",
  );

  const toggle = (value: string, values: string[], setValues: (next: string[]) => void) => {
    setValues(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  if (sent) {
    return (
      <div className="overlay clarification-overlay">
        <section className="clarification-modal clarification-complete" role="dialog" aria-modal="true" aria-labelledby="clarification-success-title">
          <button className="clarification-close" aria-label="Close clarification confirmation" onClick={onClose}><X size={20} /></button>
          <div className="clarification-success-icon"><FigmaIcon name="mail-validation" size={34} /></div>
          <span className="flow-eyebrow">Request sent</span>
          <h1 id="clarification-success-title">Waiting for Jean-Paul’s response</h1>
          <p>The claim is paused and will return to the verification queue when the employee replies.</p>
          <div className="clarification-summary">
            <span><small>Claim</small><strong>EXP-2841</strong></span>
            <span><small>Response requested by</small><strong>{dueDate}</strong></span>
            <span><small>Status</small><strong>Awaiting clarification</strong></span>
          </div>
          <div className="flow-complete-actions">
            <FancyButton.Root variant="basic" onClick={onClose}>View claim</FancyButton.Root>
            <FancyButton.Root variant="primary" onClick={onReturn}>Return to queue</FancyButton.Root>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="overlay clarification-overlay">
      <section className="clarification-modal" role="dialog" aria-modal="true" aria-labelledby="clarification-title">
        <header>
          <div className="clarification-heading">
            <h1 id="clarification-title">Request clarification</h1>
            <p>Message to Jean-Paul Habimana · Claim EXP-2841</p>
          </div>
          <button className="clarification-close" aria-label="Close clarification request" onClick={onClose}><X size={20} /></button>
        </header>

        <div className="clarification-modal-body">
          <article className="clarification-claim-context">
            <span className="claim-avatar">J</span>
            <div><strong>Jean-Paul Habimana</strong><small>Operations · Kigali</small></div>
            <b>RWF&nbsp; 1,747,200</b>
          </article>

          <div className="clarification-dropdown-grid">
            <ClarificationDropdown
              title="Clarification reasons"
              placeholder="Select reasons"
              options={["Possible duplicate", "Policy exception", "Missing document", "Expense purpose unclear", "Amount mismatch"]}
              selected={reasons}
              onToggle={(item) => toggle(item, reasons, setReasons)}
              icon="copy"
              open={openDropdown === "reasons"}
              onOpenChange={(open) => setOpenDropdown(open ? "reasons" : null)}
            />
            <ClarificationDropdown
              title="Request supporting documents"
              placeholder="Select documents"
              options={["Hotel booking confirmation", "Attendee list", "Payment statement"]}
              selected={documents}
              onToggle={(item) => toggle(item, documents, setDocuments)}
              icon="page"
              open={openDropdown === "documents"}
              onOpenChange={(open) => setOpenDropdown(open ? "documents" : null)}
            />
          </div>

          <label className="flow-field clarification-message">
            <span>Message</span>
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
          </label>

          <div className="composer-controls">
            <label className="flow-field"><span>Response due</span><input value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></label>
            <button className="attachment-control"><FigmaIcon name="page" size={17} /> Add attachment</button>
          </div>
        </div>
        <footer className="clarification-footer">
          <span><Info size={16} /> You control and send this message.</span>
          <div>
            <button className="clear-draft" onClick={() => setMessage("")}>Clear draft</button>
            <FancyButton.Root variant="basic">Save draft</FancyButton.Root>
            <FancyButton.Root variant="primary" disabled={!reasons.length || !message.trim()} onClick={() => setSent(true)}>
              Send request
            </FancyButton.Root>
          </div>
        </footer>
      </section>
    </div>
  );
}

function ClarificationDropdown({
  title,
  placeholder,
  options,
  selected,
  onToggle,
  icon,
  open,
  onOpenChange,
}: {
  title: string;
  placeholder: string;
  options: string[];
  selected: string[];
  onToggle: (item: string) => void;
  icon: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const selectionLabel = selected.length
    ? selected.length === 1
      ? selected[0]
      : `${selected.length} selected`
    : placeholder;

  return (
    <div className={`clarification-dropdown${open ? " open" : ""}`}>
      <span className="clarification-dropdown-label">{title}</span>
      <button
        className="clarification-dropdown-trigger"
        type="button"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      >
        <span><FigmaIcon name={icon} size={16} /> {selectionLabel}</span>
        <CaretDown size={16} />
      </button>
      {open && (
        <div className="clarification-dropdown-menu">
          {options.map((item) => {
            const isSelected = selected.includes(item);
            return (
              <label className={isSelected ? "selected" : ""} key={item}>
                <input type="checkbox" checked={isSelected} onChange={() => onToggle(item)} />
                <i>{isSelected ? <Check size={12} /> : <FigmaIcon name={icon} size={13} />}</i>
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DecisionModal({ onBack, onApprove, onReject }: { onBack: () => void; onApprove: () => void; onReject: () => void }) {
  const [acknowledged, setAcknowledged] = useState(false);
  return (
    <div className="overlay decision-overlay">
      <section className="decision-modal" role="dialog" aria-modal="true" aria-labelledby="decision-title">
        <button className="clarification-close decision-close" aria-label="Close final decision review" onClick={onBack}><X size={20} /></button>
        <div className="decision-modal-body">
        <header className="decision-intro">
          <Progress stage="decision" />
          <span className="flow-eyebrow">Ready for your decision</span>
          <h1 id="decision-title">Review the final reimbursement</h1>
          <p>Both findings have been assessed. Confirm the evidence and outcome before recording a decision.</p>
        </header>
        <div className="decision-layout">
          <section className="decision-results">
            <h2>Review results</h2>
            <DecisionResult icon="copy" title="Possible duplicate" detail="Different guests, invoice numbers, rooms, and payment references" result="Not a duplicate" />
            <DecisionResult icon="receipt" title="Policy exception" detail="RWF 70,000 reimbursable · RWF 25,200 excluded" result="Policy limit applied" />
            <DecisionResult icon="check-square" title="Automated checks" detail="Identity, dates, currency, document quality, merchant, and totals" result="6 checks passed" passed />
          </section>
          <aside className="reimbursement-summary">
            <span className="flow-eyebrow">Reimbursement</span>
            <div><span>Submitted</span><strong>RWF&nbsp; 1,747,200</strong></div>
            <div><span>Excluded</span><strong className="negative">−RWF&nbsp; 25,200</strong></div>
            <i />
            <div className="final-total"><span>Final reimbursement</span><strong>RWF&nbsp; 1,722,000</strong></div>
            <p><Info size={16} /> Jean-Paul will be notified of the policy adjustment.</p>
          </aside>
        </div>
        <label className="decision-acknowledgement">
          <input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} />
          <i>{acknowledged && <Check size={13} />}</i>
          <span>I have reviewed the supporting evidence and AI findings and am making this decision based on the available information.</span>
        </label>
        </div>
        <footer className="decision-actions">
          <FancyButton.Root variant="destructive" onClick={onReject}>Reject claim</FancyButton.Root>
          <FancyButton.Root variant="basic" onClick={onBack}>Return to review</FancyButton.Root>
          <FancyButton.Root variant="success" disabled={!acknowledged} onClick={onApprove}>Approve RWF 1,722,000</FancyButton.Root>
        </footer>
      </section>
    </div>
  );
}

function DecisionResult({ icon, title, detail, result, passed = false }: { icon: string; title: string; detail: string; result: string; passed?: boolean }) {
  return (
    <article className="decision-result">
      <i className={passed ? "passed" : ""}><FigmaIcon name={icon} size={16} /></i>
      <div><strong>{title}</strong><p>{detail}</p></div>
      <span>{result}</span>
    </article>
  );
}

function RejectOverlay({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  return (
    <div className="overlay">
      <section className="reject-modal">
        <header><span><FigmaIcon name="receipt" size={20} /></span><h1>Reject claim</h1><button onClick={onClose}><X size={20} /></button></header>
        <div className="reject-body">
          <p>Jean-Paul will see the rejection reason. The internal note remains visible only to reviewers.</p>
          <label className="flow-field">
            <span>Rejection reason</span>
            <select value={reason} onChange={(event) => setReason(event.target.value)}>
              <option value="">Select a reason</option>
              <option>Confirmed duplicate expense</option>
              <option>Unsupported business purpose</option>
              <option>Expense outside company policy</option>
              <option>Insufficient evidence</option>
            </select>
          </label>
          <label className="flow-field"><span>Internal note</span><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add the evidence behind this decision" /></label>
        </div>
        <footer>
          <FancyButton.Root variant="basic" onClick={onClose}>Cancel</FancyButton.Root>
          <FancyButton.Root variant="destructive" disabled={!reason || !note.trim()} onClick={onDone}>Reject claim</FancyButton.Root>
        </footer>
      </section>
    </div>
  );
}
