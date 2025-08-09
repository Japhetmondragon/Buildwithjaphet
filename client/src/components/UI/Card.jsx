import React from 'react';

const Card = ({ children, hover = true, className = '', onClick }) => {
  const hoverClass = hover 
    ? 'hover:shadow-brutal-lg hover:-translate-y-1 cursor-pointer' 
    : '';
  
  return (
    <div 
      onClick={onClick}
      className={`bg-neutral-50 border-2 border-brand-black p-6 transition-all duration-200 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;