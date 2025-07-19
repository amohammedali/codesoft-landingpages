// Global variables
let attendanceChart, distributionChart;
let employeeData = [];

// Sample employee data
const sampleEmployees = [
    { name: "Sarah Johnson", department: "Marketing", checkIn: "08:45", checkOut: "17:30", status: "present", avatar: "SJ" },
    { name: "Michael Chen", department: "Engineering", checkIn: "09:15", checkOut: "18:00", status: "late", avatar: "MC" },
    { name: "Emily Davis", department: "HR", checkIn: "08:30", checkOut: "17:15", status: "present", avatar: "ED" },
    { name: "David Wilson", department: "Sales", checkIn: "Remote", checkOut: "Remote", status: "remote", avatar: "DW" },
    { name: "Lisa Anderson", department: "Finance", checkIn: "---", checkOut: "---", status: "absent", avatar: "LA" },
    { name: "James Rodriguez", department: "Engineering", checkIn: "08:50", checkOut: "17:45", status: "present", avatar: "JR" },
    { name: "Anna Thompson", department: "Design", checkIn: "09:10", checkOut: "18:15", status: "late", avatar: "AT" },
    { name: "Robert Lee", department: "Operations", checkIn: "Remote", checkOut: "Remote", status: "remote", avatar: "RL" },
    { name: "Jessica Brown", department: "Marketing", checkIn: "08:35", checkOut: "17:20", status: "present", avatar: "JB" },
    { name: "Kevin Zhang", department: "Engineering", checkIn: "---", checkOut: "---", status: "absent", avatar: "KZ" }
];

// Initialize particles background
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#6c5ce7"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6c5ce7",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Initialize charts
function initCharts() {
    // Attendance Chart
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    attendanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Present',
                    data: [135, 142, 138, 145, 150, 40, 25],
                    backgroundColor: '#00b894',
                    borderRadius: 6,
                    barThickness: 20
                },
                {
                    label: 'Absent',
                    data: [12, 8, 10, 5, 3, 2, 1],
                    backgroundColor: '#ff7675',
                    borderRadius: 6,
                    barThickness: 20
                },
                {
                    label: 'Late',
                    data: [18, 15, 20, 12, 10, 3, 2],
                    backgroundColor: '#fdcb6e',
                    borderRadius: 6,
                    barThickness: 20
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#e0e6f0',
                        font: {
                            size: 13
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#a4b1cd'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a4b1cd'
                    }
                }
            }
        }
    });
    
    // Distribution Chart
    const distCtx = document.getElementById('distributionChart').getContext('2d');
    distributionChart = new Chart(distCtx, {
        type: 'doughnut',
        data: {
            labels: ['Present', 'Absent', 'Late', 'Remote'],
            datasets: [{
                data: [142, 8, 15, 22],
                backgroundColor: [
                    '#00b894',
                    '#ff7675',
                    '#fdcb6e',
                    '#00cec9'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e6f0',
                        font: {
                            size: 13
                        },
                        padding: 20
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// Populate employee table
function populateEmployeeTable() {
    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';
    
    employeeData.forEach(employee => {
        const row = document.createElement('tr');
        
        // Determine status class
        let statusClass, statusText;
        switch(employee.status) {
            case 'present':
                statusClass = 'status-present';
                statusText = 'Present';
                break;
            case 'absent':
                statusClass = 'status-absent';
                statusText = 'Absent';
                break;
            case 'late':
                statusClass = 'status-late';
                statusText = 'Late';
                break;
            case 'remote':
                statusClass = 'status-remote';
                statusText = 'Remote';
                break;
            default:
                statusClass = '';
                statusText = employee.status;
        }
        
        row.innerHTML = `
            <td>
                <div class="employee-info">
                    <div class="employee-avatar">${employee.avatar}</div>
                    <div>
                        <div class="employee-name">${employee.name}</div>
                        <div class="employee-dept">${employee.department}</div>
                    </div>
                </div>
            </td>
            <td>${employee.department}</td>
            <td>${employee.checkIn}</td>
            <td>${employee.checkOut}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <button class="action-btn"><i class="fas fa-eye"></i></button>
                <button class="action-btn"><i class="fas fa-edit"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Search employees
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = sampleEmployees.filter(employee => 
            employee.name.toLowerCase().includes(searchTerm) || 
            employee.department.toLowerCase().includes(searchTerm) ||
            employee.status.toLowerCase().includes(searchTerm)
        );
        
        employeeData = filteredData;
        populateEmployeeTable();
    });
}

// Update chart period
function setupChartPeriodButtons() {
    const periodButtons = document.querySelectorAll('.chart-actions .chart-btn[data-period]');
    const distButtons = document.querySelectorAll('.chart-actions .chart-btn[data-dist]');
    
    // Handle period buttons
    periodButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            periodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get period from data attribute
            const period = button.getAttribute('data-period');
            
            // Update chart based on period
            switch(period) {
                case 'week':
                    updateAttendanceChart([135, 142, 138, 145, 150, 40, 25], [12, 8, 10, 5, 3, 2, 1], [18, 15, 20, 12, 10, 3, 2]);
                    break;
                case 'month':
                    updateAttendanceChart([120, 130, 140, 145, 150, 155, 160, 155, 150, 145, 140, 135, 130, 125, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 160, 155, 150, 145, 140, 135], 
                                          [10, 8, 12, 5, 7, 3, 2, 4, 6, 8, 10, 12, 8, 6, 4, 2, 3, 5, 7, 9, 11, 8, 6, 4, 2, 3, 5, 7, 9, 11], 
                                          [15, 12, 18, 10, 8, 5, 4, 6, 8, 10, 12, 15, 12, 10, 8, 5, 4, 6, 8, 10, 12, 15, 12, 10, 8, 5, 4, 6, 8, 10]);
                    break;
                case 'quarter':
                    updateAttendanceChart([140, 145, 150, 155, 160, 165, 170, 175, 170, 165, 160, 155], 
                                          [8, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6], 
                                          [12, 10, 8, 6, 5, 4, 3, 4, 5, 6, 8, 10]);
                    break;
            }
        });
    });
    
    // Handle distribution buttons
    distButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            distButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get distribution from data attribute
            const dist = button.getAttribute('data-dist');
            
            // Update chart based on distribution
            if (dist === 'today') {
                updateDistributionChart([142, 8, 15, 22]);
            } else if (dist === 'week') {
                updateDistributionChart([980, 56, 105, 154]);
            }
        });
    });
}

// Update attendance chart data
function updateAttendanceChart(presentData, absentData, lateData) {
    attendanceChart.data.datasets[0].data = presentData;
    attendanceChart.data.datasets[1].data = absentData;
    attendanceChart.data.datasets[2].data = lateData;
    attendanceChart.update();
}

// Update distribution chart data
function updateDistributionChart(data) {
    distributionChart.data.datasets[0].data = data;
    distributionChart.update();
}

// Simulate live data updates
function simulateLiveData() {
    setInterval(() => {
        // Update present count
        const presentValue = document.getElementById('presentCount');
        let currentPresent = parseInt(presentValue.textContent);
        currentPresent = Math.max(140, Math.min(150, currentPresent + Math.floor(Math.random() * 3) - 1));
        presentValue.textContent = currentPresent;
        
        // Update absent count
        const absentValue = document.getElementById('absentCount');
        let currentAbsent = parseInt(absentValue.textContent);
        currentAbsent = Math.max(6, Math.min(10, currentAbsent + Math.floor(Math.random() * 2) - 1));
        absentValue.textContent = currentAbsent;
        
        // Update late count
        const lateValue = document.getElementById('lateCount');
        let currentLate = parseInt(lateValue.textContent);
        currentLate = Math.max(12, Math.min(18, currentLate + Math.floor(Math.random() * 3) - 1));
        lateValue.textContent = currentLate;
        
        // Update remote count
        const remoteValue = document.getElementById('remoteCount');
        let currentRemote = parseInt(remoteValue.textContent);
        currentRemote = Math.max(20, Math.min(25, currentRemote + Math.floor(Math.random() * 3) - 1));
        remoteValue.textContent = currentRemote;
        
        // Update distribution chart
        distributionChart.data.datasets[0].data = [
            currentPresent,
            currentAbsent,
            currentLate,
            currentRemote
        ];
        distributionChart.update();
    }, 5000);
}

// Initialize the application
function initApp() {
    // Initialize particles background
    initParticles();
    
    // Initialize charts
    initCharts();
    
    // Set employee data
    employeeData = [...sampleEmployees];
    
    // Populate employee table
    populateEmployeeTable();
    
    // Setup search functionality
    setupSearch();
    
    // Setup chart period buttons
    setupChartPeriodButtons();
    
    // Start live data simulation
    simulateLiveData();
    
    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('.employee-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);