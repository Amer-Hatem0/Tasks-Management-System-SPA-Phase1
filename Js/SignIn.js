
 
document.getElementById("signin-form").addEventListener("submit", function(event) {
    event.preventDefault();  
    
    const username = document.getElementById("signin-username").value.trim();
    const password = document.getElementById("signin-password").value.trim();
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === username && user.password === password);
    
    if (!user) {
        alert("Invalid username or password.");
        return;
    }

     localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Sign-in successful! Redirecting...");
    
     if (user.role === "admin") {
        window.location.href = "Index.html";
    } else {
        window.location.href = "StudentDashboard.html";
    }
});
 