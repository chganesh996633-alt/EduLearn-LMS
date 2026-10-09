/* =====================================================
   EDULEARN LMS - JAVASCRIPT
   Student and Administrator Login
===================================================== */


/* =====================================================
   1. LOGIN SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const role = document.getElementById("role").value;

            const error = document.getElementById("loginError");

            if (!name || !email || !password) {
                error.textContent = "Please enter all details.";
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                error.textContent = "Please enter a valid email address.";
                return;
            }

            error.textContent = "";

            if (role === "admin") {
                loginAsAdmin(name, email);
            } else {
                loginAsStudent(name, email);
            }
        });
    }

    loadSavedUser();
});


/* =====================================================
   2. ADMINISTRATOR LOGIN
===================================================== */

function loginAsAdmin(name, email) {
    localStorage.setItem("currentRole", "admin");
    localStorage.setItem("adminName", name);
    localStorage.setItem("adminEmail", email);

    const adminDisplayName =
        document.getElementById("adminDisplayName");

    const adminProfileName =
        document.getElementById("adminProfileName");

    const adminProfileEmail =
        document.getElementById("adminProfileEmail");

    if (adminDisplayName) {
        adminDisplayName.textContent = name;
    }

    if (adminProfileName) {
        adminProfileName.textContent = name;
    }

    if (adminProfileEmail) {
        adminProfileEmail.textContent = email;
    }

    // Hide login page and student desktop
    hideElement("loginPage");
    hideElement("app");

    // Display administrator desktop
    showElement("adminApp");

    showAdminSection("adminDashboard");

    updateAdminCounts();
}


/* =====================================================
   3. STUDENT LOGIN
===================================================== */

function loginAsStudent(name, email) {
    localStorage.setItem("currentRole", "student");
    localStorage.setItem("studentName", name);
    localStorage.setItem("studentEmail", email);

    const displayName = document.getElementById("displayName");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");

    if (displayName) {
        displayName.textContent = name;
    }

    if (profileName) {
        profileName.textContent = name;
    }

    if (profileEmail) {
        profileEmail.textContent = email;
    }

    // Hide login page and administrator desktop
    hideElement("loginPage");
    hideElement("adminApp");

    // Display student desktop
    showElement("app");

    showSectionById("dashboard");
}


/* =====================================================
   4. HELPER FUNCTIONS
===================================================== */

function hideElement(id) {
    const element = document.getElementById(id);

    if (element) {
        element.classList.add("hidden");
    }
}

function showElement(id) {
    const element = document.getElementById(id);

    if (element) {
        element.classList.remove("hidden");
    }
}


/* =====================================================
   5. STUDENT NAVIGATION
===================================================== */

function showSection(sectionId, clickedButton) {
    const sections = document.querySelectorAll(".page-section");

    sections.forEach(function (section) {
        section.classList.add("hidden");
    });

    const target = document.getElementById(sectionId);

    if (target) {
        target.classList.remove("hidden");
    }

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(function (item) {
        item.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    const titles = {
        dashboard: "Dashboard",
        courses: "My Courses",
        assignments: "Assignments",
        progress: "Learning Progress",
        discussion: "Discussion Forum",
        certificates: "My Certificates",
        profile: "My Profile"
    };

    const pageTitle = document.getElementById("pageTitle");

    if (pageTitle) {
        pageTitle.textContent = titles[sectionId] || "Dashboard";
    }
}


/* =====================================================
   6. OPEN STUDENT SECTION
===================================================== */

function showSectionById(sectionId) {
    const sections = document.querySelectorAll(".page-section");

    sections.forEach(function (section) {
        section.classList.add("hidden");
    });

    const target = document.getElementById(sectionId);

    if (target) {
        target.classList.remove("hidden");
    }

    const titles = {
        dashboard: "Dashboard",
        courses: "My Courses",
        assignments: "Assignments",
        progress: "Learning Progress",
        discussion: "Discussion Forum",
        certificates: "My Certificates",
        profile: "My Profile"
    };

    const pageTitle = document.getElementById("pageTitle");

    if (pageTitle) {
        pageTitle.textContent = titles[sectionId] || "Dashboard";
    }
}


/* =====================================================
   7. ADMINISTRATOR NAVIGATION
===================================================== */

function showAdminSection(sectionId, clickedButton) {
    const sections = document.querySelectorAll(".admin-section");

    sections.forEach(function (section) {
        section.classList.add("hidden");
    });

    const target = document.getElementById(sectionId);

    if (target) {
        target.classList.remove("hidden");
    }

    const navItems = document.querySelectorAll(".admin-nav-item");

    navItems.forEach(function (item) {
        item.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    } else {
        navItems.forEach(function (item) {
            const onclick = item.getAttribute("onclick") || "";

            if (onclick.includes("'" + sectionId + "'")) {
                item.classList.add("active");
            }
        });
    }

    const titles = {
        adminDashboard: "Admin Dashboard",
        adminCourses: "Manage Courses",
        adminStudents: "Students",
        adminAssignments: "Assignments",
        adminProfile: "Admin Details"
    };

    const pageTitle = document.getElementById("adminPageTitle");

    if (pageTitle) {
        pageTitle.textContent = titles[sectionId] || "Admin Dashboard";
    }
}


/* =====================================================
   8. ADD COURSE
===================================================== */

function addAdminCourse() {
    const courseName = prompt("Enter course name:");

    if (!courseName || !courseName.trim()) {
        return;
    }

    const category = prompt("Enter course category:", "General");

    if (category === null) {
        return;
    }

    const instructor = prompt("Enter instructor name:", "Not assigned");

    if (instructor === null) {
        return;
    }

    const table = document.getElementById("adminCourseTable");

    if (!table) {
        alert("Course table not found.");
        return;
    }

    const row = document.createElement("tr");

    const values = [
        courseName.trim(),
        category.trim() || "General",
        instructor.trim() || "Not assigned"
    ];

    values.forEach(function (value) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    const statusCell = document.createElement("td");
    const status = document.createElement("span");

    status.className = "admin-status";
    status.textContent = "Active";

    statusCell.appendChild(status);
    row.appendChild(statusCell);

    table.appendChild(row);

    updateAdminCounts();

    alert("Course added successfully!");
}


/* =====================================================
   9. ADD STUDENT
===================================================== */

function addAdminStudent() {
    const studentName = prompt("Enter student name:");

    if (!studentName || !studentName.trim()) {
        return;
    }

    const studentEmail = prompt("Enter student email:");

    if (!studentEmail || !studentEmail.trim()) {
        return;
    }

    const table = document.getElementById("adminStudentTable");

    if (!table) {
        alert("Student table not found.");
        return;
    }

    const row = document.createElement("tr");

    [studentName.trim(), studentEmail.trim()].forEach(function (value) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    const statusCell = document.createElement("td");
    const status = document.createElement("span");

    status.className = "admin-status";
    status.textContent = "Active";

    statusCell.appendChild(status);
    row.appendChild(statusCell);

    table.appendChild(row);

    updateAdminCounts();

    alert("Student added successfully!");
}


/* =====================================================
   10. UPDATE ADMIN DASHBOARD COUNTS
===================================================== */

function updateAdminCounts() {
    const courseTable = document.getElementById("adminCourseTable");
    const studentTable = document.getElementById("adminStudentTable");
    const assignmentTable = document.getElementById("adminAssignmentTable");

    const courseCount = document.getElementById("adminCourseCount");
    const studentCount = document.getElementById("adminStudentCount");
    const assignmentCount = document.getElementById("adminAssignmentCount");

    if (courseTable && courseCount) {
        courseCount.textContent = courseTable.rows.length;
    }

    if (studentTable && studentCount) {
        studentCount.textContent = studentTable.rows.length;
    }

    if (assignmentTable && assignmentCount) {
        assignmentCount.textContent = assignmentTable.rows.length;
    }
}


/* =====================================================
   11. COURSE SEARCH
===================================================== */

function searchCourses() {
    const searchInput = document.getElementById("courseSearch");

    if (!searchInput) {
        return;
    }

    const searchText = searchInput.value.toLowerCase();

    const courses = document.querySelectorAll(".searchable");

    courses.forEach(function (course) {
        const courseText = course.textContent.toLowerCase();

        course.style.display =
            courseText.includes(searchText) ? "" : "none";
    });
}


/* =====================================================
   12. OPEN COURSE
===================================================== */

function openCourse(courseName) {
    const modal = document.getElementById("modal");
    const content = document.getElementById("modalContent");

    if (!modal || !content) {
        alert("Course details: " + courseName);
        return;
    }

    content.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = courseName;

    const description = document.createElement("p");
    description.textContent =
        "Welcome to this course. Select a lesson to start learning.";

    content.appendChild(heading);
    content.appendChild(description);

    const lessons = [
        "Introduction",
        "Fundamentals",
        "Practical Concepts",
        "Advanced Topics"
    ];

    // Tutorial links for each course
    const courseLinks = {
        java: {
            introduction:
                "https://www.geeksforgeeks.org/java/introduction-to-java/",
            fundamentals:
                "https://www.geeksforgeeks.org/java/java-tutorial/",
            practical:
                "https://www.geeksforgeeks.org/java/",
            advanced:
                "https://www.geeksforgeeks.org/java/"
        },

        "web development": {
            introduction:
                "https://www.geeksforgeeks.org/web-development/",
            fundamentals:
                "https://www.geeksforgeeks.org/html/",
            practical:
                "https://www.geeksforgeeks.org/css/",
            advanced:
                "https://www.geeksforgeeks.org/javascript/"
        },

        sql: {
            introduction:
                "https://www.geeksforgeeks.org/sql/sql-tutorial/",
            fundamentals:
                "https://www.geeksforgeeks.org/sql/",
            practical:
                "https://www.geeksforgeeks.org/sql/sql-queries/",
            advanced:
                "https://www.geeksforgeeks.org/sql/"
        },

        database: {
            introduction:
                "https://www.geeksforgeeks.org/dbms/",
            fundamentals:
                "https://www.geeksforgeeks.org/dbms/",
            practical:
                "https://www.geeksforgeeks.org/dbms/",
            advanced:
                "https://www.geeksforgeeks.org/dbms/"
        }
    };

    // Identify the selected course
    const courseNameLower = courseName.toLowerCase();

    let selectedCourse = null;

    if (courseNameLower.includes("java")) {
        selectedCourse = courseLinks.java;

    } else if (courseNameLower.includes("web development")) {
        selectedCourse = courseLinks["web development"];

    } else if (courseNameLower.includes("sql")) {
        selectedCourse = courseLinks.sql;

    } else if (courseNameLower.includes("database")) {
        selectedCourse = courseLinks.database;
    }

    // Create lesson buttons
    lessons.forEach(function (lessonName) {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = "📘 " + lessonName;
        button.className = "lesson";

        button.addEventListener("click", function () {
            if (!selectedCourse) {
                alert("Tutorial is not available for this course yet.");
                return;
            }

            let url;

            switch (lessonName) {
                case "Introduction":
                    url = selectedCourse.introduction;
                    break;

                case "Fundamentals":
                    url = selectedCourse.fundamentals;
                    break;

                case "Practical Concepts":
                    url = selectedCourse.practical;
                    break;

                case "Advanced Topics":
                    url = selectedCourse.advanced;
                    break;

                default:
                    return;
            }

            window.open(url, "_blank", "noopener,noreferrer");
        });

        content.appendChild(button);
    });

    modal.classList.remove("hidden");
}


/* =====================================================
   13. CLOSE MODAL
===================================================== */

function closeModal() {
    const modal = document.getElementById("modal");

    if (modal) {
        modal.classList.add("hidden");
    }
}



/* =====================================================
   14. SUBMIT ASSIGNMENT
===================================================== */

function submitAssignment(button) {
    if (!button) {
        return;
    }

    const confirmed = confirm("Do you want to submit this assignment?");

    if (!confirmed) {
        return;
    }

    button.textContent = "Submitted ✓";
    button.disabled = true;

    updateAssignmentCount();
}


/* =====================================================
   15. UPDATE ASSIGNMENT COUNT
===================================================== */

function updateAssignmentCount() {
    const buttons = document.querySelectorAll("#assignmentList button");

    let remaining = 0;

    buttons.forEach(function (button) {
        if (!button.disabled) {
            remaining++;
        }
    });

    const count = document.getElementById("assignmentCount");

    if (count) {
        count.textContent = remaining;
    }
}


/* =====================================================
   16. CREATE DISCUSSION
===================================================== */

function createDiscussion() {
    const topic = prompt("Enter your discussion topic:");

    if (!topic || !topic.trim()) {
        return;
    }

    const list = document.getElementById("discussionList");

    if (!list) {
        alert("Discussion list not found.");
        return;
    }

    const discussion = document.createElement("div");
    discussion.className = "discussion";

    const heading = document.createElement("h3");
    heading.textContent = topic.trim();

    const paragraph = document.createElement("p");
    paragraph.textContent = "Created by you";

    discussion.appendChild(heading);
    discussion.appendChild(paragraph);

    list.prepend(discussion);

    alert("Discussion created successfully!");
}


/* =====================================================
   17. DOWNLOAD CERTIFICATE
===================================================== */

function downloadCertificate(courseName) {
    const studentNameElement = document.getElementById("displayName");

    const studentName = studentNameElement
        ? studentNameElement.textContent
        : "Student";

    const certificateWindow = window.open("", "_blank");

    if (!certificateWindow) {
        alert("Please allow pop-ups to print your certificate.");
        return;
    }

    const safeStudentName = escapeHTML(studentName);
    const safeCourseName = escapeHTML(courseName);

    certificateWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>EduLearn Certificate</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 40px;
                }

                .certificate {
                    border: 8px solid #5b43e8;
                    padding: 50px;
                    margin: 20px auto;
                }

                h1 {
                    color: #5b43e8;
                    font-size: 40px;
                }

                h2 {
                    font-size: 30px;
                }
            </style>
        </head>

        <body>
            <div class="certificate">
                <h1>EDULEARN</h1>
                <h2>Certificate of Completion</h2>

                <p>This certificate is presented to</p>

                <h2>${safeStudentName}</h2>

                <p>For completing the course</p>

                <h2>${safeCourseName}</h2>

                <p>Date: ${new Date().toLocaleDateString()}</p>
            </div>
        </body>
        </html>
    `);

    certificateWindow.document.close();

    certificateWindow.onload = function () {
        certificateWindow.print();
    };
}


/* =====================================================
   18. ESCAPE HTML
===================================================== */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}


/* =====================================================
   19. NOTIFICATIONS
===================================================== */

function showNotifications() {
    const modal = document.getElementById("modal");
    const content = document.getElementById("modalContent");

    if (!modal || !content) {
        alert("You have no new notifications.");
        return;
    }

    content.innerHTML = `
        <h2>Notifications</h2>

        <div class="lesson">
            📝 Check your pending assignments.
        </div>

        <div class="lesson">
            📚 Continue learning your enrolled courses.
        </div>

        <div class="lesson">
            🏆 Keep working towards your certificates.
        </div>
    `;

    modal.classList.remove("hidden");
}


/* =====================================================
   20. UPDATE LEARNING PROGRESS
===================================================== */

let progress = 65;

function updateProgress() {
    if (progress < 100) {
        progress++;
    }

    const overallProgress = document.getElementById("overallProgress");
    const overallProgressBar = document.getElementById("overallProgressBar");
    const circleProgress = document.getElementById("circleProgress");

    if (overallProgress) {
        overallProgress.textContent = progress + "%";
    }

    if (overallProgressBar) {
        overallProgressBar.style.width = progress + "%";
    }

    if (circleProgress) {
        circleProgress.textContent = progress + "%";
    }
}


/* =====================================================
   21. DARK MODE
===================================================== */

function toggleTheme() {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
}


/* =====================================================
   22. LOGOUT
===================================================== */

function logout() {
    const confirmed = confirm("Are you sure you want to log out?");

    if (!confirmed) {
        return;
    }

    // Hide both desktops
    hideElement("app");
    hideElement("adminApp");

    // Show login page
    showElement("loginPage");

    // Reset login form
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.reset();
    }

    // Clear the current role, but retain saved display details
    localStorage.removeItem("currentRole");

    const error = document.getElementById("loginError");

    if (error) {
        error.textContent = "";
    }
}


/* =====================================================
   23. LOAD SAVED USER DETAILS
===================================================== */

function loadSavedUser() {
    const role = localStorage.getItem("currentRole");

    const studentName = localStorage.getItem("studentName");
    const studentEmail = localStorage.getItem("studentEmail");

    const adminName = localStorage.getItem("adminName");
    const adminEmail = localStorage.getItem("adminEmail");

    if (studentName) {
        setText("displayName", studentName);
        setText("profileName", studentName);
        setText("profileEmail", studentEmail || "");
    }

    if (adminName) {
        setText("adminDisplayName", adminName);
        setText("adminProfileName", adminName);
        setText("adminProfileEmail", adminEmail || "");
    }

    // Always start at the login page after loading.
    // Do not automatically restore an administrator session.
    hideElement("app");
    hideElement("adminApp");
    showElement("loginPage");

    if (role === "admin" || role === "student") {
        localStorage.removeItem("currentRole");
    }

    updateAdminCounts();
}


/* =====================================================
   24. SET TEXT SAFELY
===================================================== */

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


/* =====================================================
   25. RESTORE DARK MODE
===================================================== */

(function restoreTheme() {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
    }
})();