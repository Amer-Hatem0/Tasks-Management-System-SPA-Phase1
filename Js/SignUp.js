 
document.getElementById("student-checkbox").addEventListener("change", function() {
    document.getElementById("student-id-container").classList.toggle("hidden", !this.checked);
});

document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();  

    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const isStudent = document.getElementById("student-checkbox").checked;
    const studentId = isStudent ? document.getElementById("student-id").value.trim() : null;
    const role = isStudent ? "student" : "admin"; 
    if (!username || !password || (isStudent && !studentId)) {
        alert("Please fill in all required fields.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.username === username)) {
        alert("Username already exists. Choose another one.");
        return;
    }

    const newUser = { username, password, role, studentId };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully! You can now sign in.");
    window.location.href = "signin.html";
});
 