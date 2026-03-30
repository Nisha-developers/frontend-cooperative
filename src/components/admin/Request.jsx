import React from 'react'
import { CheckCircle, Clock, XCircle, User, Home, CreditCard, DollarSign, FileText } from 'lucide-react';

const Request = ({ labels, infoObj, onAccept, onPending, onReject }) => {
  // Define configurations for different request types
  const getRequestConfig = () => {
    switch(labels?.type) {
      case 'house':
        return {
          title: labels.title || 'Property Request',
          amountLabel: labels.amountLabel || 'Price:',
          dateLabel: 'Requested on',
          icon: Home,
          iconBg: 'from-blue-500 to-blue-600',
          statusColors: {
            accepted: 'bg-green-100 text-green-700',
            pending: 'bg-blue-100 text-blue-700',
            rejected: 'bg-red-100 text-red-700'
          }
        };
      case 'loan':
        return {
          title: labels.title || 'Loan Request',
          amountLabel: labels.amountLabel || 'Loan amount requested:',
          dateLabel: 'Requested on',
          icon: CreditCard,
          iconBg: 'from-indigo-500 to-indigo-600',
          statusColors: {
            accepted: 'bg-green-100 text-green-700',
            pending: 'bg-yellow-100 text-yellow-700',
            rejected: 'bg-red-100 text-red-700'
          }
        };
      case 'payment':
        return {
          title: labels.title || 'Payment Approval',
          amountLabel: labels.amountLabel || 'Payment amount:',
          dateLabel: 'Submitted on',
          icon: DollarSign,
          iconBg: 'from-emerald-500 to-emerald-600',
          statusColors: {
            accepted: 'bg-green-100 text-green-700',
            pending: 'bg-purple-100 text-purple-700',
            rejected: 'bg-red-100 text-red-700'
          }
        };
      default:
        return {
          title: 'Request',
          amountLabel: 'Amount:',
          dateLabel: 'Requested on',
          icon: FileText,
          iconBg: 'from-gray-500 to-gray-600',
          statusColors: {
            accepted: 'bg-green-100 text-green-700',
            pending: 'bg-gray-100 text-gray-700',
            rejected: 'bg-red-100 text-red-700'
          }
        };
    }
  };

  const config = getRequestConfig();
  const IconComponent = config.icon;

  // Helper function to get user display name
  const getUserName = (item) => {
    if (labels?.type === 'house') {
      return item.userName || item.buyerName || item.renterName;
    } else if (labels?.type === 'payment') {
      return item.userName || item.payerName;
    }
    return item.userName;
  };

  // Helper function to get amount
  const getAmount = (item) => {
    if (labels?.type === 'house') {
      return item.price || item.amount;
    } else if (labels?.type === 'payment') {
      return item.paymentAmount || item.amount;
    }
    return item.amount;
  };

  // Helper function to get additional details
  const getAdditionalDetails = (item) => {
    if (labels?.type === 'house') {
      return (
        <>
          {item.propertyType && (
            <p className="text-sm text-gray-500">
              Property: {item.propertyType} • {item.bedrooms} beds • {item.bathrooms} baths
            </p>
          )}
          {item.location && (
            <p className="text-sm text-gray-500">
              Location: {item.location}
            </p>
          )}
        </>
      );
    } else if (labels?.type === 'loan') {
      return (
        <>
          {item.tenure && (
            <p className="text-sm text-gray-500">
              Tenure: {item.tenure} months
            </p>
          )}
          {item.interestRate && (
            <p className="text-sm text-gray-500">
              Interest Rate: {item.interestRate}%
            </p>
          )}
        </>
      );
    } else if (labels?.type === 'payment') {
      return (
        <>
          {item.paymentMethod && (
            <p className="text-sm text-gray-500">
              Method: {item.paymentMethod}
            </p>
          )}
          {item.referenceNumber && (
            <p className="text-sm text-gray-500">
              Ref: {item.referenceNumber}
            </p>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <ul className="space-y-4">
        {infoObj?.map((item, index) => (
          <li 
            key={item.id || index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="p-5 sm:p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                {/* User Info Section */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 bg-gradient-to-br ${config.iconBg} rounded-full flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {getUserName(item)}
                      </h3>
                      {item.status && (
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          config.statusColors[item.status.toLowerCase()] || 
                          (item.status === 'accepted' ? 'bg-green-100 text-green-700' :
                           item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                           'bg-red-100 text-red-700')
                        }`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600">
                      {config.amountLabel}
                      <span className="font-semibold text-gray-900 ml-1">
                        ₹{getAmount(item)?.toLocaleString()}
                      </span>
                    </p>
                    
                    {getAdditionalDetails(item)}
                    
                    <p className="text-sm text-gray-400 mt-1">
                      {config.dateLabel} {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons Section */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                  <button 
                    onClick={() => onAccept?.(item)}
                    className="group flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                  
                  <button 
                    onClick={() => onPending?.(item)}
                    className="group flex items-center gap-2 px-4 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Pending</span>
                  </button>
                  
                  <button 
                    onClick={() => onReject?.(item)}
                    className="group flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Request;