import React, { useState } from 'react';
import { 
  Sprout,
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
  Leaf,
  Sun,
  Cloud,
  Droplets,
  Wheat,
  ShoppingBag
} from 'lucide-react';

const AgricCooperative = () => {
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [showDividendModal, setShowDividendModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedCycle, setSelectedCycle] = useState('all');

  // Member Data
  const memberData = {
    name: 'John Doe',
    memberSince: 'January 2023',
    memberId: 'AGRI-2023-0842',
    tier: 'Gold Farmer',
    referralCode: 'FARM2345',
    totalReferrals: 3,
    referralBonus: 1250,
    farmLocation: 'Kaduna State',
    hectares: 5.5
  };

  // Agricultural Cooperative Balance Details
  const cooperativeBalance = {
    totalSavings: 68500,
    accruedInterest: 2740,
    availableBalance: 71240,
    pendingWithdrawals: 5000,
    monthlyContribution: 2500,
    nextContributionDate: '2024-04-15',
    savingsGoal: 150000,
    goalProgress: 45.7,
    withdrawalLimit: 50000,
    tier: 'Gold',
    interestRate: 4.8,
    dividendsEarned: 3840,
    harvestShare: 1250
  };

  // Cooperative Stats
  const cooperativeStats = {
    totalFarmers: 845,
    activeFarmers: 678,
    totalSavings: 12450000,
    totalLoans: 8200000,
    dividendRate: 7.2,
    reserveFund: 2800000,
    totalHectares: 4250,
    projectedHarvest: '15,000 tons'
  };

  // Monthly Dividends (Formal History Format)
  const dividendHistory = [
    {
      id: 1,
      month: 'March',
      year: 2024,
      savingsBalance: 68500,
      dividendRate: 7.2,
      dividendAmount: 411,
      reinvested: true,
      payoutDate: '2024-04-01',
      status: 'projected',
      cropSeason: 'Dry Season',
      performance: 'Excellent'
    },
    {
      id: 2,
      month: 'February',
      year: 2024,
      savingsBalance: 66200,
      dividendRate: 7.0,
      dividendAmount: 386,
      reinvested: true,
      payoutDate: '2024-03-01',
      status: 'paid',
      cropSeason: 'Dry Season',
      performance: 'Good'
    },
    {
      id: 3,
      month: 'January',
      year: 2024,
      savingsBalance: 63800,
      dividendRate: 6.8,
      dividendAmount: 362,
      reinvested: true,
      payoutDate: '2024-02-01',
      status: 'paid',
      cropSeason: 'Dry Season',
      performance: 'Good'
    },
    {
      id: 4,
      month: 'December',
      year: 2023,
      savingsBalance: 61500,
      dividendRate: 7.5,
      dividendAmount: 384,
      reinvested: true,
      payoutDate: '2024-01-01',
      status: 'paid',
      cropSeason: 'Wet Season',
      performance: 'Excellent'
    },
    {
      id: 5,
      month: 'November',
      year: 2023,
      savingsBalance: 59200,
      dividendRate: 7.2,
      dividendAmount: 355,
      reinvested: true,
      payoutDate: '2023-12-01',
      status: 'paid',
      cropSeason: 'Wet Season',
      performance: 'Very Good'
    },
    {
      id: 6,
      month: 'October',
      year: 2023,
      savingsBalance: 56800,
      dividendRate: 6.9,
      dividendAmount: 327,
      reinvested: true,
      payoutDate: '2023-11-01',
      status: 'paid',
      cropSeason: 'Wet Season',
      performance: 'Good'
    },
    {
      id: 7,
      month: 'September',
      year: 2023,
      savingsBalance: 54500,
      dividendRate: 6.5,
      dividendAmount: 295,
      reinvested: false,
      payoutDate: '2023-10-01',
      status: 'paid',
      cropSeason: 'Wet Season',
      performance: 'Average'
    },
    {
      id: 8,
      month: 'August',
      year: 2023,
      savingsBalance: 52000,
      dividendRate: 6.2,
      dividendAmount: 269,
      reinvested: false,
      payoutDate: '2023-09-01',
      status: 'paid',
      cropSeason: 'Planting Season',
      performance: 'Average'
    }
  ];

  // Transaction History
  const transactionHistory = [
    {
      id: 1,
      type: 'Savings Deposit',
      amount: 2500,
      date: '2024-03-15',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'AGR-2024-0315-001',
      balance: 68500,
      category: 'Savings'
    },
    {
      id: 2,
      type: 'Dividend Payout',
      amount: 386,
      date: '2024-03-01',
      status: 'completed',
      method: 'Auto Reinvest',
      reference: 'DIV-2024-03-001',
      balance: 66200,
      category: 'Dividend'
    },
    {
      id: 3,
      type: 'Harvest Proceeds',
      amount: 1250,
      date: '2024-02-28',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'HRV-2024-02-001',
      balance: 65814,
      category: 'Harvest'
    },
    {
      id: 4,
      type: 'Savings Deposit',
      amount: 2500,
      date: '2024-02-15',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'AGR-2024-0215-001',
      balance: 64564,
      category: 'Savings'
    },
    {
      id: 5,
      type: 'Dividend Payout',
      amount: 362,
      date: '2024-02-01',
      status: 'completed',
      method: 'Auto Reinvest',
      reference: 'DIV-2024-02-001',
      balance: 62064,
      category: 'Dividend'
    },
    {
      id: 6,
      type: 'Fertilizer Subsidy',
      amount: 450,
      date: '2024-01-20',
      status: 'completed',
      method: 'Credit',
      reference: 'SUB-2024-01-001',
      balance: 61702,
      category: 'Subsidy'
    },
    {
      id: 7,
      type: 'Savings Deposit',
      amount: 2500,
      date: '2024-01-15',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'AGR-2024-0115-001',
      balance: 61252,
      category: 'Savings'
    },
    {
      id: 8,
      type: 'Dividend Payout',
      amount: 384,
      date: '2024-01-01',
      status: 'completed',
      method: 'Auto Reinvest',
      reference: 'DIV-2024-01-001',
      balance: 58752,
      category: 'Dividend'
    }
  ];


  // Farm Projects
  const farmProjects = [
    {
      id: 1,
      name: 'Irrigation System',
      location: 'Kaduna Farm Cluster',
      totalCost: 250000,
      membersParticipating: 45,
      yourContribution: 5000,
      progress: 75,
      expectedCompletion: 'June 2024'
    },
    {
      id: 2,
      name: 'Storage Facility',
      location: 'Central Warehouse',
      totalCost: 180000,
      membersParticipating: 32,
      yourContribution: 3500,
      progress: 45,
      expectedCompletion: 'August 2024'
    }
  ];

  // Filter dividends based on period
  const getFilteredDividends = () => {
    const now = new Date();
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
    const twelveMonthsAgo = new Date(now.setMonth(now.getMonth() - 12));
    
    return dividendHistory.filter(d => {
      const dividendDate = new Date(`${d.month} 1, ${d.year}`);
      if (selectedPeriod === '6months') return dividendDate >= sixMonthsAgo;
      if (selectedPeriod === '12months') return dividendDate >= twelveMonthsAgo;
      return true;
    });
  };

  // Filter transactions based on cycle
  const getFilteredTransactions = () => {
    return transactionHistory.filter(t => {
      if (selectedCycle === 'savings') return t.category === 'Savings';
      if (selectedCycle === 'dividends') return t.category === 'Dividend';
      if (selectedCycle === 'harvest') return t.category === 'Harvest' || t.category === 'Subsidy';
      return true;
    });
  };

  const filteredDividends = getFilteredDividends();
  const filteredTransactions = getFilteredTransactions();
  
  const totalDividendsYear = dividendHistory
    .filter(d => d.year === 2024 && d.status === 'paid')
    .reduce((sum, d) => sum + d.dividendAmount, 0);
  
  const projectedDividends = dividendHistory
    .filter(d => d.status === 'projected')
    .reduce((sum, d) => sum + d.dividendAmount, 0);

  const averageDividendRate = (dividendHistory
    .filter(d => d.status === 'paid')
    .reduce((sum, d) => sum + d.dividendRate, 0) / dividendHistory.filter(d => d.status === 'paid').length).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cooperative-dark">Agricultural Cooperative</h1>
          <p className="text-cooperative-dark/70 mt-2">Grow together, earn monthly dividends from farm proceeds</p>
        </div>
      </div>

      {/* Farmer Info Card */}
      <div className="bg-gradient-to-r from-cooperative-teal to-cooperative-teal/80 text-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{memberData.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-white/80 text-sm">
                <span>Farmer since {memberData.memberSince}</span>
                
                <span>ID: {memberData.memberId}</span>
              </div>
             
            </div>
          </div>
        </div>
      </div>

      {/* Cooperative Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cooperative-teal/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-cooperative-teal" />
            </div>
            <div>
              <span className="text-xs text-cooperative-dark/60">Active Farmers</span>
              <div className="text-lg font-bold text-cooperative-dark">{cooperativeStats.activeFarmers}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cooperative-orange/10 rounded-lg flex items-center justify-center">
              <Wheat className="w-5 h-5 text-cooperative-orange" />
            </div>
            <div>
              <span className="text-xs text-cooperative-dark/60">Total Hectares</span>
              <div className="text-lg font-bold text-cooperative-dark">{cooperativeStats.totalHectares}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cooperative-teal/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-cooperative-teal" />
            </div>
            <div>
              <span className="text-xs text-cooperative-dark/60">Dividend Rate</span>
              <div className="text-lg font-bold text-cooperative-dark">{cooperativeStats.dividendRate}%</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cooperative-orange/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-cooperative-orange" />
            </div>
            <div>
              <span className="text-xs text-cooperative-dark/60">Projected Harvest</span>
              <div className="text-lg font-bold text-cooperative-dark">{cooperativeStats.projectedHarvest}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-cooperative-dark to-cooperative-dark/80 text-white rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <span className="text-white/60 text-sm">Agricultural Savings Balance</span>
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
          <div className="mt-6 md:mt-0 flex gap-3">
            <button 
              onClick={() => setShowSavingsModal(true)}
              className="px-6 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors font-medium flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add to Farm Savings
            </button>

          </div>
        </div>

        {/* Dividend Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div>
            <span className="text-white/60 text-xs">Monthly Contribution</span>
            <div className="text-xl font-bold text-white mt-1">₦{cooperativeBalance.monthlyContribution}</div>
          </div>
          <div>
            <span className="text-white/60 text-xs">Next Dividend</span>
            <div className="text-xl font-bold text-white mt-1">April 1, 2024</div>
          </div>
          <div>
            <span className="text-white/60 text-xs">Dividends Earned</span>
            <div className="text-xl font-bold text-white mt-1">₦{cooperativeBalance.dividendsEarned}</div>
          </div>
          <div>
            <span className="text-white/60 text-xs">Avg. Dividend Rate</span>
            <div className="text-xl font-bold text-white mt-1">{averageDividendRate}%</div>
          </div>
        </div>
      </div>

      {/* Monthly Dividends Section - Formal History Format */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-cooperative-teal" />
            <h2 className="text-2xl font-bold text-cooperative-dark">Monthly Dividend History</h2>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white border border-cooperative-dark/10 rounded-xl text-cooperative-dark focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
            >
              <option value="all">All Time</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
            </select>
            <button className="p-2 border border-cooperative-dark/10 rounded-lg hover:bg-cooperative-cream transition-colors">
              <Download className="w-5 h-5 text-cooperative-dark/60" />
            </button>
          </div>
        </div>

        {/* Dividend Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Total Dividends (2024)</span>
            <div className="text-xl font-bold text-cooperative-teal mt-1">₦{totalDividendsYear}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Projected Dividends</span>
            <div className="text-xl font-bold text-cooperative-orange mt-1">₦{projectedDividends}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Average Monthly</span>
            <div className="text-xl font-bold text-cooperative-teal mt-1">₦{Math.round(totalDividendsYear/3)}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Reinvested</span>
            <div className="text-xl font-bold text-cooperative-dark mt-1">
              {dividendHistory.filter(d => d.reinvested).length}/{dividendHistory.length}
            </div>
          </div>
        </div>

        {/* Dividends Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cooperative-cream">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Month</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Crop Season</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Savings Balance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Dividend Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Dividend Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Reinvested</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Payout Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Performance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cooperative-dark/5">
                {filteredDividends.map((dividend) => (
                  <tr key={dividend.id} className="hover:bg-cooperative-cream/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-cooperative-dark">{dividend.month}</td>
                    <td className="px-6 py-4 text-cooperative-dark/70">{dividend.year}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-cooperative-teal/5 px-2 py-1 rounded-full text-cooperative-teal">
                        {dividend.cropSeason}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-cooperative-dark">₦{dividend.savingsBalance.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-cooperative-teal">{dividend.dividendRate}%</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-cooperative-orange">₦{dividend.dividendAmount}</td>
                    <td className="px-6 py-4">
                      {dividend.reinvested ? (
                        <span className="text-cooperative-teal flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-cooperative-dark/40">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-cooperative-dark/70">{dividend.payoutDate}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        dividend.performance === 'Excellent' ? 'bg-green-100 text-green-700' :
                        dividend.performance === 'Very Good' ? 'bg-teal-100 text-teal-700' :
                        dividend.performance === 'Good' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {dividend.performance}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        dividend.status === 'paid' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {dividend.status === 'paid' ? 'Paid' : 'Projected'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-cooperative-cream/50">
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-right font-semibold text-cooperative-dark">
                    Total Dividends (Period):
                  </td>
                  <td className="px-6 py-4 font-bold text-cooperative-orange text-lg">
                    ₦{filteredDividends.reduce((sum, d) => sum + d.dividendAmount, 0)}
                  </td>
                  <td colSpan="4" className="px-6 py-4"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Farming Seasons */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <Sun className="w-6 h-6 text-cooperative-teal" />
          <h2 className="text-2xl font-bold text-cooperative-dark">Farming Seasons</h2>
        </div>

      </div>

      {/* Farm Projects */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Building className="w-6 h-6 text-cooperative-teal" />
            <h2 className="text-2xl font-bold text-cooperative-dark">Farm Development Projects</h2>
          </div>
          <button className="text-cooperative-orange hover:text-cooperative-orange/80 font-medium text-sm">
            View All Projects →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {farmProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl p-6 shadow-lg border border-cooperative-dark/5">
              <h3 className="text-lg font-semibold text-cooperative-dark mb-2">{project.name}</h3>
              <p className="text-sm text-cooperative-dark/60 mb-4">{project.location}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-xs text-cooperative-dark/60">Total Cost</span>
                  <div className="text-lg font-bold text-cooperative-dark">₦{project.totalCost.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-xs text-cooperative-dark/60">Members</span>
                  <div className="text-lg font-bold text-cooperative-dark">{project.membersParticipating}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-cooperative-dark/60">Your Contribution</span>
                  <span className="font-medium text-cooperative-teal">₦{project.yourContribution}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-cooperative-dark/60">Project Progress</span>
                  <span className="font-medium text-cooperative-orange">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-cooperative-cream rounded-full">
                  <div 
                    className="h-full bg-cooperative-teal rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-cooperative-dark/60">Expected Completion</span>
                <span className="font-medium text-cooperative-dark">{project.expectedCompletion}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-cooperative-teal" />
            <h2 className="text-2xl font-bold text-cooperative-dark">Transaction History</h2>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={selectedCycle}
              onChange={(e) => setSelectedCycle(e.target.value)}
              className="px-4 py-2 bg-white border border-cooperative-dark/10 rounded-xl text-cooperative-dark focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
            >
              <option value="all">All Transactions</option>
              <option value="savings">Savings Only</option>
              <option value="dividends">Dividends Only</option>
              <option value="harvest">Harvest & Subsidies</option>
            </select>
            <button className="p-2 border border-cooperative-dark/10 rounded-lg hover:bg-cooperative-cream transition-colors">
              <Download className="w-5 h-5 text-cooperative-dark/60" />
            </button>
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
                        transaction.category === 'Savings' ? 'bg-cooperative-teal/10 text-cooperative-teal' :
                        transaction.category === 'Dividend' ? 'bg-cooperative-orange/10 text-cooperative-orange' :
                        transaction.category === 'Harvest' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-cooperative-dark/70 font-mono text-xs">{transaction.reference}</td>
                    <td className="px-6 py-4 text-cooperative-dark/70">{transaction.method}</td>
                    <td className="px-6 py-4 font-semibold text-cooperative-dark">₦{transaction.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-cooperative-dark/70">₦{transaction.balance.toLocaleString()}</td>
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
              <h3 className="text-2xl font-bold text-cooperative-dark">Add to Farm Savings</h3>
              <button 
                onClick={() => setShowSavingsModal(false)}
                className="p-2 hover:bg-cooperative-cream rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-cooperative-cream rounded-xl p-4">
                <span className="text-sm text-cooperative-dark/60">Current Farm Balance</span>
                <div className="text-2xl font-bold text-cooperative-dark mt-1">
                  ₦{cooperativeBalance.availableBalance.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-cooperative-dark mb-2 block">Allocate to Season</label>
                <select className="w-full p-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20">
                  <option>Dry Season 2024 (7.2% dividend)</option>
                  <option>Wet Season 2024 (7.5% projected)</option>
                  <option>General Farm Savings (4.8% p.a.)</option>
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
                  ₦2500
                </button>
              </div>

              <div className="bg-cooperative-teal/5 rounded-xl p-4">
                <h4 className="font-medium text-cooperative-dark mb-2">Projected Returns</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cooperative-dark/70">Monthly Dividend</span>
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
                  Add to Farm Savings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgricCooperative;