const introText = document.querySelector('.intro-text');

// Add appear class to intro text after 1 second
setTimeout(() => {
  introText.classList.add('appear');
}, 1000);

// Add disappear class to intro text after 3 seconds
setTimeout(() => {
  introText.classList.add('disappear');
}, 3000);

// Remove intro element after 4 seconds
setTimeout(() => {
  const intro = document.querySelector('.intro');
  intro.parentNode.removeChild(intro);
}, 4000);
