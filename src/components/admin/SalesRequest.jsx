import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RiCloseLine } from 'react-icons/ri';
import { usePurchase } from '../../context/PurchaseProvider';
import PopupMessage from '../ui/PopupMessage';
import { useSale } from '../../context/SaleContext';

const SalesRequest = () => {
  const {
    getAdminPurchase,
    getAdminPurchaseDetails,
    purchaseAction,
    open,
    setOpen,
    message,
    title,
    type,
    deleteListing,

  } = usePurchase();

  const [filter, setFilter] = useState('all');
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [detailData, setDetailData] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [counts, setCounts] = useState({ all: 0, PENDING: 0, ACTIVE:0, COMPLETED: 0, REJECTED: 0 });
  const {sales} = useSale();

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getAdminPurchase();
      if (data) {
        const results = Array.isArray(data) ? data : data.results ?? [];
        setRequests(results);
        setCounts({
          all: results.length,
          PENDING: results.filter((r) => r.status === 'PENDING').length,
          COMPLETED: results.filter((r) => r.status === 'COMPLETED').length,
          ACTIVE:results.filter((r) => r.status === 'ACTIVE').length,
          REJECTED: results.filter((r) => r.status === 'REJECTED').length,
        });
      }
    };
    fetchRequests();
  }, []);

  const filteredRequests =
    filter === 'all'
      ? requests
      : requests.filter((r) => r.status === filter.toUpperCase());

  const openDetailModal = async (request) => {
    setSelectedRequest(request);
    if(request.status === 'ACTIVE'){
      setShowDetailModal(true);
    }
    setLoadingDetail(true);
    const detail = await getAdminPurchaseDetails(request.id ?? request.uid);
    setDetailData(detail);
    setLoadingDetail(false);
  };

  const openActionModal = (request, action, e) => {
    e.stopPropagation();
    setSelectedRequest(request);
    setModalAction(action);
    setShowActionModal(true);
  };

  const confirmAction = async () => {
    const id = selectedRequest?.id ?? selectedRequest?.uid;
    await purchaseAction(id, modalAction, { rejection_reason: declineReason });
    // Optimistic UI update
    setRequests((prev) =>
      prev.map((r) =>
        (r.id ?? r.uid) === id
          ? { ...r, status: modalAction === 'approve' ? 'COMPLETED' : 'REJECTED' }
          : r
      )
    );
    if(purchase_type === 'INSTALLMENT' ){
setCounts((prev) => ({
      ...prev,
      PENDING: prev.PENDING - 1,
      ...(modalAction === 'approve' 
        ? { ACTIVE: prev.ACTIVE + 1 }
        : { REJECTED: prev.REJECTED + 1 }),
    }));
    }
    else{
      setCounts((prev) => ({
      ...prev,
      PENDING: prev.PENDING - 1,
      ...(modalAction === 'approve' 
        ? { COMPLETED: prev.COMPLETED + 1 }
        : { REJECTED: prev.REJECTED + 1 }),
    }));
    }
    

    setShowActionModal(false);
    setSelectedRequest(null);
    setDeclineReason('');
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'REJECTED':
        return 'bg-red-50 text-red-600 border border-red-200';
        case 'ACTIVE':
          return 'bg-blue-50 text-blue-600 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-400';
      case 'COMPLETED': return 'bg-emerald-500';
      case 'REJECTED': return 'bg-red-500';
      case 'ACTIVE': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const TABS = ['all', 'pending', 'completed', 'rejected', 'active'];

  const STAT_CARDS = [
    { label: 'Total Requests', value: counts.all, color: '#2E7D32', emoji: '🏠' },
    { label: 'Pending', value: counts.PENDING, color: '#F57C00', emoji: '⏳' },
      { label: 'Active', value: counts.ACTIVE, color: '#000080', emoji: '🟢' },

    { label: 'Completed', value: counts.COMPLETED, color: '#2E7D32', emoji: '✅' },
    { label: 'Rejected', value: counts.REJECTED, color: '#c0392b', emoji: '❎' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#003000] mb-1">Sales Requests</h1>
        <p className="text-[#003000]/60 text-sm">Review and manage all housing purchase requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {STAT_CARDS.map(({ label, value, color, emoji }) => (
          <div
            key={label}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#003000]/8"
            style={{ borderLeft: `4px solid ${color}` }}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-[#003000]/55 text-xs font-medium">{label}</p>
              <span className="text-lg">{emoji}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color }}>{value ?? 0}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-[#f4f7f4] p-1 rounded-xl w-fit max-sm:w-full max-sm:grid max-sm:grid-cols-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
              filter === tab
                ? 'bg-white text-[#F57C00] shadow-sm'
                : 'text-[#003000]/50 hover:text-[#003000]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Request Cards */}
      <div className="space-y-3">
        {!filteredRequests || filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center border-2 border-dashed border-[#F57C00]/25">
            <span className="text-5xl block mb-3">🏠</span>
            <p className="text-[#003000] font-semibold">No {filter !== 'all' ? filter : ''} requests found</p>
            <p className="text-[#003000]/50 text-sm mt-1">All housing purchase requests will appear here</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div
              key={request.id ?? request.uid}
              onClick={() => openDetailModal(request)}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-[#003000]/8 cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    {/* Avatar initial */}
                    <div className="w-9 h-9 rounded-full bg-[#2E7D32]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#2E7D32] font-bold text-sm">
                        {(request.user_email ?? request.userName ?? 'U')[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-[#003000] text-base leading-none">
                        {request.listing_title}
                      </span>
                      {(request.user_email ?? request.email) && (
                        <p className="text-xs text-[#003000]/45 mt-0.5">
                          {request.user_email ?? request.email}
                        </p>
                      )}
                      <p className='text-xs text-cooperative-dark/50'>Location: {request.listing_address}</p>
                    </div>
                    {/* Status badge */}
                    <span
                      className={`ml-auto md:ml-0 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${getStatusStyle(request.status)}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(request.status)}`} />
                      {request.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                    <InfoItem label="Property Type" value={request.property_type ?? request.property ?? '—'} highlight />
                     <InfoItem label="Purchase Type" value={request.purchase_type ?? request.property ?? '—'} highlight />
                     <InfoItem label="Listing Type" value={request.property_type === 'land' || request.property_type === 'house' ? 'sale':'rent' ?? '_'}     highlight />
                    <InfoItem
                      label="Amount"
                      value={request.property_price ? `₦${Number(request.property_price).toLocaleString()}` : '—'}
                      highlight
                      orange
                    />
                    <InfoItem label="Uid" value={request.uid.slice(0,4) ?? request.quantity ?? '—'} />
                    <InfoItem
                      label="Date"
                      value={
                        request.created_at ?? request.created_on
                          ? new Date(request.created_at ?? request.created_on).toLocaleDateString('en-GB', {
                              day: 'numeric', month: 'short', year: 'numeric',
                            })
                          : '—'
                      }
                     
                    />
                  </div>
                  {request.status === 'REJECTED' && request.rejection_reason && (
                    <p className="mt-2 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-md">
                      <span className="font-semibold">Rejection reason:</span> {request.rejection_reason}
                    </p>
                  )}
                </div>

                {/* Actions */}
                {request.status === 'PENDING' && (
                  <div className="flex gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => openActionModal(request, 'approve', e)}
                      className="px-4 py-2 bg-[#2E7D32] text-white rounded-lg hover:bg-[#1B5E20] transition-all text-sm font-medium flex items-center gap-1.5"
                    >
                      <span>✓</span> Approve
                    </button>
                    <button
                      onClick={(e) => openActionModal(request, 'reject', e)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm font-medium flex items-center gap-1.5"
                    >
                      <span>✗</span> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showDetailModal &&
  createPortal(
    <div
      className="fixed inset-0 bg-cooperative-dark/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={() => setShowDetailModal(false)}
    >
      <div
        className="bg-cooperative-cream rounded-2xl w-full max-w-2xl overflow-hidden shadow-lg max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-cooperative-dark px-6 py-5 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cooperative-teal/80 mb-1">Purchase Request</p>
            <h2 className="text-xl font-bold text-cooperative-cream">Request Details</h2>
          </div>
          <button
            onClick={() => setShowDetailModal(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-cooperative-cream"
          >
            <RiCloseLine size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {loadingDetail ? (
            <div className="flex flex-col items-center py-16 gap-3">
              <div className="w-8 h-8 border-[3px] border-cooperative-orange border-t-transparent rounded-full animate-spin" />
              <p className="text-cooperative-dark/50 text-sm">Loading details…</p>
            </div>
          ) : detailData ? (
            <div className="px-6 py-6 space-y-4">

              {/* Status Banner */}
              <div className={`flex items-center justify-between rounded-lg px-5 py-3 ${
                detailData.status === 'ACTIVE'
                  ? 'bg-cooperative-teal/10 border border-cooperative-teal/20'
                  : detailData.status === 'PENDING'
                  ? 'bg-cooperative-orange/10 border border-cooperative-orange/20'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-dark/50 mb-0.5">Status</p>
                  <span className={`text-sm font-bold uppercase ${
                    detailData.status === 'ACTIVE'
                      ? 'text-cooperative-teal'
                      : detailData.status === 'PENDING'
                      ? 'text-cooperative-orange'
                      : 'text-red-600'
                  }`}>
                    {detailData.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-dark/50 mb-0.5">Purchase Type</p>
                  <span className="text-sm font-bold text-cooperative-orange uppercase">{detailData.purchase_type}</span>
                </div>
              </div>

              {/* Property Info */}
              <Section title="Property">
                <DetailRow label="Title" value={detailData.listing_title} />
                <DetailRow label="Address" value={detailData.listing_address} />
                <DetailRow label="Type" value={detailData.property_type?.charAt(0).toUpperCase() + detailData.property_type?.slice(1)} />
              </Section>

              {/* Applicant */}
              <Section title="Applicant">
                <DetailRow label="Email" value={detailData.user_email} />
                <DetailRow label="Membership" value={detailData.user_membership ?? 'Not Assigned'} />
              </Section>

              {/* Financial Breakdown */}
              <div>
                <p className="text-[10px] font-bold text-cooperative-dark/40 uppercase tracking-wider mb-2">Financial Breakdown</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-cooperative-teal/8 border border-cooperative-teal/20 p-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-teal mb-1.5">Property Price</p>
                    <p className="text-base font-bold text-cooperative-dark">₦{Number(detailData.property_price).toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-cooperative-orange/8 border border-cooperative-orange/20 p-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-orange mb-1.5">Initial Deposit</p>
                    <p className="text-base font-bold text-cooperative-dark">₦{Number(detailData.initial_deposit).toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-cooperative-teal/8 border border-cooperative-teal/20 p-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-teal mb-1.5">Monthly Installment</p>
                    <p className="text-base font-bold text-cooperative-dark">₦{Number(detailData.monthly_installment).toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-cooperative-orange/8 border border-cooperative-orange/20 p-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-orange mb-1.5">Balance After Deposit</p>
                    <p className="text-base font-bold text-cooperative-dark">₦{Number(detailData.balance_after_deposit).toLocaleString()}</p>
                  </div>
                </div>

                {/* Total Repayable */}
                <div className="mt-3 flex items-center justify-between rounded-lg bg-cooperative-teal px-5 py-3.5">
                  <span className="text-xs uppercase tracking-widest text-white font-semibold">Total Repayable</span>
                  <span className="text-lg font-bold text-cooperative-cream">₦{Number(detailData.total_repayable).toLocaleString()}</span>
                </div>
              </div>

              {/* Tenure */}
              <Section title="Tenure">
                <DetailRow label="Duration" value={`${detailData.tenure_months} months`} />
                <DetailRow
                  label="Approved On"
                  value={detailData.approved_at
                    ? new Date(detailData.approved_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                    : '—'}
                />
                <DetailRow
                  label="Created On"
                  value={detailData.created_at
                    ? new Date(detailData.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                    : '—'}
                />
                {detailData.remark && <DetailRow label="Remark" value={detailData.remark} />}
              </Section>

              {/* Balance Summary */}
              {detailData.balance_summary && (
                <Section title="Balance Summary">
                  <DetailRow
                    label="Total Outstanding"
                    value={`₦${Number(detailData.balance_summary.total_outstanding).toLocaleString()}`}
                    orange
                  />
                  <DetailRow
                    label="This Month Due"
                    value={`₦${Number(detailData.balance_summary.this_month_due).toLocaleString()}`}
                  />
                  <DetailRow
                    label="Due Date"
                    value={detailData.balance_summary.this_month_due_date
                      ? new Date(detailData.balance_summary.this_month_due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                      : '—'}
                  />
                  <DetailRow
                    label="Installment No."
                    value={`${detailData.balance_summary.this_month_installment_number} of ${detailData.tenure_months}`}
                  />
                  <DetailRow
                    label="Installments Remaining"
                    value={detailData.balance_summary.installments_remaining}
                  />
                </Section>
              )}

              {/* Schedule Table */}
              {detailData.schedule?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-cooperative-dark/40 uppercase tracking-wider mb-2">
                    Payment Schedule ({detailData.schedule.length} installments)
                  </p>
                  <div className="rounded-lg border border-cooperative-dark/10 overflow-hidden">
                    <div className="grid grid-cols-4 bg-cooperative-dark px-4 py-2.5 text-[10px] uppercase tracking-widest text-cooperative-cream/70 font-semibold">
                      <span>#</span>
                      <span>Due Date</span>
                      <span>Amount</span>
                      <span>Status</span>
                    </div>
                    <div className="max-h-48 overflow-y-auto divide-y divide-cooperative-dark/8">
                      {detailData.schedule.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-4 px-4 py-2.5 text-xs text-cooperative-dark even:bg-cooperative-dark/3"
                        >
                          <span className="font-semibold text-cooperative-dark/50">{item.installment_number ?? index + 1}</span>
                          <span>
                            {item.due_date
                              ? new Date(item.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                              : '—'}
                          </span>
                          <span className="font-semibold text-cooperative-orange">
                            ₦{Number(item.amount ?? item.monthly_installment ?? 0).toLocaleString()}
                          </span>
                          <span className={`font-semibold capitalize ${
                            item.status === 'PAID' ? 'text-cooperative-teal'
                            : item.status === 'PENDING' ? 'text-cooperative-orange'
                            : 'text-cooperative-dark/50'
                          }`}>
                            {item.status ?? '—'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <p className="text-center text-cooperative-dark/50 py-12 text-sm">No details available.</p>
          )}
        </div>

        {/* Footer */}
        {!loadingDetail && detailData?.status === 'PENDING' && (
          <div className="flex gap-3 px-6 py-4 border-t border-cooperative-dark/10 flex-shrink-0 bg-cooperative-cream">
            <button
              onClick={(e) => { setShowDetailModal(false); openActionModal(selectedRequest, 'approve', e); }}
              className="flex-1 py-3 bg-cooperative-teal text-cooperative-cream rounded-lg font-bold text-sm hover:bg-cooperative-teal/90 transition"
            >
              ✓ Approve
            </button>
            <button
              onClick={(e) => { setShowDetailModal(false); openActionModal(selectedRequest, 'reject', e); }}
              className="flex-1 py-3 bg-cooperative-orange text-white rounded-lg font-bold text-sm hover:bg-cooperative-orange/90 transition"
            >
              ✗ Reject
            </button>
          </div>
        )}

      </div>
    </div>,
    document.body
  )}

      {/* Action Confirmation Modal */}
      {showActionModal &&
        createPortal(
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[99999] p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
              <h2 className="text-lg font-bold text-[#003000] mb-2">
                {modalAction === 'approve' ? 'Approve Request' : 'Reject Request'}
              </h2>
              <p className="text-[#003000]/70 text-sm mb-5">
                Are you sure you want to{' '}
                <span className="font-semibold">
                  {modalAction === 'approve' ? 'approve' : 'reject'}
                </span>{' '}the purchase of {selectedRequest.listing_title}{' '}
                 request from {' '}{selectedRequest.user_email}
                <span className="font-bold text-[#003000]">
                  {selectedRequest?.user_name ?? selectedRequest?.userName}
                </span>
                {selectedRequest?.amount && (
                  <>
                    {' '}worth{' '}
                    <span className="font-bold text-[#F57C00]">
                      ₦{Number(selectedRequest.amount).toLocaleString()}
                    </span>
                  </>
                )}
                ?
              </p>

              {modalAction === 'reject' && (
                <div className="mb-5">
                  <label className="block text-[#003000] text-sm font-medium mb-1.5">
                    Reason for rejection
                  </label>
                  <textarea
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#003000]/15 rounded-xl focus:outline-none focus:border-[#F57C00] resize-none text-sm"
                    rows="3"
                    placeholder="State the reason for rejecting this request…"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={confirmAction}
                  className={`flex-1 py-2.5 rounded-xl font-semibold text-white text-sm transition ${
                    modalAction === 'approve'
                      ? 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Yes, {modalAction === 'approve' ? 'Approve' : 'Reject'}
                </button>
                <button
                  onClick={() => {
                    setShowActionModal(false);
                    setDeclineReason('');
                  }}
                  className="flex-1 py-2.5 bg-gray-100 text-[#003000] rounded-xl hover:bg-gray-200 transition text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Toast */}
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

// ─── Small helper components ───────────────────────────────────────────────

const InfoItem = ({ label, value, highlight, orange }) => (
  <div>
    <span className="text-[#003000]/45 text-xs">{label}:</span>
    <span
      className={`ml-1 text-sm font-medium ${
        orange ? 'text-[#F57C00]' : highlight ? 'text-[#003000]' : 'text-[#003000]/70'
      }`}
    >
      {value ?? '—'}
    </span>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <p className="text-xs font-bold text-[#003000]/40 uppercase tracking-wider mb-2">{title}</p>
    <div className="bg-[#f8faf8] rounded-xl px-4 py-3 space-y-2">{children}</div>
  </div>
);

const DetailRow = ({ label, value, orange }) => (
  <div className="flex justify-between items-start text-sm">
    <span className="text-[#003000]/50">{label}</span>
    <span className={`font-medium text-right ${orange ? 'text-[#F57C00]' : 'text-[#003000]'}`}>
      {value ?? '—'}
    </span>
  </div>
);

export default SalesRequest;