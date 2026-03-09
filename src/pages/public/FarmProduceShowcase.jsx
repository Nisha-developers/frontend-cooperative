import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Fallback mock data (used when API is unavailable during dev) ──────────────
const MOCK_PRODUCE = [
  {
    id: 1,
    name: "Cassava",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80",
    quantity: 4200,
    unit: "kg",
    harvestDate: "2025-03-10",
  },
  {
    id: 2,
    name: "Maize",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80",
    quantity: 2800,
    unit: "kg",  
    harvestDate: "2025-03-15",
  },
  {
    id: 3,
    name: "Rice",
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&q=80",
    quantity: 1500,
    unit: "kg",
    harvestDate: "2025-04-02",
  },
  {
    id: 4,
    name: "Tomatoes",
    image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=800&q=80",
    quantity: 320,
    unit: "crates",
    harvestDate: "2025-03-20",
  },
  {
    id: 5,
    name: "Pepper",
    image: "https://images.unsplash.com/photo-1567539549213-cc1697632146?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVwcGVyfGVufDB8fDB8fHww",
    quantity: 180,
    unit: "crates",
    harvestDate: "2025-03-22",
  },
  {
    id: 6,
    name: "Vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    quantity: 950,
    unit: "bundles",
    harvestDate: "2025-03-18",
  },
  {
    id: 7,
    name: "Yam",
    image: "https://images.unsplash.com/photo-1730815048561-45df6f7f331d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eWFtfGVufDB8fDB8fHww",
    quantity: 3100,
    unit: "tubers",
    harvestDate: "2025-04-10",
  },
  {
    id: 8,
    name: "Groundnuts",
    image: "https://plus.unsplash.com/premium_photo-1668420870736-168a5a5c79a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdW5kbnV0fGVufDB8fDB8fHww",
    quantity: 870,
    unit: "kg",
    harvestDate: "2025-03-28",
    featured: false,
  },
];

const STATUS_CONFIG = {
  abundant: {
    label: "Abundant",
    dot: "bg-emerald-500",
    text: "text-emerald-400",
    badge: "bg-emerald-500/15 border-emerald-500/25 text-emerald-400",
    bar: "bg-emerald-500",
    pct: 88,
  },
  moderate: {
    label: "",
    dot: "bg-amber-400",
    text: "text-amber-400",
    badge: "bg-amber-400/15 border-amber-400/25 text-amber-400",
    bar: "bg-amber-400",
    pct: 50,
  },
  low: {
    label: "Low Stock",
    dot: "bg-red-500",
    text: "text-red-400",
    badge: "bg-red-500/15 border-red-500/25 text-red-400",
    bar: "bg-red-500",
    pct: 16,
  },
};

// ── Skeleton loader card ─────────────────────────────────────────────────────
function SkeletonCard({ tall }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden bg-white/4 border border-white/6 animate-pulse ${tall ? "row-span-2" : ""}`}
    >
      <div className="w-full h-full bg-white/5" />
    </div>
  );
}

// ── Single produce card ──────────────────────────────────────────────────────
function ProduceCard({ item, index }) {
  const st = STATUS_CONFIG[item.status] || STATUS_CONFIG.moderate;

  // Featured items get a taller card that spans 2 rows
  const isFeatured = item.featured;

  return (
    <motion.article
      className={`group relative overflow-hidden rounded-2xl border border-white/8 hover:border-cooperative-orange/40 transition-border duration-300 cursor-pointer`}
     initial={{ opacity: 0, y: 36 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{
    duration: 0.6,
    delay: index * 0.09,  // slightly longer stagger
    ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* ── Photo ── */}
      <div className="absolute inset-0">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        {/* Gradient — stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
      </div>

     

      {/* ── Content ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        {/* Name row */}
        <div className="flex items-center gap-2 mb-1">
          
          <h3
            className={`text-white font-black leading-tight text-lg`}
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {item.name}
          </h3>
        </div>

        {/* Quantity — the hero number */}
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className={`text-cooperative-orange font-black tabular-nums ${isFeatured ? "text-4xl" : "text-2xl"}`}>
            {item.quantity.toLocaleString()}
          </span>
          <span className="text-white/50 text-sm font-medium">{item.unit}</span>
          <span className="text-white/30 text-xs ml-1">available</span>
        </div>


        {/* Harvest date — featured only */}
        {isFeatured && item.harvestDate && (
          <p className="mt-3 pt-3 border-t border-white/10 text-white/35 text-xs">
            🗓 Harvested:{" "}
            {new Date(item.harvestDate).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </motion.article>
  );
}

// ── Summary strip ────────────────────────────────────────────────────────────
function SummaryStrip({ produce }) {
  const total = produce.reduce((s, p) => s + p.quantity, 0);
  const abundant = produce.filter((p) => p.status === "abundant").length;
  const low = produce.filter((p) => p.status === "low").length;

  return (
    <motion.div
      className="grid grid-cols-3 gap-4 mb-8 max-sm:flex max-sm:flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {[
        { icon: "🌾", label: "Crop Varieties", value: produce.length },
        { icon: "📦", label: "Total Available", value: `${total.toLocaleString()} units` },
        { icon: "✅", label: "Fully Stocked", value: `${abundant} crops` },
      ].map((s) => (
        <div
          key={s.label}
          className="bg-cooperative-dark/50 border border-white/8 rounded-2xl px-5 py-4 text-center"
        >
          <p className="text-2xl mb-1">{s.icon}</p>
          <p className="text-cooperative-orange font-black text-xl">{s.value}</p>
          <p className="text-white/40 text-xs uppercase tracking-widest mt-0.5">{s.label}</p>
        </div>
      ))}
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function FarmProduceShowcase() {
  const [produce, setProduce] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // ── Fetch from backend ───────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();

    const fetchProduce = async () => {
      try {
        setLoading(true);
        setError(null);

        // Replace this URL with your actual API endpoint
        const res = await fetch("/api/farm/produce", {
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        setProduce(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        // In development, fall back to mock data
        console.warn("API unavailable, using mock data:", err.message);
        setProduce(MOCK_PRODUCE);
        // Comment the line above and uncomment below for production error display:
        // setError("Unable to load farm produce. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduce();
    return () => controller.abort();
  }, []);

  // ── Filter ───────────────────────────────────────────────────
  const filtered =
    filter === "all" ? produce : produce.filter((p) => p.status === filter);

  return (
    <section className="bg-cooperative-dark py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-cooperative-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">
            🥕 Live Farm Inventory
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-cooperative-cream leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            What's Growing
            <span className="text-cooperative-orange block mt-1">on Our Farms</span>
          </h2>
          <p className="text-cooperative-cream/50 text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Real-time inventory of produce currently available from cooperative farmland.
            Updated by our farm management team.
          </p>
        </motion.div>

        {/* ── Summary strip ── */}
        {!loading && !error && produce.length > 0 && (
          <SummaryStrip produce={produce} />
        )}

        

        {/* ── Loading skeleton ── */}
        {loading && (
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gridAutoRows: "220px",
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} tall={i === 0 || i === 3} />
            ))}
          </div>
        )}

        {/* ── Error state ── */}
        {error && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🌧</p>
            <p className="text-white/60 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-cooperative-orange text-white text-sm font-bold px-6 py-2.5 rounded-full hover:brightness-110 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ── Produce grid ── */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid gap-3 px-7 max-verySmall:px-1 pt-16"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gridAutoRows: "220px",
                  gridAutoFlow: "dense",
                }}
              >
                {filtered.map((item, i) => (
                  <ProduceCard key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-5xl mb-4">🌱</p>
                <p className="text-white/40 text-sm">No produce in this category right now.</p>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* ── Bottom note ── */}
        {!loading && !error && produce.length > 0 && (
          <motion.p
            className="text-center text-white/25 text-xs mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
          </motion.p>
        )}
      </div>
    </section>
  );
}