import React, { useState } from 'react';
import {
  CreditCard,
  Landmark,
  Copy,
  CheckCircle,
  AlertCircle,
  Download,
  Printer,
  Smartphone,
  Banknote,
  ArrowRight,
  QrCode
} from 'lucide-react';

const PaymentInfo = () => {
  const [copiedBank, setCopiedBank] = useState(null);
  const [copiedMobile, setCopiedMobile] = useState(null);

  // Admin Bank Account Details
  const bankAccounts = [
    {
      id: 1,
      bankName: 'First Bank of Nigeria',
      accountName: 'Cooperative Housing Society',
      accountNumber: '2034567890',
      sortCode: '011234567',
      branch: 'Lekki Phase 1, Lagos',
      isPrimary: true
    },
    {
      id: 2,
      bankName: 'GTBank Plc',
      accountName: 'Cooperative Housing Society',
      accountNumber: '0589123456',
      sortCode: '058123456',
      branch: 'Victoria Island, Lagos',
      isPrimary: false
    }
  ];

  // Mobile Money Details
  const mobileMoney = [
    {
      id: 1,
      provider: 'Paga',
      accountName: 'Cooperative Housing Society',
      accountNumber: '08012345678',
      isPrimary: true
    },
    {
      id: 2,
      provider: 'Opay',
      accountName: 'Cooperative Housing Society',
      accountNumber: '09012345678',
      isPrimary: false
    }
  ];

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'bank') {
      setCopiedBank(text);
      setTimeout(() => setCopiedBank(null), 2000);
    } else {
      setCopiedMobile(text);
      setTimeout(() => setCopiedMobile(null), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cooperative-dark">Payment Information</h1>
          <p className="text-cooperative-dark/70 mt-2">Use these details to make your cooperative payments</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-cooperative-teal text-cooperative-teal rounded-lg hover:bg-cooperative-teal/5 transition-colors font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Details
          </button>
          <button className="px-4 py-2 bg-cooperative-orange text-white rounded-lg hover:bg-cooperative-orange/90 transition-colors font-medium flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Payment Instructions</h4>
            <p className="text-xs text-blue-700 mt-1">
              Please use your <strong>Full Name</strong> and <strong>Member ID</strong> as payment reference. 
              Payments are processed within 24-48 hours. For urgent payments, contact support.
            </p>
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bankAccounts.map((bank) => (
          <div key={bank.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-cooperative-dark/5 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-cooperative-teal to-cooperative-teal/80 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Landmark className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">{bank.bankName}</h3>
                </div>
                {bank.isPrimary && (
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                    Primary Account
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Account Name */}
              <div className="border-b border-cooperative-dark/10 pb-3">
                <p className="text-sm text-cooperative-dark/60 mb-1">Account Name</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-cooperative-dark">{bank.accountName}</p>
                  <button 
                    onClick={() => copyToClipboard(bank.accountName, 'bank')}
                    className="p-2 hover:bg-cooperative-cream rounded-lg transition-colors group"
                  >
                    {copiedBank === bank.accountName ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-cooperative-dark/40 group-hover:text-cooperative-teal" />
                    )}
                  </button>
                </div>
              </div>

              {/* Account Number */}
              <div className="border-b border-cooperative-dark/10 pb-3">
                <p className="text-sm text-cooperative-dark/60 mb-1">Account Number</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-cooperative-dark tracking-wider">{bank.accountNumber}</p>
                  <button 
                    onClick={() => copyToClipboard(bank.accountNumber, 'bank')}
                    className="p-2 hover:bg-cooperative-cream rounded-lg transition-colors group"
                  >
                    {copiedBank === bank.accountNumber ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-cooperative-dark/40 group-hover:text-cooperative-teal" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sort Code */}
              <div className="border-b border-cooperative-dark/10 pb-3">
                <p className="text-sm text-cooperative-dark/60 mb-1">Sort Code</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-cooperative-dark">{bank.sortCode}</p>
                  <button 
                    onClick={() => copyToClipboard(bank.sortCode, 'bank')}
                    className="p-2 hover:bg-cooperative-cream rounded-lg transition-colors group"
                  >
                    {copiedBank === bank.sortCode ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-cooperative-dark/40 group-hover:text-cooperative-teal" />
                    )}
                  </button>
                </div>
              </div>

              {/* Branch */}
              <div>
                <p className="text-sm text-cooperative-dark/60 mb-1">Branch</p>
                <p className="text-cooperative-dark">{bank.branch}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Money Details */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-cooperative-dark/5">
        <div className="bg-gradient-to-r from-cooperative-orange to-cooperative-orange/80 text-white p-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Mobile Money / USSD Payments</h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mobileMoney.map((mobile) => (
              <div key={mobile.id} className="bg-cooperative-cream/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-cooperative-teal" />
                    <h4 className="font-semibold text-cooperative-dark">{mobile.provider}</h4>
                  </div>
                  {mobile.isPrimary && (
                    <span className="text-xs bg-cooperative-teal/10 text-cooperative-teal px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-cooperative-dark/60">Account Name</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-medium text-cooperative-dark">{mobile.accountName}</p>
                      <button 
                        onClick={() => copyToClipboard(mobile.accountName, 'mobile')}
                        className="p-1 hover:bg-cooperative-cream rounded transition-colors"
                      >
                        {copiedMobile === mobile.accountName ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-cooperative-dark/40" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-cooperative-dark/60">Account Number / Phone</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-lg font-bold text-cooperative-dark">{mobile.accountNumber}</p>
                      <button 
                        onClick={() => copyToClipboard(mobile.accountNumber, 'mobile')}
                        className="p-1 hover:bg-cooperative-cream rounded transition-colors"
                      >
                        {copiedMobile === mobile.accountNumber ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-cooperative-dark/40" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Reference Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-cooperative-teal/10 rounded-lg flex items-center justify-center">
              <Banknote className="w-5 h-5 text-cooperative-teal" />
            </div>
            <h3 className="font-semibold text-cooperative-dark">Bank Transfer</h3>
          </div>
          <p className="text-sm text-cooperative-dark/70">Use any of the bank accounts above</p>
          <p className="text-xs text-cooperative-dark/50 mt-2">Processing: 24-48 hours</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-cooperative-orange/10 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-cooperative-orange" />
            </div>
            <h3 className="font-semibold text-cooperative-dark">Mobile Money</h3>
          </div>
          <p className="text-sm text-cooperative-dark/70">Transfer via Paga, Opay, or USSD</p>
          <p className="text-xs text-cooperative-dark/50 mt-2">Instant processing</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-cooperative-teal/10 rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-cooperative-teal" />
            </div>
            <h3 className="font-semibold text-cooperative-dark">Payment Reference</h3>
          </div>
          <p className="text-sm text-cooperative-dark/70">Use: [Your Name] + [Member ID]</p>
          <p className="text-xs text-cooperative-dark/50 mt-2">Example: John Doe COOP-0842</p>
        </div>
      </div>

      {/* Payment History Link */}
      <div className="bg-cooperative-cream rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-cooperative-dark mb-2">Track Your Payments</h3>
        <p className="text-cooperative-dark/70 mb-4">View your payment history and transaction status</p>
        <button className="px-6 py-3 bg-cooperative-teal text-white rounded-xl hover:bg-cooperative-teal/90 transition-colors font-medium inline-flex items-center gap-2">
          View Payment History
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;