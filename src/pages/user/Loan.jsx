import React, { useEffect, useState } from 'react';
import Complain from '../../components/ui/Complain';
import {
  Users,
  HandCoins,
  BadgeCheck,
  AlertCircle,
  Percent,
  TrendingUp,
  ChevronRight,
  Landmark,
  Shield,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useLoan from '../../hooks/useLoan';
import { createPortal } from 'react-dom';
import { FaBullseye } from 'react-icons/fa';
import PopupForm from '../../components/ui/PopupForm';
import PopupMessage from '../../components/ui/PopupMessage';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="bg-white border border-[#003000]/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: accent + '18' }}
    >
      <Icon size={20} color={accent} strokeWidth={1.8} />
    </div>
    <div className="min-w-0">
      <p className="m-0 text-xs text-[#003000]/70 font-medium tracking-wider uppercase">{label}</p>
      <p className="mt-0.5 text-[17px] font-bold text-[#003000] truncate">{value}</p>
    </div>
  </div>
);

// Active Loan Card Component (inline for seamless integration)
const ActiveLoanCard = ({ activeLoan, formatCurrency, formatDate, progress, repayLoan }) => (
  <div className="w-full mx-auto">
    <div className="rounded-2xl shadow-md overflow-hidden bg-[#FDF6EC] border border-[#003000]/10">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#003000]/10 bg-white/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#003000] tracking-tight">
              Active Loan Details
            </h2>
            <p className="text-sm text-[#003000]/60 mt-1">Track your repayment progress</p>
          </div>
          <div className="text-sm font-medium px-4 py-1.5 rounded-full bg-[#2E7D32] text-[#FDF6EC] shadow-sm self-start sm:self-auto">
            Loan ID: {activeLoan.loan_uid.slice(0, 8)}...
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-[#003000]">Repayment Progress</span>
            <span className="text-[#003000]/70">
              {activeLoan.tenure_months - activeLoan.installments_remaining}/
              {activeLoan.tenure_months} months
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#003000]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F57C00] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2 text-[#003000]/60">
            <span>Disbursed: {formatDate(activeLoan.disbursed_at)}</span>
            <span>{activeLoan.installments_remaining} installments remaining</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl p-4 bg-white border border-[#003000]/10 shadow-sm">
            <p className="text-sm mb-1 text-[#2E7D32] font-medium">Principal Amount</p>
            <p className="text-2xl font-bold text-[#003000]">
              {formatCurrency(activeLoan.principal)}
            </p>
          </div>
          <div className="rounded-xl p-4 bg-white border border-[#003000]/10 shadow-sm">
            <p className="text-sm mb-1 text-[#2E7D32] font-medium">Total Repayable</p>
            <p className="text-2xl font-bold text-[#003000]">
              {formatCurrency(activeLoan.total_repayable)}
            </p>
          </div>
          <div className="rounded-xl p-4 bg-white border border-[#003000]/10 shadow-sm">
            <p className="text-sm mb-1 text-[#2E7D32] font-medium">Total Outstanding</p>
            <p className="text-2xl font-bold text-[#F57C00]">
              {formatCurrency(activeLoan.total_outstanding)}
            </p>
          </div>
        </div>

        {/* Monthly Installment */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-[#2E7D32]/20 text-[#003000] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00]"></span>
            This Month's Installment
          </h3>
          <div className="bg-white rounded-xl p-5 border border-[#003000]/10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p className="text-sm text-[#2E7D32] font-medium mb-1">
                  Installment #{activeLoan.this_month_installment_number} of {activeLoan.tenure_months}
                </p>
                <p className="text-3xl font-bold text-[#003000]">
                  {formatCurrency(activeLoan.this_month_due)}
                </p>
              </div>
              <div className="md:text-right">
                <p className="text-sm text-[#2E7D32] font-medium mb-1">Due Date</p>
                <p className="text-lg font-semibold text-[#F57C00]">
                  {formatDate(activeLoan.this_month_due_date)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className=" w-full py-3 px-4 rounded-xl sm:w-[250px]  font-semibold bg-[#F57C00] text-[#FDF6EC] hover:bg-[#E65100] transition-all duration-200 shadow-sm hover:shadow-md" onClick={repayLoan}> 
            Repay Loan
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Empty State Component
const EmptyLoanState = () => (
  <div className="w-full max-w-4xl mx-auto">
    <div className="rounded-2xl shadow-md p-10 text-center bg-[#FDF6EC] border border-dashed border-[#003000]/20">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F57C00]/10 flex items-center justify-center">
        <HandCoins size={28} className="text-[#F57C00]" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#003000]">No Active Loan</h3>
      <p className="text-[#003000]/70 max-w-sm mx-auto">
        You currently don't have any active loans. Check your eligibility and apply for a loan today.
      </p>
    </div>
  </div>
);

const Loan = () => {
  const { user, getAccessToken, fetchUser } = useAuth();
  const loan = useLoan((s)=>s.loans);
  const fetchLoans = useLoan((s)=>s.fetchLoans);
  const ApplyLoan = useLoan((s)=>s.applyLoan);
  const success = useLoan((s)=>s.success);
  const previewLoan = useLoan((s)=>s.previewLoan);
  const repayLoana = useLoan((s)=>s.repayLoan);
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [openm, setOpenm] = useState(false)
  const closeMessage = useLoan((state)=>state.closeMessage);
  const error = useLoan((state)=>state.type);
  const titlem = useLoan((state)=>state.title);
  const messagem = useLoan((state)=>state.message);
  const opens = useLoan((state)=>state.open);
  const [loanData, setLoanData] = useState(null);
  const [previewInfo, setPreviwInfo] = useState(false)

  useEffect(()=>{
    fetchLoans(getAccessToken())
  }, [])
 
 
  const activeLoan = user?.active_loan;
  const reviewdata = loan.results?.filter((val)=>val.status === 'PENDING') ?? []; 
  const review = reviewdata[0] ?? {}; 
  const progress = activeLoan ? ((activeLoan.tenure_months - activeLoan.installments_remaining) / activeLoan.tenure_months) * 100 : 0;
  
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const applyTheLoan = async () => {
  const theSubit = {
    principal: loanData.principal,
    tenure_months: loanData.tenure_months
  };

  await ApplyLoan(getAccessToken(), theSubit);

  await fetchLoans(getAccessToken());   

  await fetchUser?.();

  setPreviwInfo(false);
};
  const formatCurrency = (amount) => {
    const num = parseFloat(amount || 0);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(num);
  };

  const createdOn = user?.wallet?.created_on ? new Date(user.wallet.created_on) : null;
  const memberSince = createdOn
    ? `${MONTHS[createdOn.getMonth()]} ${createdOn.getFullYear()}`
    : '—';
  const repayLoans = async() =>{
      await repayLoana(getAccessToken(), user?.active_loan?.loan_uid);
  await fetchLoans(getAccessToken());
  fetchUser();
  }
  const memberData = {
    name: user?.user?.full_name || 'Member',
    memberSince,
    memberId: user?.user?.membership_id || '—',
    reason: user?.loan_eligibility?.reason,
    isEligible: user?.loan_eligibility?.is_eligible,
    maxLoan: user?.loan_eligibility?.max_loan_amount || 0,
    interestRate: 0.5,
  };
  
  const loanFormFields = [
    {
      name: "principal",
      label: "Loan Amount",
      type: "number",
      placeholder: "Enter amount",
      required: true,
      min: 1,
      hint: "Enter the amount you want to borrow"
    },
    {
      name: "tenure_months",
      label: "Repayment Duration",
      type: "select",
      required: true,
      options: [
        { label: "11 months", value: "11" },
         { label: "9 months", value: "9" },
        { label: "6 month", value: "6" },
        { label: "3 months", value: "3" },
        { label: "2 months ", value: "2" },
         { label: "1 month ", value: "1" }
      ],
      hint: "Choose how long you will repay the loan"
    }
  ];
  
  const handleSubmit = async (data) => {
   
    const loanCollect = Number(memberData.maxLoan).toFixed(0);
    if(Number(data.principal) > Number(loanCollect)){
      setOpen(false)
      setOpenm(true);
      setTitle('Not Applicable');
      setMessage('Ooops!!! you are not eligible to collect that amount')
      setType('error');
      return
    }

   const previewData =  await previewLoan(getAccessToken(),data);
   setLoanData(previewData);
   setOpen(false)
   setPreviwInfo(true)
  };

  const applyLoan = ()=>{
    setOpen(true)
  }

  const initials = memberData.name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    if(!(user?.profile?.account_number)){
          return (
   <Complain header='You are not eligible for this service'
   message='Please update your account balance to continue'
   link='/user#settings'
   direction='Settings'
    />   
    ); 
    }
    if(user?.active_installment){
         return(
 <Complain header='You are not eligible for this service'
   message='Please pay up your loan to be eligible'
   link='/user#loan'
   direction='loan page'
    />
         )
    }
  
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start md:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#003000] tracking-tight">
            Loan Services
          </h1>
          <p className="mt-1 text-sm text-[#003000]/60">
            Access financing and build long-term financial security
          </p>
        </div>
        
        {reviewdata.length === 1 && (
          <div className="bg-[#FDF6EC] border-l-4 border-l-[#F57C00] border border-[#F57C00]/20 rounded-xl p-4 flex gap-3 items-start shadow-sm">
            <div className="w-9 h-9 rounded-full bg-[#F57C00]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none"
                stroke="#F57C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <circle cx="12" cy="16" r="0.5" fill="#F57C00"/>
              </svg>
            </div>
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#F57C00] bg-[#F57C00]/10 border border-[#F57C00]/30 px-2.5 py-0.5 rounded-full mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00] animate-pulse" />
                Under review
              </span>
              <p className="text-sm font-medium text-[#003000] mb-1">
                Your loan application is being reviewed
              </p>
              <p className="text-xs text-[#003000]/60 leading-relaxed mb-3">
                We've received your application and our team is currently reviewing it.
                You'll be notified via email once a decision has been made. This usually takes 1–3 business days.
              </p>
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-[11px] text-[#003000]/40">Amount requested</p>
                  <p className="text-sm font-medium text-[#003000]">
                    ₦{parseFloat(review?.principal).toLocaleString() ?? 0}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#003000]/40">Tenure</p>
                  <p className="text-sm font-medium text-[#003000]">{review?.tenure_months} months</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#003000]/40">Submitted</p>
                  <p className="text-sm font-medium text-[#003000]">
                    {new Date(review?.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <button 
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 shadow-sm ${
            memberData.isEligible && reviewdata.length !== 1 
              ? 'bg-[#2E7D32] hover:bg-[#1B5E20] cursor-pointer text-white' 
              : 'bg-[#003000]/20 cursor-not-allowed text-[#003000]/40'
          } max-sm:justify-center`}
          disabled={!memberData.isEligible || reviewdata.length === 1}
          onClick={applyLoan}
        >
          <HandCoins size={16}/>
          Request Loan
        </button>
      </div>

      {/* Member Hero Card */}
      <div
        className="rounded-2xl p-6 md:p-7 relative overflow-hidden shadow-lg"
        style={{ background: 'linear-gradient(135deg, #003000 0%, #1B5E20 60%, #2E7D32 100%)' }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-[60px] right-[60px] w-[120px] h-[120px] rounded-full bg-white/4" />

        <div className="flex flex-wrap gap-6 items-start justify-between relative z-10">
          <div className="flex gap-4 items-start">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0 border border-white/30 shadow-md max-sm:hidden"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)' }}
            >
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {memberData.name}
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-1">
                <span className="text-[13px] text-white/70 flex items-center gap-1">
                  <Clock size={12} /> Member since {memberData.memberSince}
                </span>
                <span className="text-[13px] text-white/70">
                  ID: <strong className="text-white">{memberData.memberId}</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 items-center">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm"
                  style={{
                    background: memberData.isEligible ? 'rgba(76,175,80,0.25)' : 'rgba(244,67,54,0.2)',
                    color: memberData.isEligible ? '#A5D6A7' : '#EF9A9A',
                    borderColor: memberData.isEligible ? 'rgba(76,175,80,0.4)' : 'rgba(244,67,54,0.35)',
                  }}
                >
                  {memberData.isEligible ? <BadgeCheck size={13} /> : <AlertCircle size={13} />}
                  {memberData.isEligible ? 'Loan Eligible' : 'Not Eligible'}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                  style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}
                >
                  <Percent size={12} />
                  {memberData.interestRate}% Interest Rate
                </span>
              </div>
              {memberData.reason && (
                <p className="mt-2 text-xs text-white/60 italic max-w-[340px]">
                  {memberData.reason}
                </p>
              )}
            </div>
          </div>

          <div
            className="rounded-xl px-5 py-4 min-w-[160px] border border-white/20 shadow-md max-sm:w-full"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
          >
            <p className="text-[11px] uppercase tracking-wide text-white/65 font-semibold">
              Max Loan Amount
            </p>
            <p className="mt-1.5 text-2xl font-extrabold text-white tracking-tight">
              ₦{Number(memberData.maxLoan).toLocaleString('en-NG')}
            </p>
            <p className="mt-1 text-[11px] text-white/50">
              Subject to review
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid  gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <StatCard icon={Landmark} label="Loan Limit" value={`₦${Number(memberData.maxLoan).toLocaleString('en-NG')}`} accent="#2E7D32" />
        <StatCard icon={Percent} label="Interest Rate" value={`${memberData.interestRate}% / year`} accent="#F57C00" />
        <StatCard icon={Shield} label="Eligibility" value={memberData.isEligible ? 'Qualified' : 'Pending'} accent={memberData.isEligible ? '#2E7D32' : '#d32f2f'} />
        <StatCard icon={TrendingUp} label="Member Status" value="Active" accent="#1565C0" />
      </div>

      {/* How It Works */}
      <div className="bg-white border border-[#003000]/10 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-[#003000] mb-5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F57C00]"></span>
          How to Apply
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Check Eligibility', desc: 'Your status is automatically calculated based on savings and membership.' },
            { step: '02', title: 'Submit Request', desc: 'Click "Request Loan" and fill in the amount and purpose.' },
            { step: '03', title: 'Await Approval', desc: 'Our credit team reviews and responds within 48 hours.' },
            { step: '04', title: 'Receive Funds', desc: 'Approved funds are disbursed directly to your wallet.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-3 items-start">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 shadow-sm"
                style={{ background: '#2E7D3210', border: '1.5px solid #2E7D3240', color: '#2E7D32' }}
              >
                {item.step}
              </div>
              <div>
                <p className="font-bold text-sm text-[#003000]">{item.title}</p>
                <p className="text-xs text-[#003000]/60 leading-relaxed mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Loan Section */}
      {activeLoan ? (
        <ActiveLoanCard 
          activeLoan={activeLoan} 
          formatCurrency={formatCurrency} 
          formatDate={formatDate} 
          progress={progress}
          repayLoan = {repayLoans}
        />
      ) : (
        <EmptyLoanState />
      )}

      {/* Popups */}
      {createPortal(<PopupForm
        title="Apply for Loan"
        formfield={loanFormFields}
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        submitLabel="Preview Loan"
      />, document.body)}
      
      {createPortal(<PopupMessage isOpen={openm} message={message} type={type} onClose={()=>setOpenm(false)} title={title} />, document.body)}
      
      {createPortal(<PopupMessage isOpen={opens} message={messagem} title={titlem} type={error} onClose={()=>closeMessage()}/>, document.body)}
        {previewInfo && createPortal( <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-[#FDF6EC] rounded-xl shadow-xl p-6">

        <h2 className="text-xl font-semibold text-[#003000] border-b pb-3 mb-4">
          Loan Summary
        </h2>

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span>Monthly Installment</span>
            <span className="font-semibold text-[#2E7D32]">
              ₦{loanData.monthly_installment?.toLocaleString() || 0}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Interest Rate</span>
            <span className="font-semibold text-[#2E7D32]">
              0.5% per annum
            </span>
          </div>

          <div className="flex justify-between">
            <span>Principal</span>
            <span className="font-semibold text-[#2E7D32]">
              ₦{loanData.principal?.toLocaleString() || 0}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Tenure</span>
            <span className="font-semibold text-[#2E7D32]">
              {loanData.tenure_months} months
            </span>
          </div>

          <div className="flex justify-between pt-2 border-t">
            <span className="font-semibold">Total Repayable</span>
            <span className="font-bold text-[#F57C00]">
              ₦{loanData.total_repayable?.toLocaleString() || 0}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            className="flex-1 py-2 rounded-lg bg-gray-200"
            onClick={()=>setPreviwInfo(false)}
          >
          
            Cancel
          </button>

          <button
            onClick={() => {
              applyTheLoan();
            }}
            className="flex-1 py-2 rounded-lg bg-[#F57C00] text-white"
          >
            Apply Loan
          </button>
        </div>
      </div>
    </div>
  ,document.body)}
    </div>
  );
};

export default Loan;