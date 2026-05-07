import React from 'react'
import { AlertCircle } from 'lucide-react'

const Complain = ({header, message, link, direction, isTwo = false, linkse='', directionse = ''}) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] flex-col px-4">
            <div className="pb-8 pt-8 px-6 rounded-xl mb-6 flex justify-between flex-col max-w-md w-full"
              style={{ boxShadow: '2px 2px 12px rgba(0,48,0,0.2)', backgroundColor: '#FDF6EC', borderTop: '3px solid #F57C00' }}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F57C00]/10 flex items-center justify-center">
                  <AlertCircle size={28} className="text-[#F57C00]" />
                </div>
                <p className="text-lg font-medium" style={{ color: '#003000' }}>{header}</p>
                <p className="text-sm mt-2 opacity-75" style={{ color: '#003000' }}>{message}</p>
              </div>
              <a href={link} className="mx-auto px-6 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-md text-center"
                style={{ backgroundColor: '#F57C00', color: '#FDF6EC' }}>
                Go to {direction}
              </a>
              {isTwo &&  <a href={linkse} className="mx-auto px-6 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-md text-center"
                style={{ backgroundColor: '#F57C00', color: '#FDF6EC' }}>
                Go to {directionse}
              </a>}
            </div>
          </div>
  )
}

export default Complain