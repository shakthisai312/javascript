// Get all needed elements
const missionInput = document.getElementById("missionInput");
const addBtn = document.getElementById("addBtn");
const missionList = document.getElementById("missionList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");
const changeColourBtn = document.getElementById("changeColourBtn");

// Background colours (at least 3)
const colours = ["#f0f4f8", "#e6fffa", "#faf5ff", "#fff5f5"];
let colourIndex = 0;

// Function to update the three counters
function updateCounters() {
    const total = missionList.children.length;
    let completed = 0;

    for (let i = 0; i < total; i++) {
        if (missionList.children[i].classList.contains("completed")) {
            completed = completed + 1;
        }
    }

    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = total - completed;
}

// Function to add a new mission
function addMission() {
    const text = missionInput.value.trim();

    // Reject empty or spaces-only input
    if (text === "") {
        return;
    }

    // Create the mission item
    const item = document.createElement("div");
    item.className = "mission-item";

    // Circle symbol
    const check = document.createElement("span");
    check.className = "check";
    check.textContent = "O";

    // Mission text
    const missionText = document.createElement("span");
    missionText.className = "mission-text";
    missionText.textContent = text;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    // Append children
    item.appendChild(check);
    item.appendChild(missionText);
    item.appendChild(deleteBtn);

    // Toggle complete when clicking the item (not the delete button)
    item.addEventListener("click", function (e) {
        if (e.target === deleteBtn) {
            return;
        }

        item.classList.toggle("completed");

        if (item.classList.contains("completed")) {
            check.textContent = "X";
        } else {
            check.textContent = "O";
        }

        updateCounters();
    });

    // Delete the mission
    deleteBtn.addEventListener("click", function () {
        item.remove();
        updateCounters();
    });

    // Add to list
    missionList.appendChild(item);

    // Clear input
    missionInput.value = "";

    // Update counters
    updateCounters();
}

// Function to change background colour
function changeColour() {
    colourIndex = colourIndex + 1;

    if (colourIndex >= colours.length) {
        colourIndex = 0;
    }

    document.body.style.backgroundColor = colours[colourIndex];
}

// Event listeners
addBtn.addEventListener("click", addMission);

missionInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addMission();
    }
});

changeColourBtn.addEventListener("click", changeColour);

// Initialize counters
updateCounters();