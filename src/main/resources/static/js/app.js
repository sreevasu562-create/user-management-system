// Tabs
function openTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(tb => tb.classList.remove("active"));
    document.getElementById(tabName).classList.add("active");
    document.querySelector(`.tab-btn[onclick="openTab('${tabName}')"]`).classList.add("active");
}

// Default open first tab
openTab("users");

// User Management code
const form = document.getElementById("userForm");
const message = document.getElementById("message");
const tableBody = document.getElementById("userTableBody");

window.onload = async () => {
    try {
        const res = await fetch("/api/users");
        const users = await res.json();
        users.forEach(addUserToTable);
    } catch (err) { console.error(err); }
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = { username: username.value, email: email.value, password: password.value };
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        if (!response.ok) throw new Error("Failed to create user");
        const data = await response.json();
        message.style.color = "green";
        message.innerText = "User created successfully";
        addUserToTable(data);
        form.reset();
    } catch (err) {
        message.style.color = "red";
        message.innerText = err.message;
    }
});

function addUserToTable(user) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.id}</td><td>${user.username}</td><td>${user.email}</td>`;
    tableBody.appendChild(row);
}
