document.addEventListener('DOMContentLoaded', () => {
    // Define the structure of the navigation menu

const navItems = [
    {
        name: 'Front Desk',
        items: ['Check-In', 'Check-Out', 'Reservations', 'Cancellations', 'Guest Records']
    },
    {
        name: 'Billing & Invoicing',
        items: ['Generate Bill', 'Payments', 'Refunds', 'Invoices', 'Reports']
    },
    {
        name: 'Staff Management',
        items: ['Tasks', 'Attendance', 'Performance', 'Payroll', 'Roles & Permissions']
    },
    {
        name: 'Housekeeping',
        items: ['Room Status', 'Cleaning Schedule', 'Assign Tasks', 'Laundry']
    },
    {
        name: 'Inventory Management',
        items: ['Stock Levels', 'Suppliers', 'Purchase Orders', 'Usage Reports']
    },
    {
        name: 'Food & Beverage',
        items: ['Restaurant Orders', 'Room Service', 'Menu Management', 'Bar Management']
    },
    {
        name: 'Event & Conference',
        items: ['Book Hall', 'Event Scheduling', 'Catering Requests', 'Event Reports']
    },
    {
        name: 'Customer Management',
        items: ['Guest Profiles', 'Loyalty Programs', 'Feedback & Reviews', 'Complaints']
    },
    {
        name: 'Finance & Accounting',
        items: ['Revenue Reports', 'Expenses', 'Taxes', 'Profit & Loss']
    },
    {
        name: 'Analytics & Reports',
        items: ['Occupancy Reports', 'Sales Reports', 'Staff Reports', 'Custom Reports']
    },
    {
        name: 'System Settings',
        items: ['User Management', 'Access Control', 'Backup & Restore', 'General Settings']
    }
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

            // Add click event listeners to menu items
            itemLink.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default link behavior
                const mainContent = document.getElementById('main-content');

                // A simple router to show content based on the clicked item
                if (itemText === 'Check-In') {
                   showCheckInForm(mainContent);
                } else if (itemText === 'Check-Out') {
                    showCheckOutForm(mainContent);
                }
            });
            itemLi.appendChild(itemLink)
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

    // --- Functions to display forms ---

    function showCheckInForm(container) {
        fetch('check-in-form.html')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                // Attach event listener to the newly added form
                const checkInForm = document.getElementById('checkInForm');
                if (checkInForm) {
                    checkInForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const guestName = document.getElementById('guestName').value;
                        const roomNumber = document.getElementById('roomNumber').value;
                        const result = window.frontDesk.checkIn({ name: guestName, room: roomNumber });
                        alert(result);
                    });
                }
            })
            .catch(error => {
                console.error('Error loading check-in form:', error);
                container.innerHTML = `<p style="color: red;">Error: Failed to load check-in form. Please check the file path and network connection.</p>`;
            });
    }

    function showCheckOutForm(container) {
        fetch('check-out-form.html')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                // You can add form submission logic for check-out here
            })
            .catch(error => {
                console.error('Error loading check-out form:', error);
                container.innerHTML = `<p style="color: red;">Error: Failed to load check-out form.</p>`;
            });
    }
});