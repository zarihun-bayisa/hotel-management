document.addEventListener('DOMContentLoaded', () => {
    // Define the structure of the navigation menu
    const navItems = [
        { name: 'Front Desk', items: ['Check-In', 'Check-Out', 'Reservations', 'Cancellations'] },
        { name: 'Billing & Invoicing', items: ['Generate Bill', 'Payments', 'Refunds'] },
        { name: 'Staff Management', items: ['Tasks', 'Attendance', 'Performance'] }
    ];

    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) {
        console.error('Error: Sidebar container element not found in dashboard.html!');
        return;
    }

    const nav = document.createElement('nav');
    nav.className = 'sidebar-nav';

    const title = document.createElement('h2');
    title.textContent = 'Administrative';
    nav.appendChild(title);

    const ul = document.createElement('ul');

    // Create menu items from the structure above
    navItems.forEach(section => {
        const sectionLi = document.createElement('li');
        sectionLi.className = 'nav-section'; // A container for the header and sub-menu

        const header = document.createElement('div');
        header.className = 'nav-section-header';
        header.textContent = section.name;
        sectionLi.appendChild(header);

        const subUl = document.createElement('ul');
        subUl.className = 'sub-nav';
        section.items.forEach(itemText => {
            const itemLi = document.createElement('li');
            const itemLink = document.createElement('a');
            itemLink.href = '#';
            itemLink.textContent = itemText;

            // Add click event listeners to the "Check-In" and "Check-Out" links
            itemLink.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default link behavior
                if (itemText === 'Check-In') {
                   showCheckInForm();
                } else if (itemText === 'Check-Out') {
                    showCheckOutForm();
                }
            });

            itemLi.appendChild(itemLink);


            subUl.appendChild(itemLi);
        });
        sectionLi.appendChild(subUl); // Append sub-list inside the main list item

        // Add click event to the header to toggle the dropdown
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            subUl.classList.toggle('show');
        });

        ul.appendChild(sectionLi);
    });

    nav.appendChild(ul);
    sidebarContainer.appendChild(nav);
});