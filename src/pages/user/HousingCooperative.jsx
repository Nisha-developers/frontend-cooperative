import React, { useState } from 'react';
import { 
  Home, 
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
  Bell
} from 'lucide-react';

const HousingCooperative = () => {
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Cooperative Member Data
  const memberData = {
    name: 'John Doe',
    memberSince: 'January 2023',
    memberId: 'COOP-2023-0842',
  };

  // Cooperative Balance Details
  const cooperativeBalance = {
    totalSavings: 45800,
    accruedInterest: 1832,
    availableBalance: 47632,
    pendingWithdrawals: 5000,
    monthlyContribution: 2000,
    nextContributionDate: '2024-04-15',
    savingsGoal: 100000,
    goalProgress: 45.8,
    withdrawalLimit: 50000,
    tier: 'Gold',
    interestRate: 4.5,
    dividendsEarned: 1250
  };

  // Cooperative Stats
  const cooperativeStats = {
    totalMembers: 1250,
    activeMembers: 987,
    totalSavings: 24500000,
    totalLoans: 18200000,
    dividendRate: 6.8,
    reserveFund: 5200000
  };

  // Transaction History
  const transactionHistory = [
    {
      id: 1,
      type: 'Savings Deposit',
      amount: 2000,
      date: '2024-03-15',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'TRX-2024-0315-001',
      balance: 45800
    },
    {
      id: 2,
      type: 'Interest Credited',
      amount: 458,
      date: '2024-03-01',
      status: 'completed',
      method: 'Auto Credit',
      reference: 'INT-2024-03-001',
      balance: 43800
    },
    {
      id: 3,
      type: 'Dividend Payout',
      amount: 625,
      date: '2024-02-28',
      status: 'completed',
      method: 'Auto Credit',
      reference: 'DIV-2024-02-001',
      balance: 43342
    },
    {
      id: 4,
      type: 'Savings Deposit',
      amount: 2000,
      date: '2024-02-15',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'TRX-2024-0215-001',
      balance: 42717
    },
    {
      id: 5,
      type: 'Withdrawal Request',
      amount: 5000,
      date: '2024-02-10',
      status: 'pending',
      method: 'Bank Transfer',
      reference: 'WD-2024-0210-001',
      balance: 40717
    },
    {
      id: 6,
      type: 'Interest Credited',
      amount: 407,
      date: '2024-02-01',
      status: 'completed',
      method: 'Auto Credit',
      reference: 'INT-2024-02-001',
      balance: 45717
    },
    {
      id: 7,
      type: 'Referral Bonus',
      amount: 250,
      date: '2024-01-25',
      status: 'completed',
      method: 'Bonus Credit',
      reference: 'REF-2024-01-003',
      balance: 45310
    },
    {
      id: 8,
      type: 'Savings Deposit',
      amount: 2000,
      date: '2024-01-15',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'TRX-2024-0115-001',
      balance: 45060
    }
  ];

  // Savings Plans
  const savingsPlans = [
    {
      id: 1,
      name: 'Regular Savings',
      minAmount: 500,
      interestRate: 4.5,
      duration: 'Flexible',
      benefits: ['Withdraw anytime', 'Monthly interest', 'No penalties']
    },
    {
      id: 2,
      name: 'Fixed Deposit',
      minAmount: 10000,
      interestRate: 6.8,
      duration: '12 months',
      benefits: ['Higher interest', 'Guaranteed returns', 'Loan eligibility']
    },
    {
      id: 3,
      name: 'Target Savings',
      minAmount: 1000,
      interestRate: 5.2,
      duration: 'Custom',
      benefits: ['Goal-based saving', 'Bonus on completion', 'Flexible contributions']
    },
    {
      id: 4,
      name: 'Children\'s Future',
      minAmount: 2000,
      interestRate: 5.5,
      duration: 'Long-term',
      benefits: ['Education focus', 'Maturity bonus', 'Insurance cover']
    }
  ];

  // Recent Cooperative Activities
  const cooperativeActivities = [
    {
      id: 1,
      title: 'Dividend Declaration',
      description: '6.8% dividend approved for Q1 2024',
      date: '2024-03-20',
      type: 'announcement'
    },
    {
      id: 2,
      title: 'New Housing Project',
      description: '50 units affordable housing in Lekki',
      date: '2024-03-18',
      type: 'project'
    },
    {
      id: 3,
      title: 'Interest Rate Review',
      description: 'Savings interest increased to 4.5%',
      date: '2024-03-15',
      type: 'update'
    },
    {
      id: 4,
      title: 'Annual General Meeting',
      description: 'Scheduled for April 15, 2024',
      date: '2024-03-10',
      type: 'event'
    }
  ];

  // Filter transactions based on period
  const getFilteredTransactions = () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));
    
    return transactionHistory.filter(t => {
      const txDate = new Date(t.date);
      if (selectedPeriod === '30days') return txDate >= thirtyDaysAgo;
      if (selectedPeriod === '90days') return txDate >= ninetyDaysAgo;
      return true;
    });
  };

  const filteredTransactions = getFilteredTransactions();
  const totalDeposits = filteredTransactions
    .filter(t => t.type === 'Savings Deposit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalInterest = filteredTransactions
    .filter(t => t.type.includes('Interest'))
    .reduce((sum, t) => sum + t.amount, 0);
  const totalBonus = filteredTransactions
    .filter(t => t.type === 'Referral Bonus' || t.type === 'Dividend Payout')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cooperative-dark">Housing Cooperative</h1>
          <p className="text-cooperative-dark/70 mt-2">Save together, grow together - Your path to home ownership</p>
        </div>
      </div>

      {/* Member Info Card */}
      <div className="rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{memberData.name}</h2>
              <div className="flex items-center gap-3 mt-1  text-sm">
                <span>Member since {memberData.memberSince}</span>
                <span>•</span>
                <span>ID: {memberData.memberId}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>


      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-cooperative-dark to-cooperative-dark/80 text-white rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <span className="text-white/60 text-sm">Housing Cooperative Balance</span>
            <div className="text-5xl font-bold mt-2">₦{cooperativeBalance.availableBalance.toLocaleString()}</div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 text-white/80">
                <PiggyBank className="w-4 h-4" />
                <span className="text-sm">Principal: ₦{cooperativeBalance.totalSavings.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Interest: ₦{cooperativeBalance.accruedInterest.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-0 flex gap-3 max-sm:flex-col">
            <button 
              onClick={() => setShowSavingsModal(true)}
              className="px-6 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors font-medium flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Savings
            </button>
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-colors font-medium flex items-center gap-2"
            >
              <Wallet className="w-5 h-5" />
              Buy Apartment
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div>
            <span className="text-white/60 text-xs">Monthly Contribution</span>
            <div className="text-xl font-bold text-white mt-1">₦{cooperativeBalance.monthlyContribution}</div>
          </div>
          <div>
            <span className="text-white/60 text-xs">Next Payment</span>
            <div className="text-xl font-bold text-white mt-1">{cooperativeBalance.nextContributionDate}</div>
          </div>
         
          <div>
            <span className="text-white/60 text-xs">Interest Rate</span>
            <div className="text-xl font-bold text-white mt-1">{cooperativeBalance.interestRate}% p.a.</div>
          </div>
        </div>

      
      </div>

      

      {/* Transaction History */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6 max-sm:flex-col max-sm:items-start">
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-cooperative-teal" />
            <h2 className="text-2xl font-bold text-cooperative-dark">Transaction History</h2>
          </div>
          <div className="flex items-center gap-3 ">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white border border-cooperative-dark/10 rounded-xl text-cooperative-dark focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
            >
              <option value="all">All Time</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            <button className="p-2 border border-cooperative-dark/10 rounded-lg hover:bg-cooperative-cream transition-colors">
              <Download className="w-5 h-5 text-cooperative-dark/60" />
            </button>
            <button className="p-2 border border-cooperative-dark/10 rounded-lg hover:bg-cooperative-cream transition-colors">
              <Filter className="w-5 h-5 text-cooperative-dark/60" />
            </button>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Total Deposits</span>
            <div className="text-xl font-bold text-cooperative-teal mt-1">₦{totalDeposits.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Interest Earned</span>
            <div className="text-xl font-bold text-cooperative-orange mt-1">₦{totalInterest.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Transactions</span>
            <div className="text-xl font-bold text-cooperative-dark mt-1">{filteredTransactions.length}</div>
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
                        transaction.type.includes('Deposit') ? 'bg-cooperative-teal/10 text-cooperative-teal' :
                        transaction.type.includes('Interest') ? 'bg-cooperative-orange/10 text-cooperative-orange' :
                        transaction.type.includes('Dividend') ? 'bg-cooperative-teal/10 text-cooperative-teal' :
                        transaction.type.includes('Withdrawal') ? 'bg-red-100 text-red-600' :
                        'bg-cooperative-teal/10 text-cooperative-teal'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-cooperative-dark/70 font-mono text-xs">{transaction.reference}</td>
                    <td className="px-6 py-4 text-cooperative-dark/70">{transaction.method}</td>
                    <td className="px-6 py-4 font-semibold text-cooperative-dark">₦{transaction.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-cooperative-dark/70">₦{transaction.balance.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {transaction.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
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
              <h3 className="text-2xl font-bold text-cooperative-dark">Add to Savings</h3>
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
                  ₦{cooperativeBalance.availableBalance.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-cooperative-dark mb-2 block">Select Savings Plan</label>
                <select className="w-full p-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20">
                  <option>Regular Savings (4.5% p.a.)</option>
                  <option>Fixed Deposit (6.8% p.a.)</option>
                  <option>Target Savings (5.2% p.a.)</option>
                  <option>Children's Future (5.5% p.a.)</option>
                </select>
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
                  ₦500
                </button>
                <button className="p-2 border border-cooperative-dark/10 rounded-lg hover:bg-cooperative-cream transition-colors text-cooperative-dark/70">
                  ₦1000
                </button>
                <button className="p-2 border border-cooperative-dark/10 rounded-lg hover:bg-cooperative-cream transition-colors text-cooperative-dark/70">
                  ₦2000
                </button>
              </div>

              <div className="bg-cooperative-teal/5 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cooperative-dark/70">Monthly Interest</span>
                  <span className="font-medium text-cooperative-teal">+₦18.75</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-cooperative-dark/70">New Balance</span>
                  <span className="font-bold text-cooperative-dark">₦47,632</span>
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

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-spinIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-cooperative-dark">Withdraw Funds</h3>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="p-2 hover:bg-cooperative-cream rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-cooperative-cream rounded-xl p-4">
                <span className="text-sm text-cooperative-dark/60">Available for Withdrawal</span>
                <div className="text-2xl font-bold text-cooperative-dark mt-1">
                  ₦{cooperativeBalance.availableBalance.toLocaleString()}
                </div>
                <p className="text-xs text-cooperative-dark/50 mt-1">Daily limit: ₦{cooperativeBalance.withdrawalLimit.toLocaleString()}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-cooperative-dark mb-2 block">Amount to Withdraw</label>
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
                <label className="text-sm font-medium text-cooperative-dark mb-2 block">Withdrawal Method</label>
                <select className="w-full p-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20">
                  <option>Bank Transfer</option>
                  <option>Mobile Money</option>
                  <option>Cash Pickup</option>
                </select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Withdrawal Notice</h4>
                    <p className="text-xs text-yellow-700 mt-1">
                      Withdrawals may take 2-3 business days to process. A small fee may apply.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-3 border border-cooperative-dark/20 text-cooperative-dark rounded-xl hover:bg-cooperative-cream transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors">
                  Request Withdrawal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HousingCooperative;