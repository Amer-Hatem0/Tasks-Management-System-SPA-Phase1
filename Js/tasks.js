document.addEventListener("DOMContentLoaded", function () {
    // جلب زر إنشاء المهمة
    const createTaskBtn = document.getElementById("createTaskBtn");
    const addTaskModal = document.getElementById("addTaskModal");
    const closeModal = addTaskModal.querySelector(".close");

    // عند الضغط على زر إنشاء مهمة، يتم عرض النافذة
    createTaskBtn.addEventListener("click", function () {
        addTaskModal.style.display = "block";
    });

    // عند الضغط على زر الإغلاق، يتم إخفاء النافذة
    closeModal.addEventListener("click", function () {
        addTaskModal.style.display = "none";
    });

    // إغلاق النافذة عند الضغط خارجها
    window.addEventListener("click", function (event) {
        if (event.target === addTaskModal) {
            addTaskModal.style.display = "none";
        }
    });

    // تحميل المهام من localStorage وعرضها في الجدول عند تحميل الصفحة
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToTable(task));

    // إضافة مهمة جديدة إلى الجدول عند إرسال النموذج
    document.getElementById("taskform").addEventListener("submit", function (event) {
        event.preventDefault();
        
        let taskName = document.getElementById("taskName").value;
        let taskDescription = document.getElementById("taskDescription").value;
        let assignedStudent = document.getElementById("studentsList").value;
        let taskStatus = document.getElementById("taskStatus").value;
        let dueDate = document.getElementById("dueDate").value;
        let projectTitle = document.getElementById("projectTitle").value;
        
        let newTask = {
            id: Date.now(),
            project: projectTitle,
            name: taskName,
            description: taskDescription,
            assignedStudent: assignedStudent,
            status: taskStatus,
            dueDate: dueDate
        };
        
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        // تحديث الجدول
        addTaskToTable(newTask);
        document.getElementById("taskform").reset();
        document.getElementById("addTaskModal").style.display = "none";
    });

    function addTaskToTable(task) {
        let tableBody = document.querySelector("#tasksTable tbody");
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.project}</td>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.assignedStudent}</td>
            <td>${task.status}</td>
            <td>${task.dueDate}</td>
        `;
        tableBody.appendChild(row);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve users from local storage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Get the students list dropdown
    let studentsList = document.getElementById("studentsList");

    // Filter students from users
    let students = users.filter(user => user.role === "student");

    // Populate the dropdown
    students.forEach(student => {
        let option = document.createElement("option");
        option.value = student.username;
        option.textContent = student.username;
        studentsList.appendChild(option);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // جلب زر إنشاء المهمة
    const createTaskBtn = document.getElementById("createTaskBtn");
    const addTaskModal = document.getElementById("addTaskModal");
    const closeModal = addTaskModal.querySelector(".close");

    // عند الضغط على زر إنشاء مهمة، يتم عرض النافذة
    createTaskBtn.addEventListener("click", function () {
        addTaskModal.style.display = "block";
    });

    // عند الضغط على زر الإغلاق، يتم إخفاء النافذة
    closeModal.addEventListener("click", function () {
        addTaskModal.style.display = "none";
    });

    // إغلاق النافذة عند الضغط خارجها
    window.addEventListener("click", function (event) {
        if (event.target === addTaskModal) {
            addTaskModal.style.display = "none";
        }
    });
});
