import React from 'react'
import { CheckCircle, Clock, XCircle, User, Home, CreditCard, DollarSign, FileText, } from 'lucide-react';
import { FaNairaSign } from "react-icons/fa6";

const Request = ({ labels, infoObj, onAccept, onPending, onReject }) => {
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
      case 'transactions':
        return {
          title: labels.title || 'Payment Approval',
          amountLabel: labels.amountLabel || 'Payment amount:',
          dateLabel: 'Submitted on',
          icon: FaNairaSign,
          iconBg: 'from-emerald-500 to-emerald-600',
          statusColors: {
            accepted: 'bg-green-100 text-green-700',
            pending: 'bg-purple-100 text-purple-700',
            rejected: 'bg-red-100 text-red-700'
          }
        };
      case 'rent':
        return {
          title: labels.title || 'Rent Request',
          amountLabel: labels.amountLabel || 'Price per day:',
          dateLabel: 'Requested on',
          icon: Home,
          iconBg: 'from-orange-500 to-orange-600',
          statusColors: {
            accepted: 'bg-green-100 text-green-700',
            pending: 'bg-orange-100 text-orange-700',
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

  const getUserName = (item) => {
    if (labels?.type === 'house') {
      return item.listing_title || item.buyerName || item.renterName;
    } else if (labels?.type === 'transactions') {
      return item.full_name || item.payerName;
    } else if (labels?.type === 'rent') {
      return item.listing_title;
    }
    return item.user_email;
  };

  const getAmount = (item) => {
    if (labels?.type === 'house') {
      return item.property_price || item.amount;
    } else if (labels?.type === 'transactions') {
      return item.paymentAmount || item.amount;
    } else if (labels?.type === 'rent') {
      return item.price_per_day;
    }
    return item.principal;
  };

  const getDate = (item) => {
    if (labels?.type === 'transactions') {
      return new Date(item.updated_on).toLocaleDateString();
    } else if (labels?.type === 'loan') {
      return new Date(item.created_at).toLocaleDateString();
    } else if (labels?.type === 'rent') {
      return new Date(item.created_at).toLocaleDateString();
    } else {
      return new Date(item.created_at).toLocaleDateString();
    }
  };

  const getAdditionalDetails = (item) => {
    if (labels?.type === 'house') {
      return (
        <>
          {item.property_type && (
            <p className="text-sm text-gray-500">
              Property: {item.property_type} • {item.purchase_type}
            </p>
          )}
          {item.listing_address && (
            <p className="text-sm text-gray-500">
              Location: {item.listing_address}
            </p>
          )}
          {item.user_email && (
            <p className="text-sm text-gray-500">
              Email: {item.user_email}
            </p>
          )}
        </>
      );
    } else if (labels?.type === 'loan') {
      return (
        <>
          {item.tenure_months && (
            <p className="text-sm text-gray-500">
              Tenure: {item.tenure_months} months
            </p>
          )}
          {item.interest_rate && (
            <p className="text-sm text-gray-500">
              Interest Rate: {0.5}% pa
            </p>
          )}
        </>
      );
    } else if (labels?.type === 'transactions') {
      return (
        <>
          {item.source && (
            <p className="text-sm text-gray-500">
              Method: {item.source}
            </p>
          )}
          {item.reference && (
            <p className="text-sm text-gray-500">
              Ref: {item.reference}
            </p>
          )}
        </>
      );
    } else if (labels?.type === 'rent') {
      return (
        <>
          {item.duration_days && (
            <p className="text-sm text-gray-500">
              Duration: {item.duration_days} day{item.duration_days > 1 ? 's' : ''}
            </p>
          )}
          {item.total_rent_cost && (
            <p className="text-sm text-gray-500">
              Total Cost: ₦{Number(item.total_rent_cost).toLocaleString()}
            </p>
          )}
          {item.listing_address && (
            <p className="text-sm text-gray-500">
              Location: {item.listing_address}
            </p>
          )}
          {item.user_email && (
            <p className="text-sm text-gray-500">
              Email: {item.user_email}
            </p>
          )}
          {item.property_type && (
            <p className="text-sm text-gray-500">
              Property type: {item.property_type}
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
            key={item.uid || item.id || index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="p-5 sm:p-6">
              <div className="md:flex md:justify-between">
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
                        ₦{Number(getAmount(item)).toLocaleString()}
                      </span>
                    </p>

                    {getAdditionalDetails(item)}

                    <p className="text-sm text-gray-400 mt-1">
                      {config.dateLabel} {getDate(item)}
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
  );
};

export default Request;