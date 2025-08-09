import React, { useState, useEffect, useRef } from 'react';

const Image = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'https://via.placeholder.com/600x400/E0E0E0/666666?text=Loading'
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && imgRef.current) {
            const img = new Image();
            img.src = src;
            img.onload = () => setImageSrc(src);
            img.onerror = () => setImageSrc(placeholder);
            observerRef.current.unobserve(imgRef.current);
          }
        });
      },
      { threshold: 0.01 }
    );
    if (imgRef.current) observerRef.current.observe(imgRef.current);
    return () => observerRef.current?.disconnect();
  }, [src, placeholder]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

export default Image;
