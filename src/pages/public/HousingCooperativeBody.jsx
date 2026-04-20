import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

// ─── Animation Variants ───────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1 },
};
const staggerContainer = (staggerChildren = 0.12, delayChildren = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

const ease = [0.22, 1, 0.36, 1];

// ─── AnimateOnScroll ──────────────────────────────────────────────
function AnimateOnScroll({ children, variant = fadeUp, delay = 0, duration = 0.65, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variant}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerWrapper ───────────────────────────────────────────────
function StaggerWrapper({ children, className = "", stagger = 0.12, delay = 0.1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer(stagger, delay)}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, variant = fadeUp, duration = 0.65, className = "" }) {
  return (
    <motion.div className={className} variants={variant} transition={{ duration, ease }}>
      {children}
    </motion.div>
  );
}

// ─── Progress Bar (animated on scroll) ───────────────────────────
function AnimatedProgressBar({ percent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className="w-full h-2.5 rounded-full bg-[#1a4a1a] overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-[#F57C00]"
        initial={{ width: 0 }}
        animate={{ width: inView ? `${percent}%` : 0 }}
        transition={{ duration: 1.2, ease, delay: 0.3 }}
      />
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="text-xs font-medium tracking-widest uppercase text-[#F57C00] mb-1.5">
      {children}
    </p>
  );
}

// ─── STEPS DATA ───────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Create your account",
    desc: "Sign up and log in to the cooperative platform to access all member services and tools.",
  },
  {
    num: "02",
    title: "Set up your profile",
    desc: "Complete your personal profile — full name, contact details, identification, and next-of-kin. This is required before any cooperative activity.",
  },
  {
    num: "03",
    title: "Join Housing Cooperative",
    desc: "From your dashboard, go to the Cooperatives section and select Housing Cooperative to enroll.",
  },
  {
    num: "04",
    title: "Start saving",
    desc: "Press 'Add Savings' to begin contributing to your Housing Cooperative wallet. These funds are exclusively for purchasing a home.",
  },
];

// ─── FLOW STEPS ──────────────────────────────────────────────────
const flowSteps = [
  { dot: "teal", title: "Add savings", desc: "Funds deposited directly to your housing wallet" },
  { dot: "teal", title: "Browse apartments", desc: "Find your apartment on the Buy Apartment page" },
  { dot: "orange", title: "Copy address", desc: "Paste the apartment address in your dashboard" },
  { dot: "orange", title: "Balance check", desc: "System compares your savings to the property price" },
  { dot: "teal", title: "Purchase or loan", desc: "Full payment or installment plan activated" },
];

// ─── INSTALLMENT STEPS ───────────────────────────────────────────
const installSteps = [
  { step: "01", title: "Initial deposit", desc: "Your saved balance is deducted as the first payment toward the apartment." },
  { step: "02", title: "Loan issued", desc: "The remaining balance is converted into a structured cooperative loan." },
  { step: "03", title: "Repayment schedule", desc: "You receive a clear schedule of due dates with advance notifications." },
  { step: "04", title: "Pay or auto-deduct", desc: "If you miss a payment after being notified, it is automatically removed from your balance." },
];

// ─── ALERT CARDS ─────────────────────────────────────────────────
const alertCards = [
  {
    type: "safe",
    icon: "✉",
    title: "Payment due notification",
    desc: "A message is sent to your registered contact when a repayment installment is approaching its due date.",
    border: "border-[#2E7D32]",
    bg: "bg-[#f0f9f0]",
    iconBg: "bg-[#d4edda]",
  },
  {
    type: "warn",
    icon: "⏰",
    title: "Pay before the deadline",
    desc: "You are expected to make payment promptly. You may also be called directly if payment is not received on time.",
    border: "border-[#F57C00]",
    bg: "bg-[#fff8f0]",
    iconBg: "bg-[#fde8cc]",
  },
  {
    type: "danger",
    icon: "⚠",
    title: "Auto-deduction if missed",
    desc: "If you fail to repay after notification, the due amount will be automatically deducted from your account balance.",
    border: "border-red-400",
    bg: "bg-red-50",
    iconBg: "bg-red-100",
  },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export default function HousingCooperativeBody() {
  return (

    <div className="bg-[#FDF6EC] font-sans text-[#003000]">
<Navbar />
      {/* ── HERO ── */}
      <section className="bg-[#003000] px-6 pt-[100px] pb-[50px] text-center ">
        <div className="max-w-2xl mx-auto">
          <AnimateOnScroll delay={0}>
            <span className="inline-block bg-[#F57C00] text-[#FDF6EC] text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              Housing Cooperative
            </span>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#FDF6EC] leading-tight mb-4">
              Own your <span className="text-[#F57C00]">dream home</span>
              <br />through cooperative savings
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <p className="text-[#9dc89d] text-base leading-relaxed mb-8 max-w-xl mx-auto">
              A structured, transparent way to save, plan, and secure your apartment — all within your cooperative account. No guesswork. Just steady progress toward your home.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.3} variant={scaleIn}>
            <button className="bg-[#F57C00] hover:bg-[#e06500] text-[#FDF6EC] font-medium text-sm px-7 py-3 rounded-lg transition-colors duration-200 cursor-pointer">
              Get started — set up your profile
            </button>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── BEFORE YOU BEGIN ── */}
      <section className="bg-[#FDF6EC] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <SectionLabel>Before you begin</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-2">
              Four steps to get started
            </h2>
            <p className="text-sm text-[#5a7a5a] leading-relaxed mb-10 max-w-lg">
              Complete these steps before accessing housing cooperative services. Your profile must be set up first.
            </p>
          </AnimateOnScroll>
          <StaggerWrapper className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <StaggerItem key={s.num}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-[#c8dbc8] rounded-xl p-5 h-full"
                >
                  <div className="w-9 h-9 rounded-full bg-[#003000] text-[#FDF6EC] text-sm font-medium flex items-center justify-center mb-4">
                    {s.num}
                  </div>
                  <h3 className="text-sm font-medium text-[#003000] mb-2">{s.title}</h3>
                  <p className="text-xs text-[#5a7a5a] leading-relaxed">{s.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerWrapper>
        </div>
      </section>

      {/* ── HOW THE WALLET WORKS ── */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <AnimateOnScroll variant={fadeLeft}>
              <SectionLabel>Your housing wallet</SectionLabel>
              <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-3">
                Dedicated savings,<br />dedicated purpose
              </h2>
              <p className="text-sm text-[#5a7a5a] leading-relaxed mb-6">
                Money in your housing cooperative wallet can only be used to purchase an apartment — nothing else. Every naira you save brings you closer to ownership.
              </p>
              <ul className="space-y-3">
                {[
                  "Every deposit goes directly to your housing wallet balance",
                  "Browse available apartments on the Buy Apartment page",
                  "Copy the apartment address and paste it in your dashboard",
                  "Your wallet balance is checked against the property price",
                  "If balance covers the full price, the purchase is processed immediately",
                  "If on installment, initial payment is deducted — remainder becomes a loan",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease }}
                    className="flex items-start gap-3 text-sm text-[#003000] leading-relaxed"
                  >
                    <span className="w-4 h-4 mt-0.5 rounded-full bg-[#2E7D32] flex-shrink-0 flex items-center justify-center">
                      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#FDF6EC" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimateOnScroll>

            <AnimateOnScroll variant={fadeRight} delay={0.1}>
              <div className="bg-[#FDF6EC] border border-[#c8dbc8] rounded-xl p-6">
                {flowSteps.map((f, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${f.dot === "teal" ? "bg-[#2E7D32]" : "bg-[#F57C00]"}`} />
                      <div>
                        <div className="text-sm font-medium text-[#003000]">{f.title}</div>
                        <div className="text-xs text-[#5a7a5a] leading-relaxed">{f.desc}</div>
                      </div>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <div className="w-px h-5 bg-[#c8dbc8] ml-1.5 my-1" />
                    )}
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── SAVINGS WALLET TRACKER ── */}
      <section className="bg-[#FDF6EC] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll variant={scaleIn}>
              <div className="bg-[#003000] rounded-2xl p-6 text-[#FDF6EC]">
                <p className="text-xs text-[#9dc89d] mb-1">Housing wallet balance</p>
                <p className="text-3xl font-medium mb-1">
                  ₦1,240,000{" "}
                  <span className="text-base font-normal text-[#9dc89d]">/ ₦2,000,000 goal</span>
                </p>
                <div className="mb-1 mt-4">
                  <AnimatedProgressBar percent={62} />
                </div>
                <div className="flex justify-between text-xs text-[#9dc89d] mb-6">
                  <span>62% saved</span>
                  <span>₦760,000 remaining</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#F57C00] text-[#FDF6EC] text-sm font-medium py-2.5 rounded-lg cursor-pointer"
                  >
                    + Add savings
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#1a4a1a] text-[#9dc89d] text-sm font-medium py-2.5 rounded-lg cursor-pointer"
                  >
                    Buy apartment
                  </motion.button>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant={fadeRight} delay={0.1}>
              <SectionLabel>Savings tracker</SectionLabel>
              <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-3">
                Track your progress at every step
              </h2>
              <p className="text-sm text-[#5a7a5a] leading-relaxed mb-4">
                Your housing wallet shows you exactly how far you are from your goal. The more you save, the closer you get to qualifying for a full outright purchase — or a minimal installment loan.
              </p>
              <p className="text-sm text-[#5a7a5a] leading-relaxed">
                You can follow up on your purchase status directly from your dashboard at any time, including payment milestones and remaining loan balance.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── INSTALLMENT PLAN ── */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <SectionLabel>Installment plan</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-2">
              How installment payments work
            </h2>
            <p className="text-sm text-[#5a7a5a] leading-relaxed mb-10 max-w-lg">
              If your savings don't cover the full price, the cooperative supports you with a structured loan arrangement.
            </p>
          </AnimateOnScroll>
          <StaggerWrapper className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#c8dbc8] rounded-xl overflow-hidden">
            {installSteps.map((s, i) => (
              <StaggerItem key={s.step}>
                <div
                  className={`p-5 h-full ${i < installSteps.length - 1 ? "border-b sm:border-b-0 sm:border-r lg:border-b-0 lg:border-r border-[#c8dbc8]" : ""}`}
                >
                  <p className="text-xs font-medium text-[#F57C00] tracking-widest uppercase mb-2">
                    Step {s.step}
                  </p>
                  <h4 className="text-sm font-medium text-[#003000] mb-2">{s.title}</h4>
                  <p className="text-xs text-[#5a7a5a] leading-relaxed">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerWrapper>
        </div>
      </section>

      {/* ── REPAYMENT ALERTS ── */}
      <section className="bg-[#FDF6EC] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <SectionLabel>Repayment reminders</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-2">
              What happens at repayment time
            </h2>
            <p className="text-sm text-[#5a7a5a] leading-relaxed mb-10 max-w-lg">
              The cooperative keeps you informed so you're never caught off guard.
            </p>
          </AnimateOnScroll>
          <StaggerWrapper className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {alertCards.map((c) => (
              <StaggerItem key={c.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-xl border p-5 h-full ${c.bg} ${c.border}`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-4 ${c.iconBg}`}>
                    {c.icon}
                  </div>
                  <h3 className="text-sm font-medium text-[#003000] mb-2">{c.title}</h3>
                  <p className="text-xs text-[#5a7a5a] leading-relaxed">{c.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerWrapper>
        </div>
      </section>

      {/* ── IMPORTANT NOTES ── */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <SectionLabel>Important to know</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#003000] mb-8">
              Key rules of the housing cooperative
            </h2>
          </AnimateOnScroll>
          <StaggerWrapper className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                color: "bg-[#003000]",
                textColor: "text-[#FDF6EC]",
                subColor: "text-[#9dc89d]",
                title: "Profile setup is mandatory",
                desc: "You must fully complete your profile before any housing cooperative activity — savings, purchases, or loan applications — can take place.",
              },
              {
                color: "bg-[#F57C00]",
                textColor: "text-[#FDF6EC]",
                subColor: "text-[#FDF6EC]/80",
                title: "Wallet is housing-only",
                desc: "Funds in your housing cooperative wallet cannot be withdrawn or used for any other purpose. They are locked exclusively for buying an apartment.",
              },
              {
                color: "bg-[#FDF6EC]",
                textColor: "text-[#003000]",
                subColor: "text-[#5a7a5a]",
                border: "border border-[#c8dbc8]",
                title: "Loan repayments are strict",
                desc: "Once an installment plan is active, repayment due dates are fixed. Missing a payment after notification results in automatic deduction from your account.",
              },
              {
                color: "bg-[#2E7D32]",
                textColor: "text-[#FDF6EC]",
                subColor: "text-[#9dc89d]",
                title: "Follow up anytime",
                desc: "Your dashboard shows your live purchase status, installment progress, and next payment date at all times. Transparency is built into every step.",
              },
            ].map((card, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-xl p-6 ${card.color} ${card.border || ""}`}
                >
                  <h3 className={`text-sm font-medium mb-2 ${card.textColor}`}>{card.title}</h3>
                  <p className={`text-xs leading-relaxed ${card.subColor}`}>{card.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerWrapper>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-[#003000] px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#FDF6EC] mb-3">
              Ready to own your home?
            </h2>
            <p className="text-sm text-[#9dc89d] leading-relaxed mb-8 max-w-md mx-auto">
              Set up your profile today and take the first step toward housing cooperative membership. Your apartment is waiting.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#F57C00] text-[#FDF6EC] font-medium text-sm px-6 py-3 rounded-lg cursor-pointer"
              >
                Set up my profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border border-[#9dc89d] text-[#FDF6EC] font-medium text-sm px-6 py-3 rounded-lg cursor-pointer hover:bg-[#1a4a1a] transition-colors"
              >
                Learn about cooperatives
              </motion.button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      <Footer />

    </div>
  );
}