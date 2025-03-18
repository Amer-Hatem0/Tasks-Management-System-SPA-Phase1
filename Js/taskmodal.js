var id=6;
function renderTasks() {
    var tbody = document.querySelector('#tasksTable tbody');
    tbody.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (task) {
        var row = document.createElement('tr');
        var idCell = document.createElement('td');
        idCell.textContent = task.id;
        var projectCell = document.createElement('td');
        projectCell.textContent = task.project;
        var nameCell = document.createElement('td');
        nameCell.textContent = task.taskName;
        var descCell = document.createElement('td');
        descCell.textContent = task.description;
        var assignedCell = document.createElement('td');
        assignedCell.textContent = task.assignedStudent;
        var statusCell = document.createElement('td');
        statusCell.textContent = task.status;
        statusCell.classList.add('status');
        var sanitizedStatus = task.status.replace(/\s+/g, '-');
        statusCell.classList.add(sanitizedStatus);

        var dueDateCell = document.createElement('td');
        dueDateCell.textContent = task.dueDate;
        row.appendChild(idCell);
        row.appendChild(projectCell);
        row.appendChild(nameCell);
        row.appendChild(descCell);
        row.appendChild(assignedCell);
        row.appendChild(statusCell);
        row.appendChild(dueDateCell);
        tbody.appendChild(row);
    });
}

document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'addtaskBtn') {
    console.log('Add Task button clicked.');
    // Your logic here
    const form = document.querySelector('#taskform');
    if (!form) {
        console.error("Form element not found!");
        return;
    }

    console.log('Checking form validity...');
    // Check if the form is valid
    if (!form.checkValidity()) {
        event.preventDefault(); // Prevent form submission if it's invalid
        console.warn('Form is invalid. Showing validation messages.');
        form.reportValidity(); // Show validation errors
        return; // Stop further execution
    }
    
    console.log('Form is valid. Proceeding with project creation.');

    // Get project details from form
    const project = document.getElementById("projectTitle").value;
    const taskName = document.getElementById("taskName").value;
    const description = document.getElementById("taskDescription").value;
    const assignedStudent = document.getElementById("assignedStudent").value;
    const status = document.getElementById("taskStatus").value;
    const dueDate = document.getElementById("dueDate").value;

    console.log("Extracted Task Details:");
    console.log({ id, project, taskName, description, assignedStudent, status, dueDate});

    // Create a project object
    const task = { id, project, taskName, description, assignedStudent, status, dueDate };

    // Retrieve existing projects from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Existing projects:", tasks);

    // Add new project to the array
    tasks.push(task);
    console.log("Updated projects array:", tasks);

    // Save updated projects array to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks saved to localStorage.");

    // Refresh the projects display
    renderTasks();
    id=id+1;
}
});