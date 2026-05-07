import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createPortal } from 'react-dom';
import PopupMessage from '../ui/PopupMessage';
import { IoMdClose } from "react-icons/io";

const CreditandThrift = () => {
  const [filter, setFilter] = useState('all');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const { getAccessToken } = useAuth();

  const [loans, setLoans] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [count, setCount] = useState(0);
  const [nexts, setnexts] = useState(null);
  const [prevs, setprevs] = useState(null);

  const [pending, setPending] = useState({});
  const [completed, setCompleted] = useState({});
  const [approved, setApproved] = useState({});
  const [declined, setDeclined] = useState({});

  // ─── NEW: View Details state (ACTIVE only) ─────────────────────────────────
  const [selectedLoanDetail, setSelectedLoanDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // ─── Fetch loans ───────────────────────────────────────────────────────────
  const getLoans = async (val = '', status = '') => {
    try {
      const url = val.startsWith('http')
        ? val
        : `${import.meta.env.VITE_API_URL}/api/loan/admin${val}${status}`;

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      const data = await res.json();
  
      if (!res.ok) throw new Error('Server error');

      const isPending  = status === '?status=PENDING'  || url.includes('status=PENDING');
      const isApproved = status === '?status=ACTIVE' || url.includes('status=ACTIVE');
      const isCompleted = status === '?status=COMPLETED' || url.includes('status=COMPLETED');
      const isDeclined = status === '?status=REJECTED' || url.includes('status=REJECTED');

      if (isPending) {
        setPending(data);
        setnexts(data.next);
        setprevs(data.previous);
      } else if (isApproved) {
        setApproved(data);
        setnexts(data.next);
        setprevs(data.previous);
      }
      else if (isCompleted) {
        setCompleted(data);
        setnexts(data.next);
        setprevs(data.previous);
      }
       else if (isDeclined) {
        setDeclined(data);
        setnexts(data.next);
        setprevs(data.previous);
      } 
      else {
        setCount(data.count);
        setnexts(data.next);
        setprevs(data.previous);
        setLoans(data.results);
      }

      return data;
    } catch (error) {
      console.log('An error has occurred. Please try again', error);
    }
  };


  // ─── NEW: Fetch single loan detail ─────────────────────────────────────────
  const getLoanDetail = async (uid) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/loan/admin/${uid}/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error('Server error');
      setSelectedLoanDetail(data);
      setShowDetailModal(true);
    } catch (error) {
      console.log('An error fetching loan detail', error);
      setOpen(true);
      setMessage('Could not load loan details. Please try again.');
      setTitle('Error');
      setType('error');
    }
  };

  // ─── Approve / Decline API ─────────────────────────────────────────────────
  const processLoan = async (uid, action, value) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/loan/admin/${uid}/${action}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
          body: JSON.stringify(value),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setOpen(true);
        setMessage(
          res.status === 400
            ? 'You must state the reason for rejection'
            : 'There is an error, please try again'
        );
        setTitle('Error');
        setType('error');
        throw new Error('Server error');
      }

      if (action === 'approve') {
        setOpen(true);
        setMessage('Loan approved successfully. An email will be sent to the applicant immediately.');
        setTitle('Approval Success');
        setType('success');
        setLoans((prev) => [...prev, data]);
      } else {
        setOpen(true);
        setMessage('Loan declined successfully. An email will be sent to the applicant immediately.');
        setTitle('Decline Success');
        setType('success');
        setLoans((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log('An error has occurred. Please try again', error);
      setOpen(true);
      setMessage('There is an error, please try again');
      setTitle('Error');
      setType('error');
    }
  };

  // ─── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchAll = async () => {
      await getLoans();
      await getLoans('', '?status=PENDING');
      await getLoans('', '?status=ACTIVE');
      await getLoans('', '?status=COMPLETED');
      await getLoans('', '?status=REJECTED');

      if (filter === 'all')     await getLoans();
      if (filter === 'pending') await getLoans('', '?status=PENDING');
      if (filter === 'active')await getLoans('', '?status=ACTIVE');
      if (filter === 'completed')await getLoans('', '?status=COMPLETED');
      if (filter === 'declined')await getLoans('', '?status=REJECTED');
    };
    fetchAll();
  }, [filter]);


  // ─── Pagination ────────────────────────────────────────────────────────────
  const next = () => {
    let nextValue;
    if (filter === 'pending')  nextValue = pending.next;
    else if (filter === 'active') nextValue = approved.next;
    else if (filter === 'completed') nextValue = completed.next
    else if (filter === 'declined') nextValue = declined.next;
    else nextValue = nexts;

    if (!nextValue) {
      setOpen(true);
      setTitle('No next page');
      setMessage('You are on the last page');
      setType('error');
      return;
    }
    getLoans(nextValue);
  };

  const prev = () => {
    let prevValue;
    if (filter === 'pending')  prevValue = pending.previous;
    else if (filter === 'active') prevValue = approved.previous;
    else if (filter === 'completed') prevValue = completed.previous
    else if (filter === 'declined') prevValue = declined.previous;
    else prevValue = prevs;

    if (!prevValue) {
      setOpen(true);
      setTitle('No previous page');
      setMessage('You are on the first page');
      setType('error');
      return;
    }
    getLoans(prevValue);
  };

  // ─── Modal handlers ────────────────────────────────────────────────────────
  const handleAccept = (loan) => {
    setSelectedLoan(loan);
    setModalAction('accept');
    setShowModal(true);
  };

  const handleDecline = (loan) => {
    setSelectedLoan(loan);
    setModalAction('decline');
    setShowModal(true);
  };

  const confirmAction = () => {
    if (modalAction === 'accept') {
      processLoan(selectedLoan.uid, 'approve');
      setPending((prev) => ({
        ...prev,
        count: prev.count - 1,
        results: prev.results.filter((l) => l.uid !== selectedLoan.uid),
      }));
      setApproved((prev) => ({ ...prev, count: prev.count + 1 }));
      setLoans((prev) => prev.filter((l) => l.uid !== selectedLoan.uid));
    } else if (modalAction === 'decline') {
      processLoan(selectedLoan.uid, 'reject', { rejection_reason: declineReason });
      setPending((prev) => ({
        ...prev,
        count: prev.count - 1,
        results: prev.results.filter((l) => l.uid !== selectedLoan.uid),
      }));
      setDeclined((prev) => ({ ...prev, count: prev.count + 1 }));
      setLoans((prev) => prev.filter((l) => l.uid !== selectedLoan.uid));
    }

    setShowModal(false);
    setSelectedLoan(null);
    setDeclineReason('');
  };

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':  return 'bg-[#F57C00]/10 text-[#F57C00] border border-[#F57C00]/20';
      case 'ACTIVE': return 'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20';
      case 'REJECTED': return 'bg-red-600/10 text-red-600 border border-red-600/20';
       case 'COMPLETED': return 'bg-blue-600/10 text-blue-600 border border-blue-600/20';
      default:         return 'bg-gray-100 text-gray-600';
    }
  };

  const getLoanPurpose = (purpose) => {
    switch (purpose) {
      case 'personal':     return 'Personal Loan';
      case 'business':     return 'Business Loan';
      case 'housing':      return 'Housing Loan';
      case 'education':    return 'Education Loan';
      case 'emergency':    return 'Emergency Loan';
      case 'cooperative':  return 'Cooperative Loan';
      default:             return purpose || 'Not specified';
    }
  };

  // ─── Filtered list ─────────────────────────────────────────────────────────
  let filteredLoans;
  if (filter === 'all')      filteredLoans = loans;
  if (filter === 'pending')  filteredLoans = pending.results;
  if (filter === 'active') filteredLoans = approved.results;
  if(filter === 'completed') filteredLoans = completed.results;
  if (filter === 'declined') filteredLoans = declined.results;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#FDF6EC] min-h-screen p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#003000] mb-2">Loan Applications</h1>
        <p className="text-[#003000]/70">Review, approve, or decline member loan requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white/50 rounded-lg p-4 border border-[#2E7D32]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#003000]/60 text-sm">Total</p>
              <p className="text-2xl font-bold text-[#003000]">{count}</p>
            </div>
            <div className="w-10 h-10 bg-[#2E7D32]/10 rounded-full flex items-center justify-center">
              <span className="text-[#2E7D32] text-xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-4 border border-[#F57C00]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#003000]/60 text-sm">Pending</p>
              <p className="text-2xl font-bold text-[#F57C00]">{pending.count}</p>
            </div>
            <div className="w-10 h-10 bg-[#F57C00]/10 rounded-full flex items-center justify-center">
              <span className="text-[#F57C00] text-xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-4 border border-[#2E7D32]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#003000]/60 text-sm">Active</p>
              <p className="text-2xl font-bold text-[#2E7D32]">{approved.count}</p>
            </div>
            <div className="w-10 h-10 bg-[#2E7D32]/10 rounded-full flex items-center justify-center">
              <span className="text-[#2E7D32] text-xl">🟢</span>
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-4 border border-blue-600/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600/60 text-sm">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{completed.count}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-4 border border-red-600/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#003000]/60 text-sm">Declined</p>
              <p className="text-2xl font-bold text-red-600">{declined.count}</p>
            </div>
            <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">❎</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-[#003000]/10 max-sm:flex-col">
        {['all', 'pending', 'active', 'completed', 'declined'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2 font-medium transition-all duration-200 ${
              filter === tab
                ? 'text-[#F57C00] border-b-2 border-[#F57C00] max-sm:bg-[#F57C00] max-sm:text-white max-sm:rounded-2xl'
                : 'text-[#003000]/60 hover:text-[#003000]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Loan List */}
      <div className="space-y-4">
        {!filteredLoans || filteredLoans.length === 0 ? (
          <div className="bg-white/50 rounded-lg p-12 text-center border-2 border-dashed border-[#F57C00]/30">
            <div className="flex flex-col items-center gap-3">
              <svg className="w-16 h-16 text-[#F57C00]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-[#003000] text-lg font-medium">
                No {filter !== 'all' ? filter : ''} loan applications found
              </p>
              <p className="text-[#003000]/60">All loan applications will appear here</p>
            </div>
          </div>
        ) : (
          filteredLoans.map((loan) => (
            <div
              key={loan.uid}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#F57C00]"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                {/* Loan Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-[#003000] text-lg">
                      {loan.applicant_name}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                      {loan.status}
                    </span>
                    <span className="text-xs text-[#003000]/50">
                      ID: {loan.uid?.slice(0, 3).toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-[#003000]/60">Amount:</span>
                      <span className="ml-2 font-semibold text-[#F57C00]">
                        ₦{Number(loan?.principal)?.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#003000]/60">Tenure:</span>
                      <span className="ml-2 text-[#003000]">{loan?.tenure_months} months</span>
                    </div>
                  
                    <div>
                      <span className="text-[#003000]/60">Interest:</span>
                      <span className="ml-2 text-[#003000]">{loan.interest_rate}% p.a.</span>
                    </div>
                    
                    <div>
                      <span className="text-[#003000]/60">Date Applied:</span>
                      <span className="ml-2 text-[#003000]">
                        {new Date(loan?.created_at).toLocaleString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-[#003000]/60">Purpose:</span>
                      <span className="ml-2 text-[#2E7D32] font-medium">
                        {getLoanPurpose(loan.purpose)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#003000]/60">Member ID:</span>
                      <span className="ml-2 text-[#003000] text-sm">{loan?.user_membership}</span>
                    </div>
                      {loan.total_repayable && (
                      <div>
                        <span className="text-[#003000]/60">Amount Paid:</span>
                        <span className="ml-2 text-[#003000]">₦{Number(loan.total_repayable).toLocaleString()}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-[#003000]/60">Email:</span>
                      <span className="ml-2 text-[#003000] text-sm">{loan?.user_email}</span>
                    </div>
                    
                    {loan.decline_reason && (
                      <div className="md:col-span-3">
                        <span className="text-red-600/60">Decline reason:</span>
                        <span className="ml-2 text-red-600 text-sm">{loan.decline_reason}</span>
                      </div>
                    )}
                    {loan.processed_on && loan.status !== 'PENDING' && (
                      <div className="md:col-span-3">
                        <span className="text-[#003000]/60">Processed on:</span>
                        <span className="ml-2 text-[#003000] text-sm">
                          {new Date(loan.processed_on).toLocaleString('en-GB')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {/* ─── NEW: View Details — ACTIVE only ─── */}
                  {loan.status === 'ACTIVE' && (
                    <button
                      onClick={() => getLoanDetail(loan.uid)}
                      className="px-4 py-2 bg-[#F57C00] text-white rounded-lg hover:bg-[#E65100] transition-all duration-200 flex items-center gap-2"
                    >
                      <span>👁</span> View Details
                    </button>
                  )}

                  {loan.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleAccept(loan)}
                        className="px-4 py-2 bg-[#2E7D32] text-white rounded-lg hover:bg-[#1B5E20] transition-all duration-200 flex items-center gap-2"
                      >
                        <span>✓</span> Approve
                      </button>
                      <button
                        onClick={() => handleDecline(loan)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2"
                      >
                        <span>✗</span> Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-[#2E7D32] px-6 py-2 text-white rounded-3xl hover:bg-[#1B5E20] transition-all duration-200"
            onClick={prev}
          >
            Prev
          </button>
          <button
            className="bg-[#2E7D32] px-6 py-2 text-white rounded-3xl hover:bg-[#1B5E20] transition-all duration-200"
            onClick={next}
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#003000] mb-4">
              {modalAction === 'accept' ? 'Approve Loan' : 'Decline Loan'}
            </h2>

            <p className="text-[#003000]/80 mb-4">
              Are you sure you want to {modalAction === 'accept' ? 'approve' : 'decline'} the loan
              of <span className="font-bold text-[#F57C00] pr-1">
                 ₦{selectedLoan?.principal?.toLocaleString()}
              </span>{' '}
              from <span className="font-bold">{selectedLoan?.applicant_name}</span>?
            </p>

            {modalAction === 'decline' && (
              <div className="mb-4">
                <label className="block text-[#003000] text-sm font-medium mb-2">
                  Reason for declining (required):
                </label>
                <textarea
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  className="w-full px-3 py-2 border border-[#003000]/20 rounded-lg focus:outline-none focus:border-[#F57C00]"
                  rows="3"
                  placeholder="Enter reason for declining this loan application..."
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={confirmAction}
                className={`flex-1 py-2 rounded-lg font-medium transition-all duration-200 ${
                  modalAction === 'accept'
                    ? 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                Yes, {modalAction === 'accept' ? 'Approve' : 'Decline'}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setDeclineReason('');
                }}
                className="flex-1 py-2 bg-gray-200 text-[#003000] rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── NEW: Loan Detail Modal (ACTIVE only) ─────────────────────────────── */}
      {showDetailModal && selectedLoanDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FDF6EC] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#2E7D32]/20">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#003000]/10 bg-white rounded-t-xl">
           
              <div>
                <h2 className="text-xl font-bold text-[#003000]">Loan Details</h2>
                <p className="text-[#003000]/60 text-sm mt-0.5">
                  Member: {selectedLoanDetail.user_membership} &nbsp;·&nbsp; {selectedLoanDetail.user_email}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedLoanDetail.status)}`}>
                {selectedLoanDetail.status}
              </span>

    <button
      onClick={() => {
        setShowDetailModal(false);
        setSelectedLoanDetail(null);
      }}
      className="text-xl text-[#003000] hover:text-red-500"
    >
      <IoMdClose />
    </button>
            </div>

            <div className="p-6 space-y-6">

              {/* Key Figures */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-[#F57C00]/20">
                  <p className="text-[#003000]/60 text-xs mb-1">Principal</p>
                  <p className="text-[#F57C00] font-bold text-lg">₦{Number(selectedLoanDetail.principal).toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#2E7D32]/20">
                  <p className="text-[#003000]/60 text-xs mb-1">Total Repayable</p>
                  <p className="text-[#2E7D32] font-bold text-lg">₦{Number(selectedLoanDetail.total_repayable).toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#003000]/10">
                  <p className="text-[#003000]/60 text-xs mb-1">Monthly Installment</p>
                  <p className="text-[#003000] font-bold text-lg">₦{Number(selectedLoanDetail.monthly_installment).toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#003000]/10">
                  <p className="text-[#003000]/60 text-xs mb-1">Interest Rate</p>
                  <p className="text-[#003000] font-bold text-lg">{selectedLoanDetail.interest_rate}% p.a.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#003000]/10">
                  <p className="text-[#003000]/60 text-xs mb-1">Tenure</p>
                  <p className="text-[#003000] font-bold text-lg">{selectedLoanDetail.tenure_months} months</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#003000]/10">
                  <p className="text-[#003000]/60 text-xs mb-1">Applied On</p>
                  <p className="text-[#003000] font-bold text-sm">
                    {new Date(selectedLoanDetail.created_at).toLocaleString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Balance Summary */}
              {selectedLoanDetail.balance_summary && (
                <div className="bg-white rounded-lg p-4 border border-[#F57C00]/30">
                  <h3 className="text-[#003000] font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#F57C00] rounded-full inline-block"></span>
                    Balance Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-[#003000]/60">Total Outstanding</p>
                      <p className="text-[#F57C00] font-semibold">
                        ₦{Number(selectedLoanDetail.balance_summary.total_outstanding).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#003000]/60">This Month Due</p>
                      <p className="text-[#003000] font-semibold">
                        ₦{Number(selectedLoanDetail.balance_summary.this_month_due).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#003000]/60">Due Date</p>
                      <p className="text-[#003000] font-semibold">
                        {new Date(selectedLoanDetail.balance_summary.this_month_due_date).toLocaleString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#003000]/60">Installment No.</p>
                      <p className="text-[#003000] font-semibold">
                        {selectedLoanDetail.balance_summary.this_month_installment_number} of {selectedLoanDetail.tenure_months}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#003000]/60">Installments Remaining</p>
                      <p className="text-[#2E7D32] font-semibold">
                        {selectedLoanDetail.balance_summary.installments_remaining}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Repayment Schedule */}
              {selectedLoanDetail.schedule && selectedLoanDetail.schedule.length > 0 && (
                <div>
                  <h3 className="text-[#003000] font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#2E7D32] rounded-full inline-block"></span>
                    Repayment Schedule
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-[#003000]/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#2E7D32] text-white">
                          <th className="px-4 py-3 text-left font-medium">#</th>
                          <th className="px-4 py-3 text-left font-medium">Due Date</th>
                          <th className="px-4 py-3 text-left font-medium">Amount Due</th>
                          <th className="px-4 py-3 text-left font-medium">Amount Paid</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedLoanDetail.schedule.map((item, idx) => (
                          <tr
                            key={item.uid}
                            className={`border-t border-[#003000]/10 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FDF6EC]'}`}
                          >
                            <td className="px-4 py-3 text-[#003000]/60">{item.installment_number}</td>
                            <td className="px-4 py-3 text-[#003000]">
                              {new Date(item.due_date).toLocaleString('en-GB', {
                                day: 'numeric', month: 'short', year: 'numeric',
                              })}
                            </td>
                            <td className="px-4 py-3 font-semibold text-[#F57C00]">
                              ₦{Number(item.total_amount_due).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-[#003000]">
                              ₦{Number(item.amount_paid).toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              {item.is_paid ? (
                                <span className="px-2 py-0.5 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20 text-xs font-medium">
                                  Paid
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full bg-[#F57C00]/10 text-[#F57C00] border border-[#F57C00]/20 text-xs font-medium">
                                  Unpaid
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Disbursement Info */}
              <div className="bg-white rounded-lg p-4 border border-[#003000]/10 text-sm">
                <h3 className="text-[#003000] font-semibold mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#003000] rounded-full inline-block"></span>
                  Disbursement Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="text-[#003000]/60">Approved At:</span>
                    <span className="ml-2 text-[#003000]">
                      {selectedLoanDetail.approved_at
                        ? new Date(selectedLoanDetail.approved_at).toLocaleString('en-GB')
                        : '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#003000]/60">Disbursed At:</span>
                    <span className="ml-2 text-[#003000]">
                      {selectedLoanDetail.disbursed_at
                        ? new Date(selectedLoanDetail.disbursed_at).toLocaleString('en-GB')
                        : '—'}
                    </span>
                  </div>
                  {selectedLoanDetail.remark && (
                    <div className="md:col-span-2">
                      <span className="text-[#003000]/60">Remark:</span>
                      <span className="ml-2 text-[#003000]">{selectedLoanDetail.remark}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {createPortal(
        <PopupMessage
          isOpen={open}
          message={message}
          title={title}
          type={type}
          onClose={() => setOpen(false)}
        />,
        document.body
      )}
    </div>
  );
};

export default CreditandThrift;