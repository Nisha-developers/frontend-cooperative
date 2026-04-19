import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createPortal } from 'react-dom';
import PopupMessage from '../ui/PopupMessage';
import { Forward } from 'lucide-react';


const AdminTransactions = () => {
  

  const [filter, setFilter] = useState('all'); // all, pending, accepted, declined
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(''); // accept or decline
  const [declineReason, setDeclineReason] = useState('');
  const {getAccessToken} = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [count, setCount] = useState(0);
  const [nexts, setnexts] = useState(null);
  const [prevs, setprevs] = useState(null);
const [pendingCount, setPendingCount] = useState(0);
const [acceptedCount, setAcceptedCount] = useState(0);
const [declinedCount, setDeclinedCount] = useState(0);
  

  const handleAccept = (transaction) => {
    setSelectedTransaction(transaction);
    setModalAction('accept');
    setShowModal(true);
  };
const getWallets = async (val = '', status = '') => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wallet/admin/transactions${val}${status}`,{
       headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
    );

    const data = await res.json(); 
    
if (!status) {
      setCount(data.count);
      setnexts(data.next);
      setprevs(data.previous);
      setTransactions(data.results);
    }
    

    if (!res.ok) {
      throw new Error("Server error");
    }
    
   console.log(data);
   return data;
  } catch (error) {
    console.log("An error has occurred. please try again", error);
  }
};
const Approve = async (uid, action, value) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wallet/admin/transactions/${uid}/${action}/`,{
        method: 'POST',
       headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
          body: JSON.stringify(value),

        }
    );

    const data = await res.json(); 
console.log(data)
    console.log(res);

    if (!res.ok) {
      if(res.status === 400){
        setOpen(true);
      setMessage('You must state the reason for rejection');
      setTitle('Rejection Error');
      setType('error');
      }
      else{
          setOpen(true);
      setMessage('There is an error, please try again');
      setTitle('Rejection Error');
      setType('error');
      }
      

      throw new Error("Server error");
      
    }
    if(action === 'approve'){
        setOpen(true);
      setMessage('You have successfully accepted a transaction. An email will be sent to the user immediately');
      setTitle('Approval Success');
      setType('success');
      setTransactions((prev)=>[...prev, data])
      console.log(transactions);
    }
    else{
        setOpen(true);
      setMessage('You have successfully declined a transaction. An email will be sent to the user immediately');
      setTitle('Decline Success');
      setType('success');
      setTransactions((prev)=>[...prev, data])
      console.log(transactions);
    }
  
  } catch (error) {
    console.log("An error has occurred. please try again", error);
      setOpen(true);
      setMessage('There is an error, please try again');
      setTitle('Rejection Error');
      setType('error');
  }
};

useEffect(() => {
  const fetchAll = async () => {
    await getWallets(); 

    const pending = await getWallets('', '?status=PENDING');
    const confirmed = await getWallets('', '?status=CONFIRMED');
    const rejected = await getWallets('', '?status=REJECTED');

    if (pending) setPendingCount(pending.count);
    if (confirmed) setAcceptedCount(confirmed.count);
    if (rejected) setDeclinedCount(rejected.count);
  };

  fetchAll();
}, []);
console.log(pendingCount);
console.log(acceptedCount);
console.log(declinedCount);
const next =  () =>{
  let nextValue = nexts;
  if(!nextValue){
      setOpen(true);
    setTitle('No next page');
    setMessage('You are on the last page');
    setType('error');
    return;
  }
  const nextQuery = nextValue.slice(51);
  getWallets(nextQuery);
}

const prev =  () =>{
  let prevValue = prevs;
  if(!prevValue){
    setOpen(true);
    setTitle('No previous page');
    setMessage('You are on the first page');
    setType('error');
    return;
  }
  const prevQuery = prevValue.slice(51);
  getWallets(prevQuery);
}
  const handleDecline = (transaction) => {
    setSelectedTransaction(transaction);
    setModalAction('decline');
    setShowModal(true);
  };

  const confirmAction = () => {
    if (modalAction === 'accept') {
    Approve(selectedTransaction.uid, 'approve' );
     console.log('accept');
     setTransactions(transactions.filter((val)=> val.uid !== selectedTransaction.uid))
      
     
     
    } else if (modalAction === 'decline') {
     Approve(selectedTransaction.uid, 'reject', {rejection_reason: declineReason});
setTransactions(transactions.filter((val)=> val.uid !== selectedTransaction.uid));

    }
    setShowModal(false);
    setSelectedTransaction(null);
    setDeclineReason('');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING':
        return 'bg-[#F57C00]/10 text-[#F57C00] border border-[#F57C00]/20';
      case 'CONFIRMED':
        return 'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20';
      case 'REJECTED':
        return 'bg-red-600/10 text-red-600 border border-red-600/20';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
const getRemark = (getval) =>{
  let purposeOfpayemnt;
  switch(getval){
    case 'repay_housing_installment':
      purposeOfpayemnt = 'Housing Repayment'
      break;
    case 'repay_credit_thrift':
      purposeOfpayemnt = 'Loan Repayment';
      break;
    case 'balance_funding':
      purposeOfpayemnt = 'Payment to Balance'
      break;
    case 'credit_thrift_cooperative':
      purposeOfpayemnt = 'Cooperative savings'
      break;
    case 'housing_cooperative':
      purposeOfpayemnt = 'Housing Savings'
      break;
    default:
      purposeOfpayemnt = 'Mode of payment is not specified'
  }
  return purposeOfpayemnt;
}
  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return '⏳';
      case 'accepted':
        return '✓';
      case 'declined':
        return '✗';
      default:
        return '';
    }
  };

  const filteredTransactions = transactions.filter(trans => {
    if (filter === 'all') return true;
    return trans.status === filter.toUpperCase();
  });



  return (
    <div className="bg-[#FDF6EC] min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#003000] mb-2">Transaction Management</h1>
        <p className="text-[#003000]/70">Review and manage all user transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/50 rounded-lg p-4 border border-[#2E7D32]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#003000]/60 text-sm">Total Transactions</p>
              <p className="text-2xl font-bold text-[#003000]">{count}</p>
            </div>
            <div className="w-10 h-10 bg-[#2E7D32]/10 rounded-full flex items-center justify-center">
              <span className="text-[#2E7D32] text-xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-4 border border-[#F57C00]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#003000]/60 text-sm">Pending</p>
              <p className="text-2xl font-bold text-[#F57C00]">{pendingCount}</p>
            </div>
            <div className="w-10 h-10 bg-[#F57C00]/10 rounded-full flex items-center justify-center">
              <span className="text-[#F57C00] text-xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-4 border border-[#2E7D32]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#003000]/60 text-sm">Accepted</p>
              <p className="text-2xl font-bold text-[#2E7D32]">{acceptedCount}</p>
            </div>
            <div className="w-10 h-10 bg-[#2E7D32]/10 rounded-full flex items-center justify-center">
              <span className="text-[#2E7D32] text-xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-4 border border-red-600/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#003000]/60 text-sm">Declined</p>
              <p className="text-2xl font-bold text-red-600">{declinedCount}</p>
            </div>
            <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">❎</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-[#003000]/10 max-sm:flex-col">
        {['all', 'pending', 'confirmed', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2 font-medium transition-all duration-200 ${
              filter === tab
                ? 'text-[#F57C00] border-b-2 border-[#F57C00] max-sm:bg-cooperative-orange max-sm:text-white  max-sm:rounded-2xl'
                : 'text-[#003000]/60 hover:text-[#003000]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="bg-white/50 rounded-lg p-12 text-center border-2 border-dashed border-[#F57C00]/30">
            <div className="flex flex-col items-center gap-3">
              <svg className="w-16 h-16 text-[#F57C00]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-[#003000] text-lg font-medium">No {filter !== 'all' ? filter : ''} transactions found</p>
              <p className="text-[#003000]/60">All transactions will appear here</p>
            </div>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.uid}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#F57C00]"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Transaction Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-[#003000] text-lg">
                      {transaction.userName}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)} {transaction.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-[#003000]/50">
                      ID: {transaction.uid.slice(0,3).toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-[#003000]/60">Amount:</span>
                      <span className="ml-2 font-semibold text-[#F57C00]">₦{transaction.amount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[#003000]/60">Type:</span>
                      <span className="ml-2 text-[#003000] capitalize">{transaction.type}</span>
                    </div>
                    <div>
                      <span className="text-[#003000]/60">Date:</span>
                      <span className="ml-2 text-[#003000]">
                        {new Date(transaction.created_on).toLocaleString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-[#003000]/60">Remark:</span>
                      <span className="ml-2 text-[#2E7D32] font-medium">{getRemark(transaction.remark)}</span>
                    </div>
                    <div>
                      <span className="text-[#003000]/60">Email:</span>
                      <span className="ml-2 text-[#003000] text-sm">{transaction.created_by}</span>
                    </div>
                    {transaction.decline_reason && (
                      <div className="md:col-span-3">
                        <span className="text-red-600/60">Decline reason:</span>
                        <span className="ml-2 text-red-600 text-sm">{transaction.decline_reason}</span>
                      </div>
                    )}
                    {transaction.processed_on && transaction.status !== 'pending' && (
                      <div className="md:col-span-3">
                        <span className="text-[#003000]/60">Processed on:</span>
                        <span className="ml-2 text-[#003000] text-sm">
                          {new Date(transaction.processed_on).toLocaleString('en-GB')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {transaction.status === 'PENDING' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(transaction)}
                      className="px-4 py-2 bg-[#2E7D32] text-white rounded-lg hover:bg-[#1B5E20] transition-all duration-200 flex items-center gap-2"
                    >
                      <span>✓</span> Accept
                    </button>
                    <button
                      onClick={() => handleDecline(transaction)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2"
                    >
                      <span>✗</span> Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div className='flex justify-between'>
          <div className='bg-cooperative-teal px-6 py-2 text-white rounded-3xl' onClick={prev}>Prev</div>
          <div className='bg-cooperative-teal px-6 py-2 text-white rounded-3xl' onClick={next}>Next</div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#003000] mb-4">
              {modalAction === 'accept' ? 'Accept Transaction' : 'Decline Transaction'}
            </h2>
            
            <p className="text-[#003000]/80 mb-4">
              Are you sure you want to {modalAction} the transaction of 
              <span className="font-bold text-[#F57C00]"> ₦{selectedTransaction?.amount.toLocaleString()}</span> 
              from <span className="font-bold">{selectedTransaction?.userName}</span>?
            </p>

            {modalAction === 'decline' && (
              <div className="mb-4">
                <label className="block text-[#003000] text-sm font-medium mb-2">
                  Reason for declining (optional):
                </label>
                <textarea
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  className="w-full px-3 py-2 border border-[#003000]/20 rounded-lg focus:outline-none focus:border-[#F57C00]"
                  rows="3"
                  placeholder="Enter reason for declining this transaction..."
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
                Yes, {modalAction}
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
      {createPortal(<PopupMessage isOpen={open} message={message} title={title} type={type} onClose={()=>{setOpen(false)}}/>, document.body)}
    </div>
  );
};

export default AdminTransactions;