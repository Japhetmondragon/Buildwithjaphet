import React from 'react';

const Heading = ({ 
  level = 'h2', 
  children, 
  className = '',
  animate = false 
}) => {
  const Tag = level;
  
  const styles = {
    h1: 'text-h1 font-display uppercase leading-none',
    h2: 'text-h2 font-display uppercase leading-none',
    h3: 'text-h3 font-display uppercase leading-tight',
    h4: 'text-2xl font-display uppercase leading-tight'
  };
  
  const animateClass = animate ? 'animate-slide-up' : '';
  
  return (
    <Tag className={`${styles[level]} ${animateClass} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;