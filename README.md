# 🎓 Student-Teacher Appointment
        A full-stack web application for managing student–teacher appointment bookings with admin-controlled access approval.

        The platform allows students to request appointments, teachers to manage and respond, and admins to approve users before system access. Authentication is handled using Firebase Authentication, while MongoDB Atlas ensures scalable and persistent data storage. The backend API is powered by Node.js and Express.js, with structured logging using Winston.

        The homepage dynamically displays approved students and teachers only.
    
**Frontend Link:-** https://student-teacher-appointment-green.vercel.app/ *(may take a few seconds to load)*.

**🚀 Features:**

**🔑 Authentication & Access Control**

        User accounts created using Firebase Authentication (email-based)

        Unique Firebase UID stored and linked with MongoDB records

        Admin approval required before students and teachers become active

        Role-based access control enforced at the application level

**👩‍🎓 Student Module**

        Register with profile details (name, email, subject, department)

        Book appointments with teachers

        Track appointment status (pending / approved)

**👨‍🏫 Teacher Module**

        Register with professional details (department, subject expertise)

        View student appointment requests

        Approve or cancel appointments

**🧑‍💼 Admin Module**

        Approve or reject student and teacher registrations

        Manage all appointments

        Perform full CRUD operations on student and teacher data

**🌐 General**

        Responsive and user-friendly React UI

        Action logging using Winston Logger

        MongoDB Atlas for persistent data storage

**🛠️ Technologies Used**

        Frontend: React.js (HTML, CSS, JavaScript)

        Backend: Node.js, Express.js

        Authentication: Firebase Authentication

        Database: MongoDB Atlas

        Logging: Winston Logger

        Deployment: Cloud / Local (configurable)

