// Lazy load images
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

// Preload critical fonts
export const preloadFonts = () => {
  const link1 = document.createElement('link');
  link1.rel = 'preload';
  link1.as = 'font';
  link1.href = 'https://fonts.gstatic.com/s/bebasnue/v2/JTUSjIg69CK48gW7PXoo9Wlhyw.woff2';
  link1.crossOrigin = 'anonymous';
  
  const link2 = document.createElement('link');
  link2.rel = 'preload';
  link2.as = 'font';
  link2.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
  link2.crossOrigin = 'anonymous';
  
  document.head.appendChild(link1);
  document.head.appendChild(link2);
};