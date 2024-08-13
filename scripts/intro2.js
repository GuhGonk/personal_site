document.addEventListener('DOMContentLoaded', function() {
    const introScreen = document.getElementById('intro-screen');
    const shutter = document.getElementById('shutter');
    const mainContent = document.getElementById('main-content');

    introScreen.addEventListener('click', function() {
        // Animate the shutter
        shutter.style.transform = 'translateY(-100%)'; // Move shutter up
        shutter.style.transition = 'transform 1s ease';

        // Add a lift and drop effect
        setTimeout(() => {
            shutter.style.transform = 'translateY(-90%)'; // Lift up a bit
            setTimeout(() => {
                shutter.style.transform = 'translateY(-100%)'; // Move shutter up completely
            }, 200); // Wait before going all the way up
        }, 200); // Wait before lifting

        // Show main content after animation
        setTimeout(() => {
            introScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
        }, 1200); // Wait for the animation to finish
    });
});