document.addEventListener('DOMContentLoaded', function() {
  const image = document.querySelector('main img');
  let isSpinning = false;
  let baseRotationSpeed = 720; // Initial base speed: quarter rotation per second
  let currentRotation = 0;
  let spinStartTime = 0;
  let animationFrame;
  const spinDuration = 3000; // Total spin duration in milliseconds

  image.addEventListener('click', () => {
    if (!isSpinning) {
      isSpinning = true;
      spinStartTime = performance.now();
      baseRotationSpeed = Math.min(baseRotationSpeed * 100, 1000);
      animationFrame = requestAnimationFrame(updateRotation);
    }
  });

  function updateRotation(timestamp) {
    const elapsed = timestamp - spinStartTime;
    const progress = elapsed / spinDuration;

    if (progress < 1) {
      // Calculate current speed: increases until 0.5, then decreases
      const speedFactor = progress <= 0.5 ? progress * 2 : (1 - progress) * 2;
      const currentSpeed = baseRotationSpeed * speedFactor;

      currentRotation += currentSpeed * (1 / 60); // Assuming 60 FPS
      image.style.transform = `rotate(${currentRotation}deg)`;
      animationFrame = requestAnimationFrame(updateRotation);
    } else {
      // Keep the final rotation
      image.style.transform = `rotate(${currentRotation}deg)`;

      // Reset spinning state
      isSpinning = false;
      animationFrame = null;
    }
  }
});