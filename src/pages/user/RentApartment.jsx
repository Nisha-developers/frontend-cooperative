import React, { useState } from 'react';
import { 
  Home, 
  MapPin, 
  Calendar, 
  DollarSign,
  Clock,
  CreditCard,
  ChevronRight,
  Users,
  Bed,
  Bath,
  Square,
  History,
  TrendingUp
} from 'lucide-react';

const RentApartment = () => {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Sample apartment data
  const apartments = [
    {
      id: 1,
      name: 'Sunset Villa',
      location: 'Lekki Phase 1, Lagos',
      price: 250,
      pricePerDay: 250,
      duration: '3 months',
      totalPrice: 22500,
      allocated: '85%',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
      beds: 3,
      baths: 2,
      sqft: 1450,
      occupants: '2-4 people',
      nextPayment: '2024-04-15',
     
    },
    {
      id: 2,
      name: 'Ocean Breeze Tower',
      location: 'Victoria Island, Lagos',
      price: 350,
      pricePerDay: 350,
      duration: '6 months',
      totalPrice: 63000,
      allocated: '60%',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500',
      beds: 4,
      baths: 3,
      sqft: 2100,
      occupants: '4-6 people',
      nextPayment: '2024-04-20',
     
    }
  ];

  // Payment history
  const paymentHistory = [
    {
      id: 1,
      apartmentName: 'Sunset Villa',
      date: '2024-03-15',
      amount: 7500,
      status: 'completed',
      type: 'Monthly Rent'
    },
    {
      id: 2,
      apartmentName: 'Sunset Villa',
      date: '2024-02-15',
      amount: 7500,
      status: 'completed',
      type: 'Monthly Rent'
    },
    {
      id: 3,
      apartmentName: 'Sunset Villa',
      date: '2024-01-15',
      amount: 7500,
      status: 'completed',
      type: 'Monthly Rent'
    },
    {
      id: 4,
      apartmentName: 'Ocean Breeze Tower',
      date: '2024-03-10',
      amount: 10500,
      status: 'completed',
      type: 'Monthly Rent'
    },
    {
      id: 5,
      apartmentName: 'Ocean Breeze Tower',
      date: '2024-02-10',
      amount: 10500,
      status: 'completed',
      type: 'Monthly Rent'
    }
  ];

  // Active rentals
  const activeRentals = [
    {
      id: 1,
      apartmentName: 'Sunset Villa',
      location: 'Lekki Phase 1, Lagos',
      nextPayment: '2024-04-15',
      amountDue: 7500,
      daysLeft: 5,
      progress: 85,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500'
    },
    {
      id: 2,
      apartmentName: 'Ocean Breeze Tower',
      location: 'Victoria Island, Lagos',
      nextPayment: '2024-04-20',
      amountDue: 10500,
      daysLeft: 10,
      progress: 60,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cooperative-dark">Rent an Apartment</h1>
          <p className="text-cooperative-dark/70 mt-2">Find your perfect rental home</p>
        </div>
        <div className="flex items-center gap-4">
         
        </div>
      </div>

      {/* Active Rentals with Continue Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeRentals.map((rental) => (
          <div key={rental.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cooperative-dark/5 hover:shadow-xl transition-all">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 mt-10 md:h-auto">
                <img 
                  src={rental.image} 
                  alt={rental.apartmentName}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="flex-1 p-6 max-md:mt-[6rem]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-cooperative-dark">{rental.apartmentName}</h3>
                    <div className="flex items-center gap-1 text-cooperative-dark/60 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{rental.location}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-cooperative-teal/10 text-cooperative-teal rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>

              
                {/* Next Payment Info */}
                <div className="mt-4">
                  <div className="bg-cooperative-cream/50 rounded-lg p-3">
                  </div>
                  <div className="bg-cooperative-cream/50 rounded-lg p-3">
                    <span className="text-xs text-cooperative-dark/60">Amount Due</span>
                    <div className="flex items-center gap-1 mt-1">
                      <DollarSign className="w-4 h-4 text-cooperative-orange" />
                      <span className="text-sm font-medium text-cooperative-dark">${rental.amountDue}</span>
                    </div>
                  </div>
                </div>

                {/* Continue Payment Button */}
                <button 
                  onClick={() => {
                    setSelectedApartment(rental);
                    setShowPaymentModal(true);
                  }}
                  className="w-full mt-4 px-4 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors font-medium flex items-center justify-center gap-2 group"
                >
                  <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Continue Payment
                
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Available Apartments Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cooperative-dark">Available Apartments</h2>
          <button className="text-cooperative-orange hover:text-cooperative-orange/80 font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apartments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-cooperative-dark/5 hover:shadow-xl transition-all">
              <div className="h-48 overflow-hidden">
                <img 
                  src={apt.image} 
                  alt={apt.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-cooperative-dark">{apt.name}</h3>
                    <div className="flex items-center gap-1 text-cooperative-dark/60 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{apt.location}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-cooperative-orange/10 text-cooperative-orange rounded-full text-sm font-medium">
                    {apt.allocated} Allocated
                  </span>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="flex items-center gap-1 text-cooperative-dark/70">
                    <Bed className="w-4 h-4 text-cooperative-teal" />
                    <span className="text-sm">{apt.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1 text-cooperative-dark/70">
                    <Bath className="w-4 h-4 text-cooperative-teal" />
                    <span className="text-sm">{apt.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-1 text-cooperative-dark/70">
                    <Square className="w-4 h-4 text-cooperative-teal" />
                    <span className="text-sm">{apt.sqft} sqft</span>
                  </div>
                </div>

                {/* Price and Duration */}
                <div className="flex items-center justify-between mt-4 p-4 bg-cooperative-cream/50 rounded-xl max-sm:flex-col max-sm:items-start max-sm:gap-4">
                  <div>
                    <span className="text-xs text-cooperative-dark/60">Price per day</span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-cooperative-orange" />
                      <span className="text-lg font-bold text-cooperative-dark">${apt.pricePerDay}</span>
                    </div>
                  </div>
                  <div className="text-right max-sm:text-left">
                    <span className="text-xs text-cooperative-dark/60">Duration</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-cooperative-orange" />
                      <span className="text-sm font-medium text-cooperative-dark">{apt.duration}</span>
                    </div>
                  </div>
                  <div className="text-right sm:text-left">
                    <span className="text-xs text-cooperative-dark/60">Total</span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-cooperative-orange" />
                      <span className="text-sm font-bold text-cooperative-dark">${apt.totalPrice}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-3 bg-cooperative-teal text-white rounded-xl hover:bg-cooperative-teal/90 transition-colors font-medium">
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-cooperative-teal" />
            <h2 className="text-2xl font-bold text-cooperative-dark">Payment History</h2>
          </div>
          <select className="px-4 py-2 bg-white border border-cooperative-dark/10 rounded-xl text-cooperative-dark focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20">
            <option>Last 6 months</option>
            <option>Last 3 months</option>
            <option>Last year</option>
            <option>All time</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cooperative-cream">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Apartment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cooperative-dark">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cooperative-dark/5">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-cooperative-cream/30 transition-colors">
                    <td className="px-6 py-4 text-cooperative-dark font-medium">{payment.apartmentName}</td>
                    <td className="px-6 py-4 text-cooperative-dark/70">{payment.date}</td>
                    <td className="px-6 py-4 text-cooperative-dark/70">{payment.type}</td>
                    <td className="px-6 py-4 text-cooperative-dark font-semibold">${payment.amount}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-cooperative-dark/60">Total Spent</span>
              <div className="text-2xl font-bold text-cooperative-dark mt-1">$43,500</div>
            </div>
            <div className="w-12 h-12 bg-cooperative-teal/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-cooperative-teal" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-cooperative-dark/60">Active Rentals</span>
              <div className="text-2xl font-bold text-cooperative-dark mt-1">2</div>
            </div>
            <div className="w-12 h-12 bg-cooperative-orange/10 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-cooperative-orange" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-cooperative-dark/60">Next Payment</span>
              <div className="text-2xl font-bold text-cooperative-dark mt-1">$7,500</div>
            </div>
            <div className="w-12 h-12 bg-cooperative-teal/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-cooperative-teal" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-cooperative-dark/60">Days to Next</span>
              <div className="text-2xl font-bold text-cooperative-dark mt-1">5</div>
            </div>
            <div className="w-12 h-12 bg-cooperative-orange/10 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-cooperative-orange" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedApartment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-spinIn">
            <h3 className="text-2xl font-bold text-cooperative-dark mb-4">Continue Payment</h3>
            
            <div className="space-y-4">
              <div className="bg-cooperative-cream rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedApartment.image} 
                    alt={selectedApartment.apartmentName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-cooperative-dark">{selectedApartment.apartmentName}</h4>
                    <p className="text-sm text-cooperative-dark/60">{selectedApartment.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-cooperative-dark/10">
                <span className="text-cooperative-dark/70">Monthly Rent</span>
                <span className="font-semibold text-cooperative-dark">${selectedApartment.amountDue}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-cooperative-dark/10">
                <span className="text-cooperative-dark/70">Service Charge</span>
                <span className="font-semibold text-cooperative-dark">$50</span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-cooperative-dark font-semibold">Total</span>
                <span className="text-2xl font-bold text-cooperative-orange">${selectedApartment.amountDue + 50}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-3 border border-cooperative-dark/20 text-cooperative-dark rounded-xl hover:bg-cooperative-cream transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-3 bg-cooperative-orange text-white rounded-xl hover:bg-cooperative-orange/90 transition-colors">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentApartment;