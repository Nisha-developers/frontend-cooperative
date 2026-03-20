import React, { useState } from 'react';
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

const CreditAndThrift = () => {
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [showLoanRequestModal, setShowLoanRequestModal] = useState(false);
  const [showDeductibleModal, setShowDeductibleModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Member Data
  const memberData = {
    name: 'John Doe',
    memberSince: 'January 2023',
    memberId: 'CT-2023-0842',
    tier: 'Premium Saver',
    referralCode: 'SAVE2345',
    totalReferrals: 5,
    referralBonus: 2500,
    creditScore: 780,
    loanEligibility: 'Pre-approved',
    maxLoanAmount: 50000
  };

  // Credit & Thrift Balance Details
  const thriftBalance = {
    totalSavings: 78500,
    accruedInterest: 3925,
    availableBalance: 82425,
    pendingWithdrawals: 5000,
    monthlyContribution: 5000,
    nextContributionDate: '2024-04-15',
    savingsGoal: 150000,
    goalProgress: 52.3,
    withdrawalLimit: 75000,
    tier: 'Premium',
    interestRate: 5.2,
    dividendsEarned: 2750
  };

  // Deductibles (Fees & Charges)
  const deductibles = {
    monthlyMaintenance: 250,
    insurance: 500,
    loanProcessingFee: 1500,
    withdrawalFee: 0.5, // percentage
    latePaymentFee: 1000,
    totalDeductiblesThisMonth: 750,
    totalDeductiblesYear: 4850,
    nextDeductibleDate: '2024-04-01'
  };

  // Active Loans
 
  // Loan Products
  const loanProducts = [
    {
      id: 1,
      name: 'Thrift Loan',
      maxAmount: 100000,
      interestRate: 8.5,
      duration: '6-24 months',
      requirement: '6 months savings',
      processingFee: 1.5,
      insurance: 0.5
    },
    {
      id: 2,
      name: 'Emergency Loan',
      maxAmount: 25000,
      interestRate: 6.0,
      duration: '3-12 months',
      requirement: '3 months savings',
      processingFee: 1.0,
      insurance: 0.3
    },
    {
      id: 3,
      name: 'Business Investment',
      maxAmount: 200000,
      interestRate: 7.5,
      duration: '12-36 months',
      requirement: '12 months savings',
      processingFee: 2.0,
      insurance: 0.8
    },
    {
      id: 4,
      name: 'Education Loan',
      maxAmount: 50000,
      interestRate: 5.5,
      duration: '6-18 months',
      requirement: '9 months savings',
      processingFee: 1.0,
      insurance: 0.4
    }
  ];

  // Transaction History (with deductibles)
  const transactionHistory = [
    {
      id: 1,
      type: 'Savings Deposit',
      amount: 5000,
      date: '2024-03-15',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'CT-2024-0315-001',
      balance: 78500,
      category: 'deposit',
      deductibles: 0
    },
    {
      id: 2,
      type: 'Monthly Maintenance Fee',
      amount: -250,
      date: '2024-03-01',
      status: 'completed',
      method: 'Auto Deduct',
      reference: 'FEE-2024-03-001',
      balance: 73500,
      category: 'deductible',
      deductibles: 250
    },
    {
      id: 3,
      type: 'Insurance Premium',
      amount: -500,
      date: '2024-03-01',
      status: 'completed',
      method: 'Auto Deduct',
      reference: 'INS-2024-03-001',
      balance: 73750,
      category: 'deductible',
      deductibles: 500
    },
    {
      id: 4,
      type: 'Loan Disbursement',
      amount: 25000,
      date: '2024-02-20',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'LN-2024-002-001',
      balance: 74250,
      category: 'loan'
    },
    {
      id: 5,
      type: 'Savings Deposit',
      amount: 5000,
      date: '2024-02-15',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'CT-2024-0215-001',
      balance: 49250,
      category: 'deposit'
    },
    {
      id: 6,
      type: 'Loan Payment',
      amount: -2271,
      date: '2024-02-15',
      status: 'completed',
      method: 'Auto Debit',
      reference: 'LNP-2024-02-001',
      balance: 44250,
      category: 'loan_payment'
    },
    {
      id: 7,
      type: 'Monthly Maintenance Fee',
      amount: -250,
      date: '2024-02-01',
      status: 'completed',
      method: 'Auto Deduct',
      reference: 'FEE-2024-02-001',
      balance: 46521,
      category: 'deductible',
      deductibles: 250
    },
    {
      id: 8,
      type: 'Interest Credited',
      amount: 340,
      date: '2024-02-01',
      status: 'completed',
      method: 'Auto Credit',
      reference: 'INT-2024-02-001',
      balance: 46771,
      category: 'interest'
    },
    {
      id: 9,
      type: 'Withdrawal Fee',
      amount: -250,
      date: '2024-01-25',
      status: 'completed',
      method: 'Auto Deduct',
      reference: 'WDF-2024-01-001',
      balance: 46431,
      category: 'deductible',
      deductibles: 250
    },
    {
      id: 10,
      type: 'Late Payment Fee',
      amount: -1000,
      date: '2024-01-20',
      status: 'completed',
      method: 'Auto Deduct',
      reference: 'LPF-2024-01-001',
      balance: 46681,
      category: 'deductible',
      deductibles: 1000
    }
  ];

  // Cooperative Stats
  const cooperativeStats = {
    totalMembers: 2340,
    activeSavers: 1876,
    totalSavings: 45600000,
    totalLoans: 28300000,
    loanRecoveryRate: 98.2,
    reserveFund: 8900000,
    averageSavings: 19487,
    defaultRate: 1.8
  };

  // Filter transactions
  const getFilteredTransactions = () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));
    
    let filtered = transactionHistory;
    
    // Filter by period
    if (selectedPeriod === '30days') {
      filtered = filtered.filter(t => new Date(t.date) >= thirtyDaysAgo);
    } else if (selectedPeriod === '90days') {
      filtered = filtered.filter(t => new Date(t.date) >= ninetyDaysAgo);
    }
    
    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(t => t.category === selectedType);
    }
    
    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();
  
  const totalDeposits = filteredTransactions
    .filter(t => t.category === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDeductibles = filteredTransactions
    .filter(t => t.category === 'deductible')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const totalInterest = filteredTransactions
    .filter(t => t.category === 'interest')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalLoanPayments = filteredTransactions
    .filter(t => t.category === 'loan_payment')
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{memberData.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-white/80 text-sm">
                <span>Member since {memberData.memberSince}</span>
                <span>•</span>
                <span>ID: {memberData.memberId}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-white/20 px-2 py-1 rounded-lg text-xs">
                  {memberData.loanEligibility}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            
            <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
              <span className="text-sm text-white/80">Eligible Loan</span>
              <div className="font-bold">${memberData.maxLoanAmount.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cooperative Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cooperative-teal/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-cooperative-teal" />
            </div>
            <div>
              <span className="text-xs text-cooperative-dark/60">Active Savers</span>
              <div className="text-lg font-bold text-cooperative-dark">{cooperativeStats.activeSavers}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cooperative-orange/10 rounded-lg flex items-center justify-center">
              <PiggyBank className="w-5 h-5 text-cooperative-orange" />
            </div>
            <div>
              <span className="text-xs text-cooperative-dark/60">Total Savings</span>
              <div className="text-lg font-bold text-cooperative-dark">${(cooperativeStats.totalSavings / 1000000).toFixed(1)}M</div>
            </div>
          </div>
        </div>
      
        
      </div>

      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-cooperative-dark to-cooperative-dark/80 text-white rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div>
            <span className="text-white/60 text-sm">Thrift Savings Balance</span>
            <div className="text-5xl font-bold mt-2">${thriftBalance.availableBalance.toLocaleString()}</div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 text-white/80">
                <PiggyBank className="w-4 h-4" />
                <span className="text-sm">Principal: ${thriftBalance.totalSavings.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Interest: ${thriftBalance.accruedInterest.toLocaleString()}</span>
              </div>
            </div>
            </div>

            {/* For loan */}
            <div className='border-l-2 max-md:border-0 max-md:pl-0 border-cyan-100 pl-5'>
             <span className="text-white/60 text-sm">Active Loans</span>
            <div className="text-5xl font-bold mt-2">${thriftBalance.availableBalance.toLocaleString()}</div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 text-white/80">
                <PiggyBank className="w-4 h-4" />
                <span className="text-sm">Principal: ${thriftBalance.totalSavings.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Interest: ${thriftBalance.accruedInterest.toLocaleString()}</span>
              </div>
            </div>
            </div>
            
          </div>
        
          <div className="mt-6 md:mt-0 flex gap-3">
            <button 
              onClick={() => setShowSavingsModal(true)}
              className="px-6 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors font-medium flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Savings
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-colors font-medium flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Withdraw
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          <div>
            <span className="text-white/60 text-xs">Monthly Contribution</span>
            <div className="text-xl font-bold text-white mt-1">${thriftBalance.monthlyContribution}</div>
          </div>
          <div>
            <span className="text-white/60 text-xs">Next Contribution</span>
            <div className="text-xl font-bold text-white mt-1">{thriftBalance.nextContributionDate}</div>
          </div>
          <div>
            <span className="text-white/60 text-xs">Interest Rate</span>
            <div className="text-xl font-bold text-white mt-1">{thriftBalance.interestRate}%</div>
          </div>
         
        </div>

        {/* Progress Bar */}
       
      </div>
      {/* Transaction History */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-cooperative-teal" />
            <h2 className="text-2xl font-bold text-cooperative-dark">Transaction History</h2>
          </div>
          
        </div>

        {/* Transaction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Total Deposits</span>
            <div className="text-xl font-bold text-cooperative-teal mt-1">${totalDeposits.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Total Deductibles</span>
            <div className="text-xl font-bold text-cooperative-orange mt-1">${totalDeductibles.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Interest Earned</span>
            <div className="text-xl font-bold text-cooperative-teal mt-1">${totalInterest.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Loan Payments</span>
            <div className="text-xl font-bold text-cooperative-dark mt-1">${totalLoanPayments.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                        transaction.category === 'deposit' ? 'bg-cooperative-teal/10 text-cooperative-teal' :
                        transaction.category === 'deductible' ? 'bg-red-100 text-red-600' :
                        transaction.category === 'loan' ? 'bg-blue-100 text-blue-700' :
                        transaction.category === 'loan_payment' ? 'bg-purple-100 text-purple-700' :
                        transaction.category === 'interest' ? 'bg-green-100 text-green-700' :
                        'bg-cooperative-orange/10 text-cooperative-orange'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-cooperative-dark/70 font-mono text-xs">{transaction.reference}</td>
                    <td className="px-6 py-4 text-cooperative-dark/70">{transaction.method}</td>
                    <td className={`px-6 py-4 font-semibold ${
                      transaction.amount < 0 ? 'text-red-600' : 'text-cooperative-dark'
                    }`}>
                      {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-cooperative-dark/70">${transaction.balance.toLocaleString()}</td>
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
        </div>
      </div>

      {/* Add Savings Modal */}
      {showSavingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-spinIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-cooperative-dark">Add to Thrift Savings</h3>
              <button 
                onClick={() => setShowSavingsModal(false)}
                className="p-2 hover:bg-cooperative-cream rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-cooperative-cream rounded-xl p-4">
                <span className="text-sm text-cooperative-dark/60">Current Balance</span>
                <div className="text-2xl font-bold text-cooperative-dark mt-1">
                  ${thriftBalance.availableBalance.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-cooperative-dark mb-2 block">Amount to Save</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                  <input 
                    type="number"
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button className="p-2 border border-cooperative-dark/10 rounded-lg hover:bg-cooperative-cream transition-colors text-cooperative-dark/70">
                  $1000
                </button>
                <button className="p-2 border border-cooperative-dark/10 rounded-lg hover:bg-cooperative-cream transition-colors text-cooperative-dark/70">
                  $2500
                </button>
                <button className="p-2 border border-cooperative-dark/10 rounded-lg hover:bg-cooperative-cream transition-colors text-cooperative-dark/70">
                  $5000
                </button>
              </div>

              <div className="bg-cooperative-teal/5 rounded-xl p-4">
                <h4 className="font-medium text-cooperative-dark mb-2">Summary</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cooperative-dark/70">Monthly Interest (5.2%)</span>
                  <span className="font-medium text-cooperative-teal">+$21.67</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-cooperative-dark/70">Monthly Fee</span>
                  <span className="font-medium text-red-600">-$250</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-cooperative-dark/10">
                  <span className="text-cooperative-dark font-medium">Net Monthly Gain</span>
                  <span className="font-bold text-cooperative-dark">-$228.33</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  onClick={() => setShowSavingsModal(false)}
                  className="px-4 py-3 border border-cooperative-dark/20 text-cooperative-dark rounded-xl hover:bg-cooperative-cream transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors">
                  Save Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  <span className="text-xl font-bold text-cooperative-teal">${memberData.maxLoanAmount.toLocaleString()}</span>
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

    </div>
  );
};

export default CreditAndThrift;