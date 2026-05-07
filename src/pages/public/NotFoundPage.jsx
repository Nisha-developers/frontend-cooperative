import React from 'react';
import { Link } from 'react-router-dom'; // Assuming React Router is used for navigation; if not, replace <Link> with <a> or a button

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-cooperative-cream flex items-center justify-center px-4 py-16">
      {/* Main Container with subtle animation */}
      <div className="max-w-lg w-full text-center animate-spinIn">
        {/* 404 Number with striking presence */}
        <h1 className="text-9xl md:text-[12rem] font-extrabold text-cooperative-dark tracking-tighter leading-none mb-4">
          404
        </h1>
        
        {/* Decorative line accent */}
        <div className="w-24 h-1 bg-cooperative-orange mx-auto mb-6 rounded-full"></div>
        
        {/* Error Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-cooperative-brown mb-4">
          Page Not Found
        </h2>
        
        {/* Descriptive Message */}
        <p className="text-cooperative-dark/80 text-base md:text-lg mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off into the fields. 
          Let's get you back on track.
        </p>
        
        {/* Action Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary Button - Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-cooperative-orange 
                       text-cooperative-orange font-semibold rounded-lg 
                       hover:bg-cooperative-orange hover:text-white 
                       transition-all duration-300 ease-in-out transform hover:scale-105 
                       focus:outline-none focus:ring-2 focus:ring-cooperative-orange focus:ring-offset-2"
          >
             Return to Homepage
          </Link>
          
        
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;