document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "student") {
        alert("Access Denied! Redirecting to Sign In...");
        window.location.href = "SignIn.html";
        return;
    }
    
    document.getElementById("admin-name").innerText = currentUser.username;
    
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    
    let studentProjects = projects.filter(project => project.students.includes(currentUser.studentId));
    
     let projectsContainer = document.getElementById("projectsContainer");
    
    if (studentProjects.length === 0) {
        projectsContainer.innerHTML = "<p>No projects assigned.</p>";
        return;
    }
    
    studentProjects.forEach(project => {
        let projectElement = document.createElement("div");
        projectElement.classList.add("project-card");
        projectElement.innerHTML = `
          
    
    <div class="card-header">
    <h3 class="project-title aaa">${project.title}</h3>
    </div>
    
    <div class="project-description">
    <p><strong>Description:</strong> ${project.description}</p>
    </div>

    <div class="card-details">
    <p><strong>Students:</strong> ${project.students.join(", ")}</p>
    <p><strong>Category:</strong> ${project.category}</p>
    </div>

     
   <div class="progress-bar-container">
            <div class="progress-bar" style="">
            100%
            </div>
       
    </div>
 
    <div class="project-dates">
    <span>${project.startDate}</span>
    <span>${project.endDate}</span>
    </div>

 

        `;
        projectsContainer.appendChild(projectElement);
    });
});

