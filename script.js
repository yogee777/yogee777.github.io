let records = [];

// Load JSON file
async function loadRecords() {

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Unable to load data.json");
        }

        records = await response.json();

        displayRecords(records);

    } catch (error) {

        document.getElementById("message").textContent =
            "Error loading JSON file: " + error.message;
    }
}


// Search by name and/or mobile
function searchRecords() {

    const name = document
        .getElementById("searchName")
        .value
        .trim()
        .toLowerCase();

    const mobile = document
        .getElementById("searchMobile")
        .value
        .trim();

    const results = records.filter(record => {

        const nameMatch =
            name === "" ||
            record.name.toLowerCase().includes(name);

        const mobileMatch =
            mobile === "" ||
            record.mobile.includes(mobile);

        return nameMatch && mobileMatch;
    });

    displayRecords(results);
}


// Display records in table
function displayRecords(data) {

    const tbody = document.getElementById("resultBody");
    const message = document.getElementById("message");

    tbody.innerHTML = "";

    if (data.length === 0) {

        message.textContent = "No records found.";
        return;
    }

    message.textContent =
        data.length + " record(s) found.";

    data.forEach(record => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>${record.mobile}</td>
        `;

        tbody.appendChild(row);
    });
}


// Automatically load records when page opens
loadRecords();