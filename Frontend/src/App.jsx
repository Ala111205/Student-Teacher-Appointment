import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import './App.css';
import Enrollment from "./pages/enrollment.jsx";
import StudentRegister from "./pages/studentRegister.jsx";
import TeacherRegister from "./pages/teacherRegister.jsx";
import AdminApproval from "./components/adminApproval.jsx";
import Studentdata from "./pages/studentData.jsx";
import TeacherData from "./pages/teacherData.jsx";
import Contact from "./pages/contact.jsx";

function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <div className="container">
        <Router>
          <Navbar show={show} setShow={setShow}/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/enroll" element={<Enrollment/>} />
            <Route path="/studentRegister" element={<StudentRegister/>} />
            <Route path="/teacherRegister" element={<TeacherRegister/>} />
            <Route path="/adminApproval" element={<AdminApproval/>} />
            <Route path="/studentData" element={<Studentdata/>} />
            <Route path="/teacherData" element={<TeacherData/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
