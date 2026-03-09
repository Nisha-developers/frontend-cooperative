import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import { motion } from "framer-motion";
import {
  AnimateOnScroll,
  StaggerWrapper,
  StaggerItem,
  AnimatedText,
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  slideUp,
} from "../../animations/AnimateOnScroll"; // adjust path to your file
import FarmProduceShowcase from "./FarmProduceShowcase";

export default function BethelAgriculturalBody() {
 
  const steps = [
    {
      num: "01",
      title: "Member Contribution",
      desc: "Contribute any amount into the Agricultural Investment Fund — ₦20,000, ₦50,000, ₦100,000, ₦500,000 or more. No fixed requirement. Each contribution is tracked in your cooperative dashboard.",
      examples: ["₦20,000", "₦50,000", "₦100,000", "₦500,000"],
    },
    {
      num: "02",
      title: "Agricultural Development",
      desc: "Pooled contributions finance all farming operations managed by the cooperative — from land prep to irrigation and crop protection.",
      examples: ["Land preparation", "Crop planting", "Irrigation & protection", "Farm maintenance"],
    },
    {
      num: "03",
      title: "Produce Sales",
      desc: "After harvest, produce is distributed and sold through multiple channels to generate maximum revenue.",
      examples: ["Local markets", "Produce buyers", "Food distributors", "Processing companies"],
    },
    {
      num: "04",
      title: "Profit Calculation",
      desc: "Net profit is calculated transparently at the end of each farming cycle.",
      formula: true,
    },
    {
      num: "05",
      title: "Dividend Distribution",
      desc: "Dividends are shared proportionally among members based on each person's contribution to the total fund.",
      examples: ["Based on contribution size", "Paid annually", "Tracked on dashboard"],
    },
  ];

 

  const dashboardFeatures = [
    {
      icon: "📋",
      title: "Contribution Records",
      items: ["Total amount contributed", "Contribution history", "Contribution dates"],
    },
    {
      icon: "🌾",
      title: "Agricultural Project Updates",
      items: ["New planting seasons", "Crop development progress", "Harvest activities", "Produce sales updates"],
    },
    {
      icon: "💸",
      title: "Dividend Information",
      items: ["Total dividend earned", "Dividend calculation breakdown", "Dividend payment status"],
    },
  ];

  const benefits = [
    { icon: "🌿", title: "Passive Agricultural Investment", desc: "Earn from agriculture without directly managing farms or engaging in farming activities." },
    { icon: "📈", title: "Flexible Contribution System", desc: "Invest any amount depending on your financial capacity — no rigid minimums." },
    { icon: "💰", title: "Annual Dividend Earnings", desc: "Receive dividends based on profits generated from agricultural produce sales each year." },
    { icon: "🤝", title: "Community Development", desc: "Support agricultural growth, food production, and economic development within the cooperative." },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-cooperative-cream font-sans">

        {/* ── Hero Banner ──────────────────────────────────────── */}
        <section className="relative bg-cooperative-dark overflow-hidden">
          {/* dot grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #F57C00 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* green glow — slow pulse */}
          <motion.div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(46,125,50,0.18) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.10, 0.20, 0.10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* orange glow — slow pulse offset */}
          <motion.div
            className="absolute -bottom-24 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245,124,0,0.12) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.07, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 md:py-36 text-center">

            {/* Badge */}
            <motion.span
              className="inline-flex items-center gap-2 text-cooperative-cream/60 text-xs font-bold tracking-[0.2em] uppercase border border-cooperative-teal/30 bg-cooperative-teal/10 px-4 py-2 rounded-full mb-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              🌱 Agricultural Investment Program
            </motion.span>

            {/* H1 — word-by-word */}
            <motion.h1
              className="text-5xl md:text-7xl font-black text-cooperative-cream leading-[1.05] mb-6"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "-0.02em" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Grow Wealth
              <span className="block text-cooperative-orange mt-1">Without a Farm</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-cooperative-cream/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Pool your resources with fellow members. The cooperative manages all farming operations.
              You sit back and collect annual dividends.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="#"
                className="bg-cooperative-orange text-white font-bold px-9 py-4 rounded-full text-sm tracking-wide hover:brightness-110 transition-all duration-200 shadow-lg hover:shadow-orange-600/30 hover:scale-105"
              >
                Start Investing →
              </a>
              <a
                href="#how-it-works"
                className="border border-white/20 text-cooperative-cream font-semibold px-9 py-4 rounded-full text-sm hover:border-cooperative-orange hover:text-cooperative-orange transition-all duration-200"
              >
                See How It Works
              </a>
            </motion.div>

            {/* Stat strip — staggered pop-in */}
            <motion.div
              className="mt-16 inline-grid grid-cols-3 divide-x divide-white/10 border border-white/10 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {[
                { val: "₦5K+", label: "Min. Entry" },
                { val: "Annual", label: "Dividends" },
                { val: "100%", label: "Transparent" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className="px-8 py-5 text-center"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <p className="text-cooperative-orange text-2xl font-black">{s.val}</p>
                  <p className="text-cooperative-cream/40 text-xs uppercase tracking-widest mt-1">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────── */}
        <section className="bg-cooperative-cream py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

            {/* Text — slides in from left */}
            <AnimateOnScroll variant={fadeLeft} duration={0.7}>
              <p className="text-cooperative-orange text-xs font-bold uppercase tracking-[0.18em] mb-3">About the Program</p>
              <h2
                className="text-4xl md:text-5xl font-black text-cooperative-dark leading-tight mb-6"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Collective Farming.
                <span className="text-cooperative-teal block">Individual Gains.</span>
              </h2>
              <p className="text-cooperative-dark/65 text-base leading-relaxed mb-5">
                The Bethel Agricultural Program was created to support economic empowerment and agricultural development
                within the cooperative community. Instead of farming individually, members pool resources together 
                and the cooperative manages everything on your behalf.
              </p>
              <p className="text-cooperative-dark/65 text-base leading-relaxed mb-8">
                From land preparation to harvesting and distribution, our experienced management team handles all
                operations. You invest. We farm. You earn.
              </p>
            </AnimateOnScroll>

            {/* Activity cards — stagger from right */}
            <StaggerWrapper className="grid grid-cols-2 gap-4" stagger={0.1} delay={0.15}>
              {[
                { icon: "🌱", title: "Crop Cultivation", desc: "Land prep, planting & full-season management" },
                { icon: "💧", title: "Farm Maintenance", desc: "Irrigation, fertilization & crop protection" },
                { icon: "🚜", title: "Harvesting", desc: "Timely, efficient harvest to maximize yield" },
                { icon: "📦", title: "Distribution & Sales", desc: "Multi-channel market access for best prices" },
              ].map((card, i) => (
                <StaggerItem key={card.title} variant={fadeUp}>
                  <div className={`bg-white border border-cooperative-dark/5 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${i === 1 ? "mt-6" : ""}`}>
                    <span className="text-3xl mb-3 block">{card.icon}</span>
                    <h4 className="text-cooperative-dark font-bold text-sm mb-1">{card.title}</h4>
                    <p className="text-cooperative-dark/45 text-xs leading-relaxed">{card.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerWrapper>
          </div>
        </section>
        <FarmProduceShowcase />
        {/* ── How It Works ─────────────────────────────────────── */}
        <section id="how-it-works" className="bg-cooperative-brown py-24 px-6">
          <div className="max-w-5xl mx-auto">

            <AnimateOnScroll variant={fadeUp} className="text-center mb-16">
              <p className="text-cooperative-orange text-xs font-bold uppercase tracking-[0.18em] mb-3">The Process</p>
              <h2
                className="text-4xl md:text-5xl font-black text-cooperative-cream leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Five Steps to
                <span className="text-cooperative-orange"> Your Harvest</span>
              </h2>
            </AnimateOnScroll>

            <div className="flex flex-col gap-5">
              {steps.map((step, i) => (
                <AnimateOnScroll key={step.num} variant={fadeUp} delay={i * 0.08} duration={0.6}>
                  <div className="group bg-white/5 border border-white/8 rounded-2xl p-7 hover:border-cooperative-orange/35 hover:bg-white/8 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cooperative-orange/10 border border-cooperative-orange/25 flex items-center justify-center">
                        <span className="text-cooperative-orange font-black text-sm">{step.num}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{step.icon}</span>
                          <h3 className="text-cooperative-cream font-bold text-lg group-hover:text-cooperative-orange transition-colors duration-200">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-cooperative-cream/55 text-sm leading-relaxed mb-4">{step.desc}</p>
                        {step.formula ? (
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: "Total Produce Sales", color: "bg-cooperative-teal/20 text-cooperative-cream border-cooperative-teal/30" },
                              { label: "− Farming Expenses", color: "bg-white/5 text-cooperative-cream/60 border-white/10" },
                              { label: "− Operational Costs", color: "bg-white/5 text-cooperative-cream/60 border-white/10" },
                              { label: "= Net Profit (Dividends)", color: "bg-cooperative-orange/20 text-cooperative-orange border-cooperative-orange/30" },
                            ].map((f) => (
                              <span key={f.label} className={`border text-xs font-semibold px-3 py-1.5 rounded-lg ${f.color}`}>
                                {f.label}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {step.examples?.map((ex) => (
                              <span key={ex} className="bg-white/8 border border-white/10 text-cooperative-cream/60 text-xs font-medium px-3 py-1.5 rounded-lg">
                                {ex}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dividend Table ────────────────────────────────────── */}
        <section className="bg-cooperative-cream py-24 px-6">
          <div className="max-w-4xl mx-auto">

            <AnimateOnScroll variant={fadeUp} className="text-center mb-12">
              <p className="text-cooperative-orange text-xs font-bold uppercase tracking-[0.18em] mb-3">Dividend Sharing</p>
              <h2
                className="text-4xl font-black text-cooperative-dark leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                The More You Invest,
                <span className="text-cooperative-teal block">The More You Earn</span>
              </h2>
              <p className="text-cooperative-dark/55 text-base mt-4 max-w-lg mx-auto">
                Dividends are distributed proportionally at the end of each agricultural year.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant={slideUp} delay={0.12} duration={0.7}>
              <div className="bg-white rounded-3xl shadow-sm border border-cooperative-dark/5 overflow-hidden">
                <div className="grid grid-cols-3 bg-cooperative-dark px-7 py-4">
                  {["Member", "Contribution", "Dividend Share"].map((h) => (
                    <p key={h} className="text-cooperative-cream/50 text-xs font-bold uppercase tracking-widest">{h}</p>
                  ))}
                </div>
                {[
                  { member: "Member A", badge: "Starter", contribution: "₦5,000", share: "Proportional share", accent: "bg-cooperative-teal/10 text-cooperative-teal" },
                  { member: "Member B", badge: "Growth", contribution: "₦20,000", share: "Higher dividend", accent: "bg-cooperative-orange/10 text-cooperative-orange" },
                  { member: "Member C", badge: "Premium", contribution: "₦50,000", share: "Highest dividend", accent: "bg-cooperative-dark/10 text-cooperative-dark" },
                ].map((row, i, arr) => (
                  <motion.div
                    key={row.member}
                    className={`grid grid-cols-3 px-7 py-5 items-center hover:bg-cooperative-cream/50 transition-colors ${i < arr.length - 1 ? "border-b border-cooperative-dark/5" : ""}`}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div>
                      <p className="text-cooperative-dark font-bold text-sm">{row.member}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${row.accent}`}>{row.badge}</span>
                    </div>
                    <p className="text-cooperative-dark font-black text-xl">{row.contribution}</p>
                    <p className="text-cooperative-teal font-semibold text-sm">{row.share}</p>
                  </motion.div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Dashboard Features ────────────────────────────────── */}
        <section className="bg-cooperative-dark py-24 px-6">
          <div className="max-w-6xl mx-auto">

            <AnimateOnScroll variant={fadeUp} className="text-center mb-14">
              <p className="text-cooperative-orange text-xs font-bold uppercase tracking-[0.18em] mb-3">Member Dashboard</p>
              <h2
                className="text-4xl md:text-5xl font-black text-cooperative-cream leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Track Every Naira,
                <span className="text-cooperative-orange"> Every Season</span>
              </h2>
              <p className="text-cooperative-cream/50 text-base mt-4 max-w-xl mx-auto">
                Your agricultural dashboard gives full visibility into contributions, farm activity, and earnings — all in one place.
              </p>
            </AnimateOnScroll>

            {/* Feature cards — staggered scale-in */}
            <StaggerWrapper className="grid md:grid-cols-3 gap-6" stagger={0.12} delay={0.1}>
              {dashboardFeatures.map((f) => (
                <StaggerItem key={f.title} variant={scaleIn} duration={0.55}>
                  <div className="group bg-white/5 border border-white/8 rounded-2xl p-7 hover:border-cooperative-orange/30 hover:bg-white/8 transition-all duration-300">
                    <span className="text-4xl mb-4 block">{f.icon}</span>
                    <h3 className="text-cooperative-cream font-bold text-base mb-4 group-hover:text-cooperative-orange transition-colors">
                      {f.title}
                    </h3>
                    <ul className="flex flex-col gap-2.5">
                      {f.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-cooperative-cream/55 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-cooperative-teal flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerWrapper>

            {/* Transparency note */}
            <AnimateOnScroll variant={fadeUp} delay={0.15} className="mt-10">
              <div className="bg-cooperative-teal/10 border border-cooperative-teal/20 rounded-2xl px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="text-3xl flex-shrink-0">🔍</span>
                <div>
                  <p className="text-cooperative-cream font-bold text-sm mb-1">Transparency is a Core Value</p>
                  <p className="text-cooperative-cream/55 text-sm leading-relaxed">
                    Members receive regular updates including farm announcements, planting schedules, harvest reports, and agricultural performance summaries — so you always know how your money is working.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Benefits ─────────────────────────────────────────── */}
        <section className="bg-cooperative-cream py-24 px-6">
          <div className="max-w-6xl mx-auto">

            <AnimateOnScroll variant={fadeUp} className="text-center mb-14">
              <p className="text-cooperative-orange text-xs font-bold uppercase tracking-[0.18em] mb-3">Why Join</p>
              <h2
                className="text-4xl md:text-5xl font-black text-cooperative-dark leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Built for Members
                <span className="text-cooperative-teal block">Who Want More</span>
              </h2>
            </AnimateOnScroll>

            {/* Benefit cards — staggered fadeUp */}
            <StaggerWrapper className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.1} delay={0.1}>
              {benefits.map((b) => (
                <StaggerItem key={b.title} variant={fadeUp} duration={0.6}>
                  <div className="group relative bg-white border border-cooperative-dark/5 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-cooperative-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                    <span className="text-4xl mb-4 block">{b.icon}</span>
                    <h3 className="text-cooperative-dark font-bold text-sm mb-2">{b.title}</h3>
                    <p className="text-cooperative-dark/50 text-xs leading-relaxed">{b.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerWrapper>
          </div>
        </section>

        {/* ── Produce Showcase Strip ────────────────────────────── */}
        <section className="bg-cooperative-teal py-14 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-between">

            <AnimateOnScroll variant={fadeLeft} duration={0.7}>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">🥕 Agricultural Produce Showcase</p>
              <h3 className="text-white font-black text-2xl md:text-3xl leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                See the Real Impact
                <span className="block text-cooperative-cream/80 font-medium text-lg mt-1">
                  Photos, crop updates & harvest results — published each season.
                </span>
              </h3>
            </AnimateOnScroll>

            <StaggerWrapper className="flex flex-wrap gap-3 justify-center md:justify-end" stagger={0.08} delay={0.2}>
              {["Farm Photos", "Crop Updates", "Harvest Reports", "Expansion Plans"].map((tag) => (
                <StaggerItem key={tag} variant={scaleIn}>
                  <span className="bg-white/15 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/25 transition-colors duration-200">
                    {tag}
                  </span>
                </StaggerItem>
              ))}
            </StaggerWrapper>
          </div>
        </section>

        {/* ── Vision / CTA ─────────────────────────────────────── */}
        <section className="relative bg-cooperative-dark py-28 px-6 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #F57C00 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* animated glow */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(46,125,50,0.12) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <AnimateOnScroll variant={fadeUp} duration={0.7}>
              <p className="text-cooperative-orange text-xs font-bold uppercase tracking-[0.18em] mb-4">Our Vision</p>
              <h2
                className="text-4xl md:text-6xl font-black text-cooperative-cream mb-6 leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                A Sustainable Farm
                <span className="text-cooperative-orange block">for Every Member</span>
              </h2>
              <p className="text-cooperative-cream/55 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
                Through collective investment and responsible agricultural management, Bethel Cooperatives aims to
                increase agricultural production, support local farming, and generate sustainable income for all members.
              </p>
            </AnimateOnScroll>

            {/* Vision bullet list — staggered */}
            <StaggerWrapper className="flex flex-wrap justify-center gap-4 mb-10" stagger={0.09} delay={0.15}>
              {["Increase agricultural production", "Support local farming", "Generate sustainable income", "Strengthen the cooperative economy"].map((v) => (
                <StaggerItem key={v} variant={fadeUp}>
                  <li className="flex items-center gap-2 text-cooperative-cream/50 text-sm list-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-cooperative-orange" />
                    {v}
                  </li>
                </StaggerItem>
              ))}
            </StaggerWrapper>

            <AnimateOnScroll variant={scaleIn} delay={0.2} duration={0.6}>
              <a
                href="#"
                className="inline-block bg-cooperative-orange text-white font-bold px-12 py-4 rounded-full text-base hover:brightness-110 transition-all hover:scale-105 shadow-xl hover:shadow-orange-500/30"
              >
                Access Member Dashboard →
              </a>
            </AnimateOnScroll>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}