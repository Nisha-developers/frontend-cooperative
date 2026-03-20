import React from 'react'

import { RiCheckboxCircleLine, RiCloseCircleLine, RiCloseLine } from 'react-icons/ri';

/*
  PopupMessage — Success or Error popup notification
 
  Usage:
   <PopupMessage
      isOpen={showMsg}
      type="success"               // "success" | "error"
     title="Payment Successful"
     message="Your payment has been processed."
      onClose={() => setShowMsg(false)}
   />
 */

const PopupMessage = ({
  isOpen = false,
  type = 'success',
  title = '',
  message = '',
  onClose,
}) => {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  const config = isSuccess
    ? {
        icon: <RiCheckboxCircleLine className="text-4xl text-cooperative-teal" />,
        iconBg: 'bg-cooperative-teal/10',
        accentBar: 'bg-cooperative-teal',
        badge: 'bg-cooperative-teal/10 text-cooperative-teal',
        badgeLabel: 'Success',
        btnClass: 'bg-cooperative-teal hover:bg-cooperative-dark',
        btnLabel: 'Great, thanks!',
      }
    : {
        icon: <RiCloseCircleLine className="text-4xl text-cooperative-orange" />,
        iconBg: 'bg-cooperative-orange/10',
        accentBar: 'bg-cooperative-orange',
        badge: 'bg-cooperative-orange/10 text-cooperative-orange',
        badgeLabel: 'Error',
        btnClass: 'bg-cooperative-orange hover:bg-cooperative-dark',
        btnLabel: 'Okay, got it',
      };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-cooperative-dark/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-sm bg-cooperative-cream rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent bar */}
          <div className={`h-1 w-full ${config.accentBar}`} />

          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-cooperative-teal/10 text-cooperative-dark/40 hover:text-cooperative-dark transition-colors"
            >
              <RiCloseLine className="text-lg" />
            </button>
          )}

          {/* Body */}
          <div className="flex flex-col items-center text-center px-8 py-8 gap-4">
            {/* Icon */}
            <div className={`w-16 h-16 rounded-full ${config.iconBg} flex items-center justify-center`}>
              {config.icon}
            </div>

            {/* Badge */}
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${config.badge}`}>
              {config.badgeLabel}
            </span>

            {/* Title */}
            {title && (
              <h3 className="text-lg font-bold text-cooperative-dark">{title}</h3>
            )}

            {/* Message */}
            {message && (
              <p className="text-sm text-cooperative-teal/80 leading-relaxed">{message}</p>
            )}

            {/* Action button */}
            <button
              onClick={onClose}
              className={`mt-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-colors ${config.btnClass}`}
            >
              {config.btnLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupMessage;