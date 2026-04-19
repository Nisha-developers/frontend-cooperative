import React, { useEffect, useState, useMemo } from 'react';
import {
  Search, Filter, ArrowUpRight, ArrowDownRight,
  ChevronDown, ChevronUp, BarChart3, CheckCircle, XCircle,
  Clock, Copy, FileText, Calendar
} from 'lucide-react';
import useWalletStore from '../../hooks/useWallet';
import { useAuth } from '../../context/AuthContext';

/* ─── Remark map — uses your real remark keys ──────────────── */
function getRemark(val) {
  const map = {
    repay_housing_installment: 'Housing Repayment',
    repay_credit_thrift:       'Loan Repayment',
    balance_funding:           'Wallet Top-up',
    credit_thrift_cooperative: 'Cooperative Savings',
    housing_cooperative:       'Housing Savings',
  };
  return map[val] ?? 'Unspecified Transaction';
}

/* ─── Date helpers ─────────────────────────────────────────── */
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
  const d   = new Date(iso);
  const day = d.getDate();
  return `${day}${ordSuffix(day)} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function fmtDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-GB', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function fmtAmount(raw) {
  const num = parseFloat(raw ?? 0);
  return `₦${Math.abs(num).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;
}

/* ─── Group list by month string ──────────────────────────── */
function groupByMonth(list) {
  return list.reduce((acc, t) => {
    const d   = new Date(t.created_on);
    const key = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    (acc[key] = acc[key] || []).push(t);
    return acc;
  }, {});
}

/* ─── Filter helper ────────────────────────────────────────── */
function applyFilters(list, { period, type, query }) {
  let out = [...list];
  if (period !== 'all') {
    const days = period === '30days' ? 30 : period === '90days' ? 90 : 365;
    const ago  = new Date(); ago.setDate(ago.getDate() - days);
    out = out.filter(t => new Date(t.created_on) >= ago);
  }
  if (type !== 'all') out = out.filter(t => t.remark === type);
  if (query) {
    const q = query.toLowerCase();
    out = out.filter(t =>
      getRemark(t.remark).toLowerCase().includes(q) ||
      (t.reference  ?? '').toLowerCase().includes(q) ||
      (t.created_by ?? '').toLowerCase().includes(q)
    );
  }
  return out.sort((a, b) => new Date(b.created_on) - new Date(a.created_on));
}

/* ─── Design tokens per variant ───────────────────────────── */
const THEME = {
  confirmed: {
    borderL:    'border-l-[#2E7D32]',
    iconBg:     'bg-[#2E7D32]/10',
    iconColor:  'text-[#2E7D32]',
    amtColor:   'text-[#2E7D32]',
    badgeBg:    'bg-[#2E7D32]/10 text-[#2E7D32]',
    footerBg:   'bg-[#2E7D32]/5 border-[#2E7D32]/10',
    hdrBg:      'bg-[#2E7D32]/8 border-[#2E7D32]/20',
    hdrText:    'text-[#2E7D32]',
    dot:        'bg-[#2E7D32]',
    emptyBdr:   'border-[#2E7D32]/20 bg-[#2E7D32]/5',
    emptyText:  'text-[#2E7D32]/40',
    Icon:       CheckCircle,
    label:      'Confirmed Transactions',
    actionWord: 'Confirmed',
  },
  rejected: {
    borderL:    'border-l-red-500',
    iconBg:     'bg-red-50',
    iconColor:  'text-red-500',
    amtColor:   'text-red-500',
    badgeBg:    'bg-red-100 text-red-600',
    footerBg:   'bg-red-50/60 border-red-100',
    hdrBg:      'bg-red-50 border-red-200',
    hdrText:    'text-red-600',
    dot:        'bg-red-500',
    emptyBdr:   'border-red-200 bg-red-50',
    emptyText:  'text-red-400',
    Icon:       XCircle,
    label:      'Declined Transactions',
    actionWord: 'Declined',
  },
  pending: {
    borderL:    'border-l-[#F57C00]',
    iconBg:     'bg-[#FDF6EC]',
    iconColor:  'text-[#F57C00]',
    amtColor:   'text-[#F57C00]',
    badgeBg:    'bg-[#F57C00]/10 text-[#F57C00]',
    footerBg:   'bg-[#FDF6EC] border-[#F57C00]/15',
    hdrBg:      'bg-[#FDF6EC] border-[#F57C00]/30',
    hdrText:    'text-[#F57C00]',
    dot:        'bg-[#F57C00]',
    emptyBdr:   'border-[#F57C00]/25 bg-[#FDF6EC]',
    emptyText:  'text-[#F57C00]/40',
    Icon:       Clock,
    label:      'Pending Transactions',
    actionWord: null,
  },
};

/* ─── Section header ───────────────────────────────────────── */
const SectionHeader = ({ variant, count }) => {
  const th = THEME[variant];
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border sticky top-0 z-10 ${th.hdrBg}`}>
      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${th.dot}`} />
      <span className={`font-extrabold text-sm uppercase tracking-wider ${th.hdrText}`}>
        {th.label}
      </span>
      <span className={`ml-auto text-xs font-bold px-2.5 py-0.5 rounded-full ${th.badgeBg}`}>
        {count}
      </span>
    </div>
  );
};

/* ─── Empty state ──────────────────────────────────────────── */
const EmptyState = ({ variant }) => {
  const th = THEME[variant];
  return (
    <div className={`flex flex-col items-center justify-center py-10 rounded-2xl border-2 border-dashed ${th.emptyBdr}`}>
      <FileText className={`w-9 h-9 mb-2 ${th.emptyText}`} />
      <p className="text-sm font-medium text-[#003000]/40">No {th.label.toLowerCase()} yet</p>
    </div>
  );
};

/* ─── Transaction card ─────────────────────────────────────── */
const TransactionCard = ({ transaction, variant, onClick }) => {
  const [copied, setCopied] = useState(false);
  const th = THEME[variant];
  const isCredit = transaction.type === 'CREDIT';

  const copyRef = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(transaction.reference ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl border border-gray-100 border-l-4 ${th.borderL}
        shadow-sm hover:shadow-md active:scale-[0.995] transition-all duration-150
        cursor-pointer overflow-hidden
      `}
    >
      {/* ── Body ── */}
      <div className="flex items-start justify-between gap-3 p-4 sm:p-5">

        {/* Left: icon + details */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {/* Icon */}
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${th.iconBg} flex items-center justify-center`}>
            {isCredit
              ? <ArrowUpRight  className={`w-5 h-5 ${th.iconColor}`} />
              : <ArrowDownRight className={`w-5 h-5 ${th.iconColor}`} />}
          </div>

          {/* Text block */}
          <div className="min-w-0 flex-1">
            {/* type · source */}
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {transaction.type}
              {transaction.source ? ` · ${transaction.source.replace(/_/g, ' ')}` : ''}
            </span>

            {/* remark */}
            <p className="font-bold text-[#003000] text-sm sm:text-[15px] leading-snug mt-0.5">
              {getRemark(transaction.remark)}
            </p>

            {/* created_by */}
            <p className="text-[11px] text-gray-400 mt-0.5 truncate">
              By: <span className="text-[#003000]/55 font-medium">{transaction.created_by}</span>
            </p>

            {/* date + reference row */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-[11px] text-gray-400">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span>{fmtDate(transaction.created_on)}</span>

              {transaction.reference && (
                <>
                  <span className="hidden sm:inline text-gray-200">|</span>
                  <span className="font-mono truncate max-w-[110px] sm:max-w-[200px]">
                    {transaction.reference}
                  </span>
                
                  <button
                    onClick={copyRef}
                    className={`flex-shrink-0 transition-colors hover:${th.iconColor}`}
                    title="Copy reference"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {copied && (
                    <span className={`font-semibold ${th.amtColor}`}>Copied!</span>
                  )}
                </>
              )}
               
            </div>
             <div className='text-red-600 text-[14px] font-light pt-4'>
                    {transaction.rejection_reason ? `Reason: ${transaction.rejection_reason}`: ''}
                  </div>
          </div>
        </div>

        {/* Right: amount + badge */}
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          <p className={`text-base sm:text-lg font-extrabold tabular-nums ${th.amtColor}`}>
            {fmtAmount(transaction.amount)}
          </p>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${th.badgeBg}`}>
            <th.Icon className="w-3 h-3" />
            {th.actionWord ?? 'Pending'}
          </span>
        </div>
      </div>

      {/* ── Footer (confirmed_by / confirmed_at) ── */}
      {(transaction.confirmed_by || transaction.confirmed_at) && (
        <div className={`px-4 sm:px-5 py-2 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 ${th.footerBg}`}>
          {transaction.confirmed_by && (
            <p className="text-[11px] text-gray-400">
              {th.actionWord} by{' '}
              <span className="italic font-semibold text-gray-600">{transaction.confirmed_by}</span>
            </p>
          )}
          {transaction.confirmed_at && (
            <p className="text-[11px] text-gray-500 font-medium">{fmtDateTime(transaction.confirmed_at)}</p>
          )}
        </div>
      )}

      {/* ── Pending footer note ── */}
      {variant === 'pending' && (
        <div className={`px-4 sm:px-5 py-2 border-t ${th.footerBg}`}>
          <p className="text-[11px] text-[#F57C00] font-semibold italic">
            Awaiting admin approval
          </p>
        </div>
      )}
    </div>
  );
};

/* ─── Month group ──────────────────────────────────────────── */
const MonthGroup = ({ monthYear, transactions, variant, onSelect }) => (
  <div className="space-y-3">
    <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">
      {monthYear}
    </p>
    {transactions.map(t => (
      <TransactionCard key={t.uid} transaction={t} variant={variant} onClick={() => onSelect?.(t)} />
    ))}
  </div>
);

/* ─── Stat card ────────────────────────────────────────────── */
const StatCard = ({ label, count, total, accent }) => {
  const styles = {
    green: { bar: 'bg-[#2E7D32]', count: 'text-[#2E7D32]', bg: 'bg-[#2E7D32]/5' },
    red:   { bar: 'bg-red-500',   count: 'text-red-500',   bg: 'bg-red-50'       },
    amber: { bar: 'bg-[#F57C00]', count: 'text-[#F57C00]', bg: 'bg-[#FDF6EC]'   },
    gray:  { bar: 'bg-gray-300',  count: 'text-gray-600',  bg: 'bg-gray-50'      },
  }[accent];

  return (
    <div className={`relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-4 ${styles.bg}`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${styles.bar}`} />
      <p className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 pl-2">{label}</p>
      <p className={`text-2xl sm:text-3xl font-extrabold pl-2 mt-1 ${styles.count}`}>{count}</p>
      {total !== undefined && (
        <p className="text-[11px] text-gray-400 pl-2 mt-0.5">{fmtAmount(total)}</p>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════ */
/*  Main component                                             */
/* ═══════════════════════════════════════════════════════════ */
const Transaction = () => {
  const [selectedPeriod,      setSelectedPeriod]      = useState('all');
  const [selectedType,        setSelectedType]        = useState('all');
  const [searchQuery,         setSearchQuery]         = useState('');
  const [showFilters,         setShowFilters]         = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { getAccessToken } = useAuth();
  const token           = getAccessToken();
  const transactions    = useWalletStore(s => s.transactions);
  const getTransactions = useWalletStore(s => s.getTransactions);

  useEffect(() => { getTransactions(token); }, []);

  /* ── Split on real status values from your API ── */
  const allTxns = transactions?.transactions ?? [];

  const confirmedTxns = useMemo(
    () => allTxns.filter(t => t.status === 'CONFIRMED'), [allTxns]);
  const rejectedTxns  = useMemo(
    () => allTxns.filter(t => t.status === 'REJECTED'),  [allTxns]);
  const pendingTxns   = useMemo(
    () => allTxns.filter(t => t.status === 'PENDING'),   [allTxns]);

  const filters = { period: selectedPeriod, type: selectedType, query: searchQuery };

  const filteredConfirmed = applyFilters(confirmedTxns, filters);
  const filteredRejected  = applyFilters(rejectedTxns,  filters);
  const filteredPending   = applyFilters(pendingTxns,   filters);

  const sumAmount = list => list.reduce((s, t) => s + parseFloat(t.amount ?? 0), 0);

  return (
    <div className="space-y-7 pb-16">

      {/* ── Page header ── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003000] tracking-tight">
          Transaction History
        </h1>
        <p className="text-sm text-[#003000]/50 mt-1">
          Track all your financial activities across cooperative services
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Confirmed" count={confirmedTxns.length} total={sumAmount(confirmedTxns)} accent="green" />
        <StatCard label="Declined"  count={rejectedTxns.length}  total={sumAmount(rejectedTxns)}  accent="red"   />
        <StatCard label="Pending"   count={pendingTxns.length}   total={sumAmount(pendingTxns)}   accent="amber" />
        <StatCard label="Total"     count={allTxns.length}                                         accent="gray"  />
      </div>

      {/* ── Search & filters ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reference, remark, email…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]/40 transition"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2.5
              border border-gray-200 rounded-xl text-sm text-[#003000]/70
              hover:bg-[#FDF6EC] transition-colors font-semibold"
          >
            <Filter className="w-4 h-4" />
            Filters
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

        
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
                Time Period
              </label>
              <select
                value={selectedPeriod}
                onChange={e => setSelectedPeriod(e.target.value)}
                className="w-full p-2.5 text-sm border border-gray-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 transition"
              >
                <option value="all">All Time</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
                Remark / Type
              </label>
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="w-full p-2.5 text-sm border border-gray-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 transition"
              >
                <option value="all">All Types</option>
                <option value="balance_funding">Wallet Top-up</option>
                <option value="credit_thrift_cooperative">Cooperative Savings</option>
                <option value="housing_cooperative">Housing Savings</option>
                <option value="repay_housing_installment">Housing Repayment</option>
                <option value="repay_credit_thrift">Loan Repayment</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* ── Pending section ── */}
      <section className="space-y-4">
        <SectionHeader variant="pending" count={filteredPending.length} />
        {filteredPending.length === 0
          ? <EmptyState variant="pending" />
          : Object.entries(groupByMonth(filteredPending)).map(([m, txns]) => (
              <MonthGroup key={m} monthYear={m} transactions={txns} variant="pending" onSelect={setSelectedTransaction} />
            ))}
      </section>

      {/* ── Confirmed section ── */}
      <section className="space-y-4">
        <SectionHeader variant="confirmed" count={filteredConfirmed.length} />
        {filteredConfirmed.length === 0
          ? <EmptyState variant="confirmed" />
          : Object.entries(groupByMonth(filteredConfirmed)).map(([m, txns]) => (
              <MonthGroup key={m} monthYear={m} transactions={txns} variant="confirmed" onSelect={setSelectedTransaction} />
            ))}
      </section>

      {/* ── Declined section ── */}
      <section className="space-y-4">
        <SectionHeader variant="rejected" count={filteredRejected.length} />
        {filteredRejected.length === 0
          ? <EmptyState variant="rejected" />
          : Object.entries(groupByMonth(filteredRejected)).map(([m, txns]) => (
              <MonthGroup key={m} monthYear={m} transactions={txns} variant="rejected" onSelect={setSelectedTransaction} />
            ))}
      </section>

    </div>
  );
};

export default Transaction;