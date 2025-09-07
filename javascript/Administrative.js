document.addEventListener('DOMContentLoaded', () => {
    // --- Profile Dropdown Logic ---
    const profileIcon = document.getElementById('profile-icon');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the window click event from firing immediately
            profileDropdown.classList.toggle('show');
        });

        // Close the dropdown if the user clicks outside of it
        window.addEventListener('click', () => {
            if (profileDropdown.classList.contains('show')) {
                profileDropdown.classList.remove('show');
            }
        });
    }
});