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
import { createPortal } from 'react-dom';
import PopupForm from '../../components/ui/PopupForm';
import useWalletStore from '../../hooks/useWallet';
import { useAuth } from '../../context/AuthContext';
import PopupMessage from '../../components/ui/PopupMessage';
const PaymentInfo = () => {
  const [copiedBank, setCopiedBank] = useState(null);
  const [copiedMobile, setCopiedMobile] = useState(null);
const {getAccessToken} = useAuth();
const token = getAccessToken();
const error = useWalletStore((state)=>state.error);
const title = useWalletStore((state)=>state.title);
const message = useWalletStore((state)=>state.message);
const open = useWalletStore((state)=>state.open);
const  fundWallet = useWalletStore((state)=>state.fundWallet);
const closeMessage = useWalletStore((state)=>state.closeMessage);







  // Step 1 modal: amount + payment method
  const [isStep1Open, setIsStep1Open] = useState(false);
  // Step 2 modal: purpose (+ receipt if transfer)
  const [isStep2Open, setIsStep2Open] = useState(false);
  // Store step 1 data to merge at the end
  const [step1Data, setStep1Data] = useState(null);

  // Admin Bank Account Details
  const bankAccounts = [
    {
      id: 1,
      bankName: 'Polaris Bank',
      accountName: 'First Bethel Housing Support Services Limited',
      accountNumber: '4091062131',
      sortCode: '076',
      branch: 'OPIC House, Oke-Ilewo, Abeokuta',
      isPrimary: true
    },
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

  // ── STEP 1 FIELDS: Amount + Payment Method ──
  const step1Fields = [
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

  // ── STEP 2 FIELDS: Purpose only (cash) OR Purpose + Receipt (transfer) ──
  const purposeField = {
    name: "remark",
    label: "Purpose of Payment",
    type: "select",
    required: true,
    options: [
      { label: "Housing Cooperative", value: "housing_cooperative" },
      { label: "Credit & Thrift Cooperative", value: "credit_thrift_cooperative" },
      { label: "Account Balance Funding", value: "balance_funding" },
      { label: "Loan Repayment (Credit & Thrift)", value: "repay_credit_thrift" },
      { label: "Loan Repayment (Housing Installment)", value: "repay_housing_installment" }
    ],
    hint: "Select your purpose of payment"
  };
/*
  const receiptField = {
    name: "receipt",
    label: "Upload Receipt",
    type: "file",
    required: true,
    accept: "image/png, image/jpeg, image/webp, application/pdf",
    hint: "Upload proof of payment (image or PDF)"
  };
  */

  // If step1Data says transfer → show purpose + receipt, else purpose only
  const step2Fields = step1Data?.source === "transfer"
    ? [purposeField]// receiptField
    : [purposeField];

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

  function confirmpayment() {
    setIsStep1Open(true);
  }

  // Step 1 done → save data, close step 1, open step 2
  function handleStep1Submit(data) {
    setStep1Data(data);
    setIsStep1Open(false);
    setTimeout(() => setIsStep2Open(true), 200);
  }

  // Step 2 done → merge everything and submit
  function handleStep2Submit(data) {
    data.source = 'USER_TOPUP'
    const finalData = { ...step1Data, ...data };
    console.log("Final Payment Data:", finalData);
    fundWallet(finalData, token)
    setIsStep2Open(false)
    console.log(open)
    // TODO: send finalData to your API here
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      
      <button
        className='block w-full bg-cooperative-orange py-2 max-w-[200px] rounded-md text-white font-bold sm:float-right'
        onClick={confirmpayment}
      >
        Confirm Payment
      </button>
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cooperative-dark">Payment Information</h1>
          <p className="text-cooperative-dark/70 mt-2">Use these details to make your cooperative payments</p>
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

      {/* Mobile Money Details
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-cooperative-dark/5">
        <div className="bg-gradient-to-r from-cooperative-orange to-cooperative-orange/80 text-white p-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Mobile Money / USSD Payments</h3>
          </div>
        </div> */}

        {/* <div className="p-6">
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
        </div> */}
      {/* </div> */}


      {/* STEP 1 POPUP: Amount + Payment Method */}
      {createPortal(
        <PopupForm
          formfield={step1Fields}
          isOpen={isStep1Open}
          onClose={() => setIsStep1Open(false)}
          onSubmit={handleStep1Submit}
        />,
        document.body
      )}

      {/* STEP 2 POPUP: Purpose only (cash) OR Purpose + Receipt (transfer) */}
      {createPortal(
        <PopupForm
          formfield={step2Fields}
          isOpen={isStep2Open}
          onClose={() => setIsStep2Open(false)}
          onSubmit={handleStep2Submit}
        />,
        document.body
      )}
      {createPortal(<PopupMessage title={title} message={message} onClose={()=> closeMessage() } isOpen = {open} type={error} />, document.body)}
    </div>
  );
};

export default PaymentInfo;