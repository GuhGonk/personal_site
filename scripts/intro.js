document.addEventListener('DOMContentLoaded', function() {
    const intro = document.getElementById('intro');
    const introText = document.getElementById('intro-text');

    // Check if the animation has been played before
    if (localStorage.getItem("introAnimationPlayed") === null) {
        // Show the intro screen
        intro.style.display = 'flex';

        // Show the text
        setTimeout(() => {
            introText.style.opacity = '1';
            introText.style.transform = 'translateY(0)';
        }, 400);

        // Slide up and fade out the text
        setTimeout(() => {
            introText.classList.add('slide-up', 'fade-out');
        }, 1000);

        // Slide up the entire intro screen
        setTimeout(() => {
            intro.classList.add('slide-up');
        }, 2500);

        // Remove the intro element after slide-up animation completes
        intro.addEventListener('transitionend', function(e) {
            if (e.propertyName === 'transform' && intro.classList.contains('slide-up')) {
                intro.style.display = 'none';
                // Set the flag in localStorage
                localStorage.setItem("introAnimationPlayed", "true");
            }
        });
    } else {
        // If the animation has been played before, just hide the intro screen
        intro.style.display = 'none';
    }
});