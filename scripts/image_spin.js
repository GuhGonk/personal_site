document.addEventListener('DOMContentLoaded', function() {
  const image = document.querySelector('main img');
  const textBubble = document.getElementById('text-bubble');
  let isSpinning = false;
  let baseRotationSpeed = 720;
  let currentRotation = 0;
  let spinStartTime = 0;
  let animationFrame;
  let clickCount = 0;
  const maxSpinDuration = 2000;
  const clickWindowDuration = 5000;
  let lastClickTime = 0;
  let inactivityTimer;

  function showTextBubble() {
    textBubble.classList.remove('hidden');
    // Force a reflow before removing the 'hidden' class
    void textBubble.offsetWidth;
    textBubble.style.opacity = '1';
  }

  function hideTextBubble() {
    textBubble.style.opacity = '0';
    setTimeout(() => {
      textBubble.classList.add('hidden');
    }, 300); // This should match the transition duration in CSS
  }

  function startInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      showTextBubble();
    }, 5000);
  }

  image.addEventListener('click', () => {
    if (!textBubble.classList.contains('hidden')) {
      hideTextBubble();
    }
    const currentTime = performance.now();
    if (currentTime - lastClickTime > clickWindowDuration) {
      clickCount = 0;
    }
    lastClickTime = currentTime;
    clickCount++;

    if (!isSpinning) {
      isSpinning = true;
      spinStartTime = currentTime;
      baseRotationSpeed *= 1.5 ** clickCount;
      animationFrame = requestAnimationFrame(updateRotation);
    } else {
      spinStartTime = currentTime;
      baseRotationSpeed *= 1.5;
    }
    
    // Reset the inactivity timer on click
    startInactivityTimer();
  });

  function updateRotation(timestamp) {
    const elapsed = timestamp - spinStartTime;
    const progress = elapsed / maxSpinDuration;

    if (progress < 1) {
      const speedFactor = progress <= 0.4 ? progress * 2 : (1 - progress) * 2;
      const currentSpeed = baseRotationSpeed * speedFactor;
      const rotationChange = currentSpeed * (1 / 60) * maxSpinDuration / 1000;
      currentRotation += rotationChange;

      image.style.transform = `rotate(${currentRotation}deg)`;
      animationFrame = requestAnimationFrame(updateRotation);
    } else {
      image.style.transform = `rotate(${currentRotation}deg)`;
      isSpinning = false;
      clickCount = 0;
      baseRotationSpeed = 720;
      animationFrame = null;
      startInactivityTimer();
    }
  }
  
  textBubble.classList.add('hidden');
  textBubble.style.opacity = '0';

  // Start the initial timer
  startInactivityTimer();
});