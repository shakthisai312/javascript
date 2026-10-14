let movies = [
    { name: "Inception", price: 150 },
    { name: "Lion King", price: 120 },
    { name: "Avengers", price: 180 }
];

let bookings = [];
let movie = document.getElementById("movie");
let form = document.getElementById("bookingForm");
let msg = document.getElementById("message");

movies.forEach(m => {
    document.getElementById("movies").innerHTML +=
        `<div class="movie">${m.name} - ₹${m.price}</div>`;
    movie.innerHTML += `<option>${m.name}</option>`;
});

form.addEventListener("submit", e => {
    e.preventDefault();
    let m = movies.find(x => x.name === movie.value);
    let show = document.getElementById("show").value;
    let email = document.getElementById("email").value.trim();
    let qty = Number(document.getElementById("quantity").value);

    if (!m || !show || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        !Number.isInteger(qty) || qty < 1) {
        msg.textContent = "Enter valid details!";
        return;
    }

    bookings.push({
        id: Date.now(), name: m.name, show, email,
        qty, total: m.price * qty
    });

    msg.textContent = "Booking successful!";
    msg.style.color = "green";
    document.getElementById("total").textContent =
        "Total Price: ₹" + m.price * qty;
    form.reset();
    display();
});

function display() {
    let search = document.getElementById("search").value.toLowerCase();
    let list = document.getElementById("bookings");
    list.innerHTML = "";
    bookings.filter(b => b.name.toLowerCase().includes(search))
    .forEach(b => list.innerHTML +=
        `<div class="booking">${b.name}<br>Show: ${b.show}<br>
        Tickets: ${b.qty}<br>Email: ${b.email}<br>Total: ₹${b.total}
        <button onclick="cancel(${b.id})">Cancel</button></div>`);
    document.getElementById("count").textContent = bookings.length;
    if (!list.innerHTML) list.textContent = "No bookings found.";
}

function cancel(id) {
    bookings = bookings.filter(b => b.id !== id);
    display();
}

document.getElementById("search").addEventListener("input", display);
form.addEventListener("reset", () => {
    document.getElementById("total").textContent = "Total Price: ₹0";
    msg.textContent = "";
});