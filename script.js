
```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Animate stats counting
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCount = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // Animation duration in ms
    const step = target / (duration / 16); // 60fps
    
    let current = 0;
    
    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        clearInterval(counter);
        current = target;
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 16);
  };
  
  // Only animate when stat is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
});
