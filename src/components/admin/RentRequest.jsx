import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RiCloseLine, RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { usePurchase } from '../../context/PurchaseProvider';
import PopupMessage from '../ui/PopupMessage';
import { useSale } from '../../context/SaleContext';
import { useRent } from '../../context/RentProvider';
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
const RentRequest = () => {
  const {
    getAdminPurchase,
    getAdminPurchaseDetails,
    deleteListing,
  } = usePurchase();

  const {
    open,
    setOpen,
    message,
    title,
    type,
    getRentDetails,
    RentAction
  } = useRent();

  const [filter, setFilter] = useState('all');
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [detailData, setDetailData] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [counts, setCounts] = useState({ all: 0, PENDING: 0, ACTIVE: 0, COMPLETED: 0, REJECTED: 0 });
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { sales } = useSale();
  

  const fetchRequests = async (status = '', url = '') => {
    setLoading(true);
    // If a full URL is passed (next/prev), extract just the query string
    // But since getRentDetails builds the URL, we pass status param
    const statusParam = status && status !== 'all' ? `?status=${status.toUpperCase()}` : '';
    const data = await getRentDetails('', statusParam);
    if (data) {
      const results = Array.isArray(data) ? data : data.results ?? [];
      setRequests(results);
      setNextUrl(data.next ?? null);
      setPrevUrl(data.previous ?? null);

      // Only recount on 'all' fetch or rebuild counts per tab
      if (!status || status === 'all') {
        setCounts((prev) => ({ ...prev, all: data.count ?? results.length }));
      }
    }
    setLoading(false);
  };

  // Fetch counts for each status tab on mount
  const fetchAllCounts = async () => {
    const allData = await getRentDetails('', '');
    const pendingData = await getRentDetails('', '?status=PENDING');
    const activeData = await getRentDetails('', '?status=ACTIVE');
    const completedData = await getRentDetails('', '?status=COMPLETED');
    const rejectedData = await getRentDetails('', '?status=REJECTED');

    setCounts({
      all: allData?.count ?? allData?.results?.length ?? 0,
      PENDING: pendingData?.count ?? pendingData?.results?.length ?? 0,
      ACTIVE: activeData?.count ?? activeData?.results?.length ?? 0,
      COMPLETED: completedData?.count ?? completedData?.results?.length ?? 0,
      REJECTED: rejectedData?.count ?? rejectedData?.results?.length ?? 0,
    });
  };

  useEffect(() => {
    fetchAllCounts();
    fetchRequests('all');
  }, []);

  // Re-fetch when filter tab changes
  useEffect(() => {
    fetchRequests(filter);
  }, [filter]);

  // Pagination — navigate using next/prev full URL
  const handlePagination = async (direction) => {
    const targetUrl = direction === 'next' ? nextUrl : prevUrl;
    if (!targetUrl) return;

    setLoading(true);
    // Extract the query string from the full URL to pass to getRentDetails
    try {
      const urlObj = new URL(targetUrl);
      const queryString = urlObj.search; // e.g. "?status=PENDING&page=2"
      const data = await getRentDetails('', queryString);
      if (data) {
        const results = Array.isArray(data) ? data : data.results ?? [];
        setRequests(results);
        setNextUrl(data.next ?? null);
        setPrevUrl(data.previous ?? null);
      }
    } catch (err) {
      console.error('Pagination error:', err);
    }
    setLoading(false);
  };

  const openDetailModal = async (request) => {
    setSelectedRequest(request);
    if (request.status === 'ACTIVE') {
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
    console.log(declineReason);
    const id = selectedRequest?.id ?? selectedRequest?.uid;
    await RentAction(id, modalAction, {rejection_reason: declineReason });

    setRequests((prev) =>
      prev.map((r) =>
        (r.id ?? r.uid) === id
          ? { ...r, status: modalAction === 'approve' ? 'COMPLETED' : 'REJECTED' }
          : r
      )
    );

    setCounts((prev) => ({
      ...prev,
      PENDING: prev.PENDING - 1,
      ...(modalAction === 'approve'
        ? { COMPLETED: prev.ACTIVE + 1 }
        : { REJECTED: prev.REJECTED + 1 }),
    }));

    setShowActionModal(false);
    setSelectedRequest(null);
    setDeclineReason('');
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'REJECTED': return 'bg-red-50 text-red-600 border border-red-200';
      case 'ACTIVE': return 'bg-blue-50 text-blue-600 border border-blue-200';
      default: return 'bg-gray-100 text-gray-600';
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

  const TABS = ['all', 'pending', 'active', 'completed', 'rejected'];

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
        <h1 className="text-2xl font-bold text-[#003000] mb-1">Rent Requests</h1>
        <p className="text-[#003000]/60 text-sm">Review and manage all housing rent requests</p>
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
        {loading ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-8 h-8 border-[3px] border-[#F57C00] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#003000]/50 text-sm">Loading requests…</p>
          </div>
        ) : !requests || requests.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center border-2 border-dashed border-[#F57C00]/25">
            <span className="text-5xl block mb-3">🏠</span>
            <p className="text-[#003000] font-semibold">No {filter !== 'all' ? filter : ''} requests found</p>
            <p className="text-[#003000]/50 text-sm mt-1">All housing rent requests will appear here</p>
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id ?? request.uid}
              onClick={() => openDetailModal(request)}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-[#003000]/8 cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
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
                      <p className="text-xs text-cooperative-dark/50">Location: {request.listing_address}</p>
                    </div>
                    <span
                      className={`ml-auto md:ml-0 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${getStatusStyle(request.status)}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(request.status)}`} />
                      {request.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                    <InfoItem label="Property Type" value={request.property_type ?? '—'} highlight />
                    <InfoItem label="Duration" value={request.duration_days ? `${request.duration_days} days` : '—'} highlight />
                    <InfoItem label="Price/Day" value={request.price_per_day ? `₦${Number(request.price_per_day).toLocaleString()}` : '—'} highlight />
                    <InfoItem
                      label="Total Cost"
                      value={request.total_rent_cost ? `₦${Number(request.total_rent_cost).toLocaleString()}` : '—'}
                      highlight
                      orange
                    />
                    <InfoItem label="Uid" value={request.uid?.slice(0, 4) ?? '—'} />
                    <InfoItem
                      label="Date"
                      value={
                        request.created_at
                          ? new Date(request.created_at).toLocaleDateString('en-GB', {
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

      {/* Pagination */}
      {(prevUrl || nextUrl) && !loading && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => handlePagination('prev')}
            disabled={!prevUrl}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              prevUrl
                ? 'bg-white text-[#003000] border-[#003000]/15 hover:bg-[#f4f7f4]'
                : 'bg-gray-50 text-[#003000]/30 border-[#003000]/8 cursor-not-allowed'
            }`}
          >
            <RiArrowLeftLine size={16} />
            Previous
          </button>
          <button
            onClick={() => handlePagination('next')}
            disabled={!nextUrl}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              nextUrl
                ? 'bg-white text-[#003000] border-[#003000]/15 hover:bg-[#f4f7f4]'
                : 'bg-gray-50 text-[#003000]/30 border-[#003000]/8 cursor-not-allowed'
            }`}
          >
            Next
            <RiArrowRightLine size={16} />
          </button>
        </div>
      )}

      {/* Detail Modal — keep your existing one unchanged */}
      {showDetailModal && createPortal(<div>helo</div>, document.body)}

      {/* Action Confirmation Modal — keep your existing one unchanged */}
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
                     </span>{' '}the rent of {selectedRequest.listing_title}{' '}
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
export default RentRequest;