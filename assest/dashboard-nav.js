document.addEventListener('DOMContentLoaded', () => {
    // Define the structure of the navigation menu
    const navItems = [
        { name: 'Front Desk', items: ['Check-in / Check-out', 'Reservations', 'Cancellations'] },
        { name: 'Room Management', items: ['Availability', 'Occupancy', 'Housekeeping'] },
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
    title.textContent = 'Admin Scope';
    nav.appendChild(title);

    const ul = document.createElement('ul');

    // Create menu items from the structure above
    navItems.forEach(section => {
        const sectionLi = document.createElement('li');
        sectionLi.className = 'nav-section-header';
        sectionLi.textContent = section.name;
        ul.appendChild(sectionLi);

        const subUl = document.createElement('ul');
        subUl.className = 'sub-nav';
        section.items.forEach(itemText => {
            const itemLi = document.createElement('li');
            itemLi.innerHTML = `<a href="#">${itemText}</a>`; // Using innerHTML for simplicity
            subUl.appendChild(itemLi);
        });
        ul.appendChild(subUl);
    });

    nav.appendChild(ul);
    sidebarContainer.appendChild(nav);
});