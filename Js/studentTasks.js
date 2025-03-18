document.addEventListener("DOMContentLoaded", function () {
    // استرجاع بيانات المستخدم الحالي
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "student") {
        alert("Access Denied! Redirecting to Sign In...");
        window.location.href = "SignIn.html";
        return;
    }
    
    document.getElementById("admin-name").innerText = currentUser.username;
    
    // استرجاع المهام من localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // تصفية المهام الخاصة بالطالب الحالي
    let studentTasks = tasks.filter(task => task.assignedStudent === currentUser.studentId);
    
    // عرض المهام في الجدول
    let tableBody = document.querySelector("#tasksTable tbody");
    
    if (studentTasks.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6'>No tasks assigned.</td></tr>";
        return;
    }
    
    studentTasks.forEach(task => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.project}</td>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
            <td>${task.dueDate}</td>
        `;
        tableBody.appendChild(row);
    });
});
