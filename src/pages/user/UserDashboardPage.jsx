import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileSection from "./ProfileSection";
import { CiSettings } from "react-icons/ci";
import UserSetting from "./UserSetting";
import { createPortal } from "react-dom";
import Input from "../../components/ui/Input";



// ICONS BEGINS
const Icon = ({ name }) => {
 
  
  const icons = {
    profile: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    purchase: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    rent: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    credit: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    agric: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22V12m0 0C12 6 7 3 2 4c0 5 3 8 10 8zm0 0c0-6 5-9 10-8-1 5-4 8-10 8" />
      </svg>
    ),
    transaction: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" />
      </svg>
    ),
    payment: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    settings: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
</svg>
    ),
    bell: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    close: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    edit: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    
    logout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// ─── Nav links ────────────────────────────────────────────────────────────────
const navLinks = [
  { id: "profile",     label: "Profile",             icon: "profile" },
  { id: "purchase",    label: "Purchase Apartment",  icon: "purchase" },
  { id: "rent",        label: "Rent Apartment",      icon: "rent" },
  { id: "credit",      label: "Credit & Thrift",     icon: "credit" },
  { id: "agric",       label: "Agricultural Savings",icon: "agric" },
  { id: "transaction", label: "Transaction History", icon: "transaction" },
  { id: "payment",     label: "Payment Details",     icon: "payment" },
  { id: "Settings",    label: "Settings",            icon: "settings" },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
export const StatCard = ({ label, value, orange }) => (
  <div className={`bg-white rounded-xl p-5 shadow-sm flex flex-col gap-1 border-t-4 ${orange ? "border-cooperative-orange" : "border-cooperative-teal"}`}>
    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</span>
    <span className="text-2xl font-bold text-cooperative-dark">{value}</span>
  </div>
);


// ─── Apartment Card ───────────────────────────────────────────────────────────
const ApartmentCard = ({ name, location, price, beds, baths, type, badge }) => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div className="bg-cooperative-dark h-36 flex items-center justify-center relative text-cooperative-cream opacity-90">
      <Icon name={type === "rent" ? "rent" : "purchase"} />
      {badge && (
        <span className="absolute top-3 right-3 bg-cooperative-orange text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
    <div className="p-4">
      <p className="font-bold text-cooperative-dark mb-0.5">{name}</p>
      <p className="text-xs text-gray-400 mb-3">{location}</p>
      <div className="flex justify-between items-center mb-3">
        <span className="text-cooperative-orange font-black text-lg">{price}</span>
        <span className="text-xs text-gray-400">{beds} bed · {baths} bath</span>
      </div>
      <button className="w-full py-2.5 rounded-xl text-sm font-bold bg-cooperative-dark text-cooperative-cream hover:opacity-90 transition">
        {type === "rent" ? "Apply to Rent" : "Apply to Buy"}
      </button>
    </div>
  </div>
);

// ─── PURCHASE ─────────────────────────────────────────────────────────────────
const PurchaseSection = () => (
  <div className="flex flex-col gap-6">
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <p className="font-bold text-lg text-cooperative-dark">Purchase an Apartment</p>
      <p className="text-sm text-gray-400 mt-1">Browse available units and apply for cooperative-backed ownership.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ApartmentCard name="Lekki Gardens Phase 3" location="Lekki, Lagos" price="₦12.5M" beds={3} baths={2} type="purchase" badge="New" />
      <ApartmentCard name="Ajah Estate Block B" location="Ajah, Lagos" price="₦8.2M" beds={2} baths={2} type="purchase" />
      <ApartmentCard name="Ikorodu Premium Flats" location="Ikorodu, Lagos" price="₦5.8M" beds={2} baths={1} type="purchase" />
    </div>
  </div>
);

// ─── RENT ─────────────────────────────────────────────────────────────────────
const RentSection = () => (
  <div className="flex flex-col gap-6">
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <p className="font-bold text-lg text-cooperative-dark">Rent an Apartment</p>
      <p className="text-sm text-gray-400 mt-1">Cooperative-subsidised rentals with flexible payment plans.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ApartmentCard name="Yaba Studio Apartment" location="Yaba, Lagos" price="₦350k/yr" beds={1} baths={1} type="rent" badge="Hot" />
      <ApartmentCard name="Surulere 2-Bedroom" location="Surulere, Lagos" price="₦600k/yr" beds={2} baths={1} type="rent" />
      <ApartmentCard name="Gbagada Self-Contain" location="Gbagada, Lagos" price="₦280k/yr" beds={1} baths={1} type="rent" />
    </div>
  </div>
);

// ─── CREDIT & THRIFT ──────────────────────────────────────────────────────────
const CreditSection = () => {
  const plans = [
    { name: "Daily Thrift", rate: "₦500/day", balance: "₦45,000", target: "₦180,000", progress: 25 },
    { name: "Monthly Savings", rate: "₦15,000/mo", balance: "₦90,000", target: "₦360,000", progress: 25 },
    { name: "Cooperative Loan", rate: "12% p.a.", balance: "₦200,000 owed", target: "₦500,000", progress: 60 },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Credit Score" value="724" />
        <StatCard label="Loan Eligibility" value="₦500,000" orange />
        <StatCard label="Active Thrifts" value="2" />
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-5">
        <p className="font-bold text-cooperative-dark">Your Plans</p>
        {plans.map((p) => (
          <div key={p.name} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm text-cooperative-dark">{p.name}</span>
              <span className="text-xs text-gray-400">{p.balance} / {p.target}</span>
            </div>
            <div className="bg-cooperative-cream rounded-full h-2 overflow-hidden">
              <div
                className="bg-cooperative-orange h-2 rounded-full transition-all duration-700"
                style={{ width: `${p.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">{p.rate} · {p.progress}% complete</p>
          </div>
        ))}
      </div>
      <button className="self-start px-6 py-3 rounded-xl font-bold text-sm bg-cooperative-dark text-cooperative-cream hover:opacity-90 transition">
        Apply for Credit
      </button>
    </div>
  );
};

// ─── AGRICULTURAL SAVINGS ─────────────────────────────────────────────────────
const AgricSection = () => {
  const schemes = [
    { name: "Maize Farm Pool",    cycle: "6 months",  ret: "18%", min: "₦50,000",  slots: 12, filled: 9 },
    { name: "Cassava Cooperative",cycle: "12 months", ret: "24%", min: "₦30,000",  slots: 20, filled: 14 },
    { name: "Poultry Investment", cycle: "4 months",  ret: "15%", min: "₦100,000", slots: 8,  filled: 3 },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <p className="font-bold text-lg text-cooperative-dark">Agricultural Savings</p>
        <p className="text-sm text-gray-400 mt-1">Invest in cooperative farm schemes and earn guaranteed returns.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {schemes.map((s) => (
          <div key={s.name} className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
            <span className="self-start bg-green-50 text-cooperative-teal text-xs font-bold px-2 py-1 rounded-lg">
              {s.ret} return
            </span>
            <p className="font-bold text-cooperative-dark">{s.name}</p>
            <div className="text-xs text-gray-400 flex flex-col gap-1">
              <span>Cycle: {s.cycle}</span>
              <span>Minimum: {s.min}</span>
              <span>Slots: {s.filled}/{s.slots} filled</span>
            </div>
            <div className="bg-cooperative-cream rounded-full h-2 overflow-hidden">
              <div
                className="bg-cooperative-teal h-2 rounded-full"
                style={{ width: `${Math.round((s.filled / s.slots) * 100)}%` }}
              />
            </div>
            <button className="py-2.5 rounded-xl text-sm font-bold bg-cooperative-orange text-white hover:opacity-90 transition">
              Invest Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── TRANSACTION HISTORY ──────────────────────────────────────────────────────
const TransactionSection = () => {
  const txns = [
    { id: "TXN-8812", date: "Feb 28, 2026", desc: "Monthly thrift contribution",    amount: "+₦15,000",  type: "credit" },
    { id: "TXN-8801", date: "Feb 25, 2026", desc: "Loan repayment",                 amount: "-₦20,000",  type: "debit"  },
    { id: "TXN-8795", date: "Feb 20, 2026", desc: "Agric investment — Maize Pool",  amount: "-₦50,000",  type: "debit"  },
    { id: "TXN-8780", date: "Feb 15, 2026", desc: "Cooperative dividend payout",    amount: "+₦8,400",   type: "credit" },
    { id: "TXN-8760", date: "Feb 10, 2026", desc: "Daily thrift — Week 6",          amount: "+₦3,500",   type: "credit" },
    { id: "TXN-8741", date: "Feb 05, 2026", desc: "Apartment deposit — Lekki",      amount: "-₦150,000", type: "debit"  },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <p className="font-bold text-lg text-cooperative-dark">Transaction History</p>
      </div>
      <div className="divide-y divide-gray-100">
        {txns.map((t) => (
          <div key={t.id} className="flex items-center justify-between px-5 py-4 hover:bg-cooperative-cream transition">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg shrink-0
                ${t.type === "credit" ? "bg-green-50 text-cooperative-teal" : "bg-red-50 text-red-500"}`}>
                {t.type === "credit" ? "↑" : "↓"}
              </div>
              <div>
                <p className="font-semibold text-sm text-cooperative-dark">{t.desc}</p>
                <p className="text-xs text-gray-400">{t.id} · {t.date}</p>
              </div>
            </div>
            <span className={`font-bold text-sm shrink-0 ml-4 ${t.type === "credit" ? "text-cooperative-teal" : "text-red-500"}`}>
              {t.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};


// ─── PAYMENT DETAILS ──────────────────────────────────────────────────────────
const PaymentSection = () => (
  <div className="flex flex-col gap-6 max-w-xl">
    <div className="grid grid-cols-2 gap-4">
      <StatCard label="Wallet Balance" value="₦143,200" orange />
      <StatCard label="Next Due" value="Mar 15" />
    </div>
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
      <p className="font-bold text-cooperative-dark">Linked Bank Account</p>
      <div className="bg-cooperative-cream rounded-xl p-4 flex flex-col gap-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Account Name</p>
        <p className="font-bold text-cooperative-dark">Chidera Emmanuel</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">Account Number</p>
        <p className="font-bold text-cooperative-dark tracking-widest">0123 **** **** 9081</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">Bank</p>
        <p className="font-bold text-cooperative-dark">Zenith Bank PLC</p>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 py-3 rounded-xl font-bold text-sm bg-cooperative-dark text-cooperative-cream hover:opacity-90 transition">
          Fund Wallet
        </button>
        <button className="flex-1 py-3 rounded-xl font-bold text-sm bg-cooperative-cream text-cooperative-dark border border-gray-200 hover:shadow transition">
          Withdraw
        </button>
      </div>
    </div>
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <p className="font-bold text-cooperative-dark mb-3">Upcoming Payments</p>
      {[
        { label: "Monthly Thrift",      date: "Mar 15", amount: "₦15,000" },
        { label: "Loan Repayment",      date: "Mar 20", amount: "₦20,000" },
        { label: "Apartment Instalment",date: "Mar 28", amount: "₦50,000" },
      ].map((p) => (
        <div key={p.label} className="flex justify-between items-center py-3 border-b last:border-0 border-gray-100">
          <div>
            <p className="font-semibold text-sm text-cooperative-dark">{p.label}</p>
            <p className="text-xs text-gray-400">Due {p.date}</p>
          </div>
          <span className="font-bold text-cooperative-orange">{p.amount}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Sections map ─────────────────────────────────────────────────────────────
const sections = {
  profile:     ()     => <ProfileSection/>,
  purchase:    ()     => <PurchaseSection />,
  rent:        ()     => <RentSection />,
  credit:      ()     => <CreditSection />,
  agric:       ()     => <AgricSection />,
  transaction: ()     => <TransactionSection />,
  payment:     ()     => <PaymentSection />,
  Settings:    ()     => <UserSetting />
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function UserDashboardPage() {
  // Swap mock for real data:
  // const user = JSON.parse(sessionStorage.getItem('userdata'));
  let {user,  NewAccessToken, token} = useAuth();

      NewAccessToken()

  console.log(token);
  console.log(user);
  const userProfile  = user.user;
  const walletProfile = user.wallet;
  const dateCreatedAccount = new Date(user.wallet.created_on);

  

  const initials = userProfile.full_name
  .split(' ')
  .map(name => name[0])
  .slice(0,2)
  .join('');
  

  const [active, setActive] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const notifications = 0;

  const activeLabel = navLinks.find((n) => n.id === active)?.label ?? "Dashboard";

  return (
    <div className="bg-cooperative-cream min-h-screen font-sans animate-blurIn">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-cooperative-cream border-b border-gray-200 flex items-center px-6 gap-4 shadow-md shadow-cooperative-dark ">
        <button className="lg:hidden text-cooperative-dark" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Icon name={sidebarOpen ? "close" : "menu"} />
        </button>

        {/* Logo */}
        <div className="flex flex-col leading-tight shrink-0">
          <span className="font-black text-cooperative-dark tracking-tight text-lg sm:text-xl">
            Bethel <span className="text-cooperative-orange">Cooperatives</span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Member Portal</span>
        </div>

        {/* Centre title */}
        <div className="flex-1 text-center">
          <span className="font-extrabold text-cooperative-dark text-base sm:text-lg">{activeLabel}</span>
        </div>

        {/* Bell + avatar */}
        <div className="flex items-center gap-3">
          <button className="relative text-cooperative-dark">
            <Icon name="bell" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-cooperative-orange text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          <div className="bg-cooperative-orange text-white w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center cursor-pointer select-none">
          {initials}
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-[70px] bottom-0 left-0 z-40 w-[220px] bg-cooperative-dark flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* User mini-profile */}
        <div className="px-4 py-5 border-b border-white/10">
          <div className="bg-cooperative-orange text-white w-11 h-11 rounded-xl font-black text-sm flex items-center justify-center mb-3">
            {initials}
          </div>
          <p className="text-cooperative-cream font-bold text-sm leading-tight">{userProfile.full_name}</p>
          <p className="text-cooperative-cream/50 text-xs">@{userProfile.username}</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-2 flex flex-col gap-0.5">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => { setActive(link.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left cursor-pointer transition-all duration-150
                  ${isActive
                    ? "bg-cooperative-orange text-white font-bold"
                    : "text-cooperative-cream/60 font-medium hover:bg-white/10 hover:text-cooperative-cream"
                  }`}
              >
                <Icon name={link.icon} />
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cooperative-cream/40 hover:bg-white/10 hover:text-cooperative-cream/70 transition cursor-pointer">
            <Icon name="logout" /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="lg:ml-[220px] mt-[70px] p-6 min-h-[calc(100vh-70px-52px)]">
        {sections[active]?.(userProfile, walletProfile)}
      </main>

      {/* ── Footer ── */}
      <footer className="lg:ml-[220px] bg-cooperative-dark text-cooperative-cream/40 text-center py-4 text-xs font-medium">
        © {new Date().getFullYear()} Bethel Cooperatives Society Ltd · All rights reserved
      </footer>
      {createPortal(
        <div className={`absolute inset-0 z-[10000]`}><Input/></div>, document.body
      )}
    </div>
  );
}