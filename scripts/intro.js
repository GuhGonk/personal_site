document.addEventListener('DOMContentLoaded', function() {
  const intro = document.querySelector('.intro');
  const introText = document.querySelector('.intro-text');
  const mainContent = document.querySelector('main');

  // Hide main content initially
  mainContent.style.opacity = '0';
  mainContent.style.display = 'none';

  // Add appear class to intro text after 0.5 seconds
  setTimeout(() => {
      introText.classList.add('appear');
  }, 500);

  // Start fade out after 1.5 seconds
  setTimeout(() => {
      intro.style.opacity = '0';
      intro.style.transition = 'opacity 1s ease-in-out';
      
      // Start fading in main content
      mainContent.style.display = 'block';
      setTimeout(() => {
          mainContent.style.opacity = '1';
          mainContent.style.transition = 'opacity 1s ease-in-out';
      }, 50);
  }, 1500);

  // Remove intro element after fade out
  setTimeout(() => {
      intro.style.display = 'none';
  }, 2500);
});