 

 document.addEventListener("DOMContentLoaded", function() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.username) {
        document.getElementById("adminname").innerText = currentUser.username;
    }
});
