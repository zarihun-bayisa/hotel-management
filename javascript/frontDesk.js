// frontDesk.js

// Sample database (temporary in-memory storage)
let guests = [];
let reservations = [];

// 1. Check-In
function checkIn(guest) {
    if (!guest.name || !guest.room) {
        return "Guest name and room are required!";
    }
    guest.status = "Checked-In";
    guests.push(guest);
    return `✅ ${guest.name} has been checked into room ${guest.room}`;
}

// 2. Check-Out
function checkOut(guestName) {
    const guest = guests.find(g => g.name === guestName && g.status === "Checked-In");
    if (!guest) {
        return `❌ Guest ${guestName} is not found or already checked-out`;
    }
    guest.status = "Checked-Out";
    return `✅ ${guest.name} has checked out from room ${guest.room}`;
}

// 3. Reservations
function makeReservation(reservation) {
    if (!reservation.name || !reservation.room || !reservation.date) {
        return "Reservation requires name, room, and date!";
    }
    reservation.status = "Reserved";
    reservations.push(reservation);
    return `✅ Reservation made for ${reservation.name} in room ${reservation.room} on ${reservation.date}`;
}

// 4. Cancellations
function cancelReservation(name) {
    const resIndex = reservations.findIndex(r => r.name === name && r.status === "Reserved");
    if (resIndex === -1) {
        return `❌ No active reservation found for ${name}`;
    }
    reservations[resIndex].status = "Cancelled";
    return `✅ Reservation for ${name} has been cancelled`;
}

// 5. Guest Records
function getGuestRecords() {
    return guests;
}

// Expose functions to the global scope for browser environment
window.frontDesk = {
    checkIn,
    checkOut,
    makeReservation,
    cancelReservation,
    getGuestRecords
};
