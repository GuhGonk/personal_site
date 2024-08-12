document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const contactToggle = document.getElementById('contact-toggle');

    menuToggle.addEventListener('click', function() {
        dropdownMenu.classList.toggle('show');
    });

    contactToggle.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        this.parentElement.classList.toggle('show-nested');
    });

    // Close the dropdowns if the user clicks outside of them
    window.addEventListener('click', function(event) {
        if (!event.target.matches('#menu-toggle') && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
            const nestedDropdowns = document.querySelectorAll('.nested-dropdown');
            nestedDropdowns.forEach(dropdown => {
                dropdown.classList.remove('show-nested');
            });
        }
    });
});