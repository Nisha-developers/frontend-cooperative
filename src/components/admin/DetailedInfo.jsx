import React, { useState } from 'react';

const DetailedInfo = ({ onClose, onDelete, onEdit, samplePropertyData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [propertyData, setPropertyData] = useState(samplePropertyData);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const type = propertyData.listing_type; // 'sale' | 'rent' | 'land'
  const isSale = type === 'sale';
  const isRent = type === 'rent';
  const isLand = type === 'land';

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit?.(propertyData);
    setIsEditing(false);
  };

  const handleDeleteConfirm = () => {
    onDelete?.(propertyData.id);
    setShowDeleteConfirm(false);
    onClose?.();
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(parseFloat(amount) || 0);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const field = (label, val) => (
    <div className="flex justify-between py-1 border-b border-[#2E7D32]/10">
      <span className="text-[#003000]/60">{label}</span>
      <span className="text-[#003000] font-medium">{val}</span>
    </div>
  );

  const inputField = (label, key, inputType = 'text') => (
    <div>
      <label className="block text-sm font-medium text-[#003000] mb-1">{label}</label>
      <input
        type={inputType}
        value={propertyData[key] ?? ''}
        onChange={(e) =>
          setPropertyData({
            ...propertyData,
            [key]: inputType === 'number' ? Number(e.target.value) : e.target.value,
          })
        }
        className="w-full px-3 py-2 border border-[#2E7D32]/30 rounded-lg focus:outline-none focus:border-[#F57C00] bg-white"
      />
    </div>
  );

  const checkboxField = (label, key) => (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={!!propertyData[key]}
        onChange={(e) => setPropertyData({ ...propertyData, [key]: e.target.checked })}
        className="rounded border-[#2E7D32]/30 text-[#F57C00] focus:ring-[#F57C00]"
      />
      <span className="text-sm text-[#003000]">{label}</span>
    </label>
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-[#FDF6EC] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#FDF6EC] border-b border-[#2E7D32]/20 px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-[#003000]">
                {isEditing ? 'Edit Listing' : 'Listing Details'}
              </h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize
                ${isSale ? 'bg-blue-100 text-blue-800' :
                  isRent ? 'bg-green-100 text-green-800' :
                  'bg-amber-100 text-amber-800'}`}>
                {type}
              </span>
            </div>
            <div className="flex gap-2">
              {!isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-[#F57C00] text-white rounded-lg hover:bg-[#F57C00]/80 transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="p-2 text-[#003000] hover:bg-[#2E7D32]/10 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {isEditing ? (
              // ── EDIT FORM ────────────────────────────────────────────────────
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inputField('Title', 'title')}
                  {inputField('Price (₦)', 'price', 'number')}
                  {inputField('Address', 'address')}
                  {inputField('State', 'state')}
                  {inputField('City', 'city')}
                  {inputField('Area (sqm)', 'area_sqm', 'number')}

                  {/* Sale & Rent only */}
                  {(isSale || isRent) && inputField('Bedrooms', 'bedrooms', 'number')}
                  {(isSale || isRent) && inputField('Bathrooms', 'bathrooms', 'number')}
                  {(isSale || isRent) && inputField('Toilets', 'toilets', 'number')}

                  {/* Rent only */}
                  {isRent && inputField('Rent Duration', 'rent_duration')}

                  {/* Installment fields */}
                  {(isSale || isLand) && propertyData.allows_installment && (
                    inputField('Installment Duration (months)', 'installment_duration_months', 'number')
                  )}
                  {(isSale || isLand) && propertyData.allows_installment && (
                    inputField('Minimum Initial Deposit (₦)', 'minimum_initial_deposit', 'number')
                  )}

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#003000] mb-1">Description</label>
                    <textarea
                      value={propertyData.description ?? ''}
                      onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-[#2E7D32]/30 rounded-lg focus:outline-none focus:border-[#F57C00] bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-4 col-span-2 flex-wrap">
                    {(isSale || isRent) && checkboxField('Furnished', 'is_furnished')}
                    {(isSale || isLand) && checkboxField('Allows Installment', 'allows_installment')}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-[#2E7D32] text-[#2E7D32] rounded-lg hover:bg-[#2E7D32]/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F57C00] text-white rounded-lg hover:bg-[#F57C00]/80 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              // ── VIEW MODE ────────────────────────────────────────────────────
              <div className="space-y-6">
                {/* Title & Price */}
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-[#003000]">{propertyData.title}</h3>
                    <p className="text-sm text-[#2E7D32] capitalize">
                      {propertyData.property_type} • {propertyData.listing_type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#F57C00]">{formatCurrency(propertyData.price)}</p>
                    {(isSale || isLand) && propertyData.allows_installment && propertyData.minimum_initial_deposit && (
                      <p className="text-sm text-[#2E7D32]">
                        Min deposit: {formatCurrency(propertyData.minimum_initial_deposit)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 p-3 bg-[#2E7D32]/5 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F57C00] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-[#003000]">{propertyData.address}</p>
                    <p className="text-sm text-[#2E7D32]">{propertyData.city}, {propertyData.state}</p>
                  </div>
                </div>

                {/* Stats grid — sale & rent only */}
                {(isSale || isRent) && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-[#2E7D32]/5 rounded-lg">
                      <p className="text-2xl font-bold text-[#F57C00]">{propertyData.bedrooms}</p>
                      <p className="text-xs text-[#003000]">Bedrooms</p>
                    </div>
                    <div className="text-center p-3 bg-[#2E7D32]/5 rounded-lg">
                      <p className="text-2xl font-bold text-[#F57C00]">{propertyData.bathrooms}</p>
                      <p className="text-xs text-[#003000]">Bathrooms</p>
                    </div>
                    <div className="text-center p-3 bg-[#2E7D32]/5 rounded-lg">
                      <p className="text-2xl font-bold text-[#F57C00]">{propertyData.toilets}</p>
                      <p className="text-xs text-[#003000]">Toilets</p>
                    </div>
                    <div className="text-center p-3 bg-[#2E7D32]/5 rounded-lg">
                      <p className="text-2xl font-bold text-[#F57C00]">{propertyData.area_sqm}</p>
                      <p className="text-xs text-[#003000]">Sq Meters</p>
                    </div>
                  </div>
                )}

                {/* Land — just area */}
                {isLand && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-[#2E7D32]/5 rounded-lg">
                      <p className="text-2xl font-bold text-[#F57C00]">{propertyData.area_sqm} sqm</p>
                      <p className="text-xs text-[#003000]">Land Size</p>
                    </div>
                  </div>
                )}

                {/* Description */}
                {propertyData.description && (
                  <div>
                    <h4 className="font-semibold text-[#003000] mb-2">Description</h4>
                    <p className="text-[#003000]/80">{propertyData.description}</p>
                  </div>
                )}

                {/* Extra info table */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {field('Status', propertyData.status)}
                  {field('Listed On', formatDate(propertyData.created_at))}

                  {/* Furnished — sale & rent */}
                  {(isSale || isRent) && field('Furnished', propertyData.is_furnished ? 'Yes' : 'No')}

                  {/* Rent duration */}
                  {isRent && propertyData.rent_duration && field('Rent Duration', propertyData.rent_duration)}

                  {/* Installment details — sale & land */}
                  {(isSale || isLand) && propertyData.allows_installment && (
                    <>
                      {field('Installment Duration', `${propertyData.installment_duration_months} months`)}
                      {field('Min Deposit', formatCurrency(propertyData.minimum_initial_deposit))}
                    </>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#2E7D32]/10 text-[#2E7D32] rounded-full text-xs font-medium capitalize">
                    {propertyData.property_type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                    ${isSale ? 'bg-blue-100 text-blue-800' :
                      isRent ? 'bg-green-100 text-green-800' :
                      'bg-amber-100 text-amber-800'}`}>
                    {type}
                  </span>
                  {(isSale || isRent) && propertyData.is_furnished && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      Furnished
                    </span>
                  )}
                  {(isSale || isLand) && propertyData.allows_installment && (
                    <span className="px-3 py-1 bg-[#F57C00]/10 text-[#F57C00] rounded-full text-xs font-medium">
                      Installment Available
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
          <div className="bg-[#FDF6EC] rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-[#003000] mb-3">Confirm Delete</h3>
            <p className="text-[#003000]/80 mb-6">
              Are you sure you want to delete "{propertyData.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-[#2E7D32] text-[#2E7D32] rounded-lg hover:bg-[#2E7D32]/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailedInfo;