 
function updateDateTime() {
    document.getElementById('datetime').innerText = new Date().toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

 document.addEventListener("DOMContentLoaded", function() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.username) {
        document.getElementById("adminname").innerText = currentUser.username;
    }
});

const ctx = document.getElementById('dashboardChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Projects', 'Students', 'Tasks', 'Finished Projects'],
        datasets: [{
            label: 'Count',
            data: [5, 20, 10, 2],
            backgroundColor: ['#007bff', '#f39c12', '#8e44ad', '#27ae60'],
            borderColor: ['#0056b3', '#e67e22', '#732d91', '#1e8449'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
