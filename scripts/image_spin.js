document.addEventListener('DOMContentLoaded', function() {
  const image = document.querySelector('main img');
  let isSpinning = false;
  let baseRotationSpeed = 720; // Initial base speed: 2 rotations per second
  let currentRotation = 0;
  let spinStartTime = 0;
  let animationFrame;
  let clickCount = 0;
  const maxSpinDuration = 2000; // Maximum spin duration in milliseconds
  const clickWindowDuration = 5000; // Duration of the rolling window in milliseconds
  let lastClickTime = 0;

  image.addEventListener('click', () => {
    const currentTime = performance.now();
    if (currentTime - lastClickTime > clickWindowDuration) {
      clickCount = 0;
    }
    lastClickTime = currentTime;
    clickCount++;

    if (!isSpinning) {
      isSpinning = true;
      spinStartTime = currentTime;
      baseRotationSpeed *= 1.5 ** clickCount; // Increase speed based on click count
      animationFrame = requestAnimationFrame(updateRotation);
    } else {
      // Reset the spin duration and increase speed
      spinStartTime = currentTime;
      baseRotationSpeed *= 1.5;
    }
  });

  function updateRotation(timestamp) {
    const elapsed = timestamp - spinStartTime;
    const progress = elapsed / maxSpinDuration;

    if (progress < 1) {
      // Calculate current speed: increases until 0.5, then decreases
      const speedFactor = progress <= 0.4 ? progress * 2 : (1 - progress) * 2;
      const currentSpeed = baseRotationSpeed * speedFactor;

      // Calculate rotation based on area under the speed curve
      const rotationChange = currentSpeed * (1 / 60) * maxSpinDuration / 1000;
      currentRotation += rotationChange;

      image.style.transform = `rotate(${currentRotation}deg)`;
      animationFrame = requestAnimationFrame(updateRotation);
    } else {
      // Keep the final rotation
      image.style.transform = `rotate(${currentRotation}deg)`;

      // Reset spinning state and click count
      isSpinning = false;
      clickCount = 0;
      baseRotationSpeed = 720; // Reset to initial speed
      animationFrame = null;
    }
  }
});