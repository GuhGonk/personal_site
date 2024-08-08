document.addEventListener('DOMContentLoaded', function() {
  const image = document.querySelector('main img');
  let isSpinning = false;
  let rotationSpeed = 90; // Initial speed: half rotation per second
  let currentRotation = 0;
  let spinStartTime = 0;
  let animationFrame;

  image.addEventListener('click', () => {
      if (isSpinning) {
          // +25% speed per click, max = 200%
          rotationSpeed = Math.min(rotationSpeed * 1.25, 180 * 2);
      } else {
          isSpinning = true;
      }
      // Reset the spin start time
      spinStartTime = performance.now();
      // 
      if (!animationFrame) {
          animationFrame = requestAnimationFrame(updateRotation);
      }
  });

  function updateRotation(timestamp) {
      const elapsed = timestamp - spinStartTime;

      if (elapsed < 1000) { // Spin for 1 second
          currentRotation += rotationSpeed * (elapsed / 1000);
          image.style.transform = `rotate(${currentRotation}deg)`;
          animationFrame = requestAnimationFrame(updateRotation);
      } else {
          // Calculate the number of full rotations
          const fullRotations = Math.floor(currentRotation / 360);
          // Smoothly rotate to the nearest multiple of 360 degrees
          const targetRotation = (fullRotations + 1) * 360;
          const remainingRotation = targetRotation - currentRotation;
          const duration = 500; // Duration for the final rotation (in milliseconds)
          const startTime = timestamp;

          function finishRotation(time) {
              const progress = Math.min((time - startTime) / duration, 1);
              currentRotation += remainingRotation * progress;
              image.style.transform = `rotate(${currentRotation}deg)`;

              if (progress < 1) {
                  animationFrame = requestAnimationFrame(finishRotation);
              } else {
                  // Reset everything
                  isSpinning = false;
                  rotationSpeed = 180;
                  currentRotation = 0;
                  animationFrame = null;
              }
          }

          animationFrame = requestAnimationFrame(finishRotation);
      }
  }
});