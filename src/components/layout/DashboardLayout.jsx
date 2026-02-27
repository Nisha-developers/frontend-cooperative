import { useState } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, stroke = "currentColor", fill = "none", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

const icons = {
  dashboard: ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", "M9 22V12h6v10"],
  analytics: ["M18 20V10", "M12 20V4", "M6 20v-6"],
  wallet:    ["M21 12V7H5a2 2 0 010-4h14v4", "M3 7v13a2 2 0 002 2h16v-5", "M18 12a1 1 0 100 2 1 1 0 000-2z"],
  members:   ["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", "M23 21v-2a4 4 0 00-3-3.87", "M16 3.13a4 4 0 010 7.75", "M9 7a4 4 0 100 8 4 4 0 000-8z"],
  projects:  ["M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"],
  messages:  ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
  settings:  ["M12 15a3 3 0 100-6 3 3 0 000 6z", "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
  bell:      ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 01-3.46 0"],
  search:    ["M11 17a6 6 0 100-12 6 6 0 000 12z", "M21 21l-4.35-4.35"],
  menu:      ["M3 12h18", "M3 6h18", "M3 18h18"],
  close:     ["M18 6L6 18", "M6 6l12 12"],
  chevron:   "M9 18l6-6-6-6",
  logout:    ["M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4", "M16 17l5-5-5-5", "M21 12H9"],
  trending:  ["M23 6l-9.5 9.5-5-5L1 18", "M17 6h6v6"],
  arrow_up:  "M18 15l-6-6-6 6",
  arrow_down:"M6 9l6 6 6-6",
  user:      ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2", "M12 11a4 4 0 100-8 4 4 0 000 8"],
  check:     "M20 6L9 17l-5-5",
  dot:       "M12 12m-2 0a2 2 0 104 0 2 2 0 00-4 0",
};

// ── Color palette ─────────────────────────────────────────────────────────────
const C = {
  cream:  "#FDF6EC",
  dark:   "#003000",
  orange: "#F57C00",
  teal:   "#2E7D32",
  brown:  "#2E7D32",
  white:  "#FFFFFF",
  gray50: "#F9FAFB",
  gray100:"#F3F4F6",
  gray200:"#E5E7EB",
  gray400:"#9CA3AF",
  gray500:"#6B7280",
  red:    "#EF4444",
  green:  "#22C55E",
  amber:  "#F59E0B",
};

// ── Mock data ─────────────────────────────────────────────────────────────────
const stats = [
  { label: "Total Members",   value: "4,821",  change: "+12%", up: true,  icon: icons.members,   color: C.teal   },
  { label: "Revenue",         value: "₦2.4M",  change: "+8%",  up: true,  icon: icons.wallet,    color: C.orange },
  { label: "Active Projects", value: "38",     change: "-3%",  up: false, icon: icons.projects,  color: C.dark   },
  { label: "Messages",        value: "127",    change: "+24%", up: true,  icon: icons.messages,  color: "#7C3AED"},
];

const recentMembers = [
  { name: "Adaeze Okonkwo",  role: "Farmer",      status: "active",  avatar: "AO", joined: "2 days ago"  },
  { name: "Emeka Chukwu",    role: "Processor",   status: "active",  avatar: "EC", joined: "4 days ago"  },
  { name: "Fatima Al-Amin",  role: "Distributor", status: "pending", avatar: "FA", joined: "1 week ago"  },
  { name: "Gbenga Adeyemi",  role: "Farmer",      status: "active",  avatar: "GA", joined: "1 week ago"  },
  { name: "Chisom Eze",      role: "Marketer",    status: "inactive",avatar: "CE", joined: "2 weeks ago" },
];

const activities = [
  { text: "New member Adaeze joined",        time: "2m ago",   type: "member"  },
  { text: "Payment of ₦45,000 received",     time: "18m ago",  type: "payment" },
  { text: "Project #12 status updated",      time: "1h ago",   type: "project" },
  { text: "Meeting scheduled for Friday",    time: "3h ago",   type: "event"   },
  { text: "Fatima's application pending",    time: "5h ago",   type: "member"  },
  { text: "Monthly report generated",        time: "Yesterday",type: "report"  },
];

const navItems = [
  { label: "Dashboard",  icon: icons.dashboard, id: "dashboard" },
  { label: "Analytics",  icon: icons.analytics, id: "analytics" },
  { label: "Members",    icon: icons.members,   id: "members",  badge: 3 },
  { label: "Projects",   icon: icons.projects,  id: "projects"  },
  { label: "Wallet",     icon: icons.wallet,    id: "wallet"    },
  { label: "Messages",   icon: icons.messages,  id: "messages", badge: 12 },
  { label: "Settings",   icon: icons.settings,  id: "settings"  },
];

const barData = [40, 65, 50, 80, 55, 90, 70, 85, 60, 75, 95, 68];
const months  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ── Sub-components ────────────────────────────────────────────────────────────
function Avatar({ initials, size = 36, bg = C.teal, color = C.white }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color, display: "flex",
      alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: size * 0.35, flexShrink: 0,
      fontFamily: "'Georgia', serif",
    }}>{initials}</div>
  );
}

function StatusBadge({ status }) {
  const map = {
    active:   { bg: "#DCFCE7", color: "#166534", dot: C.green  },
    pending:  { bg: "#FEF9C3", color: "#854D0E", dot: C.amber  },
    inactive: { bg: "#F3F4F6", color: C.gray500,  dot: C.gray400 },
  };
  const s = map[status] || map.inactive;
  return (
    <span style={{
      background: s.bg, color: s.color, borderRadius: 20,
      padding: "2px 10px", fontSize: 11, fontWeight: 600,
      display: "inline-flex", alignItems: "center", gap: 4,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav,   setActiveNav]   = useState("dashboard");
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [notifOpen,   setNotifOpen]   = useState(false);

  const SIDEBAR_W  = 240;
  const COLLAPSED  = 68;
  const effective  = sidebarOpen ? SIDEBAR_W : COLLAPSED;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.cream, fontFamily: "'Lato', 'Georgia', sans-serif", position: "relative" }}>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 40 }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: SIDEBAR_W,
        flexShrink: 0,
        background: C.dark,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, width 0.3s ease",
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
        overflowX: "hidden",
        overflowY: "auto",
        // Mobile: slide in/out; Desktop: collapse/expand
        transform: mobileOpen ? "translateX(0)" : undefined,
      }}
        className="dashboard-sidebar"
      >
        {/* Logo area */}
        <div style={{
          padding: "20px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: `1px solid rgba(255,255,255,0.08)`,
          minHeight: 64, flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: C.orange,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span style={{
              color: C.white, fontWeight: 800, fontSize: 16,
              fontFamily: "'Georgia', serif", whiteSpace: "nowrap",
              opacity: sidebarOpen ? 1 : 0, transition: "opacity 0.2s",
              overflow: "hidden",
            }}>CoopAdmin</span>
          </div>
          {/* Desktop collapse toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8,
              color: C.white, cursor: "pointer", padding: 6, display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
            className="sidebar-collapse-btn"
          >
            <Icon d={sidebarOpen ? icons.close : icons.menu} size={16} />
          </button>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(({ label, icon, id, badge }) => {
            const active = activeNav === id;
            return (
              <button
                key={id}
                onClick={() => { setActiveNav(id); setMobileOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 10px",
                  borderRadius: 10, border: "none", cursor: "pointer",
                  background: active ? C.orange : "transparent",
                  color: active ? C.white : "rgba(255,255,255,0.65)",
                  transition: "all 0.18s",
                  width: "100%", textAlign: "left",
                  position: "relative", overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ flexShrink: 0, display: "flex" }}>
                  <Icon d={icon} size={18} />
                </span>
                <span style={{
                  fontSize: 13.5, fontWeight: active ? 700 : 500,
                  opacity: sidebarOpen ? 1 : 0, transition: "opacity 0.2s",
                  overflow: "hidden",
                }}>{label}</span>
                {badge && sidebarOpen && (
                  <span style={{
                    marginLeft: "auto", background: active ? "rgba(255,255,255,0.3)" : C.orange,
                    color: C.white, borderRadius: 20, padding: "1px 7px",
                    fontSize: 10, fontWeight: 700, flexShrink: 0,
                  }}>{badge}</span>
                )}
                {badge && !sidebarOpen && (
                  <span style={{
                    position: "absolute", top: 6, right: 6,
                    width: 8, height: 8, borderRadius: "50%",
                    background: C.orange, border: `2px solid ${C.dark}`,
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* User profile at bottom */}
        <div style={{
          padding: "12px 8px 16px",
          borderTop: `1px solid rgba(255,255,255,0.08)`,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 10px", borderRadius: 10,
            background: "rgba(255,255,255,0.06)",
          }}>
            <Avatar initials="JD" size={34} bg={C.orange} />
            <div style={{
              overflow: "hidden", opacity: sidebarOpen ? 1 : 0,
              transition: "opacity 0.2s", flex: 1, minWidth: 0,
            }}>
              <div style={{ color: C.white, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Jane Doe</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, whiteSpace: "nowrap" }}>Administrator</div>
            </div>
            {sidebarOpen && (
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 4 }}>
                <Icon d={icons.logout} size={15} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex: 1,
        marginLeft: effective,
        transition: "margin-left 0.3s ease",
        minWidth: 0,
        display: "flex", flexDirection: "column",
      }} className="dashboard-main">

        {/* ── TOPBAR ── */}
        <header style={{
          background: C.white,
          borderBottom: `1px solid ${C.gray200}`,
          padding: "0 24px",
          height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 30,
          gap: 12,
          boxShadow: "0 1px 4px rgba(0,48,0,0.06)",
        }}>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: C.dark, padding: 6, borderRadius: 8, display: "none",
            }}
            className="mobile-menu-btn"
          >
            <Icon d={icons.menu} size={22} />
          </button>

          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.gray50, borderRadius: 12,
            padding: "8px 14px", border: `1px solid ${C.gray200}`,
            flex: "1", maxWidth: 380,
          }}>
            <Icon d={icons.search} size={16} stroke={C.gray400} />
            <input
              placeholder="Search members, projects..."
              style={{
                border: "none", background: "transparent", outline: "none",
                fontSize: 13.5, color: C.dark, width: "100%",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Notification bell */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                style={{
                  background: notifOpen ? C.cream : "none", border: "none",
                  cursor: "pointer", padding: 8, borderRadius: 10,
                  color: C.dark, position: "relative", display: "flex",
                }}
              >
                <Icon d={icons.bell} size={20} />
                <span style={{
                  position: "absolute", top: 6, right: 6,
                  width: 8, height: 8, borderRadius: "50%",
                  background: C.orange, border: `2px solid ${C.white}`,
                }} />
              </button>
              {notifOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 8px)",
                  width: 300, background: C.white, borderRadius: 16,
                  boxShadow: "0 8px 32px rgba(0,48,0,0.15)",
                  border: `1px solid ${C.gray100}`, zIndex: 100, overflow: "hidden",
                }}>
                  <div style={{ padding: "14px 16px 10px", borderBottom: `1px solid ${C.gray100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: C.dark, fontFamily: "'Georgia',serif" }}>Notifications</span>
                    <span style={{ fontSize: 11, color: C.orange, fontWeight: 600, cursor: "pointer" }}>Mark all read</span>
                  </div>
                  {activities.slice(0, 4).map((a, i) => (
                    <div key={i} style={{
                      padding: "10px 16px", display: "flex", gap: 10, alignItems: "flex-start",
                      borderBottom: i < 3 ? `1px solid ${C.gray100}` : "none",
                      cursor: "pointer", transition: "background 0.15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = C.gray50}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal, marginTop: 5, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, color: C.dark, fontWeight: 500 }}>{a.text}</div>
                        <div style={{ fontSize: 11, color: C.gray400, marginTop: 2 }}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar */}
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
              <Avatar initials="JD" size={36} bg={C.dark} />
            </button>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main style={{ flex: 1, padding: "28px 24px 40px", maxWidth: 1200, width: "100%" }}>

          {/* Page heading */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{
              fontSize: 26, fontWeight: 800, color: C.dark,
              fontFamily: "'Georgia', serif", letterSpacing: "-0.02em", margin: 0,
            }}>Welcome back, Jane 👋</h1>
            <p style={{ color: C.gray500, fontSize: 14, marginTop: 4 }}>
              Here's what's happening in your cooperative today.
            </p>
          </div>

          {/* ── Stat cards ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 16, marginBottom: 28,
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: C.white, borderRadius: 18, padding: "20px 20px",
                boxShadow: "0 2px 12px rgba(0,48,0,0.06)",
                border: `1px solid ${C.gray100}`,
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,48,0,0.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,48,0,0.06)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 12, color: C.gray500, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: C.dark, marginTop: 6, fontFamily: "'Georgia',serif" }}>{s.value}</div>
                  </div>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: s.color + "18",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: s.color, flexShrink: 0,
                  }}>
                    <Icon d={s.icon} size={20} stroke={s.color} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 12 }}>
                  <span style={{ color: s.up ? C.green : C.red, display: "flex", alignItems: "center", gap: 2, fontSize: 12, fontWeight: 700 }}>
                    <Icon d={s.up ? icons.arrow_up : icons.arrow_down} size={13} stroke={s.up ? C.green : C.red} strokeWidth={2.5} />
                    {s.change}
                  </span>
                  <span style={{ color: C.gray400, fontSize: 12 }}>vs last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Chart + Activity ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 20, marginBottom: 24,
          }} className="dashboard-grid-2">

            {/* Bar chart */}
            <div style={{
              background: C.white, borderRadius: 18, padding: "24px",
              boxShadow: "0 2px 12px rgba(0,48,0,0.06)",
              border: `1px solid ${C.gray100}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.dark, fontFamily: "'Georgia',serif" }}>Revenue Overview</h2>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: C.gray500 }}>Monthly earnings this year</p>
                </div>
                <select style={{
                  background: C.gray50, border: `1px solid ${C.gray200}`,
                  borderRadius: 8, padding: "6px 10px", fontSize: 12,
                  color: C.dark, cursor: "pointer", outline: "none", fontFamily: "inherit",
                }}>
                  <option>2025</option><option>2024</option>
                </select>
              </div>
              {/* Bars */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
                {barData.map((val, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
                    <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                      <div style={{
                        width: "100%",
                        height: `${val}%`,
                        background: i === 6 ? C.orange : C.teal + "55",
                        borderRadius: "5px 5px 0 0",
                        transition: "height 0.4s ease",
                        cursor: "pointer",
                        border: i === 6 ? `2px solid ${C.orange}` : "none",
                        position: "relative",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.orange; }}
                        onMouseLeave={e => { e.currentTarget.style.background = i === 6 ? C.orange : C.teal + "55"; }}
                      />
                    </div>
                    <span style={{ fontSize: 9.5, color: C.gray400, fontWeight: 500 }}>{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              background: C.white, borderRadius: 18, padding: "24px",
              boxShadow: "0 2px 12px rgba(0,48,0,0.06)",
              border: `1px solid ${C.gray100}`,
              overflow: "hidden",
            }}>
              <h2 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 800, color: C.dark, fontFamily: "'Georgia',serif" }}>Recent Activity</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {activities.map((a, i) => {
                  const dotColors = { member: C.teal, payment: C.orange, project: "#7C3AED", event: C.amber, report: C.gray400 };
                  return (
                    <div key={i} style={{
                      display: "flex", gap: 12, paddingBottom: 14,
                      borderBottom: i < activities.length - 1 ? `1px solid ${C.gray100}` : "none",
                      paddingTop: i === 0 ? 0 : 14,
                    }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: dotColors[a.type] || C.teal, flexShrink: 0, marginTop: 3 }} />
                        {i < activities.length - 1 && <div style={{ width: 2, flex: 1, background: C.gray100, borderRadius: 2 }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.4 }}>{a.text}</div>
                        <div style={{ fontSize: 11, color: C.gray400, marginTop: 2 }}>{a.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Members table ── */}
          <div style={{
            background: C.white, borderRadius: 18,
            boxShadow: "0 2px 12px rgba(0,48,0,0.06)",
            border: `1px solid ${C.gray100}`, overflow: "hidden",
          }}>
            <div style={{ padding: "20px 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.gray100}` }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.dark, fontFamily: "'Georgia',serif" }}>Recent Members</h2>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: C.gray500 }}>Latest registrations</p>
              </div>
              <button style={{
                background: C.dark, color: C.white, border: "none",
                borderRadius: 10, padding: "8px 16px", fontSize: 12,
                fontWeight: 700, cursor: "pointer", transition: "background 0.2s",
                fontFamily: "inherit",
              }}
                onMouseEnter={e => e.currentTarget.style.background = C.teal}
                onMouseLeave={e => e.currentTarget.style.background = C.dark}
              >
                View All
              </button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                <thead>
                  <tr style={{ background: C.gray50 }}>
                    {["Member", "Role", "Status", "Joined"].map(h => (
                      <th key={h} style={{
                        padding: "11px 24px", textAlign: "left",
                        fontSize: 11, fontWeight: 700, color: C.gray500,
                        textTransform: "uppercase", letterSpacing: "0.07em",
                        borderBottom: `1px solid ${C.gray200}`,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentMembers.map((m, i) => (
                    <tr key={i} style={{ borderBottom: i < recentMembers.length - 1 ? `1px solid ${C.gray100}` : "none", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = C.gray50}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "14px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Avatar initials={m.avatar} size={34} bg={C.dark} />
                          <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{m.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 24px", fontSize: 13, color: C.gray500 }}>{m.role}</td>
                      <td style={{ padding: "14px 24px" }}><StatusBadge status={m.status} /></td>
                      <td style={{ padding: "14px 24px", fontSize: 13, color: C.gray400 }}>{m.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700;900&display=swap');

        .dashboard-sidebar {
          width: ${SIDEBAR_W}px !important;
        }

        @media (min-width: 769px) {
          .dashboard-sidebar {
            width: ${effective}px !important;
          }
          .mobile-menu-btn { display: none !important; }
        }

        @media (max-width: 768px) {
          .dashboard-sidebar {
            width: ${SIDEBAR_W}px !important;
            transform: translateX(${mobileOpen ? "0" : "-100%"}) !important;
          }
          .dashboard-main {
            margin-left: 0 !important;
          }
          .mobile-menu-btn { display: flex !important; }
          .sidebar-collapse-btn { display: none !important; }
          .dashboard-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .dashboard-main main {
            padding: 20px 16px 40px !important;
          }
        }

        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
      `}</style>
    </div>
  );
}