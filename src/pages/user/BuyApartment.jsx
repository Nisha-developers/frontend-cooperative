import React, { useState } from 'react';
import { 
  Home, 
  MapPin,
  Bed,
  Bath,
  Square,
  History,
  TrendingUp,
  Eye,
  Grid,
  List,
  Shield,
  Key,
  FileText,
  CheckCircle,
  Star,
  Phone,
  Mail,
  Heart,
  PiggyBank,
  Target,
  Clock,
  Calendar,
  CreditCard,
  ArrowRight,
  Building,
  Award,
  Wallet,
  Percent
} from 'lucide-react';
import { FaNairaSign } from 'react-icons/fa6';

const BuyApartment = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showAllProperties, setShowAllProperties] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState(null); // 'full', 'installment', 'savings'
  const [likedProperties, setLikedProperties] = useState([]);
  const propertyBought =JSON.parse(localStorage.getItem('purchaseVal')); 

  console.log(propertyBought);

  // Purchased Properties History
  const purchasedProperties = [
    {
      id: 1,
      name: 'Sunset Luxury Villa',
      location: 'Lekki Phase 1, Lagos',
      purchaseDate: 'March 15, 2024',
      price: 427500,
      paymentMethod: 'One-time Payment',
      type: 'Full Purchase',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Green Garden Residence',
      location: 'Ikeja, Lagos',
      purchaseDate: 'January 10, 2024',
      price: 307800,
      paymentMethod: 'Installment Plan',
      type: '48 months',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Harbor Heights Apartment',
      location: 'Ajah, Lagos',
      purchaseDate: 'October 5, 2023',
      price: 185250,
      paymentMethod: 'Cooperative Savings',
      type: '8 months',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500',
      status: 'completed'
    }
  ];

  // Active Installment/Savings Plans
  const activePlans = [
    {
      id: 1,
      name: 'Oceanview Penthouse',
      location: 'Victoria Island, Lagos',
      planType: 'Installment',
      totalPrice: 842400,
      paidSoFar: 210000,
      remaining: 632400,
      progress: 25,
      nextPayment: '2024-04-20',
      nextAmount: 13000,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500'
    },
    {
      id: 2,
      name: 'Pearl Luxury Duplex',
      location: 'Banana Island, Lagos',
      planType: 'Savings',
      totalPrice: 1250000,
      paidSoFar: 312500,
      remaining: 937500,
      progress: 25,
      members: 6,
      yourShare: 208333,
      nextPayment: '2024-04-25',
      nextAmount: 5000,
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500'
    }
  ];

  // Transaction History
  const transactionHistory = [
    {
      id: 1,
      property: 'Oceanview Penthouse',
      date: '2024-03-20',
      type: 'Installment Payment',
      amount: 13000,
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      property: 'Pearl Luxury Duplex',
      date: '2024-03-15',
      type: 'Savings Contribution',
      amount: 5000,
      status: 'completed',
      method: 'Direct Debit'
    },
    {
      id: 3,
      property: 'Sunset Luxury Villa',
      date: '2024-03-10',
      type: 'Full Payment',
      amount: 427500,
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: 4,
      property: 'Oceanview Penthouse',
      date: '2024-02-20',
      type: 'Installment Payment',
      amount: 13000,
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: 5,
      property: 'Pearl Luxury Duplex',
      date: '2024-02-15',
      type: 'Savings Contribution',
      amount: 5000,
      status: 'completed',
      method: 'Direct Debit'
    },
    {
      id: 6,
      property: 'Green Garden Residence',
      date: '2024-01-10',
      type: 'Installment Payment',
      amount: 4750,
      status: 'completed',
      method: 'Bank Transfer'
    }
  ];

  // Calculate Statistics
  const totalPropertiesPurchased = purchasedProperties.length;
  const totalSpent = purchasedProperties.reduce((sum, prop) => sum + prop.price, 0);
  const activePlansCount = activePlans.length;
  const totalCommitted = activePlans.reduce((sum, plan) => sum + plan.totalPrice, 0);
  const totalPaidSoFar = activePlans.reduce((sum, plan) => sum + plan.paidSoFar, 0);
  const nextPaymentTotal = activePlans.reduce((sum, plan) => sum + plan.nextAmount, 0);
  const averagePropertyPrice = Math.round(totalSpent / totalPropertiesPurchased);

  const toggleLike = (propertyId) => {
    if (likedProperties.includes(propertyId)) {
      setLikedProperties(likedProperties.filter(id => id !== propertyId));
    } else {
      setLikedProperties([...likedProperties, propertyId]);
    }
  };

  // Display 2 properties by default, or all if "View All" is clicked
 

  const handlePaymentOption = (property, option) => {
    setSelectedProperty(property);
    setPaymentOption(option);
    setShowPaymentModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cooperative-dark">Buy an Apartment</h1>
          <p className="text-cooperative-dark/70 mt-2">Complete the payment to get an apartment according to what you have chosen to buy </p>
        </div>
      </div>

      {/* Portfolio Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      

      </div>

      {/* Active Plans Section */}
      {propertyBought.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6">
            <Wallet className="w-6 h-6 text-cooperative-teal" />
            <h2 className="text-2xl font-bold text-cooperative-dark">Your Active Plans</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {propertyBought.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cooperative-dark/5 hover:shadow-xl transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    {/* <img 
                      src={plan.image} 
                      alt={plan.title}
                      className="w-full h-full object-cover"
                    /> */}
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-cooperative-dark">{plan.title}</h3>
                        <div className="flex items-center gap-1 text-cooperative-dark/60 mt-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{plan.address} at {plan.city} in {plan.state}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        plan.allows_installment  
                          ? 'bg-cooperative-orange/10 text-cooperative-orange'
                          : 'bg-cooperative-teal/10 text-cooperative-teal'
                      }`}>
                        {plan.allows_installment? 'Installment':'Complete Payment'}
                      </span>
                    </div>
                    <div className="flex justify-between flex-wrap gap-4 mt-4 ">
                      <div className="bg-cooperative-cream/50 rounded-lg p-3">
                        <span className="text-xs text-cooperative-dark/60">Price</span>
                        <div className="text-lg font-bold text-cooperative-dark flex items-center"><FaNairaSign className="w-4 h-4 text-cooperative-orange" />{Number(plan.price).toLocaleString()}</div> 
                      </div>
                      <div className="bg-cooperative-cream/50 rounded-lg p-3">
                        <span className="text-xs text-cooperative-dark/60">{plan.allows_installment ? `Payment Duration` : ''}</span>
                        <div className="text-lg font-bold text-cooperative-dark">{plan.allows_installment ?`${plan.installment_duration_months} months` : ''}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-sm">
                      <div className="flex items-center gap-1">
                       {plan.allows_installment ? <div>Initial payment: <span className='font-bold'>{Number(plan.minimum_initial_deposit).toLocaleString()}</span></div> : ''}
                       </div>
                      <div className="flex items-center gap-1">
                        
                        <span className="font-medium text-cooperative-dark">{plan.area_sqm} sqm</span>
                      </div>
                    </div>

                    {/* Continue Payment Button */}
                    <button 
                      onClick={() => {
                        setSelectedProperty(plan);
                        setPaymentOption(plan.planType.toLowerCase());
                        setShowPaymentModal(true);
                      }}
                      className="w-full mt-4 px-4 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors font-medium flex items-center justify-center gap-2 group"
                    >
                      <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Continue Payment
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Properties for Sale */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
           
          
         
            
           
            {showAllProperties && (
              <button 
                onClick={() => setShowAllProperties(false)}
                className="px-4 py-2 border border-cooperative-dark/20 text-cooperative-dark rounded-lg hover:bg-cooperative-cream transition-colors font-medium"
              >
                Show Less
              </button>
            )}
          </div>
        </div>

        {/* Properties Grid/List View */}
      
      </div>

     

      {/* Transaction History */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <History className="w-6 h-6 text-cooperative-teal" />
          <h2 className="text-2xl font-bold text-cooperative-dark">Transaction History</h2>
          <span className="text-sm text-cooperative-dark/60 ml-2">({transactionHistory.length} transactions)</span>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cooperative-cream">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Method</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cooperative-dark/5">
                {transactionHistory.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-cooperative-cream/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-cooperative-dark">{transaction.property}</td>
                    <td className="px-6 py-4 text-cooperative-dark/70">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        transaction.type.includes('Full') ? 'bg-cooperative-teal/10 text-cooperative-teal' :
                        transaction.type.includes('Installment') ? 'bg-cooperative-orange/10 text-cooperative-orange' :
                        'bg-cooperative-teal/10 text-cooperative-teal'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-cooperative-dark/70">{transaction.method}</td>
                    <td className="px-6 py-4 font-semibold text-cooperative-dark">${transaction.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3" />
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-cooperative-cream/50">
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-right font-semibold text-cooperative-dark">
                    Total Transaction Value:
                  </td>
                  <td className="px-6 py-4 font-bold text-cooperative-orange text-lg">
                    ${(totalSpent + totalPaidSoFar).toLocaleString()}
                  </td>
                  <td className="px-6 py-4"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedProperty && paymentOption && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-spinIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-cooperative-dark">
                {paymentOption === 'full' ? 'Complete Purchase' : 
                 paymentOption === 'installment' ? 'Installment Payment' : 
                 'Savings Contribution'}
              </h3>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-cooperative-cream rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-cooperative-cream rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedProperty.image} 
                    alt={selectedProperty.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-cooperative-dark">{selectedProperty.name}</h4>
                    <p className="text-sm text-cooperative-dark/60">{selectedProperty.location}</p>
                  </div>
                </div>
              </div>

              {paymentOption === 'full' && (
                <>
                  <div className="flex justify-between items-center py-3 border-b border-cooperative-dark/10">
                    <span className="text-cooperative-dark/70">Original Price</span>
                    <span className="font-semibold text-cooperative-dark">${selectedProperty.fullPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-cooperative-dark/10 text-cooperative-teal">
                    <span className="flex items-center gap-1">
                      <Percent className="w-4 h-4" />
                      Cash Discount (5%)
                    </span>
                    <span>-${(selectedProperty.fullPrice * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-cooperative-dark font-semibold">Final Amount</span>
                    <span className="text-2xl font-bold text-cooperative-orange">
                      ${(selectedProperty.fullPrice * 0.95).toLocaleString()}
                    </span>
                  </div>
                </>
              )}

              {paymentOption === 'installment' && (
                <>
                  <div className="flex justify-between items-center py-3 border-b border-cooperative-dark/10">
                    <span className="text-cooperative-dark/70">Down Payment (20%)</span>
                    <span className="font-semibold text-cooperative-dark">${(selectedProperty.fullPrice * 0.2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-cooperative-dark/10">
                    <span className="text-cooperative-dark/70">Monthly Payment</span>
                    <span className="font-semibold text-cooperative-dark">${(selectedProperty.fullPrice * 0.2 / 12).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-cooperative-dark/10">
                    <span className="text-cooperative-dark/70">Duration</span>
                    <span className="font-semibold text-cooperative-dark">48 months</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-cooperative-dark font-semibold">Total with Interest</span>
                    <span className="text-2xl font-bold text-cooperative-orange">
                      ${(selectedProperty.fullPrice * 1.08).toLocaleString()}
                    </span>
                  </div>
                </>
              )}

              {paymentOption === 'savings' && (
                <>
                  <div className="bg-cooperative-teal/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cooperative-dark/70">Cooperative Members</span>
                      <span className="text-cooperative-teal font-bold">8 members</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cooperative-dark/70">Your Monthly Contribution</span>
                      <span className="font-bold text-cooperative-dark">$2,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cooperative-dark/70">Estimated Completion</span>
                      <span className="font-bold text-cooperative-dark">18 months</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-cooperative-dark font-semibold">Your Share</span>
                    <span className="text-2xl font-bold text-cooperative-orange">$45,000</span>
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-3 border border-cooperative-dark/20 text-cooperative-dark rounded-xl hover:bg-cooperative-cream transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors">
                  {paymentOption === 'full' ? 'Pay Now' : 
                   paymentOption === 'installment' ? 'Start Installment' : 
                   'Join Savings'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyApartment;