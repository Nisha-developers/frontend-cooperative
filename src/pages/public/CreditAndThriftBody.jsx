import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

// ─── Variants ─────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } };
const stagger = (s = 0.12, d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: s, delayChildren: d } } });
const ease = [0.22, 1, 0.36, 1];

// ─── Helpers ──────────────────────────────────────────────────────
function AOS({ children, variant = fadeUp, delay = 0, duration = 0.65, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref} className={className} initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variant} transition={{ duration, delay, ease }}>
      {children}
    </motion.div>
  );
}

function SW({ children, className = "", s = 0.12, d = 0.1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div ref={ref} className={className} initial="hidden"
      animate={inView ? "visible" : "hidden"} variants={stagger(s, d)}>
      {children}
    </motion.div>
  );
}

function SI({ children, variant = fadeUp, duration = 0.65, className = "" }) {
  return (
    <motion.div className={className} variants={variant} transition={{ duration, ease }}>
      {children}
    </motion.div>
  );
}

function AnimatedBar({ percent, color = "#F57C00" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className="w-full h-2 rounded-full bg-[#1a4a1a] overflow-hidden">
      <motion.div className="h-full rounded-full" style={{ background: color }}
        initial={{ width: 0 }} animate={{ width: inView ? `${percent}%` : 0 }}
        transition={{ duration: 1.3, ease, delay: 0.3 }} />
    </div>
  );
}

function Label({ children }) {
  return <p className="text-xs font-medium tracking-widest uppercase text-[#F57C00] mb-1.5">{children}</p>;
}

function Check() {
  return (
    <span className="w-4 h-4 mt-0.5 rounded-full bg-[#2E7D32] flex-shrink-0 flex items-center justify-center">
      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
        <path d="M2 6l3 3 5-5" stroke="#FDF6EC" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Complete your profile", desc: "Your full profile — name, contact, ID, and next-of-kin — must be set up before any credit and thrift activity can begin." },
  { num: "02", title: "Join credit & thrift", desc: "From your dashboard, navigate to the Cooperatives section and enroll in Credit & Thrift to become an active member." },
  { num: "03", title: "Start saving consistently", desc: "Begin making regular deposits into your credit and thrift account. Your balance drives your loan eligibility." },
  { num: "04", title: "Apply for a loan", desc: "After six months of membership, apply for a loan of up to 2× your current balance, subject to eligibility." },
];

const eligibilityItems = [
  "Must have been an active member for at least 6 months",
  "Loan amount is capped at 2× your current credit & thrift balance",
  "Your profile must be fully completed and verified",
  "Account must be in good standing — no overdue repayments",
  "Interest rate of 0.5% is applied to every loan issued",
];

const repaymentCards = [
  {
    icon: "✉",
    title: "Email notification",
    desc: "An email reminder is sent to you as your repayment due date approaches. Check your inbox and act promptly.",
    bg: "bg-[#f0f9f0]", border: "border-[#2E7D32]", iconBg: "bg-[#d4edda]",
  },
  {
    icon: "⏰",
    title: "Final warning",
    desc: "A second warning is issued if payment is still outstanding. This is your last chance to settle before automated action.",
    bg: "bg-[#fff8f0]", border: "border-[#F57C00]", iconBg: "bg-[#fde8cc]",
  },
  {
    icon: "⚡",
    title: "Auto-deduction",
    desc: "If you still haven't paid, the amount is automatically deducted from your account balance without further notice.",
    bg: "bg-red-50", border: "border-red-400", iconBg: "bg-red-100",
  },
  {
    icon: "📞",
    title: "Direct contact",
    desc: "If your account balance is insufficient to cover the deduction, you will be contacted directly by the cooperative.",
    bg: "bg-[#FDF6EC]", border: "border-[#003000]", iconBg: "bg-[#c8dbc8]",
  },
];

const keyRules = [
  { bg: "bg-[#003000]", title: "Profile is mandatory", desc: "No loan or savings activity is permitted until your profile is fully set up and verified.", text: "text-[#FDF6EC]", sub: "text-[#9dc89d]" },
  { bg: "bg-[#F57C00]", title: "2× your balance", desc: "Your maximum loan is exactly two times your current credit and thrift savings balance.", text: "text-[#FDF6EC]", sub: "text-[#FDF6EC]/80" },
  { bg: "bg-[#2E7D32]", title: "0.5% interest rate", desc: "A flat 0.5% interest rate applies to all loans — transparent, fixed, and predictable.", text: "text-[#FDF6EC]", sub: "text-[#9dc89d]" },
  { bg: "bg-[#FDF6EC]", border: "border border-[#c8dbc8]", title: "₦50,000 to withdraw", desc: "You can only withdraw from your savings account once your balance reaches ₦50,000 or more.", text: "text-[#003000]", sub: "text-[#5a7a5a]" },
];

// ─── MAIN ─────────────────────────────────────────────────────────
export default function CreditAndThriftBody() {
  return (
    <div className="bg-[#FDF6EC] font-sans text-[#003000]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-[#003000] px-6  text-center h-screen flex items-center">
        <div className="max-w-2xl mx-auto">
          <AOS delay={0}>
            <span className="inline-block bg-[#F57C00] text-[#FDF6EC] text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              Credit &amp; Thrift
            </span>
          </AOS>
          <AOS delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#FDF6EC] leading-tight mb-4">
              Save smart. Borrow <span className="text-[#F57C00]">responsibly.</span>
              <br />Grow together.
            </h1>
          </AOS>
          <AOS delay={0.2}>
            <p className="text-[#9dc89d] text-base leading-relaxed mb-8 max-w-xl mx-auto">
              The Credit &amp; Thrift cooperative rewards consistent saving with access to affordable loans — up to twice your balance, at a flat 0.5% interest rate, after just six months.
            </p>
          </AOS>
          <AOS delay={0.3} variant={scaleIn}>
            <button className="bg-[#F57C00] hover:bg-[#e06500] text-[#FDF6EC] font-medium text-sm px-7 py-3 rounded-lg transition-colors duration-200 cursor-pointer">
              Set up your profile to begin
            </button>
          </AOS>
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <section className="bg-[#2E7D32] px-6 py-8">
        <SW className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center" s={0.1} d={0.05}>
          {[
            { val: "2×", label: "Your savings as loan" },
            { val: "0.5%", label: "Flat interest rate" },
            { val: "6 mo", label: "Membership before loan" },
            { val: "₦50k", label: "Minimum to withdraw" },
          ].map((s) => (
            <SI key={s.label} variant={fadeUp}>
              <p className="text-2xl sm:text-3xl font-medium text-[#FDF6EC]">{s.val}</p>
              <p className="text-xs text-[#9dc89d] mt-1 leading-snug">{s.label}</p>
            </SI>
          ))}
        </SW>
      </section>

      {/* ── GETTING STARTED ── */}
      <section className="bg-[#FDF6EC] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <AOS>
            <Label>Before you begin</Label>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-2">How to get started</h2>
            <p className="text-sm text-[#5a7a5a] leading-relaxed mb-10 max-w-lg">
              Complete these steps in order. Your profile must be set up before any savings or loan activity can take place.
            </p>
          </AOS>
          <SW className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <SI key={s.num}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}
                  className="bg-white border border-[#c8dbc8] rounded-xl p-5 h-full">
                  <div className="w-9 h-9 rounded-full bg-[#003000] text-[#FDF6EC] text-sm font-medium flex items-center justify-center mb-4">
                    {s.num}
                  </div>
                  <h3 className="text-sm font-medium text-[#003000] mb-2">{s.title}</h3>
                  <p className="text-xs text-[#5a7a5a] leading-relaxed">{s.desc}</p>
                </motion.div>
              </SI>
            ))}
          </SW>
        </div>
      </section>

      {/* ── LOAN ELIGIBILITY ── */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AOS variant={fadeLeft}>
              <Label>Loan eligibility</Label>
              <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-3">
                Borrow up to 2× your savings balance
              </h2>
              <p className="text-sm text-[#5a7a5a] leading-relaxed mb-6">
                After six months of active membership, you qualify for a loan. The cooperative calculates your limit based on what you've saved — the more consistent your saving, the more you can access.
              </p>
              <ul className="space-y-3">
                {eligibilityItems.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease }}
                    className="flex items-start gap-3 text-sm text-[#003000] leading-relaxed">
                    <Check />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AOS>

            {/* Loan calculator card */}
            <AOS variant={fadeRight} delay={0.1}>
              <div className="bg-[#003000] rounded-2xl p-6 text-[#FDF6EC]">
                <p className="text-xs text-[#9dc89d] mb-1">Example loan calculation</p>
                <p className="text-3xl font-medium mb-1">
                  ₦300,000 <span className="text-base font-normal text-[#9dc89d]">loan limit</span>
                </p>
                <p className="text-xs text-[#9dc89d] mb-5">Based on ₦150,000 savings balance × 2</p>

                <div className="space-y-3 mb-5">
                  <div>
                    <div className="flex justify-between text-xs text-[#9dc89d] mb-1">
                      <span>Your savings balance</span><span>₦150,000</span>
                    </div>
                    <AnimatedBar percent={75} color="#2E7D32" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-[#9dc89d] mb-1">
                      <span>Loan limit (2×)</span><span>₦300,000</span>
                    </div>
                    <AnimatedBar percent={100} color="#F57C00" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-[#9dc89d] mb-1">
                      <span>Interest (0.5%)</span><span>₦1,500</span>
                    </div>
                    <AnimatedBar percent={5} color="#9dc89d" />
                  </div>
                </div>

                <div className="border-t border-[#1a4a1a] pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9dc89d]">Total repayable</span>
                    <span className="text-[#FDF6EC] font-medium">₦301,500</span>
                  </div>
                </div>
              </div>
            </AOS>
          </div>
        </div>
      </section>

      {/* ── SAVINGS & WITHDRAWAL ── */}
      <section className="bg-[#FDF6EC] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Account card */}
            <AOS variant={scaleIn}>
              <div className="bg-[#003000] rounded-2xl p-6 text-[#FDF6EC]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-[#9dc89d]">Credit &amp; Thrift balance</p>
                    <p className="text-3xl font-medium mt-0.5">₦62,500</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#2E7D32] flex items-center justify-center">
                    <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                      <path d="M10 4v12M4 10h12" stroke="#FDF6EC" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className="bg-[#1a4a1a] rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-[#9dc89d]">Withdrawal threshold</p>
                    <span className="text-xs bg-[#2E7D32] text-[#FDF6EC] px-2 py-0.5 rounded-full">Eligible</span>
                  </div>
                  <div className="mb-1">
                    <AnimatedBar percent={100} color="#F57C00" />
                  </div>
                  <div className="flex justify-between text-xs text-[#9dc89d] mt-1">
                    <span>₦62,500 saved</span><span>Min. ₦50,000</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="bg-[#F57C00] text-[#FDF6EC] text-sm font-medium py-2.5 rounded-lg cursor-pointer">
                    + Deposit
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="bg-[#2E7D32] text-[#FDF6EC] text-sm font-medium py-2.5 rounded-lg cursor-pointer">
                    Withdraw
                  </motion.button>
                </div>
              </div>
            </AOS>

            <AOS variant={fadeRight} delay={0.1}>
              <Label>Savings &amp; withdrawal</Label>
              <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-3">
                Grow your savings.<br />Withdraw when ready.
              </h2>
              <p className="text-sm text-[#5a7a5a] leading-relaxed mb-4">
                Your savings balance in the credit and thrift account grows with every deposit. Once your balance reaches <span className="font-medium text-[#003000]">₦50,000</span>, you become eligible to make withdrawals from your account.
              </p>
              <p className="text-sm text-[#5a7a5a] leading-relaxed mb-4">
                Below that threshold, your funds remain in your account and continue to work toward your loan eligibility — and the sooner you hit ₦50,000, the sooner you gain full access.
              </p>
              <div className="flex items-start gap-3 bg-white border border-[#c8dbc8] rounded-xl p-4">
                <span className="text-lg mt-0.5">💡</span>
                <p className="text-xs text-[#5a7a5a] leading-relaxed">
                  Consistent monthly deposits accelerate both your withdrawal eligibility and your loan limit. Every deposit counts toward your 2× borrowing power.
                </p>
              </div>
            </AOS>
          </div>
        </div>
      </section>

      {/* ── REPAYMENT CONSEQUENCES ── */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <AOS>
            <Label>Repayment policy</Label>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-2">
              What happens if you miss a repayment
            </h2>
            <p className="text-sm text-[#5a7a5a] leading-relaxed mb-10 max-w-lg">
              The cooperative keeps you informed at every stage. Staying on top of repayments protects your standing and keeps your loan limit intact.
            </p>
          </AOS>
          <SW className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {repaymentCards.map((c, i) => (
              <SI key={i}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}
                  className={`rounded-xl border p-5 h-full ${c.bg} ${c.border}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-4 ${c.iconBg}`}>
                    {c.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-[#F57C00] tracking-widest uppercase">Step {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-sm font-medium text-[#003000] mb-2">{c.title}</h3>
                  <p className="text-xs text-[#5a7a5a] leading-relaxed">{c.desc}</p>
                </motion.div>
              </SI>
            ))}
          </SW>
        </div>
      </section>

      {/* ── INTEREST EXPLAINER ── */}
      <section className="bg-[#FDF6EC] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <AOS>
            <Label>How interest works</Label>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-2">
              A flat 0.5% — nothing hidden
            </h2>
            <p className="text-sm text-[#5a7a5a] leading-relaxed mb-10 max-w-lg">
              The credit and thrift cooperative charges a simple, transparent interest rate on every loan. No compounding surprises. No hidden fees.
            </p>
          </AOS>
          <SW className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { loan: "₦50,000", interest: "₦250", total: "₦50,250" },
              { loan: "₦150,000", interest: "₦750", total: "₦150,750" },
              { loan: "₦300,000", interest: "₦1,500", total: "₦301,500" },
            ].map((r, i) => (
              <SI key={i}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
                  className="bg-white border border-[#c8dbc8] rounded-xl p-5">
                  <p className="text-xs text-[#5a7a5a] mb-1">Loan amount</p>
                  <p className="text-2xl font-medium text-[#003000] mb-4">{r.loan}</p>
                  <div className="border-t border-[#c8dbc8] pt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#5a7a5a]">Interest (0.5%)</span>
                      <span className="text-[#F57C00] font-medium">{r.interest}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5a7a5a]">Total repayable</span>
                      <span className="text-[#003000] font-medium">{r.total}</span>
                    </div>
                  </div>
                </motion.div>
              </SI>
            ))}
          </SW>
        </div>
      </section>

      {/* ── KEY RULES ── */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <AOS>
            <Label>Important to know</Label>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-8">
              Key rules of credit &amp; thrift
            </h2>
          </AOS>
          <SW className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {keyRules.map((c, i) => (
              <SI key={i}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}
                  className={`rounded-xl p-6 ${c.bg} ${c.border || ""}`}>
                  <h3 className={`text-sm font-medium mb-2 ${c.text}`}>{c.title}</h3>
                  <p className={`text-xs leading-relaxed ${c.sub}`}>{c.desc}</p>
                </motion.div>
              </SI>
            ))}
          </SW>
        </div>
      </section>

      {/* ── MEMBERSHIP TIMELINE ── */}
      <section className="bg-[#FDF6EC] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <AOS>
            <Label>Your journey</Label>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-2">
              From zero to loan-ready in 6 months
            </h2>
            <p className="text-sm text-[#5a7a5a] leading-relaxed mb-10 max-w-lg">
              Here's what your first six months look like as a credit and thrift member.
            </p>
          </AOS>
          <div className="relative">
            {/* Line */}
            <div className="hidden sm:block absolute left-0 right-0 top-5 h-0.5 bg-[#c8dbc8] z-0" />
            <SW className="grid grid-cols-1 sm:grid-cols-6 gap-4 relative z-10" s={0.1} d={0.05}>
              {[
                { mo: "Day 1", event: "Profile set up & join cooperative" },
                { mo: "Month 1", event: "First deposit into account" },
                { mo: "Month 2", event: "Savings growing consistently" },
                { mo: "Month 3", event: "May hit ₦50k withdrawal threshold" },
                { mo: "Month 6", event: "Loan eligibility unlocked" },
                { mo: "Month 6+", event: "Apply for up to 2× your balance" },
              ].map((m, i) => (
                <SI key={i} variant={fadeUp}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium mb-3 ${i === 5 ? "bg-[#F57C00] text-[#FDF6EC]" : "bg-[#003000] text-[#FDF6EC]"}`}>
                      {i + 1}
                    </div>
                    <p className="text-xs font-medium text-[#F57C00] mb-1">{m.mo}</p>
                    <p className="text-xs text-[#5a7a5a] leading-snug">{m.event}</p>
                  </div>
                </SI>
              ))}
            </SW>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#003000] px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <AOS>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#FDF6EC] mb-3">
              Ready to start saving and borrowing?
            </h2>
            <p className="text-sm text-[#9dc89d] leading-relaxed mb-8 max-w-md mx-auto">
              Set up your profile today, make your first deposit, and begin your six-month path to loan eligibility — all within the cooperative platform.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="bg-[#F57C00] text-[#FDF6EC] font-medium text-sm px-6 py-3 rounded-lg cursor-pointer">
                Set up my profile
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="border border-[#9dc89d] text-[#FDF6EC] font-medium text-sm px-6 py-3 rounded-lg cursor-pointer hover:bg-[#1a4a1a] transition-colors">
                Learn about cooperatives
              </motion.button>
            </div>
          </AOS>
        </div>
      </section>
<Footer />
    </div>
  );
}