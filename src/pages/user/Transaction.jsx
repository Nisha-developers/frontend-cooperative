import React, { useState } from 'react';
import { 
  History,
  Search,
  Filter,
  Download,
  Calendar,
  DollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wallet,
  Landmark,
  PiggyBank,
  Home,
  Sprout,
  HandCoins,
  Receipt,
  FileText,
  Eye,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Printer,
  Share2,
  Copy,
  BarChart3
} from 'lucide-react';

const Transaction = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // All transactions across all cooperative services
  const allTransactions = [
    // Rent Apartment Transactions
    {
      id: 1,
      service: 'Rent Apartment',
      serviceIcon: Home,
      type: 'Rent Payment',
      category: 'payment',
      amount: 22500,
      date: '2024-03-15',
      time: '10:30 AM',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'RENT-2024-0315-001',
      description: '3 months rent - Sunset Villa',
      property: 'Sunset Villa',
      location: 'Lekki Phase 1, Lagos',
      duration: '90 days',
      dailyRate: 250,
      receiptUrl: '#'
    },
    {
      id: 2,
      service: 'Rent Apartment',
      serviceIcon: Home,
      type: 'Rent Payment',
      category: 'payment',
      amount: 10500,
      date: '2024-02-10',
      time: '02:15 PM',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'RENT-2024-0210-001',
      description: 'Monthly rent - Ocean Breeze Tower',
      property: 'Ocean Breeze Tower',
      location: 'Victoria Island, Lagos',
      duration: '30 days',
      dailyRate: 350,
      receiptUrl: '#'
    },
    
    // Buy Apartment Transactions
    {
      id: 3,
      service: 'Buy Apartment',
      serviceIcon: Home,
      type: 'Full Purchase',
      category: 'purchase',
      amount: 427500,
      date: '2024-03-10',
      time: '11:45 AM',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'PUR-2024-0310-001',
      description: 'Full payment - Sunset Luxury Villa',
      property: 'Sunset Luxury Villa',
      location: 'Lekki Phase 1, Lagos',
      discount: '5% cash discount',
      receiptUrl: '#'
    },
    {
      id: 4,
      service: 'Buy Apartment',
      serviceIcon: Home,
      type: 'Installment Payment',
      category: 'loan_payment',
      amount: 7500,
      date: '2024-03-01',
      time: '09:20 AM',
      status: 'completed',
      method: 'Direct Debit',
      reference: 'INS-2024-0301-001',
      description: 'Monthly installment - Green Garden',
      property: 'Green Garden Residence',
      location: 'Ikeja, Lagos',
      remainingBalance: 235500,
      receiptUrl: '#'
    },
    {
      id: 5,
      service: 'Buy Apartment',
      serviceIcon: Home,
      type: 'Savings Contribution',
      category: 'deposit',
      amount: 2500,
      date: '2024-02-15',
      time: '03:30 PM',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'SAV-2024-0215-001',
      description: 'Cooperative savings - Oceanview Penthouse',
      property: 'Oceanview Penthouse',
      location: 'Victoria Island, Lagos',
      groupMembers: 12,
      receiptUrl: '#'
    },

    // Housing Cooperative Transactions
    {
      id: 6,
      service: 'Housing Cooperative',
      serviceIcon: Home,
      type: 'Savings Deposit',
      category: 'deposit',
      amount: 2000,
      date: '2024-03-15',
      time: '10:00 AM',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'COOP-2024-0315-001',
      description: 'Monthly cooperative savings',
      balance: 47632,
      receiptUrl: '#'
    },
    {
      id: 7,
      service: 'Housing Cooperative',
      serviceIcon: Home,
      type: 'Interest Credited',
      category: 'interest',
      amount: 458,
      date: '2024-03-01',
      time: '12:00 AM',
      status: 'completed',
      method: 'Auto Credit',
      reference: 'INT-2024-03-001',
      description: 'Monthly interest on savings',
      interestRate: 4.5,
      balance: 43800,
      receiptUrl: '#'
    },
    {
      id: 8,
      service: 'Housing Cooperative',
      serviceIcon: Home,
      type: 'Dividend Payout',
      category: 'dividend',
      amount: 625,
      date: '2024-02-28',
      time: '12:00 AM',
      status: 'completed',
      method: 'Auto Credit',
      reference: 'DIV-2024-02-001',
      description: 'Quarterly dividend payout',
      dividendRate: 6.8,
      balance: 43342,
      receiptUrl: '#'
    },

    // Agricultural Cooperative Transactions
    {
      id: 9,
      service: 'Agricultural Cooperative',
      serviceIcon: Sprout,
      type: 'Farm Savings',
      category: 'deposit',
      amount: 2500,
      date: '2024-03-15',
      time: '10:30 AM',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'AGRI-2024-0315-001',
      description: 'Monthly farm savings contribution',
      season: 'Dry Season 2024',
      balance: 71240,
      receiptUrl: '#'
    },
    {
      id: 10,
      service: 'Agricultural Cooperative',
      serviceIcon: Sprout,
      type: 'Dividend Payout',
      category: 'dividend',
      amount: 386,
      date: '2024-03-01',
      time: '12:00 AM',
      status: 'completed',
      method: 'Auto Credit',
      reference: 'DIV-2024-03-001',
      description: 'Monthly agricultural dividend',
      dividendRate: 7.0,
      season: 'Dry Season',
      balance: 66200,
      receiptUrl: '#'
    },
    {
      id: 11,
      service: 'Agricultural Cooperative',
      serviceIcon: Sprout,
      type: 'Harvest Proceeds',
      category: 'income',
      amount: 1250,
      date: '2024-02-28',
      time: '03:00 PM',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'HRV-2024-02-001',
      description: 'Share of harvest proceeds',
      crop: 'Maize & Rice',
      yield: '8.2 tons/hectare',
      balance: 65814,
      receiptUrl: '#'
    },

    // Credit & Thrift Transactions
    {
      id: 12,
      service: 'Credit & Thrift',
      serviceIcon: HandCoins,
      type: 'Thrift Savings',
      category: 'deposit',
      amount: 5000,
      date: '2024-03-15',
      time: '09:15 AM',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'CT-2024-0315-001',
      description: 'Monthly thrift contribution',
      balance: 82425,
      receiptUrl: '#'
    },
    {
      id: 13,
      service: 'Credit & Thrift',
      serviceIcon: HandCoins,
      type: 'Maintenance Fee',
      category: 'deductible',
      amount: -250,
      date: '2024-03-01',
      time: '12:00 AM',
      status: 'completed',
      method: 'Auto Deduct',
      reference: 'FEE-2024-03-001',
      description: 'Monthly account maintenance fee',
      balance: 73500,
      receiptUrl: '#'
    },
    {
      id: 14,
      service: 'Credit & Thrift',
      serviceIcon: HandCoins,
      type: 'Insurance Premium',
      category: 'deductible',
      amount: -500,
      date: '2024-03-01',
      time: '12:00 AM',
      status: 'completed',
      method: 'Auto Deduct',
      reference: 'INS-2024-03-001',
      description: 'Monthly insurance premium',
      balance: 73750,
      receiptUrl: '#'
    },
    {
      id: 15,
      service: 'Credit & Thrift',
      serviceIcon: HandCoins,
      type: 'Loan Disbursement',
      category: 'loan',
      amount: 25000,
      date: '2024-02-20',
      time: '11:30 AM',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'LN-2024-002-001',
      description: 'Thrift loan disbursement',
      loanType: 'Thrift Loan',
      interestRate: 8.5,
      duration: '12 months',
      balance: 74250,
      receiptUrl: '#'
    },
    {
      id: 16,
      service: 'Credit & Thrift',
      serviceIcon: HandCoins,
      type: 'Loan Payment',
      category: 'loan_payment',
      amount: -2271,
      date: '2024-02-15',
      time: '10:00 AM',
      status: 'completed',
      method: 'Auto Debit',
      reference: 'LNP-2024-02-001',
      description: 'Monthly loan repayment',
      remainingBalance: 18187,
      balance: 44250,
      receiptUrl: '#'
    },
    {
      id: 17,
      service: 'Credit & Thrift',
      serviceIcon: HandCoins,
      type: 'Interest Credited',
      category: 'interest',
      amount: 340,
      date: '2024-02-01',
      time: '12:00 AM',
      status: 'completed',
      method: 'Auto Credit',
      reference: 'INT-2024-02-001',
      description: 'Monthly interest on savings',
      interestRate: 5.2,
      balance: 46771,
      receiptUrl: '#'
    },
    {
      id: 18,
      service: 'Credit & Thrift',
      serviceIcon: HandCoins,
      type: 'Late Payment Fee',
      category: 'deductible',
      amount: -1000,
      date: '2024-01-20',
      time: '12:00 AM',
      status: 'completed',
      method: 'Auto Deduct',
      reference: 'LPF-2024-01-001',
      description: 'Late payment penalty',
      balance: 46681,
      receiptUrl: '#'
    },

    // Pending/Processing Transactions
    {
      id: 19,
      service: 'Buy Apartment',
      serviceIcon: Home,
      type: 'Withdrawal Request',
      category: 'withdrawal',
      amount: 5000,
      date: '2024-03-18',
      time: '02:30 PM',
      status: 'pending',
      method: 'Bank Transfer',
      reference: 'WD-2024-0318-001',
      description: 'Savings withdrawal request',
      balance: 47632,
      receiptUrl: '#'
    },
    {
      id: 20,
      service: 'Credit & Thrift',
      serviceIcon: HandCoins,
      type: 'Loan Request',
      category: 'loan',
      amount: 35000,
      date: '2024-03-17',
      time: '11:00 AM',
      status: 'processing',
      method: 'Pending Approval',
      reference: 'LNR-2024-0317-001',
      description: 'Business loan application',
      loanType: 'Business Investment',
      duration: '24 months',
      receiptUrl: '#'
    }
  ];

  // Statistics
  const totalTransactions = allTransactions.length;
  const totalIncome = allTransactions
    .filter(t => t.amount > 0 && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = allTransactions
    .filter(t => t.amount < 0 && t.status === 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const pendingTotal = allTransactions
    .filter(t => t.status !== 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  // Get unique services for filter
  const services = [...new Set(allTransactions.map(t => t.service))];

  // Filter transactions
  const getFilteredTransactions = () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));
    const oneYearAgo = new Date(now.setDate(now.getDate() - 365));
    
    let filtered = [...allTransactions];
    
    // Filter by period
    if (selectedPeriod === '30days') {
      filtered = filtered.filter(t => new Date(t.date) >= thirtyDaysAgo);
    } else if (selectedPeriod === '90days') {
      filtered = filtered.filter(t => new Date(t.date) >= ninetyDaysAgo);
    } else if (selectedPeriod === 'year') {
      filtered = filtered.filter(t => new Date(t.date) >= oneYearAgo);
    }
    
    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(t => t.category === selectedType);
    }
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(t => t.status === selectedStatus);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.property && t.property.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const filteredTransactions = getFilteredTransactions();
  
  // Group transactions by month
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(transaction);
    return groups;
  }, {});

  const formatAmount = (amount) => {
    const isNegative = amount < 0;
    return `${isNegative ? '-' : '+'}$${Math.abs(amount).toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'deposit': return 'bg-cooperative-teal/10 text-cooperative-teal';
      case 'payment': return 'bg-cooperative-orange/10 text-cooperative-orange';
      case 'deductible': return 'bg-red-100 text-red-600';
      case 'loan': return 'bg-blue-100 text-blue-700';
      case 'loan_payment': return 'bg-purple-100 text-purple-700';
      case 'interest': return 'bg-green-100 text-green-700';
      case 'dividend': return 'bg-emerald-100 text-emerald-700';
      case 'income': return 'bg-teal-100 text-teal-700';
      case 'withdrawal': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getServiceIcon = (service) => {
    switch(service) {
      case 'Rent Apartment': return Home;
      case 'Buy Apartment': return Home;
      case 'Housing Cooperative': return Home;
      case 'Agricultural Cooperative': return Sprout;
      case 'Credit & Thrift': return HandCoins;
      default: return Wallet;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cooperative-dark">Transaction History</h1>
          <p className="text-cooperative-dark/70 mt-2">Track all your financial activities across cooperative services</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-cooperative-teal text-cooperative-teal rounded-lg hover:bg-cooperative-teal/5 transition-colors font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="px-4 py-2 bg-cooperative-orange text-white rounded-lg hover:bg-cooperative-orange/90 transition-colors font-medium flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print Statement
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-cooperative-teal to-cooperative-teal/80 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white/80 text-sm">Total Transactions</span>
              <div className="text-3xl font-bold mt-1">{totalTransactions}</div>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <History className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-cooperative-dark/60 text-sm">Total Income</span>
              <div className="text-2xl font-bold text-green-600 mt-1">+${totalIncome.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-cooperative-dark/60 text-sm">Total Expenses</span>
              <div className="text-2xl font-bold text-red-600 mt-1">-${totalExpenses.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-cooperative-dark/60 text-sm">Net Balance</span>
              <div className={`text-2xl font-bold mt-1 ${netBalance >= 0 ? 'text-cooperative-teal' : 'text-red-600'}`}>
                ${netBalance.toLocaleString()}
              </div>
            </div>
            <div className="w-12 h-12 bg-cooperative-orange/10 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-cooperative-orange" />
            </div>
          </div>
        </div>
      </div>

      {/* Pending Transactions Alert */}
      {pendingTotal > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Pending Transactions</h4>
              <p className="text-sm text-yellow-700 mt-1">
                You have ${pendingTotal.toLocaleString()} in pending/processing transactions that will be completed soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
            <input
              type="text"
              placeholder="Search by description, reference, property..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-cooperative-dark/10 rounded-xl hover:bg-cooperative-cream transition-colors flex items-center gap-2"
            >
              <Filter className="w-5 h-5 text-cooperative-dark/60" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button className="px-4 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors font-medium flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Summary
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-cooperative-dark/10">
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full p-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
              >
                <option value="all">All Time</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Transaction Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposits & Savings</option>
                <option value="payment">Payments</option>
                <option value="loan">Loan Transactions</option>
                <option value="loan_payment">Loan Repayments</option>
                <option value="interest">Interest</option>
                <option value="dividend">Dividends</option>
                <option value="deductible">Fees & Deductibles</option>
                <option value="income">Harvest & Income</option>
                <option value="withdrawal">Withdrawals</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Transaction List */}
      <div className="space-y-6">
        {Object.entries(groupedTransactions).length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-lg">
            <History className="w-16 h-16 text-cooperative-dark/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-cooperative-dark mb-2">No transactions found</h3>
            <p className="text-cooperative-dark/60">Try adjusting your filters or search query</p>
          </div>
        ) : (
          Object.entries(groupedTransactions).map(([monthYear, transactions]) => (
            <div key={monthYear} className="space-y-3">
              <h3 className="text-lg font-semibold text-cooperative-dark sticky top-0 bg-cooperative-cream py-3 px-4 rounded-lg">
                {monthYear}
              </h3>
              <div className="space-y-3">
                {transactions.map((transaction) => {
                  const ServiceIcon = transaction.serviceIcon;
                  const isPositive = transaction.amount > 0;
                  const isNegative = transaction.amount < 0;
                  
                  return (
                    <div
                      key={transaction.id}
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setShowTransactionModal(true);
                      }}
                      className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5 hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isPositive ? 'bg-green-100' : isNegative ? 'bg-red-100' : 'bg-cooperative-teal/10'
                          }`}>
                            {isPositive ? (
                              <ArrowUpRight className={`w-6 h-6 text-green-600`} />
                            ) : isNegative ? (
                              <ArrowDownRight className="w-6 h-6 text-red-600" />
                            ) : (
                              <ServiceIcon className="w-6 h-6 text-cooperative-teal" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-cooperative-dark">{transaction.type}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(transaction.category)}`}>
                                {transaction.category}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                                {transaction.status}
                              </span>
                            </div>
                            <p className="text-sm text-cooperative-dark/70 mt-1">{transaction.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-cooperative-dark/50">
                              <span>{transaction.date}</span>
                              <span>•</span>
                              <span>{transaction.time}</span>
                              <span>•</span>
                              <span className="font-mono">{transaction.reference}</span>
                            </div>
                            {transaction.property && (
                              <div className="flex items-center gap-1 mt-1 text-xs text-cooperative-teal">
                                <Home className="w-3 h-3" />
                                <span>{transaction.property}, {transaction.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-cooperative-dark'}`}>
                            {formatAmount(transaction.amount)}
                          </div>
                          <div className="text-xs text-cooperative-dark/50 mt-1">{transaction.method}</div>
                          <button className="mt-2 text-cooperative-orange hover:text-cooperative-orange/80">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Transaction Details Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-spinIn">
            <div className="sticky top-0 bg-white border-b border-cooperative-dark/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedTransaction.amount > 0 ? 'bg-green-100' : 
                    selectedTransaction.amount < 0 ? 'bg-red-100' : 'bg-cooperative-teal/10'
                  }`}>
                    {selectedTransaction.amount > 0 ? (
                      <ArrowUpRight className="w-6 h-6 text-green-600" />
                    ) : selectedTransaction.amount < 0 ? (
                      <ArrowDownRight className="w-6 h-6 text-red-600" />
                    ) : (
                      <Wallet className="w-6 h-6 text-cooperative-teal" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-cooperative-dark">{selectedTransaction.type}</h3>
                    <p className="text-cooperative-dark/60">{selectedTransaction.service}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTransactionModal(false)}
                  className="p-2 hover:bg-cooperative-cream rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Amount */}
              <div className="bg-cooperative-cream rounded-xl p-6 text-center">
                <span className="text-sm text-cooperative-dark/60">Transaction Amount</span>
                <div className={`text-4xl font-bold mt-2 ${
                  selectedTransaction.amount > 0 ? 'text-green-600' : 
                  selectedTransaction.amount < 0 ? 'text-red-600' : 'text-cooperative-dark'
                }`}>
                  {formatAmount(selectedTransaction.amount)}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-cooperative-dark/40" />
                    <span className="text-cooperative-dark/60">Date & Time:</span>
                    <span className="font-medium text-cooperative-dark">{selectedTransaction.date} at {selectedTransaction.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="w-4 h-4 text-cooperative-dark/40" />
                    <span className="text-cooperative-dark/60">Payment Method:</span>
                    <span className="font-medium text-cooperative-dark">{selectedTransaction.method}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-cooperative-dark/40" />
                    <span className="text-cooperative-dark/60">Reference:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-cooperative-dark">{selectedTransaction.reference}</span>
                      <button className="p-1 hover:bg-cooperative-cream rounded">
                        <Copy className="w-3 h-3 text-cooperative-dark/60" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-cooperative-dark/40" />
                    <span className="text-cooperative-dark/60">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTransaction.status)}`}>
                      {selectedTransaction.status}
                    </span>
                  </div>
                  {selectedTransaction.balance && (
                    <div className="flex items-center gap-2 text-sm">
                      <Wallet className="w-4 h-4 text-cooperative-dark/40" />
                      <span className="text-cooperative-dark/60">Balance After:</span>
                      <span className="font-bold text-cooperative-dark">${selectedTransaction.balance.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Details based on transaction type */}
              {selectedTransaction.property && (
                <div className="border-t border-cooperative-dark/10 pt-4">
                  <h4 className="font-semibold text-cooperative-dark mb-3">Property Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-cooperative-dark/60">Property</span>
                      <p className="font-medium text-cooperative-dark">{selectedTransaction.property}</p>
                    </div>
                    <div>
                      <span className="text-xs text-cooperative-dark/60">Location</span>
                      <p className="font-medium text-cooperative-dark">{selectedTransaction.location}</p>
                    </div>
                    {selectedTransaction.duration && (
                      <div>
                        <span className="text-xs text-cooperative-dark/60">Duration</span>
                        <p className="font-medium text-cooperative-dark">{selectedTransaction.duration}</p>
                      </div>
                    )}
                    {selectedTransaction.dailyRate && (
                      <div>
                        <span className="text-xs text-cooperative-dark/60">Daily Rate</span>
                        <p className="font-medium text-cooperative-dark">${selectedTransaction.dailyRate}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedTransaction.loanType && (
                <div className="border-t border-cooperative-dark/10 pt-4">
                  <h4 className="font-semibold text-cooperative-dark mb-3">Loan Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-cooperative-dark/60">Loan Type</span>
                      <p className="font-medium text-cooperative-dark">{selectedTransaction.loanType}</p>
                    </div>
                    <div>
                      <span className="text-xs text-cooperative-dark/60">Interest Rate</span>
                      <p className="font-medium text-cooperative-dark">{selectedTransaction.interestRate}%</p>
                    </div>
                    <div>
                      <span className="text-xs text-cooperative-dark/60">Duration</span>
                      <p className="font-medium text-cooperative-dark">{selectedTransaction.duration}</p>
                    </div>
                    {selectedTransaction.remainingBalance && (
                      <div>
                        <span className="text-xs text-cooperative-dark/60">Remaining Balance</span>
                        <p className="font-medium text-cooperative-dark">${selectedTransaction.remainingBalance.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedTransaction.interestRate && !selectedTransaction.loanType && (
                <div className="border-t border-cooperative-dark/10 pt-4">
                  <h4 className="font-semibold text-cooperative-dark mb-3">Interest Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-cooperative-dark/60">Interest Rate</span>
                      <p className="font-medium text-cooperative-dark">{selectedTransaction.interestRate}%</p>
                    </div>
                    {selectedTransaction.dividendRate && (
                      <div>
                        <span className="text-xs text-cooperative-dark/60">Dividend Rate</span>
                        <p className="font-medium text-cooperative-dark">{selectedTransaction.dividendRate}%</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-cooperative-dark/10">
                <button className="flex-1 px-4 py-3 border border-cooperative-dark/20 text-cooperative-dark rounded-xl hover:bg-cooperative-cream transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Receipt
                </button>
                <button className="flex-1 px-4 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Statement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;