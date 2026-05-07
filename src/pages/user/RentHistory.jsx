import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRent } from '../../context/RentProvider';
import {
  Search, Filter, ChevronDown, ChevronUp,
  CheckCircle, XCircle, Clock, Home,
  Calendar, Eye, Loader2, ChevronLeft, ChevronRight,
} from 'lucide-react';

/* ─── Date helpers ───────────────────────────────────────── */
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
function ordSuffix(d) {
  if (d % 10 === 1 && d !== 11) return 'st';
  if (d % 10 === 2 && d !== 12) return 'nd';
  if (d % 10 === 3 && d !== 13) return 'rd';
  return 'th';
}
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  const day = d.getDate();
  return `${day}${ordSuffix(day)} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtAmount(raw) {
  const num = parseFloat(raw ?? 0);
  return `₦${Math.abs(num).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;
}

/* ─── Group by month ─────────────────────────────────────── */
function groupByMonth(list) {
  return list.reduce((acc, t) => {
    const d = new Date(t.created_at);
    const key = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    (acc[key] = acc[key] || []).push(t);
    return acc;
  }, {});
}

/* ─── Search filter (client-side on current page) ────────── */
function applySearch(list, query) {
  if (!query) return list;
  const q = query.toLowerCase();
  return list.filter(t =>
    (t.listing_title ?? '').toLowerCase().includes(q) ||
    (t.property_type ?? '').toLowerCase().includes(q) ||
    (t.uid ?? '').toLowerCase().includes(q)
  );
}

/* ─── Design tokens ──────────────────────────────────────── */
const THEME = {
  ACTIVE: {
    borderL:    'border-l-[#2E7D32]',
    iconBg:     'bg-[#2E7D32]/10',
    iconColor:  'text-[#2E7D32]',
    amtColor:   'text-[#2E7D32]',
    badgeBg:    'bg-[#2E7D32]/10 text-[#2E7D32]',
    footerBg:   'bg-[#2E7D32]/5 border-[#2E7D32]/10',
    hdrBg:      'bg-[#2E7D32]/8 border-[#2E7D32]/20',
    hdrText:    'text-[#2E7D32]',
    dot:        'bg-[#2E7D32]',
    pulse:      true,
    emptyBdr:   'border-[#2E7D32]/20 bg-[#2E7D32]/5',
    emptyText:  'text-[#2E7D32]/40',
    paginBg:    'bg-[#2E7D32]',
    Icon:       CheckCircle,
    label:      'Active Rentals',
    actionWord: 'Active',
    canView:    true,
  },
  PENDING: {
    borderL:    'border-l-[#F57C00]',
    iconBg:     'bg-[#FDF6EC]',
    iconColor:  'text-[#F57C00]',
    amtColor:   'text-[#F57C00]',
    badgeBg:    'bg-[#F57C00]/10 text-[#F57C00]',
    footerBg:   'bg-[#FDF6EC] border-[#F57C00]/15',
    hdrBg:      'bg-[#FDF6EC] border-[#F57C00]/30',
    hdrText:    'text-[#F57C00]',
    dot:        'bg-[#F57C00]',
    pulse:      true,
    emptyBdr:   'border-[#F57C00]/25 bg-[#FDF6EC]',
    emptyText:  'text-[#F57C00]/40',
    paginBg:    'bg-[#F57C00]',
    Icon:       Clock,
    label:      'Pending Rentals',
    actionWord: null,
    canView:    true,
  },
  COMPLETED: {
    borderL:    'border-l-blue-500',
    iconBg:     'bg-blue-50',
    iconColor:  'text-blue-500',
    amtColor:   'text-blue-500',
    badgeBg:    'bg-blue-100 text-blue-700',
    footerBg:   'bg-blue-50/60 border-blue-100',
    hdrBg:      'bg-blue-50 border-blue-200',
    hdrText:    'text-blue-600',
    dot:        'bg-blue-500',
    pulse:      false,
    emptyBdr:   'border-blue-200 bg-blue-50',
    emptyText:  'text-blue-300',
    paginBg:    'bg-blue-500',
    Icon:       CheckCircle,
    label:      'Completed Rentals',
    actionWord: 'Completed',
    canView:    false,
  },
  REJECTED: {
    borderL:    'border-l-red-500',
    iconBg:     'bg-red-50',
    iconColor:  'text-red-500',
    amtColor:   'text-red-500',
    badgeBg:    'bg-red-100 text-red-600',
    footerBg:   'bg-red-50/60 border-red-100',
    hdrBg:      'bg-red-50 border-red-200',
    hdrText:    'text-red-600',
    dot:        'bg-red-500',
    pulse:      false,
    emptyBdr:   'border-red-200 bg-red-50',
    emptyText:  'text-red-300',
    paginBg:    'bg-red-500',
    Icon:       XCircle,
    label:      'Rejected Rentals',
    actionWord: 'Rejected',
    canView:    false,
  },
};

/* ─── Section header ─────────────────────────────────────── */
const SectionHeader = ({ status, count }) => {
  const th = THEME[status];
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border sticky top-0 z-10 ${th.hdrBg}`}>
      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${th.dot}`} />
      <span className={`font-extrabold text-sm uppercase tracking-wider ${th.hdrText}`}>{th.label}</span>
      <span className={`ml-auto text-xs font-bold px-2.5 py-0.5 rounded-full ${th.badgeBg}`}>{count}</span>
    </div>
  );
};

/* ─── Empty state ────────────────────────────────────────── */
const EmptyState = ({ status }) => {
  const th = THEME[status];
  return (
    <div className={`flex flex-col items-center justify-center py-10 rounded-2xl border-2 border-dashed ${th.emptyBdr}`}>
      <Home className={`w-9 h-9 mb-2 ${th.emptyText}`} />
      <p className="text-sm font-medium text-[#003000]/40">No {th.label.toLowerCase()} yet</p>
    </div>
  );
};

/* ─── Pagination bar ─────────────────────────────────────── */
const PaginationBar = ({ status, hasPrev, hasNext, loading, onPrev, onNext }) => {
  const th = THEME[status];
  if (!hasPrev && !hasNext) return null;
  return (
    <div className="flex items-center justify-end gap-2 pt-1">
      <button
        onClick={onPrev}
        disabled={!hasPrev || loading}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
          ${hasPrev && !loading
            ? `${th.paginBg} text-white hover:opacity-90 active:scale-95`
            : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
      >
        {loading ? <Loader2 size={12} className="animate-spin" /> : <ChevronLeft size={12} />}
        Prev
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext || loading}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
          ${hasNext && !loading
            ? `${th.paginBg} text-white hover:opacity-90 active:scale-95`
            : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
      >
        Next
        {loading ? <Loader2 size={12} className="animate-spin" /> : <ChevronRight size={12} />}
      </button>
    </div>
  );
};

/* ─── Rent card ──────────────────────────────────────────── */
const RentCard = ({ item, onViewDetails }) => {
  const th = THEME[item.status] || THEME.PENDING;
  return (
    <div
      onClick={() => th.canView && onViewDetails(item)}
      className={`
        bg-white rounded-2xl border border-gray-100 border-l-4 ${th.borderL}
        shadow-sm hover:shadow-md transition-all duration-150 overflow-hidden
        ${th.canView ? 'cursor-pointer active:scale-[0.995]' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${th.iconBg} flex items-center justify-center`}>
            <Home className={`w-5 h-5 ${th.iconColor}`} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-bold text-[#003000] text-sm sm:text-[15px] leading-snug capitalize">
              {item.listing_title}
            </span>
            <p className="text-[11px] text-gray-400 mt-0.5 capitalize">{item.property_type}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 flex-shrink-0" />
                {fmtDate(item.created_at)}
              </span>
              <span>{item.duration_days} day{item.duration_days > 1 ? 's' : ''}</span>
              {item.start_date && (
                <span>
                  {new Date(item.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  {item.end_date ? ` → ${new Date(item.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : ''}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          <p className={`text-base sm:text-lg font-extrabold tabular-nums ${th.amtColor}`}>
            {fmtAmount(item.total_rent_cost)}
          </p>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${th.badgeBg}`}>
            <th.Icon className="w-3 h-3" />
            {th.actionWord ?? 'Pending'}
          </span>
        </div>
      </div>
      {item.status === 'PENDING' && (
        <div className={`px-4 sm:px-5 py-2 border-t ${th.footerBg}`}>
          <p className="text-[11px] text-[#F57C00] font-semibold italic">
            Awaiting admin approval · tap to view details
          </p>
        </div>
      )}
      {item.status === 'ACTIVE' && (
        <div className={`px-4 sm:px-5 py-2 border-t ${th.footerBg}`}>
          <p className="text-[11px] text-[#2E7D32] font-semibold italic flex items-center gap-1">
            <Eye className="w-3 h-3" /> Tap to view details
          </p>
        </div>
      )}
    </div>
  );
};

/* ─── Month group ────────────────────────────────────────── */
const MonthGroup = ({ monthYear, items, onViewDetails }) => (
  <div className="space-y-3">
    <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">{monthYear}</p>
    {items.map(item => (
      <RentCard key={item.uid} item={item} onViewDetails={onViewDetails} />
    ))}
  </div>
);

/* ─── Stat card ──────────────────────────────────────────── */
const StatCard = ({ label, count, accent }) => {
  const styles = {
    green: { bar: 'bg-[#2E7D32]', count: 'text-[#2E7D32]', bg: 'bg-[#2E7D32]/5' },
    amber: { bar: 'bg-[#F57C00]', count: 'text-[#F57C00]', bg: 'bg-[#FDF6EC]' },
    blue:  { bar: 'bg-blue-500',  count: 'text-blue-600',  bg: 'bg-blue-50' },
    red:   { bar: 'bg-red-500',   count: 'text-red-500',   bg: 'bg-red-50' },
  }[accent];
  return (
    <div className={`relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-4 ${styles.bg}`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${styles.bar}`} />
      <p className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 pl-2">{label}</p>
      <p className={`text-2xl sm:text-3xl font-extrabold pl-2 mt-1 ${styles.count}`}>{count}</p>
    </div>
  );
};

/* ─── Detail Modal ───────────────────────────────────────── */
const DetailModal = ({ item, onClose }) => {
  if (!item) return null;
  const th = THEME[item.status] || THEME.PENDING;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between gap-4"
          style={{ background: 'linear-gradient(135deg, #003000 0%, #2E7D32 100%)' }}>
          <div>
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Rent Details</p>
            <h2 className="text-white font-bold text-lg capitalize">{item.listing_title}</h2>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0 mt-0.5">
            ✕
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${th.badgeBg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${th.dot} ${th.pulse ? 'animate-pulse' : ''}`} />
              {th.actionWord ?? 'Pending'}
            </span>
            <span className="text-xs text-gray-400 capitalize">{item.property_type}</span>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Price per day', value: fmtAmount(item.price_per_day) },
              { label: 'Duration',      value: `${item.duration_days} day${item.duration_days > 1 ? 's' : ''}` },
              { label: 'Total Cost',    value: fmtAmount(item.total_rent_cost), bold: true },
              { label: 'Start Date',    value: item.start_date ? fmtDate(item.start_date) : '—' },
              { label: 'End Date',      value: item.end_date   ? fmtDate(item.end_date)   : '—' },
              { label: 'Applied on',    value: fmtDate(item.created_at) },
            ].map(({ label, value, bold }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">{label}</span>
                <span className={`text-sm ${bold ? 'font-bold text-[#F57C00]' : 'font-medium text-[#003000]'}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 pb-6">
          <button onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#003000] text-white font-semibold hover:bg-[#1B5E20] transition-colors duration-200">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── usePaginatedStatus hook ────────────────────────────── */
// Manages one status section's paginated data independently
const usePaginatedStatus = (userRent, status) => {
  const [data,    setData]    = useState({ count: 0, next: null, previous: null, results: [] });
  const [loading, setLoading] = useState(true);

  const fetchPage = useCallback(async (urlOrQuery) => {
    setLoading(true);
    try {
      // If it's a full URL (next/previous), extract just the query string
      // so userRent can append it. Otherwise use the default query.
      let query = `?status=${status}`;
      if (urlOrQuery && urlOrQuery.includes('?')) {
        query = '?' + urlOrQuery.split('?')[1];
      }
      const res = await userRent('', query);
      if (res) setData(res);
    } catch (err) {
      console.error(`Failed to fetch ${status}:`, err);
    } finally {
      setLoading(false);
    }
  }, [userRent, status]);

  useEffect(() => { fetchPage(); }, []);

  const goNext = () => data.next     && fetchPage(data.next);
  const goPrev = () => data.previous && fetchPage(data.previous);

  return { data, loading, goNext, goPrev };
};


/* ═══════════════════════════════════════════════════════════ */
/*  Main Component                                             */
/* ═══════════════════════════════════════════════════════════ */
const RentHistory = () => {
  const { userRent } = useRent();

  const [selectedItem,   setSelectedItem]   = useState(null);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [showFilters,    setShowFilters]    = useState(false);

  // Each status has its own independent pagination state
  const active    = usePaginatedStatus(userRent, 'ACTIVE');
  const pending   = usePaginatedStatus(userRent, 'PENDING');
  const completed = usePaginatedStatus(userRent, 'COMPLETED');
  const rejected  = usePaginatedStatus(userRent, 'REJECTED');

  const initialLoading = active.loading && pending.loading && completed.loading && rejected.loading
    && !active.data.results.length && !pending.data.results.length;

  const handleViewDetails = async (item) => {
    try {
      const detail = await userRent(item.uid);
      setSelectedItem(detail ?? item);
    } catch {
      setSelectedItem(item);
    }
  };

  // Client-side search on whatever page is currently loaded
  const filterResults = (results) => applySearch(results, searchQuery);

  const sections = [
    { key: 'ACTIVE',    state: active,    accent: 'green' },
    { key: 'PENDING',   state: pending,   accent: 'amber' },
    { key: 'COMPLETED', state: completed, accent: 'blue'  },
    { key: 'REJECTED',  state: rejected,  accent: 'red'   },
  ];

  return (
    <div className="space-y-7 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003000] tracking-tight">Rent History</h1>
        <p className="text-sm text-[#003000]/50 mt-1">All your rent requests across every status</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Active"    count={active.data.count}    accent="green" />
        <StatCard label="Pending"   count={pending.data.count}   accent="amber" />
        <StatCard label="Completed" count={completed.data.count} accent="blue"  />
        <StatCard label="Rejected"  count={rejected.data.count}  accent="red"   />
      </div>

      {/* Search & filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search listing title, property type…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]/40 transition"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#003000]/70 hover:bg-[#FDF6EC] transition-colors font-semibold"
          >
            <Filter className="w-4 h-4" />
            Filters
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
        {showFilters && (
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
              Time Period
            </label>
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value)}
              className="w-full sm:w-56 p-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 transition"
            >
              <option value="all">All Time</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        )}
      </div>

      {/* Initial loading */}
      {initialLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 size={28} className="text-[#F57C00] animate-spin" />
          <p className="text-sm text-[#003000]/50">Loading your rent history...</p>
        </div>
      ) : (
        sections.map(({ key, state }) => {
          const filtered = filterResults(state.data.results);
          return (
            <section key={key} className="space-y-4">
              <SectionHeader status={key} count={state.data.count} />

              {state.loading ? (
                <div className="flex items-center justify-center py-8 gap-2">
                  <Loader2 size={20} className="text-[#F57C00] animate-spin" />
                  <p className="text-sm text-[#003000]/40">Loading...</p>
                </div>
              ) : filtered.length === 0 ? (
                <EmptyState status={key} />
              ) : (
                Object.entries(groupByMonth(filtered)).map(([m, items]) => (
                  <MonthGroup key={m} monthYear={m} items={items} onViewDetails={handleViewDetails} />
                ))
              )}

              {/* Per-section pagination */}
              <PaginationBar
                status={key}
                hasPrev={!!state.data.previous}
                hasNext={!!state.data.next}
                loading={state.loading}
                onPrev={state.goPrev}
                onNext={state.goNext}
              />
            </section>
          );
        })
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default RentHistory;