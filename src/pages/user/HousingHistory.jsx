import React, { useState, useMemo } from 'react';
import {
  Search, Filter, ChevronDown, ChevronUp,
  CheckCircle, XCircle, Clock, FileText,
  Calendar, Home, Landmark, X, ChevronRight,
  Wallet, TrendingDown, AlertCircle, Receipt,
} from 'lucide-react';
import { usePurchase } from '../../context/PurchaseProvider';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function ordSuffix(d) {
  if (d % 10 === 1 && d !== 11) return 'st';
  if (d % 10 === 2 && d !== 12) return 'nd';
  if (d % 10 === 3 && d !== 13) return 'rd';
  return 'th';
}
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso); const day = d.getDate();
  return `${day}${ordSuffix(day)} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtAmount(raw) {
  const num = parseFloat(raw ?? 0);
  return `₦${Math.abs(num).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;
}
function groupByMonth(list) {
  return list.reduce((acc, t) => {
    const d = new Date(t.created_at);
    const key = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    (acc[key] = acc[key] || []).push(t);
    return acc;
  }, {});
}

const THEME = {
  ACTIVE:    { borderL:'border-l-[#2E7D32]', iconBg:'bg-[#2E7D32]/10', iconColor:'text-[#2E7D32]', amtColor:'text-[#2E7D32]', badgeBg:'bg-[#2E7D32]/10 text-[#2E7D32]', footerBg:'bg-[#2E7D32]/5 border-[#2E7D32]/10', hdrBg:'bg-[#2E7D32]/8 border-[#2E7D32]/20', hdrText:'text-[#2E7D32]', dot:'bg-[#2E7D32]', emptyBdr:'border-[#2E7D32]/20 bg-[#2E7D32]/5', emptyText:'text-[#2E7D32]/40', Icon:CheckCircle, label:'Active Purchases' },
  COMPLETED: { borderL:'border-l-[#003000]', iconBg:'bg-[#003000]/8', iconColor:'text-[#003000]/70', amtColor:'text-[#003000]', badgeBg:'bg-[#003000]/10 text-[#003000]/70', footerBg:'bg-[#003000]/5 border-[#003000]/10', hdrBg:'bg-[#003000]/5 border-[#003000]/15', hdrText:'text-[#003000]/70', dot:'bg-[#003000]/60', emptyBdr:'border-[#003000]/15 bg-[#003000]/5', emptyText:'text-[#003000]/30', Icon:CheckCircle, label:'Completed Purchases' },
  REJECTED:  { borderL:'border-l-red-500', iconBg:'bg-red-50', iconColor:'text-red-500', amtColor:'text-red-500', badgeBg:'bg-red-100 text-red-600', footerBg:'bg-red-50/60 border-red-100', hdrBg:'bg-red-50 border-red-200', hdrText:'text-red-600', dot:'bg-red-500', emptyBdr:'border-red-200 bg-red-50', emptyText:'text-red-400', Icon:XCircle, label:'Rejected Purchases' },
  PENDING:   { borderL:'border-l-[#F57C00]', iconBg:'bg-[#FDF6EC]', iconColor:'text-[#F57C00]', amtColor:'text-[#F57C00]', badgeBg:'bg-[#F57C00]/10 text-[#F57C00]', footerBg:'bg-[#FDF6EC] border-[#F57C00]/15', hdrBg:'bg-[#FDF6EC] border-[#F57C00]/30', hdrText:'text-[#F57C00]', dot:'bg-[#F57C00]', emptyBdr:'border-[#F57C00]/25 bg-[#FDF6EC]', emptyText:'text-[#F57C00]/40', Icon:Clock, label:'Pending Purchases' },
};
const STATUS_ORDER = ['PENDING', 'ACTIVE', 'COMPLETED', 'REJECTED'];

// ─── Active Purchase Detail Modal ────────────────────────────────────────────
const ActivePurchaseModal = ({ isOpen, onClose, detail, loading }) => {
  const [scheduleFilter, setScheduleFilter] = useState('all');

  if (!isOpen) return null;

  const bs = detail?.balance_summary ?? {};
  const schedule = detail?.schedule ?? [];

  const tenureMonths = detail?.tenure_months ?? 0;
  const installmentsDone = tenureMonths - (bs.installments_remaining ?? tenureMonths);
  const progress = tenureMonths > 0 ? (installmentsDone / tenureMonths) * 100 : 0;

  const filteredSchedule = schedule.filter(s => {
    if (scheduleFilter === 'paid')   return parseFloat(s.amount_paid) > 0;
    if (scheduleFilter === 'unpaid') return parseFloat(s.amount_paid) === 0;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col max-h-[90dvh] overflow-hidden">

        {/* Modal Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Active Purchase</p>
            <h2 className="text-base font-bold text-[#003000] leading-tight mt-0.5">
              {loading ? 'Loading...' : (detail?.listing_title ?? '—')}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{detail?.listing_address}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0 ml-3 mt-0.5"
            aria-label="Close modal"
          >
            <X size={15} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-5 py-5 space-y-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#2E7D32]/30 border-t-[#2E7D32] animate-spin" />
              <p className="text-sm text-gray-400">Fetching purchase details…</p>
            </div>
          ) : (
            <>
              {/* Property + type badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] text-[11px] font-bold uppercase tracking-wide">
                  {detail?.property_type}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#F57C00]/10 text-[#F57C00] text-[11px] font-bold uppercase tracking-wide">
                  {detail?.purchase_type}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-[11px] font-bold uppercase tracking-wide">
                  {detail?.status}
                </span>
                <span className="ml-auto text-[11px] text-gray-400">
                  Approved: {fmtDate(detail?.approved_at)}
                </span>
              </div>

              {/* Key financials */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Property price',    value: fmtAmount(detail?.property_price),    icon: Home },
                  { label: 'Initial deposit',   value: fmtAmount(detail?.initial_deposit),   icon: Wallet },
                  { label: 'Monthly installment', value: fmtAmount(detail?.monthly_installment), icon: Receipt },
                  { label: 'Total repayable',   value: fmtAmount(detail?.total_repayable),   icon: TrendingDown },
                  { label: 'Outstanding',       value: fmtAmount(bs.total_outstanding),      icon: AlertCircle },
                  { label: 'Balance after deposit', value: fmtAmount(detail?.balance_after_deposit), icon: Wallet },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">{label}</p>
                    <p className="text-sm font-bold text-[#003000]">{value}</p>
                  </div>
                ))}
              </div>

              {/* This month's due */}
              <div className="rounded-xl bg-[#FDF6EC] border border-[#F57C00]/20 p-4 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#F57C00] mb-1">
                    Installment #{bs.this_month_installment_number} due this month
                  </p>
                  <p className="text-2xl font-extrabold text-[#003000]">{fmtAmount(bs.this_month_due)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Due date</p>
                  <p className="text-sm font-bold text-[#F57C00]">{fmtDate(bs.this_month_due_date)}</p>
                </div>
              </div>

              {/* Repayment progress */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold text-[#003000]">Repayment progress</span>
                  <span>{installmentsDone}/{tenureMonths} months paid</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2E7D32] rounded-full transition-all duration-500"
                    style={{ width: `${progress.toFixed(1)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 mt-1.5">
                  <span>{bs.installments_remaining} installments remaining</span>
                  <span>{progress.toFixed(0)}% complete</span>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                  <p className="text-sm font-bold text-[#003000] flex items-center gap-2">
                    <Calendar size={14} className="text-[#2E7D32]" />
                    Payment schedule
                    <span className="text-[11px] font-normal text-gray-400">({schedule.length} installments)</span>
                  </p>
                  <div className="flex gap-1.5">
                    {['all', 'paid', 'unpaid'].map(f => (
                      <button
                        key={f}
                        onClick={() => setScheduleFilter(f)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors capitalize ${
                          scheduleFilter === f
                            ? 'bg-[#2E7D32] text-white'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-gray-100 overflow-hidden">
                  {/* Table header */}
                  <div className="grid grid-cols-4 bg-gray-50 px-4 py-2.5 border-b border-gray-100">
                    {['#', 'Due date', 'Amount due', 'Paid'].map(h => (
                      <p key={h} className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">{h}</p>
                    ))}
                  </div>

                  {/* Table rows */}
                  <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                    {filteredSchedule.map(s => {
                      const isPaid = parseFloat(s.amount_paid) > 0;
                      const isCurrentMonth = s.installment_number === bs.this_month_installment_number;
                      return (
                        <div
                          key={s.uid}
                          className={`grid grid-cols-4 px-4 py-2.5 items-center transition-colors ${
                            isCurrentMonth
                              ? 'bg-[#FDF6EC]'
                              : 'hover:bg-gray-50/50'
                          }`}
                        >
                          <p className="text-xs font-bold text-[#003000]/70 flex items-center gap-1.5">
                            {isCurrentMonth && <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00] shrink-0" />}
                            {s.installment_number}
                          </p>
                          <p className="text-xs text-gray-500">{fmtDate(s.due_date)}</p>
                          <p className="text-xs font-semibold text-[#003000]">{fmtAmount(s.amount_due)}</p>
                          <p className={`text-xs font-bold ${isPaid ? 'text-[#2E7D32]' : 'text-gray-300'}`}>
                            {isPaid ? fmtAmount(s.amount_paid) : '—'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal footer */}
        {!loading && (
          <div className="shrink-0 px-5 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3 flex-wrap">
            <p className="text-[11px] text-gray-400">
              ID: <span className="font-mono text-[#003000]/60">{detail?.uid?.slice(0, 16)}…</span>
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#003000] text-white text-sm font-semibold hover:bg-[#003000]/80 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Existing components (unchanged) ─────────────────────────────────────────
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

const EmptyState = ({ status }) => {
  const th = THEME[status];
  return (
    <div className={`flex flex-col items-center justify-center py-10 rounded-2xl border-2 border-dashed ${th.emptyBdr}`}>
      <FileText className={`w-9 h-9 mb-2 ${th.emptyText}`} />
      <p className="text-sm font-medium text-[#003000]/40">No {th.label.toLowerCase()} yet</p>
    </div>
  );
};

// ✅ PurchaseCard — ACTIVE cards are now clickable, others unchanged
const PurchaseCard = ({ item, status, onViewDetail }) => {
  const th = THEME[status];
  const isInstallment = item.purchase_type === 'INSTALLMENT';
  const PropertyIcon = item.property_type === 'land' ? Landmark : Home;
  const isActive = status === 'ACTIVE';

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 border-l-4 ${th.borderL} shadow-sm hover:shadow-md active:scale-[0.995] transition-all duration-150 overflow-hidden ${isActive ? 'cursor-pointer' : ''}`}
      onClick={isActive ? () => onViewDetail(item.uid) : undefined}
    >
      <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${th.iconBg} flex items-center justify-center`}>
            <PropertyIcon className={`w-5 h-5 ${th.iconColor}`} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.property_type} · {item.purchase_type}</span>
            <p className="font-bold text-[#003000] text-sm sm:text-[15px] leading-snug mt-0.5">{item.listing_title}</p>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-400">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span>{fmtDate(item.created_at)}</span>
            </div>
            {isInstallment && item.initial_deposit && (
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                <span className="text-gray-400">Deposit: <span className="font-semibold text-[#003000]/70">{fmtAmount(item.initial_deposit)}</span></span>
                {item.monthly_installment && <span className="text-gray-400">Monthly: <span className="font-semibold text-[#003000]/70">{fmtAmount(item.monthly_installment)}</span></span>}
              </div>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          <p className={`text-base sm:text-lg font-extrabold tabular-nums ${th.amtColor}`}>{fmtAmount(item.property_price)}</p>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${th.badgeBg}`}>
            <th.Icon className="w-3 h-3" />{status}
          </span>
          {/* View detail caret — ACTIVE only */}
          {isActive && (
            <span className="text-[11px] text-[#2E7D32] flex items-center gap-0.5 font-semibold mt-1">
              View details <ChevronRight size={12} />
            </span>
          )}
        </div>
      </div>
      {status === 'PENDING'   && <div className={`px-4 sm:px-5 py-2 border-t ${th.footerBg}`}><p className="text-[11px] text-[#F57C00] font-semibold italic">Awaiting admin approval</p></div>}
      {status === 'ACTIVE' && isInstallment && <div className={`px-4 sm:px-5 py-2 border-t ${th.footerBg}`}><p className="text-[11px] text-[#2E7D32] font-semibold italic">Installment plan in progress · tap to view schedule</p></div>}
      {status === 'COMPLETED' && <div className={`px-4 sm:px-5 py-2 border-t ${th.footerBg}`}><p className="text-[11px] text-[#003000]/50 font-semibold italic">Purchase completed ✓</p></div>}
    </div>
  );
};

const MonthGroup = ({ monthYear, items, status, onViewDetail }) => (
  <div className="space-y-3">
    <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">{monthYear}</p>
    {items.map(item => (
      <PurchaseCard key={item.uid} item={item} status={status} onViewDetail={onViewDetail} />
    ))}
  </div>
);

const StatCard = ({ label, count, accent }) => {
  const styles = {
    green: { bar:'bg-[#2E7D32]', count:'text-[#2E7D32]', bg:'bg-[#2E7D32]/5' },
    dark:  { bar:'bg-[#003000]', count:'text-[#003000]', bg:'bg-[#003000]/5'  },
    red:   { bar:'bg-red-500',   count:'text-red-500',   bg:'bg-red-50'       },
    amber: { bar:'bg-[#F57C00]', count:'text-[#F57C00]', bg:'bg-[#FDF6EC]'   },
  }[accent];
  return (
    <div className={`relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-4 ${styles.bg}`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${styles.bar}`} />
      <p className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 pl-2">{label}</p>
      <p className={`text-2xl sm:text-3xl font-extrabold pl-2 mt-1 ${styles.count}`}>{count}</p>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const HousingHistory = () => {
  const [searchQuery,  setSearchQuery]  = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters,  setShowFilters]  = useState(false);

  // ✅ Modal state
  const [modalOpen,    setModalOpen]    = useState(false);
  const [modalDetail,  setModalDetail]  = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const { purchaseData, getPurchaseDetails } = usePurchase();
  const list = Array.isArray(purchaseData) ? purchaseData : [];

  const byStatus = useMemo(() => {
    const base = { PENDING: [], ACTIVE: [], COMPLETED: [], REJECTED: [] };
    list.forEach(item => {
      const s = item.status?.toUpperCase();
      if (base[s]) base[s].push(item);
    });
    return base;
  }, [list]);

  // ✅ Called when an ACTIVE card is tapped
  const handleViewDetail = async (uid) => {
    setModalOpen(true);
    setModalLoading(true);
    setModalDetail(null);
    try {
      const detail = await getPurchaseDetails(uid);
      setModalDetail(detail);
    } catch (err) {
      console.error('Failed to fetch purchase details:', err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalDetail(null);
  };

  const applyFilters = (arr) => {
    let out = [...arr];
    if (selectedType !== 'all') out = out.filter(i => i.purchase_type === selectedType);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      out = out.filter(i =>
        i.listing_title?.toLowerCase().includes(q) ||
        i.property_type?.toLowerCase().includes(q) ||
        i.purchase_type?.toLowerCase().includes(q)
      );
    }
    return out.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  };

  const filtered = useMemo(() => ({
    PENDING:   applyFilters(byStatus.PENDING),
    ACTIVE:    applyFilters(byStatus.ACTIVE),
    COMPLETED: applyFilters(byStatus.COMPLETED),
    REJECTED:  applyFilters(byStatus.REJECTED),
  }), [byStatus, searchQuery, selectedType]);

  return (
    <>
      {/* ✅ Modal renders here, outside the scroll container */}
      <ActivePurchaseModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        detail={modalDetail}
        loading={modalLoading}
      />

      <div className="space-y-7 pb-16">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003000] tracking-tight">Purchase History</h1>
          <p className="text-sm text-[#003000]/50 mt-1">Track all your property purchase requests and their progress</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Pending"   count={byStatus.PENDING.length}   accent="amber" />
          <StatCard label="Active"    count={byStatus.ACTIVE.length}    accent="green" />
          <StatCard label="Completed" count={byStatus.COMPLETED.length} accent="dark"  />
          <StatCard label="Rejected"  count={byStatus.REJECTED.length}  accent="red"   />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search by property title, type…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]/40 transition" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#003000]/70 hover:bg-[#FDF6EC] transition-colors font-semibold">
              <Filter className="w-4 h-4" />Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Purchase Type</label>
                <select value={selectedType} onChange={e => setSelectedType(e.target.value)}
                  className="w-full p-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 transition">
                  <option value="all">All Types</option>
                  <option value="INSTALLMENT">Installment</option>
                  <option value="OUTRIGHT">Outright</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {STATUS_ORDER.map(status => (
          <section key={status} className="space-y-4">
            <SectionHeader status={status} count={filtered[status].length} />
            {filtered[status].length === 0
              ? <EmptyState status={status} />
              : Object.entries(groupByMonth(filtered[status])).map(([m, items]) => (
                  <MonthGroup key={m} monthYear={m} items={items} status={status} onViewDetail={handleViewDetail} />
                ))
            }
          </section>
        ))}
      </div>
    </>
  );
};

export default HousingHistory;