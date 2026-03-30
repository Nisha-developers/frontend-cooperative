import React from 'react';

/**
 * Simple reusable stat card component
 * 
 * @example
 * // Default style
 * <StatCard label="Total Users" amount="1,234" />
 * 
 * @example
 * // Big style with dark background
 * <StatCard label="Revenue" amount="$45,678" bigStyle={true} change="+12%" />
 */
const AdminStatsCard   = ({ 
  label, 
  amount, 
  bigStyle = false,
  icon,
  change
}) => {
  return (
    <div className={`rounded-lg p-5 shadow-md ${
      bigStyle ? 'bg-cooperative-dark' : 'bg-cooperative-cream'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* Label */}
          <p className={`text-sm font-medium ${
            bigStyle ? 'text-cooperative-cream/70' : 'text-cooperative-dark/60'
          }`}>
            {label}
          </p>
          
          {/* Amount - bigger when bigStyle is true */}
          <p className={`mt-2 font-bold ${
            bigStyle ? 'text-4xl text-cooperative-cream' : 'text-2xl text-cooperative-dark'
          }`}>
            {amount}
          </p>
          
          {/* Optional change indicator */}
          {change && (
            <p className={`mt-1 text-sm ${
              bigStyle ? 'text-cooperative-cream/60' : 'text-cooperative-teal'
            }`}>
              {change}
            </p>
          )}
        </div>
        
        {/* Optional icon */}
        {icon && (
          <div className={`p-2 rounded-full ${
            bigStyle ? 'bg-cooperative-orange/20' : 'bg-cooperative-orange/10'
          }`}>
            <div className={bigStyle ? 'text-cooperative-cream' : 'text-cooperative-orange'}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStatsCard;