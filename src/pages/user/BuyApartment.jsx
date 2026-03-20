import React, { useState } from 'react';
import { 
  Home, 
  MapPin, 
  DollarSign,
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

const BuyApartment = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showAllProperties, setShowAllProperties] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState(null); // 'full', 'installment', 'savings'
  const [likedProperties, setLikedProperties] = useState([]);

  // Sample properties for sale with multiple payment options
  const availableProperties = [
    {
      id: 1,
      name: 'Sunset Luxury Villa',
      location: 'Lekki Phase 1, Lagos',
      fullPrice: 450000,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
      beds: 4,
      baths: 3,
      size: 1450,
      propertyType: 'Detached House',
      furnished: true,
      rating: 4.9,
      features: ['Swimming Pool', 'Garden', 'Parking', 'CCTV'],
      paymentOptions: {
        full: {
          price: 450000,
          discount: '5% cash discount',
          finalPrice: 427500
        },
        installment: {
          downPayment: 90000, // 20%
          monthlyPayment: 7500,
          duration: '48 months',
          totalInterest: 36000,
          finalPrice: 486000
        },
        savings: {
          minMonthly: 1000,
          recommended: 2500,
          membersNeeded: 8,
          estimatedCompletion: '18 months',
          yourShare: 56250 // based on contribution
        }
      },
      agent: {
        name: 'Sarah Johnson',
        phone: '+234 801 234 5678',
        email: 'sarah@properties.ng',
        company: 'Luxury Homes Realty'
      }
    },
    {
      id: 2,
      name: 'Oceanview Penthouse',
      location: 'Victoria Island, Lagos',
      fullPrice: 780000,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500',
      beds: 5,
      baths: 4,
      size: 2100,
      propertyType: 'Penthouse',
      furnished: true,
      rating: 5.0,
      features: ['Ocean View', 'Private Elevator', 'Terrace', 'Smart Home'],
      paymentOptions: {
        full: {
          price: 780000,
          discount: '5% cash discount',
          finalPrice: 741000
        },
        installment: {
          downPayment: 156000, // 20%
          monthlyPayment: 13000,
          duration: '48 months',
          totalInterest: 62400,
          finalPrice: 842400
        },
        savings: {
          minMonthly: 2000,
          recommended: 3500,
          membersNeeded: 12,
          estimatedCompletion: '24 months',
          yourShare: 65000
        }
      },
      agent: {
        name: 'Michael Obi',
        phone: '+234 802 345 6789',
        email: 'michael@properties.ng',
        company: 'Premier Estates'
      }
    },
    {
      id: 3,
      name: 'Green Garden Residence',
      location: 'Ikeja, Lagos',
      fullPrice: 285000,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500',
      beds: 3,
      baths: 2,
      size: 1100,
      propertyType: 'Semi-detached',
      furnished: false,
      rating: 4.7,
      features: ['Garden', 'Parking', 'Children Play Area'],
      paymentOptions: {
        full: {
          price: 285000,
          discount: '5% cash discount',
          finalPrice: 270750
        },
        installment: {
          downPayment: 57000, // 20%
          monthlyPayment: 4750,
          duration: '48 months',
          totalInterest: 22800,
          finalPrice: 307800
        },
        savings: {
          minMonthly: 800,
          recommended: 1500,
          membersNeeded: 15,
          estimatedCompletion: '12 months',
          yourShare: 19000
        }
      },
      agent: {
        name: 'Amara Nwosu',
        phone: '+234 803 456 7890',
        email: 'amara@properties.ng',
        company: 'Greenfield Realty'
      }
    },
    {
      id: 4,
      name: 'Pearl Luxury Duplex',
      location: 'Banana Island, Lagos',
      fullPrice: 1250000,
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500',
      beds: 6,
      baths: 5,
      size: 3200,
      propertyType: 'Duplex',
      furnished: true,
      rating: 5.0,
      features: ['Waterfront', 'Private Pool', 'Gym', 'Home Theater'],
      paymentOptions: {
        full: {
          price: 1250000,
          discount: '5% cash discount',
          finalPrice: 1187500
        },
        installment: {
          downPayment: 250000, // 20%
          monthlyPayment: 20833,
          duration: '48 months',
          totalInterest: 100000,
          finalPrice: 1350000
        },
        savings: {
          minMonthly: 3000,
          recommended: 5000,
          membersNeeded: 6,
          estimatedCompletion: '30 months',
          yourShare: 208333
        }
      },
      agent: {
        name: 'Chidi Eze',
        phone: '+234 804 567 8901',
        email: 'chidi@properties.ng',
        company: 'Luxury Living Ltd'
      }
    },
    {
      id: 5,
      name: 'Harbor Heights Apartment',
      location: 'Ajah, Lagos',
      fullPrice: 195000,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500',
      beds: 2,
      baths: 2,
      size: 900,
      propertyType: 'Apartment',
      furnished: true,
      rating: 4.6,
      features: ['Gym', 'Swimming Pool', '24/7 Security'],
      paymentOptions: {
        full: {
          price: 195000,
          discount: '5% cash discount',
          finalPrice: 185250
        },
        installment: {
          downPayment: 39000, // 20%
          monthlyPayment: 3250,
          duration: '48 months',
          totalInterest: 15600,
          finalPrice: 210600
        },
        savings: {
          minMonthly: 600,
          recommended: 1200,
          membersNeeded: 20,
          estimatedCompletion: '8 months',
          yourShare: 9750
        }
      },
      agent: {
        name: 'Oluwaseun Adeleke',
        phone: '+234 805 678 9012',
        email: 'seun@properties.ng',
        company: 'Coastal Homes'
      }
    }
  ];

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
  const displayedProperties = showAllProperties ? availableProperties : availableProperties.slice(0, 2);

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
          <p className="text-cooperative-dark/70 mt-2">Choose your preferred payment method - Full, Installment, or Cooperative Savings</p>
        </div>
      </div>

      {/* Portfolio Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-cooperative-teal to-cooperative-teal/80 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white/80 text-sm">Properties Owned</span>
              <div className="text-3xl font-bold mt-1">{totalPropertiesPurchased}</div>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Building className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-cooperative-dark/60 text-sm">Total Spent</span>
              <div className="text-2xl font-bold text-cooperative-dark mt-1">${totalSpent.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 bg-cooperative-orange/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-cooperative-orange" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-cooperative-dark/60 text-sm">Active Plans</span>
              <div className="text-2xl font-bold text-cooperative-dark mt-1">{activePlansCount}</div>
            </div>
            <div className="w-12 h-12 bg-cooperative-teal/10 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-cooperative-teal" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-cooperative-dark/5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-cooperative-dark/60 text-sm">Average Price</span>
              <div className="text-2xl font-bold text-cooperative-dark mt-1">${averagePropertyPrice.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 bg-cooperative-orange/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-cooperative-orange" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Plans Section */}
      {activePlans.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6">
            <Wallet className="w-6 h-6 text-cooperative-teal" />
            <h2 className="text-2xl font-bold text-cooperative-dark">Your Active Plans</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activePlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cooperative-dark/5 hover:shadow-xl transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={plan.image} 
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-cooperative-dark">{plan.name}</h3>
                        <div className="flex items-center gap-1 text-cooperative-dark/60 mt-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{plan.location}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        plan.planType === 'Installment' 
                          ? 'bg-cooperative-orange/10 text-cooperative-orange'
                          : 'bg-cooperative-teal/10 text-cooperative-teal'
                      }`}>
                        {plan.planType}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-cooperative-dark/70">Payment Progress</span>
                        <span className="text-cooperative-teal font-medium">{plan.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-cooperative-cream rounded-full mt-1">
                        <div 
                          className="h-full bg-cooperative-teal rounded-full transition-all duration-500"
                          style={{ width: `${plan.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-cooperative-cream/50 rounded-lg p-3">
                        <span className="text-xs text-cooperative-dark/60">Paid So Far</span>
                        <div className="text-lg font-bold text-cooperative-dark">${plan.paidSoFar.toLocaleString()}</div>
                      </div>
                      <div className="bg-cooperative-cream/50 rounded-lg p-3">
                        <span className="text-xs text-cooperative-dark/60">Remaining</span>
                        <div className="text-lg font-bold text-cooperative-dark">${plan.remaining.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-cooperative-orange" />
                        <span className="text-cooperative-dark/70">Next: {plan.nextPayment}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-cooperative-orange" />
                        <span className="font-medium text-cooperative-dark">${plan.nextAmount}</span>
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
            <h2 className="text-2xl font-bold text-cooperative-dark">Available Properties</h2>
            <p className="text-cooperative-dark/60 mt-1">Choose your payment method</p>
          </div>
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-cooperative-dark/10">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-cooperative-teal text-white' : 'text-cooperative-dark/60 hover:text-cooperative-teal'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-cooperative-teal text-white' : 'text-cooperative-dark/60 hover:text-cooperative-teal'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            
            {!showAllProperties && availableProperties.length > 2 && (
              <button 
                onClick={() => setShowAllProperties(true)}
                className="px-4 py-2 bg-cooperative-orange text-white rounded-lg hover:bg-cooperative-orange/90 transition-colors font-medium flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View All ({availableProperties.length})
              </button>
            )}
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
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
          : "space-y-4"
        }>
          {displayedProperties.map((property) => (
            <div 
              key={property.id} 
              className={`bg-white rounded-xl shadow-lg overflow-hidden border border-cooperative-dark/5 hover:shadow-xl transition-all ${
                viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
              }`}
            >
              <div className="relative">
                <div className={viewMode === 'list' ? 'md:w-64 h-48 md:h-48' : 'h-48'}>
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <button 
                  onClick={() => toggleLike(property.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      likedProperties.includes(property.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-cooperative-dark'
                    }`} 
                  />
                </button>
                {property.furnished && (
                  <span className="absolute bottom-3 left-3 px-2 py-1 bg-cooperative-teal/90 text-white text-xs rounded-lg backdrop-blur-sm">
                    Furnished
                  </span>
                )}
              </div>
              
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-cooperative-dark">{property.name}</h3>
                    <div className="flex items-center gap-1 text-cooperative-dark/60 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-cooperative-teal/10 text-cooperative-teal rounded-full text-sm font-medium">
                    ★ {property.rating}
                  </span>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1 text-cooperative-dark/70">
                    <Bed className="w-4 h-4 text-cooperative-teal" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1 text-cooperative-dark/70">
                    <Bath className="w-4 h-4 text-cooperative-teal" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-1 text-cooperative-dark/70">
                    <Square className="w-4 h-4 text-cooperative-teal" />
                    <span>{property.size} sqft</span>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="mt-4 space-y-3">
                  {/* Full Payment Option */}
                  <div className="bg-cooperative-cream/50 rounded-xl p-3 hover:bg-cooperative-cream transition-colors cursor-pointer"
                       onClick={() => handlePaymentOption(property, 'full')}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-cooperative-teal/10 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-cooperative-teal" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-cooperative-dark">One-time Payment</span>
                          <p className="text-xs text-cooperative-dark/60">{property.paymentOptions.full.discount}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-cooperative-dark">${property.paymentOptions.full.finalPrice.toLocaleString()}</span>
                        <p className="text-xs text-cooperative-dark/40 line-through">${property.fullPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Installment Option */}
                  <div className="bg-cooperative-cream/50 rounded-xl p-3 hover:bg-cooperative-cream transition-colors cursor-pointer"
                       onClick={() => handlePaymentOption(property, 'installment')}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-cooperative-orange/10 rounded-lg flex items-center justify-center">
                          <Percent className="w-4 h-4 text-cooperative-orange" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-cooperative-dark">Installment Plan</span>
                          <p className="text-xs text-cooperative-dark/60">{property.paymentOptions.installment.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-cooperative-dark">${property.paymentOptions.installment.monthlyPayment}/mo</span>
                        <p className="text-xs text-cooperative-dark/60">${property.paymentOptions.installment.downPayment.toLocaleString()} down</p>
                      </div>
                    </div>
                  </div>

                  {/* Savings Option */}
                  <div className="bg-cooperative-cream/50 rounded-xl p-3 hover:bg-cooperative-cream transition-colors cursor-pointer"
                       onClick={() => handlePaymentOption(property, 'savings')}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-cooperative-teal/10 rounded-lg flex items-center justify-center">
                          <PiggyBank className="w-4 h-4 text-cooperative-teal" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-cooperative-dark">Cooperative Savings</span>
                          <p className="text-xs text-cooperative-dark/60">{property.paymentOptions.savings.membersNeeded} members needed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-cooperative-dark">${property.paymentOptions.savings.recommended}/mo</span>
                        <p className="text-xs text-cooperative-dark/60">Min ${property.paymentOptions.savings.minMonthly}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <button className="w-full mt-4 px-4 py-2 border border-cooperative-teal text-cooperative-teal rounded-lg hover:bg-cooperative-teal/5 transition-colors text-sm font-medium">
                  View Property Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchased Properties History */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-6 h-6 text-cooperative-teal" />
          <h2 className="text-2xl font-bold text-cooperative-dark">Purchased Properties</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {purchasedProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl p-4 shadow-lg border border-cooperative-dark/5 flex items-center gap-3">
              <img 
                src={property.image} 
                alt={property.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-cooperative-dark text-sm">{property.name}</h4>
                <p className="text-xs text-cooperative-dark/60">{property.purchaseDate}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-medium text-cooperative-teal">{property.paymentMethod}</span>
                  <span className="text-sm font-bold text-cooperative-dark">${property.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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