import React, { useEffect, useState, useMemo } from 'react';
import {
  Users,
  DollarSign,
  History,
  TrendingUp,
  PiggyBank,
  Clock,
  Download,
  Filter,
  CheckCircle,
  AlertCircle,
  Wallet,
  Plus,
} from 'lucide-react';
import { RiHome5Line } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import useWalletStore from '../../hooks/useWallet';
import { createPortal } from 'react-dom';
import PopupForm from '../../components/ui/PopupForm';
import PopupMessage from '../../components/ui/PopupMessage';
import { useSale } from '../../context/SaleContext';


const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

function formatNaira(value) {
  return '₦' + Number(value).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}


function formatDate(isoString) {
  const d = new Date(isoString);
  return `${d.getDate()} ${MONTHS[d.getMonth() + 1].slice(0, 3)} ${d.getFullYear()}`;
}

function getMonthKey(isoString) {
  const d = new Date(isoString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getMonthLabel(key) {
  const [year, month] = key.split('-');
  return `${MONTHS[parseInt(month) - 1]} ${year}`;
}



const HousingCooperative = () => {
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [isOpen, setisOpen] = useState(false);

const [visibleField, setvisibleField] = useState([]);
  const transactions    = useWalletStore(s => s.transactions);
  const getTransactions = useWalletStore(s => s.getTransactions);
  const message = useWalletStore(s => s.message);
  const title = useWalletStore(s => s.title);
  const error = useWalletStore(s => s.error);
  const open = useWalletStore(s => s.open);
  const {sales, viewDetails} = useSale();
  const closemessage = useWalletStore(s => s.closeMessage);
  const [idOpen, setIdOpen] = useState(false)
  const [errorms, seterrorms] = useState('');
  const [titlems, settitles] = useState('');
  const [openms, setopenms] = useState(false);
  const [messagems, setmessagems] = useState('');
  const [detailedApartment, setdetailedApartment] = useState({});
const [showModal, setShowModal] = useState(false);
const [findApartment, setFindApartment] = useState({});
const idField = [
      {
      name: 'ApartmentId',
      label: "Enter the apartment Id",
      required: true,
      placeholder: "Get the id from sale apartment page",
    },
]
const submitId = async (data) => {
  const buyApartment = sales.filter(
    (value) => value.listing_type === 'sale' && value.property_type === 'house'
  );

  const found = buyApartment.find((val) => val.id === data.ApartmentId);

  setIdOpen(false);

  if (!found) {
    settitles('Find Apartment Error');
    setmessagems('Oops we cannot find the id in our database.');
    seterrorms('error');
    setopenms(true);
    return;
  }

 
  let details = {};

  if (found.allows_installment) {
    details = await viewDetails(found.id);
    setdetailedApartment(details);
  }


  setFindApartment(found);
  setShowModal(true);
};
const showInstallment = findApartment.allows_installment; 


  
 const credit = useWalletStore(s => s. fundWallet);
 const debit = useWalletStore((s)=>s.withdraw)
  const { user, getAccessToken } = useAuth();
  const token = getAccessToken();

  useEffect(() => {
    getTransactions(token);
  }, []);
const buyApartment = ()=>{
  setIdOpen(true);
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
  setisOpen(false);
//   if(data.source === 'transfer'){
//   setisOpen(true)
//   setvisibleField(receiptField);
// }
data.source = "USER_TOPUP"

const payload = {
    ...data,
    remark: "housing_cooperative"
  };

credit(payload, token)

} 
const SubmitSavings = () =>{
  setisOpen(true);
  setvisibleField(paymentForm)
}










  // ─── Real transaction data ───────────────────────────────────────────────────
  // Keys used: uid, amount, status, remark, type, reference, source,
  //            created_on, confirmed_at, confirmed_by, created_by,
  //            payment_proof, updated_on
  const allTxns = transactions?.transactions ?? [];

  const housingCooperative = useMemo(
    () => allTxns.filter(
      t => t.status === 'CONFIRMED' && t.remark === 'housing_cooperative'
    ),
    [allTxns]
  );

  // ─── Balance calculation ─────────────────────────────────────────────────────
  const principalBalance = useMemo(() => {
    const credits = housingCooperative
      .filter(t => t.type === 'CREDIT')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const debits = housingCooperative
      .filter(t => t.type === 'DEBIT')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    return credits - debits;
  }, [housingCooperative]);

  
 let totalBalance    = principalBalance.toFixed(2);
const Payinstallment = (findApartment, detailedApartment) =>{
  
}
const Purchase = (findApartment) =>{
  totalBalance = 500000000000;
if(findApartment.price > totalBalance){
setShowModal(false)
   setopenms(true);
  settitles('Insufficient Funds');
  seterrorms('error');
  setmessagems('OOPS!! You do not have a sufficient fund in housing cooperative. Please top up and try again');
  return;
}
setShowModal(false);

debit({amount: findApartment.price, source: 'PURCHASE', remark: `housing_cooperative`}, token);

}

  // ─── Period filter ───────────────────────────────────────────────────────────
  const filteredTxns = useMemo(() => {
    if (selectedPeriod === 'all') return housingCooperative;
    const now   = new Date();
    const days  = selectedPeriod === '30days' ? 30 : 90;
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return housingCooperative.filter(
      t => new Date(t.confirmed_at || t.created_on) >= cutoff
    );
  }, [housingCooperative, selectedPeriod]);

  // ─── Group by month / year ───────────────────────────────────────────────────
  const groupedByMonth = useMemo(() => {
    const map = {};
    filteredTxns.forEach(t => {
      const key = getMonthKey(t.confirmed_at || t.created_on);
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    // Sort each group newest-first
    Object.values(map).forEach(arr =>
      arr.sort(
        (a, b) =>
          new Date(b.confirmed_at || b.created_on) -
          new Date(a.confirmed_at || a.created_on)
      )
    );
    return map;
  }, [filteredTxns]);

  const sortedMonthKeys = Object.keys(groupedByMonth).sort((a, b) =>
    b.localeCompare(a)
  );

  // ─── Summary stats ───────────────────────────────────────────────────────────
  const totalDeposits = filteredTxns
    .filter(t => t.type === 'CREDIT')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalWithdrawals = filteredTxns
    .filter(t => t.type === 'DEBIT')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  // ─── Member info ─────────────────────────────────────────────────────────────
  const memberData = {
    name: user?.user?.full_name,
    memberSince:
      MONTHS[new Date(user?.wallet?.created_on).getMonth()] +
      ' ' +
      new Date(user?.wallet?.created_on).getFullYear(),
    memberId: user?.user?.membership_id,
  };

  return (
    <div className="space-y-8">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cooperative-dark">Housing Cooperative</h1>
          <p className="text-cooperative-dark/70 mt-2">
            Save together, grow together — Your path to home ownership
          </p>
        </div>
      </div>

      {/* ── Member card ────────────────────────────────────────────────────── */}
      <div className="rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{memberData.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-sm">
                <span>Member since {memberData.memberSince}</span>
                <span>•</span>
                <span>ID: {memberData.memberId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main balance card ───────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-cooperative-dark to-cooperative-dark/80 text-white rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <span className="text-white/60 text-sm">Housing Cooperative Balance</span>
            <div className="max-sm:text-4xl text-5xl font-bold mt-2">{formatNaira(totalBalance)}</div>
          
          </div>

          <div className="mt-6 md:mt-0 flex gap-3 max-sm:flex-col">
            <button
              onClick={SubmitSavings}
              className="px-6 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors font-medium flex items-center gap-2"
             >
              <Plus className="w-5 h-5" />
              Add Savings
            </button>
            <button
              onClick={buyApartment}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-colors font-medium flex items-center gap-2"
            >
              <Wallet className="w-5 h-5" />
              Buy Apartment
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div>
            <span className="text-white/60 text-xs">Loan Interest Rate</span>
            <div className="text-xl font-bold text-white mt-1">0.5% p.a.</div>
          </div>
          <div>
            <span className="text-white/60 text-xs">Total Transactions</span>
            <div className="text-xl font-bold text-white mt-1 pb-6">{housingCooperative.length}</div>
          </div>
        </div>
        <div>
        <div className='text-gray-300 text-[14px] pt-2 border-t-gray-200/10 border-t-[1px]'>Housing Loan(Installment)</div>
         <div className="max-sm:text-4xl text-5xl font-bold mt-2">₦0:00</div>
        </div>
      </div>


      {/* ── Transaction History ─────────────────────────────────────────────── */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6 max-sm:flex-col max-sm:items-start gap-4">
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-cooperative-teal" />
            <h2 className="text-2xl font-bold text-cooperative-dark">Transaction History</h2>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value)}
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

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Total Deposits</span>
            <div className="text-xl font-bold text-cooperative-teal mt-1">
              {formatNaira(totalDeposits)}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Total Withdrawals</span>
            <div className="text-xl font-bold text-red-500 mt-1">
              {formatNaira(totalWithdrawals)}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5">
            <span className="text-sm text-cooperative-dark/60">Transactions</span>
            <div className="text-xl font-bold text-cooperative-dark mt-1">
              {filteredTxns.length}
            </div>
          </div>
        </div>

        {/* Grouped transaction table */}
        {sortedMonthKeys.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center text-cooperative-dark/40">
            No transactions found for this period.
          </div>
        ) : (
          sortedMonthKeys.map(monthKey => {
            const txns = groupedByMonth[monthKey];
            const monthCredit = txns
              .filter(t => t.type === 'CREDIT')
              .reduce((s, t) => s + parseFloat(t.amount), 0);
            const monthDebit = txns
              .filter(t => t.type === 'DEBIT')
              .reduce((s, t) => s + parseFloat(t.amount), 0);

            return (
              <div key={monthKey} className="mb-6">
                {/* Month header */}
                <div className="flex items-center justify-between px-2 py-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cooperative-dark/40" />
                    <span className="text-sm font-semibold text-cooperative-dark">
                      {getMonthLabel(monthKey)}
                    </span>
                    <span className="text-xs text-cooperative-dark/40">
                      · {txns.length} transaction{txns.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    {monthCredit > 0 && (
                      <span className="text-cooperative-teal font-medium">
                        +{formatNaira(monthCredit)}
                      </span>
                    )}
                    {monthDebit > 0 && (
                      <span className="text-red-500 font-medium">
                        -{formatNaira(monthDebit)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-cooperative-cream">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-cooperative-dark uppercase tracking-wide">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-cooperative-dark uppercase tracking-wide">Reference</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-cooperative-dark uppercase tracking-wide">Source</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-cooperative-dark uppercase tracking-wide">Type</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold text-cooperative-dark uppercase tracking-wide">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-cooperative-dark uppercase tracking-wide">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-cooperative-dark/5">
                        {txns.map(t => (
                          <tr
                            key={t.uid}
                            className="hover:bg-cooperative-cream/30 transition-colors"
                          >
                            {/* confirmed_at (falls back to created_on) */}
                            <td className="px-6 py-4 text-sm text-cooperative-dark/70 whitespace-nowrap">
                              {formatDate(t.confirmed_at || t.created_on)}
                            </td>

                            {/* reference */}
                            <td className="px-6 py-4 font-mono text-xs text-cooperative-dark/60 whitespace-nowrap">
                              {t.reference}
                            </td>

                            {/* source */}
                            <td className="px-6 py-4 text-sm text-cooperative-dark/70">
                              {t.source.replace(/_/g, ' ')}
                            </td>

                            {/* type badge */}
                            <td className="px-6 py-4">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                t.type === 'CREDIT'
                                  ? 'bg-cooperative-teal/10 text-cooperative-teal'
                                  : 'bg-red-100 text-red-600'
                              }`}>
                                {t.type}
                              </span>
                            </td>

                            {/* amount */}
                            <td className={`px-6 py-4 font-semibold text-right whitespace-nowrap ${
                              t.type === 'CREDIT'
                                ? 'text-cooperative-teal'
                                : 'text-red-500'
                            }`}>
                              {t.type === 'CREDIT' ? '+' : '-'}{formatNaira(t.amount)}
                            </td>

                            {/* status — uses t.status */}
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                                t.status === 'CONFIRMED'
                                  ? 'bg-green-100 text-green-700'
                                  : t.status === 'PENDING'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {t.status === 'CONFIRMED'
                                  ? <CheckCircle className="w-3 h-3" />
                                  : <AlertCircle className="w-3 h-3" />}
                                {t.status.charAt(0) + t.status.slice(1).toLowerCase()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {createPortal(
        <PopupForm
          formfield={visibleField}
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          onSubmit={handleSubmit}
          title='Housing Cooperative Payment'
          submitLabel='Confirm Payment'
        />,
        document.body
      )}
     {createPortal(
      <PopupMessage isOpen={open} title={title} message={message} type={error} onClose={()=>closemessage()}/>
     , document.body)}
     {
      createPortal(<PopupForm formfield={idField}
          isOpen={idOpen}
          onClose={() => setIdOpen(false)}
          onSubmit={submitId}/>, document.body)
     }
     {createPortal(
      <PopupMessage isOpen={openms} title={titlems} message={messagems} type={errorms} onClose={()=>setopenms(false)}/>
     ,document.body)}
     

{showModal && createPortal(
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl">
      
      {/* Header */}
      <div className="bg-[#003000] px-6 py-5 flex items-center justify-between">
        <h3 className="text-white font-semibold text-lg">
          {showInstallment ? 'Installment plan' : 'Purchase property'}
        </h3>
        <button onClick={() => setShowModal(false)} className="text-white/70 hover:text-white text-xl">✕</button>
      </div>

      <div className="p-6 space-y-4">
        {/* Property info */}
        <div className="bg-[#FDF6EC] rounded-xl p-4 flex gap-3 items-start">
          <div className="bg-[#003000] rounded-lg p-2.5"><RiHome5Line className="text-white text-xl" /></div>
          <div>
            <p className="font-semibold text-[#003000]">{findApartment.title}</p>
            <p className="text-sm text-[#2E7D32]">{findApartment.city}, {findApartment.state}</p>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
              {findApartment.status}
            </span>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Price details */}
        {!showInstallment ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Property type</span><span className="font-medium capitalize">{findApartment.property_type}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Beds / Baths</span><span className="font-medium">{findApartment.bedrooms} bed / {findApartment.bathrooms} bath</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Area</span><span className="font-medium">{parseFloat(findApartment.area_sqm).toFixed(0)} sqm</span></div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-gray-500 text-sm">Total price</span>
              <span className="text-xl font-bold text-[#F57C00] flex items-center">₦{Number(findApartment.price).toLocaleString()}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Total price</span><span className="font-medium flex items-center">₦{Number(findApartment.price).toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Initial deposit</span><span className="font-medium flex items-center">₦{Number(detailedApartment.minimum_initial_deposit).toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Duration</span><span className="font-medium">{detailedApartment.installment_duration_months} months</span></div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-gray-500 text-sm">Monthly</span>
              <span className="text-xl font-bold text-[#F57C00] flex items-center">₦{Math.round((Number(findApartment.price))- Number(detailedApartment.minimum_initial_deposit))/ Number(detailedApartment.installment_duration_months) }/mo</span>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={()=>showInstallment ?Payinstallment(findApartment, detailedApartment): Purchase(findApartment)} className={`flex-1 py-3 rounded-xl text-sm text-white font-semibold ${showInstallment ? 'bg-[#F57C00]' : 'bg-[#003000]'}`}>
            {showInstallment ? ' Pay installment' : 'Purchase now'}
          </button>
        </div>
      </div>
    </div>
  </div>,
  document.body
)}
    </div>
  );
};

export default HousingCooperative;