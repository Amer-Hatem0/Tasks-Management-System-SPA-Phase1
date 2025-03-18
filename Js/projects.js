 
function displayProjects() {
    const projectsContainer = document.getElementById("projectsContainer");
    projectsContainer.innerHTML = "";  

    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        projectCard.innerHTML = `
    
        <div class="card-header">
            <h3 class="project-title">${project.title}</h3>
        </div>
        
        <div class="project-description">
            <p><strong>Description:</strong> ${project.description}</p>
        </div>

        <div class="card-details">
            <p><strong>Students:</strong> ${project.students.join(", ")}</p>
            <p><strong>Category:</strong> ${project.category}</p>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${project.status === "Completed" ? 100 : 56}%;">
                ${project.status === "Completed" ? 100 : 56}%
            </div>
        </div>

        <!-- Dates aligned left and right -->
        <div class="project-dates">
            <span class="start-date">${project.startDate}</span>
            <span class="end-date">${project.endDate}</span>
        </div>
    
`;

        

        projectsContainer.appendChild(projectCard);
    });
}



var storedProjects = JSON.parse(localStorage.getItem('projects'));
if (!storedProjects || !storedProjects.length) {
    storedProjects = [
        {
            id: 1,
            title: "Website Redesign",
            description: "Redesign the company website to improve user experience.",
            students: ["Student 1", "Student 2"],
            category: "Web Development",
            status: "Completed",
            startDate: "2023-01-01",
            endDate: "2023-06-01"
        },
        {
            id: 2,
            title: "Mobile App Development",
            description: "Develop a mobile application for our services.",
            students: ["Student 3", "Student 4"],
            category: "Mobile Development",
            status: "In Progress",
            startDate: "2023-03-15",
            endDate: "2023-06-15"
        },
        {
            id: 3,
            title: "Data Analysis Project",
            description: "Analyze data from the last quarter to find insights.",
            students: ["Student 5"],
            category: "Data Science",
            status: "Completed",
            startDate: "2023-03-01",
            endDate: "2023-05-01"
        },
        {
            id: 4,
            title: "Machine Learning Model",
            description: "Create a machine learning model for predictions.",
            students: ["Student 1", "Student 3"],
            category: "Machine Learning",
            status: "Completed",
            startDate: "2023-04-01",
            endDate: "2023-09-01"
        },
        {
            id: 5,
            title: "Machine Learning Model",
            description: "Create a machine learning model for predictions 2.",
            students: ["Student 1", "Student 3"],
            category: "Machine Learning",
            status: "In Progress",
            startDate: "2023-04-01",
            endDate: "2026-09-01"
        }
    ];
    
    localStorage.setItem("projects", JSON.stringify(storedProjects));
    displayProjects();
}
 

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("addProjectModal");
    const openModalBtn = document.getElementById("openProjectModal");
    const closeModalBtn = modal.querySelector(".close");

    openModalBtn.addEventListener("click", function () {
        modal.classList.add("show");
    });

     closeModalBtn.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let studentsList = document.getElementById("studentsList");
   let students = users.filter(user => user.role === "student");
    students.forEach(student => {
        let option = document.createElement("option");
        option.value = student.username;
        option.textContent = student.username;
        studentsList.appendChild(option);
    });
});

