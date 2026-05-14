import React, { useEffect, useState } from 'react';
import {
  Home, BadgeCheck, AlertCircle, Percent, TrendingUp, Shield,
  Clock, Landmark, MapPin, Bed, Bath, Square, ChevronRight,
  Building2, HandCoins, FileCheck, Wallet, CheckCircle,
  Calendar, CreditCard,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Complain from '../../components/ui/Complain';
import { usePurchase } from '../../context/PurchaseProvider';
import { createPortal } from 'react-dom';
import PopupMessage from '../../components/ui/PopupMessage';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="bg-white border border-[#003000]/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: accent + '18' }}>
      <Icon size={20} color={accent} strokeWidth={1.8} />
    </div>
    <div className="min-w-0">
      <p className="m-0 text-xs text-[#003000]/70 font-medium tracking-wider uppercase">{label}</p>
      <p className="mt-0.5 text-[17px] font-bold text-[#003000] truncate">{value}</p>
    </div>
  </div>
);

const ActiveHousingLoanCard = ({ activeLoan, formatCurrency, formatDate, progress }) => (
  <div className="w-full mx-auto">
    <div className="rounded-2xl shadow-md overflow-hidden bg-[#FDF6EC] border border-[#003000]/10">
      <div className="px-6 py-5 border-b border-[#003000]/10 bg-white/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#003000] tracking-tight">
              Active Housing Loan
            </h2>
            <p className="text-sm text-[#003000]/60 mt-1">Track your mortgage repayment</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 bg-white rounded-xl p-4 border border-[#003000]/10 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-xl bg-[#F57C00]/10 flex items-center justify-center shrink-0">
            <Home size={24} className="text-[#F57C00]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#003000] text-base break-words">{activeLoan.listing_title || 'Property Title'}</p>
            <div className="flex flex-wrap gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-[#003000]/60">
                <MapPin size={11} /> {activeLoan.listing_address || 'Address not set'}
              </span>
            </div>
          </div>
          <div className="shrink-0">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20">
              Residential
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-[#003000]">Repayment Progress</span>
            <span className="text-[#003000]/70">
              {activeLoan.tenure_months - activeLoan.installments_remaining}/
              {activeLoan.tenure_months} months
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#003000]/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#F57C00] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-xs mt-2 text-[#003000]/60">
            <span>Approved: {formatDate(activeLoan.approved_at)}</span>
            <span>{activeLoan.installments_remaining} installments remaining</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl p-4 bg-white border border-[#003000]/10 shadow-sm">
            <p className="text-sm mb-1 text-[#2E7D32] font-medium">Property Value</p>
            <p className="max-custom-1000:text-[1.3rem] text-2xl font-bold text-[#003000]">
              {formatCurrency(activeLoan.property_price)}
            </p>
          </div>
          <div className="rounded-xl p-4 bg-white border border-[#003000]/10 shadow-sm">
            <p className="text-sm mb-1 text-[#2E7D32] font-medium">Total Repayable</p>
            <p className="text-2xl max-custom-1000:text-[1.3rem] font-bold text-[#003000]">
              {formatCurrency(activeLoan.total_repayable)}
            </p>
          </div>
          <div className="rounded-xl p-4 bg-white border border-[#003000]/10 shadow-sm">
            <p className="text-sm mb-1 text-[#2E7D32] font-medium">Outstanding Balance</p>
            <p className="text-2xl font-bold text-[#F57C00] max-custom-1000:text-[1.3rem]">
              {formatCurrency(activeLoan.total_outstanding)}
            </p>
          </div>
        </div>

        {/* Initial Deposit + Monthly Installment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl p-4 bg-white border border-[#003000]/10 shadow-sm">
            <p className="text-sm mb-1 text-[#2E7D32] font-medium">Initial Deposit</p>
            <p className="text-2xl font-bold text-[#003000]">
              {formatCurrency(activeLoan.initial_deposit)}
            </p>
          </div>
          <div className="rounded-xl p-4 bg-white border border-[#003000]/10 shadow-sm">
            <p className="text-sm mb-1 text-[#2E7D32] font-medium">Monthly Installment</p>
            <p className="text-2xl font-bold text-[#003000]">
              {formatCurrency(activeLoan.monthly_installment)}
            </p>
          </div>
        </div>

        {/* This Month's Installment */}
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
                <p className="text-3xl max-custom-1000:text-[1.6rem] font-bold text-[#003000]">
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
      </div>
    </div>
  </div>
);

const EmptyHousingLoanState = () => (
  <div className="w-full max-w-4xl mx-auto">
    <div className="rounded-2xl shadow-md p-10 text-center bg-[#FDF6EC] border border-dashed border-[#003000]/20">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F57C00]/10 flex items-center justify-center">
        <Home size={28} className="text-[#F57C00]" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#003000]">No Active Housing Loan</h3>
      <p className="text-[#003000]/70 max-w-sm mx-auto">
        You don't have an active housing loan. Check your eligibility and apply to own your dream home today.
      </p>
    </div>
  </div>
);

/* ── Banner shown when a PENDING OUTRIGHT purchase exists ── */
const ApplicationUnderReview = ({ review }) => (
  <div className="bg-[#FDF6EC] border-l-4 border-l-[#F57C00] border border-[#F57C00]/20 rounded-xl p-5 flex gap-4 items-start shadow-sm w-full">
    <div className="w-10 h-10 rounded-full bg-[#F57C00]/10 flex items-center justify-center flex-shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#F57C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <circle cx="12" cy="16" r="0.5" fill="#F57C00"/>
      </svg>
    </div>
    <div className="flex-1">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#F57C00] bg-[#F57C00]/10 border border-[#F57C00]/30 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00] animate-pulse" />
          Under Review
        </span>
        <p className="text-xs text-[#003000]/50">
          Submitted: {new Date(review?.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>
      <p className="text-sm font-semibold text-[#003000] mb-1">
        Your purchase application is being reviewed
      </p>
      <p className="text-xs text-[#003000]/60 leading-relaxed mb-3">
        We've received your application for <span className="font-semibold text-[#003000]">"{review?.listing_title}"</span> and our team is currently reviewing it.
        You'll be notified once a decision has been made. This usually takes 1–3 business days.
      </p>
      <div className="flex flex-wrap gap-5 pt-2 border-t border-[#003000]/5">
        <div>
          <p className="text-[10px] text-[#003000]/40 uppercase tracking-wide">Property Price</p>
          <p className="text-sm font-semibold text-[#003000]">
            ₦{parseFloat(review?.property_price || 0).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[#003000]/40 uppercase tracking-wide">Purchase Type</p>
          <p className="text-sm font-semibold text-[#003000]">{review?.purchase_type}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#003000]/40 uppercase tracking-wide">Property Type</p>
          <p className="text-sm font-semibold text-[#003000] capitalize">{review?.property_type}</p>
        </div>
      </div>
    </div>
  </div>
);

const HowItWorksSection = () => {
  const steps = [
    { icon: Building2, title: "Browse Properties", description: "Visit our landing page and select either 'Buy Apartment' or 'Buy Land'. Look for properties marked with installment payment options.", details: "Only properties with installment plans are eligible for housing loans." },
    { icon: FileCheck, title: "Review Loan Terms", description: "Click 'Continue Purchase' to see a detailed preview of your loan terms, including interest rates, monthly payments, and total repayment amount.", details: "Review all terms carefully before proceeding." },
    { icon: CreditCard, title: "Make Initial Deposit", description: "Click 'Pay' to make your initial deposit. The admin will deduct the required amount, and the remaining balance will be structured into installments.", details: "Your payment will show as 'pending' until admin approval." },
    { icon: CheckCircle, title: "Admin Approval", description: "Once admin approves, you'll receive an email confirmation. If rejected, you'll also be notified and can check your application history.", details: "Approval typically takes 1-2 business days." },
  ];

  return (
    <div className="bg-white border border-[#003000]/10 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h3 className="text-lg font-bold text-[#003000] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F57C00]"></span>
          How to Get a Housing Loan
        </h3>
        <div className="text-xs text-[#2E7D32] bg-[#2E7D32]/10 px-3 py-1 rounded-full">4 simple steps</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[#F57C00] text-white flex items-center justify-center text-xs font-bold shadow-md z-10">
              {index + 1}
            </div>
            <div className="pt-4 pl-2 pr-3 pb-4 bg-[#FDF6EC] rounded-xl border border-[#003000]/10 hover:shadow-md transition-all duration-200 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#F57C00]/10 flex items-center justify-center mb-3">
                <step.icon size={20} className="text-[#F57C00]" />
              </div>
              <h4 className="font-bold text-[#003000] text-sm mb-2">{step.title}</h4>
              <p className="text-xs text-[#003000]/70 leading-relaxed mb-2">{step.description}</p>
              <p className="text-[10px] text-[#003000]/40 italic mt-1 pt-1 border-t border-[#003000]/5">{step.details}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-[#003000]/10"></div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-[#003000]/5 flex items-center gap-2 text-xs text-[#003000]/60 bg-[#003000]/5 p-3 rounded-lg">
        <AlertCircle size={14} className="text-[#F57C00]" />
        <span>Make sure your wallet is funded before applying. You can check your eligibility status below.</span>
      </div>
    </div>
  );
};

const HousingLoan = () => {
  const { user, fetchUser, getAccessToken } = useAuth();
  const [pendingPurchase, setPendingPurchase] = useState(null); // ← stores the pending OUTRIGHT purchase
  const { repayLoan, title, message, open, type, setOpen, getPurchase } = usePurchase();

  const activeLoan = user?.active_installment;

  const progress = activeLoan
    ? ((activeLoan.tenure_months - activeLoan.installments_remaining) / activeLoan.tenure_months) * 100
    : 0;

  /* ── Fetch purchases and find pending OUTRIGHT one ── */
  useEffect(() => {
    const fetchPurchases = async () => {
      const purchases = await getPurchase();
     
      if (!purchases) return;
      const pending = purchases.find(
        (val) => val.status === 'PENDING' && val.purchase_type === 'INSTALLMENT'
      );
      setPendingPurchase(pending ?? null);
    };
    fetchPurchases();
  }, [getAccessToken]);

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const repayment = async () => {
    await repayLoan(user?.active_installment?.purchase_uid);
    await fetchUser();
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }).format(parseFloat(amount || 0));

  const createdOn = user?.wallet?.created_on ? new Date(user.wallet.created_on) : null;
  const memberSince = createdOn ? `${MONTHS[createdOn.getMonth()]} ${createdOn.getFullYear()}` : '—';

  const memberData = {
    name: user?.user?.full_name || 'Member',
    memberSince,
    memberId: user?.user?.membership_id || '—',
    reason: user?.loan_eligibility?.reason,
    isEligible: user?.loan_eligibility?.is_eligible,
    maxLoan: user?.loan_eligibility?.max_loan_amount || 0,
    interestRate: 0.5,
  };

  if (!user?.profile?.account_number) {
    return (
      <Complain
        header='You are not eligible for this service'
        message='Please update your account balance to continue'
        link='/user#settings'
        direction='Settings'
      />
    );
  }

  if (user?.active_loan) {
    return (
      <Complain
        header='You are not eligible for this service'
        message='Please pay up your loan to be eligible'
        link='/user#credit'
        direction='Repay Loan'
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start md:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#003000] tracking-tight">Housing Loan</h1>
          <p className="mt-1 text-sm text-[#003000]/60">Finance your dream home with flexible mortgage options</p>
        </div>

        <button
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 shadow-sm bg-[#2E7D32] hover:bg-[#1B5E20] cursor-pointer text-white max-sm:justify-center${!user?.active_installment? 'cursor-not-allowed': 'cursor-pointer'} ${!user?.active_installment? 'bg-gray-500/40': ''}`}
          disabled={!user?.active_installment}
          onClick={()=>repayment()}
        >
          <Home size={16} />
          Repay Loan
        </button>
      </div>

      {/* ── Pending purchase review banner — only shown when pendingPurchase exists ── */}
      {pendingPurchase && <ApplicationUnderReview review={pendingPurchase} />}

      {/* ── Stat cards ── */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <StatCard icon={Percent}   label="Interest Rate" value={`${memberData.interestRate}% / year`} accent="#F57C00" />
        <StatCard icon={Calendar}  label="Member Since"  value={memberSince}                          accent="#F57C00" />
      </div>

      <HowItWorksSection />

      {activeLoan ? (
        <ActiveHousingLoanCard
          activeLoan={activeLoan}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          progress={progress}
        />
      ) : (
        <EmptyHousingLoanState />
      )}

      {!activeLoan && (
        <div className="bg-[#FDF6EC] rounded-xl p-4 border border-[#003000]/10">
          <div className="flex gap-3">
            <Shield size={18} className="text-[#2E7D32] shrink-0 mt-0.5" />
            <div className="text-xs text-[#003000]/70">
              <p className="font-medium text-[#003000] mb-1">Important Information</p>
              <p>All housing loans are subject to approval based on eligibility criteria. Interest rate of 0.5% per year is fixed for the loan tenure. Early repayment options available with no penalties.</p>
            </div>
          </div>
        </div>
      )}

      {createPortal(
        <PopupMessage title={title} message={message} isOpen={open} type={type} onClose={() => setOpen(false)} />,
        document.body
      )}
    </div>
  );
};

export default HousingLoan;