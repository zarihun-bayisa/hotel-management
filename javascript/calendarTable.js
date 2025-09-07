// calendarTable.js

document.addEventListener('DOMContentLoaded', () => {
    // Example events data (replace with your database values)
    const events = [
        { date: '2024-08-25', type: 'Registered', count: 5 },
        { date: '2024-08-25', type: 'Canceled', count: 2 },
        { date: '2024-08-26', type: 'Received', count: 3 }
    ];

    let currentDate = new Date();

    function generateCalendar(year, month) {
        const calendarBody = document.getElementById("calendarBody");
        const monthYearDisplay = document.getElementById("monthYearDisplay");

        if (!calendarBody || !monthYearDisplay) {
            console.error("Calendar elements not found!");
            return;
        }

        calendarBody.innerHTML = ""; // clear previous calendar

        // Display current month and year
        monthYearDisplay.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                let cell = document.createElement("td");

                if (i === 0 && j < firstDay) {
                    cell.innerHTML = "";
                } else if (date > daysInMonth) {
                    break;
                } else {
                    // Highlight current day
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add('today');
                    }

                    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

                    // count events for this date
                    const todayEvents = events.filter(e => e.date === fullDate);

                    cell.innerHTML = `<strong>${date}</strong>`;
                    todayEvents.forEach(e => {
                        let color = e.type === "Registered" ? "green" : e.type === "Canceled" ? "red" : "blue";
                        cell.innerHTML += `<div style="color:${color}; font-size:12px">${e.type}: ${e.count}</div>`;
                    });

                    date++;
                }
                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
            if (date > daysInMonth) break; // Exit outer loop if all dates are placed
        }
    }

    // Initial generation
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

    // Event Listeners for buttons
    document.getElementById('prevMonthBtn').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    document.getElementById('nextMonthBtn').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
});