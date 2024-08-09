document.addEventListener('DOMContentLoaded', function() {
  const mainContent = document.querySelector('main');

  // Create intro elements
  const intro = document.createElement('div');
  intro.className = 'intro';
  const introText = document.createElement('div');
  introText.className = 'intro-text';
  introText.textContent = 'Your intro text here';
  intro.appendChild(introText);
  document.body.insertBefore(intro, mainContent);

  // Hide main content initially
  mainContent.style.opacity = '0';
  mainContent.style.display = 'none';

  // Fade in intro text
  setTimeout(() => {
      introText.classList.add('appear');
  }, 500);

  // Slide out intro after 2.5 seconds
  setTimeout(() => {
      intro.classList.add('slide-out');
      
      // Fade in main content
      mainContent.style.display = 'block';
      setTimeout(() => {
          mainContent.style.opacity = '1';
      }, 500);
  }, 2500);

  // Remove intro element after animation
  setTimeout(() => {
      intro.remove();
  }, 3500);
});