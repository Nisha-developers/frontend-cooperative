import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useLoan from '../../hooks/useLoan';

const LoanHistory = () => {
  const { user, getAccessToken, refreshAccessToken } = useAuth();
  const fetchLoans = useLoan((s) => s.fetchLoans);
  const loans = useLoan((s) => s.loans);
  const loan = loans.results;
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [detailedDeclineLoan, setDetailedDeclinedLoan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const loanDetails = useLoan((s) => s.detailedLoan);

  // ── Pagination state ──
  const [nextUrl, setNextUrl]   = useState(null);
  const [prevUrl, setPrevUrl]   = useState(null);
  const [extraLoans, setExtraLoans] = useState([]);   // loans from page 2+
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState(null); // tracks what we last fetched

  useEffect(() => {
    fetchLoans(getAccessToken());
  }, []);

  // Sync next/prev from the zustand loans object whenever it updates
  useEffect(() => {
    setNextUrl(loans?.next ?? null);
    setPrevUrl(loans?.previous ?? null);
  }, [loans]);

  const declineLoan = loans?.results?.filter((val) => val.status === 'REJECTED');

  async function getRejectedValue() {
    try {
      const detailedInfo = await Promise.all(
        declineLoan.map((val) => fetchLoans(getAccessToken(), val.uid))
      );
      return detailedInfo;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  useEffect(() => {
    async function ageValue() {
      if (!declineLoan?.length) return;
      const details = await getRejectedValue();
      setDetailedDeclinedLoan(details);
    }
    ageValue();
  }, [loan]);

  // ── Load more — fetch the next page URL directly ──
  const handleLoadMore = async () => {
    if (!nextUrl || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(nextUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setExtraLoans((prev) => [...prev, ...(data.results ?? [])]);
        setNextUrl(data.next ?? null);
        setPrevUrl(data.previous ?? null);
      }
      else  if(res.status === 401){
           refreshAccessToken();
      }
    } catch (err) {
      console.log('pagination error', err);
    } finally {
      setLoadingMore(false);
    }
  };

  // All loans = base page + any extra pages loaded
  const allLoans = [...(loan ?? []), ...extraLoans];
  const totalCount = loans?.count ?? 0;
  const hasMore = !!nextUrl;

  const openActiveModal = (loanData) => {
    fetchLoans(getAccessToken(), loanData.uid);
    setSelectedLoan(loanDetails.data);
    setModalType('active');
    setShowModal(true);
  };

  const openPendingModal = (loanData) => {
    setSelectedLoan(loanData);
    setModalType('pending');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLoan(null);
    setModalType(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency', currency: 'NGN', minimumFractionDigits: 2,
    }).format(amount);
  };

  const statusConfig = {
    ACTIVE:    { bg: 'bg-[#2E7D32]/10', text: 'text-[#2E7D32]', border: 'border-[#2E7D32]/30', bar: '#2E7D32' },
    PENDING:   { bg: 'bg-[#F57C00]/10', text: 'text-[#F57C00]', border: 'border-[#F57C00]/30', bar: '#F57C00' },
    REJECTED:  { bg: 'bg-red-50',       text: 'text-red-700',   border: 'border-red-200',       bar: '#DC2626' },
    COMPLETED: { bg: 'bg-blue-50',      text: 'text-blue-700',  border: 'border-blue-200',      bar: '#1D4ED8' },
  };

  const getStatusBadge = (status) => {
    const cfg = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    return (
      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
        {status}
      </span>
    );
  };

  /* ── Not eligible ── */
  if (!user?.profile?.account_number) {
    return (
      <div className="min-h-[69vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-[#FDF6EC] border border-[#2E7D32]/20 rounded-2xl overflow-hidden shadow-sm">
          <div className="h-1 w-full bg-[#F57C00]" />
          <div className="px-8 py-10 flex flex-col items-center text-center gap-6">
            <div className="w-14 h-14 rounded-xl bg-[#F57C00]/10 border border-[#F57C00]/20 flex items-center justify-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4M12 16.5v.5" stroke="#F57C00" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#F57C00" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#F57C00] mb-2">Access Restricted</p>
              <p className="text-base font-bold text-[#003000] mb-1">Not eligible for this service</p>
              <p className="text-sm text-[#003000]/55">Update your profile details in settings to continue.</p>
            </div>
            <a href="/user#settings" className="w-full py-2.5 rounded-xl font-bold text-sm text-center text-[#FDF6EC] bg-[#003000] hover:bg-[#003000]/85 transition-colors">
              Go to Settings →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6EC] to-[#FDF6EC]/95 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ── Page Header ── */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#2E7D32]/10 px-3 py-1 rounded-full mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-pulse" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2E7D32]">Overview</p>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-2xl font-extrabold text-[#003000]">Loan History</h1>
              <p className="text-sm text-[#003000]/50 mt-1">Track and manage all your loan applications</p>
            </div>
            {/* Total count pill */}
            <span className="text-xs font-bold text-[#003000]/50 bg-[#003000]/8 px-3 py-1.5 rounded-full">
              {allLoans.length} of {totalCount} loans
            </span>
          </div>
        </div>

        {/* ── Cards ── */}
        {allLoans && allLoans.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allLoans.map((loanItem, index) => {
                const cfg = statusConfig[loanItem.status] || {};
                return (
                  <div
                    key={loanItem.uid}
                    className="group bg-white border border-[#2E7D32]/15 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="h-1 w-full transition-all duration-300 group-hover:h-1.5" style={{ background: cfg.bar || '#003000' }} />

                    <div className="p-5 flex flex-col flex-1 gap-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] text-[#003000]/40 uppercase tracking-widest font-semibold flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Applied on
                          </p>
                          <p className="text-sm font-bold text-[#003000] mt-0.5">{formatDate(loanItem.created_at)}</p>
                        </div>
                        {getStatusBadge(loanItem.status)}
                      </div>

                      <div className="border-t border-[#003000]/8" />

                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#003000]/50 font-medium">Principal</span>
                          <span className="text-sm font-bold text-[#003000]">{formatCurrency(loanItem.principal)}</span>
                        </div>

                        {loanItem.status === 'ACTIVE' && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#003000]/50 font-medium">Monthly Installment</span>
                              <span className="text-sm font-bold text-[#2E7D32]">{formatCurrency(loanItem.monthly_installment)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#003000]/50 font-medium">Total Repayable</span>
                              <span className="text-sm font-bold text-[#003000]">{formatCurrency(loanItem.total_repayable)}</span>
                            </div>
                          </>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#003000]/50 font-medium">Tenure</span>
                          <span className="text-sm font-semibold text-[#003000]">{loanItem.tenure_months} months</span>
                        </div>

                        {loanItem.status === 'REJECTED' && (
                          <div className="flex justify-between gap-2">
                            <span className="text-xs text-[#003000]/50 font-medium shrink-0">Rejection reason</span>
                            <span className="text-sm font-semibold text-red-600 text-right">
                              {detailedDeclineLoan[index]?.rejection_reason || 'No reason provided'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1" />

                      {loanItem.status === 'ACTIVE' && (
                        <button
                          onClick={() => openActiveModal(loanItem)}
                          className="w-full py-2.5 rounded-xl font-bold text-sm text-[#FDF6EC] bg-[#2E7D32] hover:bg-[#1B5E20] transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          View Details
                        </button>
                      )}
                      {loanItem.status === 'PENDING' && (
                        <button
                          onClick={() => openPendingModal(loanItem)}
                          className="w-full py-2.5 rounded-xl font-bold text-sm text-[#FDF6EC] bg-[#F57C00] hover:bg-[#E65100] transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          Track Application
                        </button>
                      )}
                      {loanItem.status === 'REJECTED' && (
                        <button disabled className="w-full py-2.5 rounded-xl font-bold text-sm bg-[#003000]/8 text-[#003000]/35 cursor-not-allowed">
                          Application Rejected
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── View More button ── */}
            {hasMore && (
              <div className="mt-8 flex flex-col items-center gap-2">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="flex items-center gap-2.5 px-8 py-3 rounded-2xl font-bold text-sm text-[#FDF6EC] bg-[#003000] hover:bg-[#003000]/85 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {loadingMore ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Loading…
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      View More
                    </>
                  )}
                </button>
                <p className="text-xs text-[#003000]/40 font-medium">
                  Showing {allLoans.length} of {totalCount} loans
                </p>
              </div>
            )}

            {/* ── All loaded message ── */}
            {!hasMore && allLoans.length > 0 && totalCount > 10 && (
              <div className="mt-8 flex justify-center">
                <span className="text-xs text-[#003000]/35 font-medium bg-[#003000]/5 px-4 py-2 rounded-full">
                  All {totalCount} loans loaded ✓
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#003000]/5 border border-[#003000]/10 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M9 12h6M9 16h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="#003000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[#003000]/60 text-sm font-medium">No loan applications found</p>
              <p className="text-[#003000]/40 text-xs mt-1">Apply for a loan to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════
          ACTIVE LOAN MODAL
      ══════════════════════════════ */}
      {showModal && modalType === 'active' && selectedLoan && (
        <div className="fixed inset-0 bg-[#003000]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#FDF6EC] rounded-2xl w-full max-w-4xl my-4 overflow-hidden shadow-2xl max-h-[90vh] animate-fadeIn">

            <div className="bg-gradient-to-r from-[#003000] to-[#1B5E20] px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2E7D32] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2E7D32]"></span>Loan Details
                </p>
                <p className="text-xl font-extrabold text-white mt-1">{formatCurrency(selectedLoan.principal)}</p>
              </div>
              <button onClick={closeModal} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-xl border border-[#2E7D32]/15 p-4 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#003000]/40">Status</p>
                  <p className="text-base font-extrabold text-[#2E7D32] mt-1">{selectedLoan.status}</p>
                </div>
                <div className="bg-white rounded-xl border border-[#2E7D32]/15 p-4 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#003000]/40">Approved</p>
                  <p className="text-base font-bold text-[#003000] mt-1">{formatDate(selectedLoan.approved_at)}</p>
                </div>
                <div className="bg-white rounded-xl border border-[#2E7D32]/15 p-4 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#003000]/40">Disbursed</p>
                  <p className="text-base font-bold text-[#003000] mt-1">{formatDate(selectedLoan.disbursed_at)}</p>
                </div>
              </div>

              <div className="border border-[#2E7D32]/15 rounded-xl overflow-hidden">
                <div className="bg-[#003000] px-5 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#2E7D32] flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Financial Summary
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#2E7D32]/10 bg-white">
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#003000]/40">Principal</p>
                    <p className="text-sm font-extrabold text-[#003000] mt-1">{formatCurrency(selectedLoan.principal)}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#003000]/40">Interest Rate</p>
                    <p className="text-sm font-extrabold text-[#003000] mt-1">0.5%</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#003000]/40">Monthly Installment</p>
                    <p className="text-sm font-extrabold text-[#2E7D32] mt-1">{formatCurrency(selectedLoan.monthly_installment)}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#003000]/40">Total Repayable</p>
                    <p className="text-sm font-extrabold text-[#F57C00] mt-1">{formatCurrency(selectedLoan.total_repayable)}</p>
                  </div>
                </div>
              </div>

              {selectedLoan.balance_summary && (
                <div className="border border-[#2E7D32]/15 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-[#003000]/5 to-transparent px-5 py-3 border-b border-[#2E7D32]/10">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#003000] flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Payment Progress
                    </p>
                  </div>
                  <div className="p-5 bg-white space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-[#FDF6EC] rounded-xl p-3 border border-[#2E7D32]/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#003000]/40">Installment</p>
                        <p className="text-lg font-extrabold text-[#003000]">{selectedLoan.balance_summary.this_month_installment_number} / {selectedLoan.tenure_months}</p>
                      </div>
                      <div className="bg-[#FDF6EC] rounded-xl p-3 border border-[#2E7D32]/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#003000]/40">Due Date</p>
                        <p className="text-sm font-bold text-[#F57C00]">{formatDate(selectedLoan.balance_summary.this_month_due_date)}</p>
                      </div>
                      <div className="bg-[#FDF6EC] rounded-xl p-3 border border-[#2E7D32]/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#003000]/40">Due This Month</p>
                        <p className="text-sm font-bold text-[#2E7D32]">{formatCurrency(selectedLoan.balance_summary.this_month_due)}</p>
                      </div>
                      <div className="bg-[#FDF6EC] rounded-xl p-3 border border-[#2E7D32]/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#003000]/40">Outstanding</p>
                        <p className="text-sm font-bold text-[#003000]">{formatCurrency(selectedLoan.balance_summary.total_outstanding)}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[11px] font-semibold text-[#003000]/60">
                          {selectedLoan.tenure_months - selectedLoan.balance_summary.installments_remaining} of {selectedLoan.tenure_months} months paid
                        </span>
                        <span className="text-[11px] font-bold text-[#F57C00]">
                          {Math.round(((selectedLoan.tenure_months - selectedLoan.balance_summary.installments_remaining) / selectedLoan.tenure_months) * 100)}%
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-[#003000]/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] rounded-full transition-all duration-500"
                          style={{ width: `${((selectedLoan.tenure_months - selectedLoan.balance_summary.installments_remaining) / selectedLoan.tenure_months) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedLoan.schedule && selectedLoan.schedule.length > 0 && (
                <div className="border border-[#2E7D32]/15 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-[#003000] to-[#1B5E20] px-5 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#2E7D32] flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Repayment Schedule
                    </p>
                    <p className="text-[10px] text-white/50 mt-1">Track your payment progress and due dates</p>
                  </div>

                  {/* Mobile */}
                  <div className="block md:hidden divide-y divide-[#003000]/10 bg-white">
                    {selectedLoan.schedule.map((inst, idx) => (
                      <div key={inst.uid || idx} className="p-4 hover:bg-[#003000]/4 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="text-xs text-[#003000]/60">Installment</span>
                            <p className="text-xl font-bold text-[#003000]">#{inst.installment_number || idx + 1}</p>
                          </div>
                          {inst.is_paid ? (
                            <span className="text-[10px] font-bold text-[#2E7D32] bg-[#2E7D32]/10 px-2.5 py-1 rounded-full flex items-center gap-1">✓ PAID</span>
                          ) : inst.is_rolled_over ? (
                            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">Rolled Over</span>
                          ) : new Date(inst.due_date) < new Date() ? (
                            <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2.5 py-1 rounded-full animate-pulse">⚠️ OVERDUE</span>
                          ) : (
                            <span className="text-[10px] font-bold text-[#F57C00] bg-[#F57C00]/10 px-2.5 py-1 rounded-full">Pending</span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <p className="text-xs text-[#003000]/50">Due Date</p>
                            <p className="text-sm font-semibold text-[#003000]">{formatDate(inst.due_date)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#003000]/50">Amount Due</p>
                            <p className="text-sm font-bold text-[#F57C00]">{formatCurrency(inst.amount_due || inst.amount || inst.total_amount_due)}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-[#003000]/50">Amount Paid</p>
                            <p className="text-sm font-semibold" style={{ color: inst.amount_paid > 0 ? '#2E7D32' : '#003000/60' }}>{formatCurrency(inst.amount_paid || '0.00')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#003000]/50">Total Due</p>
                            <p className="text-sm font-semibold text-[#003000]">{formatCurrency(inst.total_amount_due || inst.amount_due || inst.amount)}</p>
                          </div>
                        </div>
                        {inst.extra_interest && parseFloat(inst.extra_interest) > 0 && (
                          <div className="mt-3 pt-2 border-t border-red-200">
                            <p className="text-xs text-red-600">Extra Interest: {formatCurrency(inst.extra_interest)}</p>
                          </div>
                        )}
                        {inst.paid_at && <p className="text-xs text-[#003000]/40 mt-2">Paid on: {formatDate(inst.paid_at)}</p>}
                      </div>
                    ))}
                  </div>

                  {/* Desktop */}
                  <div className="hidden md:block overflow-x-auto bg-white">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gradient-to-r from-[#003000]/5 to-transparent border-b-2 border-[#003000]/20">
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#003000]/70 uppercase tracking-wider">#</th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#003000]/70 uppercase tracking-wider">Due Date</th>
                          <th className="text-right py-3 px-4 text-xs font-bold text-[#003000]/70 uppercase tracking-wider">Amount Due</th>
                          <th className="text-right py-3 px-4 text-xs font-bold text-[#003000]/70 uppercase tracking-wider">Amount Paid</th>
                          <th className="text-right py-3 px-4 text-xs font-bold text-[#003000]/70 uppercase tracking-wider">Total Due</th>
                          <th className="text-right py-3 px-4 text-xs font-bold text-[#003000]/70 uppercase tracking-wider">Extra Interest</th>
                          <th className="text-center py-3 px-4 text-xs font-bold text-[#003000]/70 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedLoan.schedule.map((inst, idx) => (
                          <tr key={inst.uid || idx} className={`border-b border-[#003000]/8 hover:bg-[#003000]/4 transition-all duration-200 ${inst.is_paid ? 'bg-[#2E7D32]/5' : !inst.is_paid && new Date(inst.due_date) < new Date() ? 'bg-red-50/50' : ''}`}>
                            <td className="py-3 px-4"><span className={`font-bold text-sm ${inst.is_paid ? 'text-[#2E7D32]' : 'text-[#003000]'}`}>{inst.installment_number || idx + 1}</span></td>
                            <td className="py-3 px-4">
                              <span className="text-[#003000]/80 font-medium">{formatDate(inst.due_date)}</span>
                              {!inst.is_paid && new Date(inst.due_date) < new Date() && <span className="ml-2 text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">LATE</span>}
                            </td>
                            <td className="py-3 px-4 text-right"><span className="font-semibold text-[#F57C00]">{formatCurrency(inst.amount_due || inst.amount || '0.00')}</span></td>
                            <td className="py-3 px-4 text-right"><span className={`font-semibold ${parseFloat(inst.amount_paid || '0') > 0 ? 'text-[#2E7D32]' : 'text-[#003000]/40'}`}>{formatCurrency(inst.amount_paid || '0.00')}</span></td>
                            <td className="py-3 px-4 text-right"><span className="font-bold text-[#003000]">{formatCurrency(inst.total_amount_due || inst.amount_due || inst.amount)}</span></td>
                            <td className="py-3 px-4 text-right"><span className={`text-sm ${parseFloat(inst.extra_interest || '0') > 0 ? 'text-red-600 font-semibold' : 'text-[#003000]/40'}`}>{parseFloat(inst.extra_interest || '0') > 0 ? formatCurrency(inst.extra_interest) : '—'}</span></td>
                            <td className="py-3 px-4 text-right">
                              {inst.is_paid ? (
                                <div className="flex items-center justify-end gap-1">
                                  <span className="text-[10px] font-bold text-[#2E7D32] bg-[#2E7D32]/10 px-2.5 py-1 rounded-full flex items-center gap-1">✓ PAID</span>
                                  {inst.paid_at && <span className="text-[9px] text-[#003000]/40">{formatDate(inst.paid_at)}</span>}
                                </div>
                              ) : inst.is_rolled_over ? (
                                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">Rolled Over</span>
                              ) : new Date(inst.due_date) < new Date() ? (
                                <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2.5 py-1 rounded-full animate-pulse">OVERDUE</span>
                              ) : (
                                <span className="text-[10px] font-bold text-[#F57C00] bg-[#F57C00]/10 px-2.5 py-1 rounded-full">Pending</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-[#003000]/5 border-t-2 border-[#003000]/20">
                        <tr>
                          <td colSpan="2" className="py-3 px-4 text-right font-bold text-[#003000]">Total:</td>
                          <td className="py-3 px-4 text-right font-bold text-[#F57C00]">{formatCurrency(selectedLoan.schedule.reduce((sum, inst) => sum + parseFloat(inst.amount_due || inst.amount || 0), 0))}</td>
                          <td className="py-3 px-4 text-right font-bold text-[#2E7D32]">{formatCurrency(selectedLoan.schedule.reduce((sum, inst) => sum + parseFloat(inst.amount_paid || 0), 0))}</td>
                          <td className="py-3 px-4 text-right font-bold text-[#003000]">{formatCurrency(selectedLoan.schedule.reduce((sum, inst) => sum + parseFloat(inst.total_amount_due || inst.amount_due || inst.amount || 0), 0))}</td>
                          <td className="py-3 px-4 text-right font-bold text-red-600">{formatCurrency(selectedLoan.schedule.reduce((sum, inst) => sum + parseFloat(inst.extra_interest || 0), 0))}</td>
                          <td className="py-3 px-4"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="px-5 py-4 bg-gradient-to-r from-[#003000]/5 to-[#F57C00]/5 border-t border-[#003000]/10">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs text-[#003000]/60">Paid Installments</p>
                          <p className="text-2xl font-bold text-[#2E7D32]">{selectedLoan.schedule.filter(i => i.is_paid).length}/{selectedLoan.schedule.length}</p>
                        </div>
                        <div className="w-px h-8 bg-[#003000]/20"></div>
                        <div className="text-center">
                          <p className="text-xs text-[#003000]/60">On-Time Payments</p>
                          <p className="text-2xl font-bold text-[#003000]">{selectedLoan.schedule.filter(i => i.is_paid && new Date(i.due_date) >= new Date(i.paid_at || i.due_date)).length}</p>
                        </div>
                      </div>
                      <div className="text-sm text-[#003000]/60">
                        <span className="font-semibold text-[#F57C00]">Next due:</span>{' '}
                        {formatDate(selectedLoan.schedule.find(i => !i.is_paid)?.due_date || 'N/A')}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-[#2E7D32]/15 bg-[#FDF6EC] flex justify-end">
              <button onClick={closeModal} className="px-6 py-2.5 rounded-xl font-bold text-sm text-[#FDF6EC] bg-[#2E7D32] hover:bg-[#1B5E20] transition-all duration-200 shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════
          PENDING LOAN MODAL
      ══════════════════════════════ */}
      {showModal && modalType === 'pending' && selectedLoan && (
        <div className="fixed inset-0 bg-[#003000]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#FDF6EC] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fadeIn max-h-[97vh]">
            <div className="bg-gradient-to-r from-[#003000] to-[#1B5E20] px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#F57C00] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F57C00] animate-pulse"></span>Application Status
                </p>
                <p className="text-lg font-extrabold text-white mt-1">Pending Review</p>
              </div>
              <button onClick={closeModal} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex flex-col items-center text-center py-4 gap-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F57C00]/20 to-[#F57C00]/5 border border-[#F57C00]/30 flex items-center justify-center animate-pulse">
                  <svg className="w-8 h-8 text-[#F57C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-extrabold text-[#003000] text-base">Application Under Review</p>
                  <p className="text-sm text-[#003000]/55 mt-1">We'll notify you once a decision is made</p>
                </div>
              </div>
              <div className="bg-white border border-[#2E7D32]/15 rounded-xl overflow-hidden">
                <div className="divide-y divide-[#003000]/8">
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-xs text-[#003000]/50 font-medium">Application Date</span>
                    <span className="text-sm font-semibold text-[#003000]">{formatDate(selectedLoan.created_at)}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-xs text-[#003000]/50 font-medium">Principal Amount</span>
                    <span className="text-sm font-bold text-[#003000]">{formatCurrency(selectedLoan.principal)}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-xs text-[#003000]/50 font-medium">Tenure</span>
                    <span className="text-sm font-semibold text-[#003000]">{selectedLoan.tenure_months} months</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#F57C00]/5 border border-[#F57C00]/20 rounded-xl px-4 py-3">
                <p className="text-xs text-[#003000]/65 leading-relaxed flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#F57C00] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><span className="font-bold text-[#003000]">Note: </span>Review typically takes 1–2 business days. You'll be notified once a decision is made.</span>
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#F57C00]/20 bg-[#FDF6EC] flex justify-end">
              <button onClick={closeModal} className="px-6 py-2.5 rounded-xl font-bold text-sm text-[#FDF6EC] bg-[#F57C00] hover:bg-[#E65100] transition-all duration-200 shadow-sm">
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default LoanHistory;