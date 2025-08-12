import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-display uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-brand-black text-neutral-50 hover:bg-brand-amber hover:shadow-brutal-lg disabled:bg-neutral-400',
    secondary: 'bg-neutral-50 text-brand-black border-2 border-brand-black hover:shadow-brutal disabled:opacity-50',
    ghost: 'bg-transparent text-brand-black hover:bg-neutral-100 disabled:opacity-50'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;