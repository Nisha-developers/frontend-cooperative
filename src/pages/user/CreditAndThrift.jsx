import React, { useEffect, useMemo, useState } from 'react';
import { 
  Users,
  DollarSign,
  History,
  TrendingUp,
  PiggyBank,
  Target,
  Clock,
  Calendar,
  CreditCard,
  ArrowRight,
  Building,
  Award,
  Wallet,
  Plus,
  Download,
  Filter,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Share2,
  Shield,
  Heart,
  MessageCircle,
  Bell,
  HandCoins,
  Landmark,
  Receipt,
  Percent,
  FileText,
  Scale,
  BadgeCheck,
  Clock as ClockIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useWalletStore from '../../hooks/useWallet';
import { createPortal } from 'react-dom';
import PopupForm from '../../components/ui/PopupForm';
import PopupMessage from '../../components/ui/PopupMessage';

const CreditAndThrift = () => {
  const [showLoanRequestModal, setShowLoanRequestModal] = useState(false);
  const [showDeductibleModal, setShowDeductibleModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [getcreditTrans, setcreditTransaction] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
   const credit = useWalletStore(s => s. fundWallet);
  const [open, setOpen] = useState(false);
  const [isCredit, setIscredit] = useState(false);
const [visibleInfo, setVisibleInfo] = useState([]);
  const getTrasacion = useWalletStore((state) => state.getTransactions);
  const transaction = useWalletStore((state) => state.transactions);
  const { user, getAccessToken } = useAuth();
   const message = useWalletStore(s => s.message);
  const title = useWalletStore(s => s.title);
  const error = useWalletStore(s => s.error);
  const openS = useWalletStore(s => s.open);
  const closemessage = useWalletStore(s => s.closeMessage);
  const [errorms, seterrorms] = useState('');
  const [titlems, settitles] = useState('');
  const [openms, setopenms] = useState(false);
  const [messagems, setmessagems] = useState('');
 const debit = useWalletStore((s)=>s.withdraw);

  const MONTHS = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];

  useEffect(() => {
    getTrasacion(getAccessToken());
  }, []);

  useMemo(() => {
    const creditAndThrift = transaction.transactions;
    if (creditAndThrift) {
      const filteredTransaction = creditAndThrift.filter(
        (val) => val.remark === 'credit_thrift_cooperative' && val.status === 'CONFIRMED'
      );
      setcreditTransaction(filteredTransaction);
    }
  }, [transaction.transactions]);
const creditTransaction = getcreditTrans.filter((val)=>val.type === 'CREDIT').reduce((totalvalue, val)=>totalvalue += Number(val.amount), 0);
const debitTransaction = getcreditTrans.filter((val)=>val.type === 'DEBIT').reduce((totalvalue, val)=>totalvalue += Number(val.amount), 0);

  const creditAndThriftBalance = creditTransaction - debitTransaction;

  const interest = (creditAndThriftBalance * 0.5 * 1) / 100;
  const withdrawal = [ {
      name: "amount",
      label: "Amount",
      type: "number",
      required: true,
      min: 100,
      placeholder: "Enter amount (e.g 5000)",
      hint: "Minimum amount is ₦100"
    }]
const withdraw = () =>{
   setOpen(true);
     setIscredit(false);
  setVisibleInfo(withdrawal)
} 
const handleWithdrawal = (data) =>{
setOpen(false);

const eligible = loanEligibility('', 0, creditAndThriftBalance)[2];
console.log(eligible);

if(data.amount > creditAndThriftBalance){
  setopenms(true);
  settitles('Debit Error');
  setmessagems('Insufficient Funds');
  seterrorms('error');
  return
}
if(!eligible){
   setopenms(true);
  settitles('Debit Error');
  setmessagems('You must at least have upto 50,000 ');
  seterrorms('error');
  return
}
  debit({amount: data.amount, source: 'WITHDRAWAL', remark: `credit_thrift_cooperative`}, getAccessToken());
}

  const memberSince =
    MONTHS[new Date(user?.wallet.created_on).getMonth() + 1] +
    ' ' +
    new Date(user?.wallet?.created_on).getFullYear();

  const memberData = {
    name: user?.user?.full_name,
    memberSince: memberSince,
    memberId: user?.user?.membership_id,
    creditScore: 780,
    loanEligibility: loanEligibility(user?.wallet.created_on, creditAndThriftBalance)[0],
    reason: loanEligibility(user?.wallet.created_on, creditAndThriftBalance)[1],
    maxLoanAmount: loanEligibility(user?.wallet.created_on, creditAndThriftBalance)[2] ?(creditAndThriftBalance + interest) * 2 : 0,
  };
 function loanEligibility(datecreation, balance, amount = 0){
  let reason = '';
 const dateCreated = new Date(datecreation);
dateCreated.setMonth(dateCreated.getMonth() + 6);
  
const today = new Date().getTime();
  const isEligible = today >= dateCreated && balance >= 500000;
  let iseligible = false;
  if(amount > 50000){
    iseligible = true;
  }
  else if(today <= dateCreated && balance <= 500000){
    reason = 'Not a member for 6 months and balance is not sufficient.';
    iseligible = false
  }
  else if(today <= dateCreated){
    reason = 'Not a member for 6 months.';
    iseligible = false
  }
  else if(balance < 500000){
    reason = 'Balance is not sufficient.';
    iseligible = false
  }
  else{
    reason = 'You are eligible for a loan';
    iseligible = true
  }

  return [isEligible ? 'Eligible' : 'Not Eligible', reason, iseligible];
 }
 const paymentForm = [
    {
      name: "amount",
      label: "Amount",
      type: "number",
      required: true,
      min: 100,
      placeholder: "Enter amount (e.g 5000)",
      hint: "Minimum amount is ₦100"
    },
    {
      name: "source",
      label: "Mode of Payment",
      type: "radio",
      required: true,
      options: [
        { label: "Cash", value: "cash" },
        { label: "Bank Transfer", value: "transfer" }
      ]
    }
  ];
  const receiptField =[ {
    name: "receipt",
    label: "Upload Receipt",
    type: "file",
    required: true,
    accept: "image/png, image/jpeg, image/webp, application/pdf",
    hint: "Upload proof of payment (image or PDF)"
  }];
const handleSubmit = (data) =>{
  setOpen(false);
  console.log(data);
//   if(data.source === 'transfer'){
//   setisOpen(true)
//   setvisibleField(receiptField);
// }
data.source = "USER_TOPUP"

const payload = {
    ...data,
    remark: "credit_thrift_cooperative"
  };

credit(payload, getAccessToken())


} 
const addSavings = () =>{
  setIscredit(true);
  setOpen(true);
  setVisibleInfo(paymentForm)
}


  const thriftBalance = {
    totalSavings: creditAndThriftBalance,
    accruedInterest: interest,
    availableBalance: creditAndThriftBalance + interest,
    pendingWithdrawals: 5000,
    nextContributionDate: '2024-04-15',
    interestRate: 0.5,
  };

  const deductibles = {
    monthlyMaintenance: 250,
    insurance: 500,
    loanProcessingFee: 1500,
    withdrawalFee: 0.5,
    latePaymentFee: 1000,
    totalDeductiblesThisMonth: 750,
    totalDeductiblesYear: 4850,
    nextDeductibleDate: '2024-04-01',
  };

  

  // ✅ Map real API transactions to display format
  const transactionHistory = useMemo(() => {
    return getcreditTrans.map((tx) => ({
      id: tx.uid,
      type: tx.remark === 'credit_thrift_cooperative' ? 'Thrift Deposit' : tx.remark,
      amount: tx.type === 'DEBIT' ? -Number(tx.amount) : Number(tx.amount),
      date: new Date(tx.created_on).toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      rawDate: tx.created_on,
      status: tx.status === 'CONFIRMED' ? 'completed' : tx.status.toLowerCase(),
      method: tx.source === 'USER_TOPUP' ? 'Bank Transfer' : tx.source,
      reference: tx.reference,
      category: tx.type === 'CREDIT' ? 'deposit' : 'deductible',
      deductibles: 0,
      confirmedBy: tx.confirmed_by,
      fullName: tx.full_name,
    }));
  }, [getcreditTrans]);

  // ✅ Compute running balance client-side
  const transactionHistoryWithBalance = useMemo(() => {
    let running = 0;
    return [...transactionHistory]
      .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate))
      .map((tx) => {
        running += tx.amount;
        return { ...tx, balance: running };
      })
      .reverse();
  }, [transactionHistory]);

  // ✅ Fixed period filter (no more date mutation bug)
  const getFilteredTransactions = () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);
    const ninetyDaysAgo = new Date(Date.now() - 90 * 86400000);

    let filtered = transactionHistoryWithBalance;

    if (selectedPeriod === '30days') {
      filtered = filtered.filter((t) => new Date(t.rawDate) >= thirtyDaysAgo);
    } else if (selectedPeriod === '90days') {
      filtered = filtered.filter((t) => new Date(t.rawDate) >= ninetyDaysAgo);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((t) => t.category === selectedType);
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();

  const totalDeposits = filteredTransactions
    .filter((t) => t.category === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDeductibles = filteredTransactions
    .filter((t) => t.category === 'deductible')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalInterest = filteredTransactions
    .filter((t) => t.category === 'interest')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalLoanPayments = filteredTransactions
    .filter((t) => t.category === 'loan_payment')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cooperative-dark">Credit & Thrift</h1>
          <p className="text-cooperative-dark/70 mt-2">Save regularly, access loans, build financial security</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLoanRequestModal(true)}
            className="px-4 py-2 border border-cooperative-teal text-cooperative-teal rounded-lg hover:bg-cooperative-teal/5 transition-colors font-medium flex items-center gap-2"
          >
            <HandCoins className="w-4 h-4" />
            Request Loan
          </button>
        </div>
      </div>

      {/* Member Info Card */}
      <div className="bg-gradient-to-r from-cooperative-teal to-cooperative-teal/80 text-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between ">
          <div className="flex items-center gap-4 max-sm:flex-col">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{memberData.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-white/80 text-sm max-sm:flex-col max-sm:items-start">
                <span>Member since {memberData.memberSince}</span>
                <span className='max-sm:hidden'>•</span>
                <span>ID: {memberData.memberId}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-white/20 px-2 py-1 rounded-lg text-xs ">
                  {memberData.loanEligibility}
                </span>
                 
              </div>
              <div className='italic text-[13px] text-gray-200'>{memberData.reason}</div> 
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4 max-sm:w-full">
            <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm  max-sm:w-full ">
              <span className="text-sm text-white/80">Eligible Loan</span>
              <div className="font-bold">₦{memberData.maxLoanAmount.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-cooperative-dark to-cooperative-dark/80 text-white rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <span className="text-white/60 text-sm">Thrift Savings Balance</span>
              <div className="text-5xl font-bold mt-2">₦{thriftBalance.availableBalance.toLocaleString()}</div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-white/80">
                  <PiggyBank className="w-4 h-4" />
                  <span className="text-sm">Principal: ₦{thriftBalance.totalSavings.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-white/80">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Interest: ₦{thriftBalance.accruedInterest.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="border-l-2 max-md:border-0 max-md:pl-0 border-cyan-100 pl-5">
              <span className="text-white/60 text-sm">Active Loans</span>
              <div className="text-5xl font-bold mt-2">₦0:00</div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-white/80">
                  <PiggyBank className="w-4 h-4" />
                  <span className="text-sm">Principal: ₦0:00</span>
                </div>
                <div className="flex items-center gap-1 text-white/80">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Interest: ₦0:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-0 flex gap-3 max-sm:flex-col max-sm:w-full">
            <button onClick={addSavings}
              className="px-6 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors font-medium flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Savings
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-colors font-medium flex items-center gap-2" onClick={withdraw}>
              <Wallet className="w-5 h-5" />
              Withdraw
              
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          <div>
            <span className="text-white/60 text-xs">Interest Rate</span>
            <div className="text-xl font-bold text-white mt-1">{thriftBalance.interestRate}%</div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6  max-sm:flex-col">
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-cooperative-teal" />
            <h2 className="text-2xl font-bold text-cooperative-dark">Transaction History</h2>
          </div>

          {/* ✅ Period & Type Filters */}
          <div className="flex items-center gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-sm border border-cooperative-dark/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cooperative-teal/20 text-cooperative-dark"
            >
              <option value="all">All Time</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-sm border border-cooperative-dark/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cooperative-teal/20 text-cooperative-dark"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposits</option>
              <option value="deductible">Deductibles</option>
            </select>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Total Deposits</span>
            <div className="text-xl font-bold text-cooperative-teal mt-1">
              ₦{totalDeposits.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Total Deductibles</span>
            <div className="text-xl font-bold text-cooperative-orange mt-1">
              ₦{totalDeductibles.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Interest Earned</span>
            <div className="text-xl font-bold text-cooperative-teal mt-1">
              ₦{interest.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Loan Payments</span>
            <div className="text-xl font-bold text-cooperative-dark mt-1">
              ₦{totalLoanPayments.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-cooperative-dark/40">
              <History className="w-12 h-12 mb-3" />
              <p className="text-lg font-medium">No transactions found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cooperative-cream">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Reference</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Method</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Balance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cooperative-dark/5">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-cooperative-cream/30 transition-colors">
                      <td className="px-6 py-4 text-cooperative-dark/70">{transaction.date}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          transaction.category === 'deposit'
                            ? 'bg-cooperative-teal/10 text-cooperative-teal'
                            : transaction.category === 'deductible'
                            ? 'bg-red-100 text-red-600'
                            : transaction.category === 'loan'
                            ? 'bg-blue-100 text-blue-700'
                            : transaction.category === 'loan_payment'
                            ? 'bg-purple-100 text-purple-700'
                            : transaction.category === 'interest'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-cooperative-orange/10 text-cooperative-orange'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-cooperative-dark/70 font-mono text-xs">
                        {transaction.reference}
                      </td>
                      <td className="px-6 py-4 text-cooperative-dark/70">{transaction.method}</td>
                      <td className={`px-6 py-4 font-semibold ${
                        transaction.amount < 0 ? 'text-red-600' : 'text-cooperative-dark'
                      }`}>
                        {transaction.amount < 0 ? '-' : '+'}₦{Math.abs(transaction.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-cooperative-dark/70">
                        ₦{transaction.balance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" />
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Loan Request Modal */}
      {showLoanRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-spinIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-cooperative-dark">Request a Loan</h3>
              <button
                onClick={() => setShowLoanRequestModal(false)}
                className="p-2 hover:bg-cooperative-cream rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-cooperative-teal/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-cooperative-dark/60">Eligible Amount</span>
                  <span className="text-xl font-bold text-cooperative-teal">₦{memberData.maxLoanAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-cooperative-teal" />
                  <span className="text-xs text-cooperative-dark/70">You are pre-approved based on your savings</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-cooperative-dark mb-2 block">Loan Type</label>
                <select className="w-full p-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20">
                  <option>Thrift Loan (8.5%)</option>
                  <option>Emergency Loan (6.0%)</option>
                  <option>Business Investment (7.5%)</option>
                  <option>Education Loan (5.5%)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-cooperative-dark mb-2 block">Loan Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-cooperative-dark mb-2 block">Duration (months)</label>
                <select className="w-full p-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20">
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>12 months</option>
                  <option>18 months</option>
                  <option>24 months</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-cooperative-dark mb-2 block">Purpose of Loan</label>
                <textarea
                  rows="3"
                  placeholder="Brief description of loan purpose"
                  className="w-full p-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
                />
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Loan Terms</h4>
                    <p className="text-xs text-yellow-700 mt-1">
                      By submitting this application, you agree to the loan terms including
                      interest rate, processing fee, and repayment schedule.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={() => setShowLoanRequestModal(false)}
                  className="px-4 py-3 border border-cooperative-dark/20 text-cooperative-dark rounded-xl hover:bg-cooperative-cream transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {createPortal(<PopupForm submitLabel='Confirm Payment' title='Credit and thrift payment' formfield={visibleInfo} onSubmit={isCredit? handleSubmit : handleWithdrawal} isOpen={open} onClose={()=>{setOpen(false)}}/>,document.body)}
         {createPortal(
      <PopupMessage isOpen={openS} title={title} message={message} type={error} onClose={()=>closemessage()}/>
     , document.body)}
     {createPortal(
       <PopupMessage isOpen={openms} title={titlems} message={messagems} type={errorms} onClose={()=>setopenms(false)}/>
     , document.body)}
    </div>
  );
};

export default CreditAndThrift;