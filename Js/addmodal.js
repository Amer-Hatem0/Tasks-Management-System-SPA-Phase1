

// document.addEventListener('DOMContentLoaded', function () {
//     const element = document.querySelector('#addProjectBtn');
//     if (element) {
//         element.addEventListener('click', (event) => {
    document.addEventListener('click', function (event) {
            if (event.target && event.target.id === 'addProjectBtn') {
            console.log('Add Project button clicked.');
            // Your logic here
            const form = document.querySelector('#projectform');
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
            const title = document.getElementById("projectTitle").value;
            const description = document.getElementById("projectDescription").value;
            const students = Array.from(document.getElementById("studentsList").selectedOptions).map(opt => opt.value);
            const category = document.getElementById("projectCategory").value;
            const startDate = document.getElementById("startDate").value;
            const endDate = document.getElementById("endDate").value;
            const status = document.getElementById("projectStatus").value;

            console.log("Extracted Project Details:");
            console.log({ title, description, students, category, startDate, endDate, status });

            // Create a project object
            const project = { title, description, students, category, startDate, endDate, status };

            // Retrieve existing projects from local storage
            let projects = JSON.parse(localStorage.getItem("projects")) || [];
            console.log("Existing projects:", projects);

            // Add new project to the array
            projects.push(project);
            console.log("Updated projects array:", projects);

            // Save updated projects array to local storage
            localStorage.setItem("projects", JSON.stringify(projects));
            console.log("Projects saved to localStorage.");

            // Refresh the projects display
            displayProjects();
        }
        });



// document.getElementById("addProjectBtn").addEventListener("click", function () {
//      // Get the form element
//  const form = document.querySelector('#projectform');

//  // Check if the form is valid
//  if (!form.checkValidity()) {
//      preventDefault(); // Prevent form submission if it's invalid
//      form.reportValidity();  // Let the browser show validation errors (this will highlight the fields)
//      return; // Stop further execution
//  }
//     // Get project details from form
//     const title = document.getElementById("projectTitle").value;
//     const description = document.getElementById("projectDescription").value;
//     const students = Array.from(document.getElementById("studentsList").selectedOptions).map(opt => opt.value);
//     const category = document.getElementById("projectCategory").value;
//     const startDate = document.getElementById("startDate").value;
//     const endDate = document.getElementById("endDate").value;
//     const status = document.getElementById("projectStatus").value;

//     // Create a project object
//     const project = { title, description, students, category, startDate, endDate, status };

//     // Retrieve existing projects from local storage
//     let projects = JSON.parse(localStorage.getItem("projects")) || [];

//     // Add new project to the array
//     projects.push(project);

//     // Save updated projects array to local storage
//     localStorage.setItem("projects", JSON.stringify(projects));

//     // Refresh the projects display
//     displayProjects();
// });

// Function to display projects from local storage
function displayProjects() {
    const projectsContainer = document.getElementById("projectsContainer");
    projectsContainer.innerHTML = ""; // Clear previous content

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

// Load projects on page load
document.addEventListener("DOMContentLoaded", displayProjects);
