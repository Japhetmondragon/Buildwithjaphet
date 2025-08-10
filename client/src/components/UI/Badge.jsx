import React from 'react';

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-neutral-200 text-neutral-900',
    primary: 'bg-brand-black text-neutral-50',
    success: 'bg-brand-amber text-brand-black'
  };
  
  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider ${variants[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;