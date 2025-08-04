import {useEffect, useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css"

export default function StudentRegister(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        subject: "",
        department: "",
    });

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value });
    };

   const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, role, subject, department } = formData;

    // Validate required fields
    if (!name || !email || !role || !subject || !department) {
        alert("All fields are required");
        return;
    }

    // Validate role
    if (role.toLowerCase() !== "teacher") {
        alert("Role must be teacher");
        return;
    }

    try {
        const defaultPassword = "teacher@123";
        const userCredential = await createUserWithEmailAndPassword(auth, email, defaultPassword);
        const id = userCredential.user.uid;

        const res = await axios.post("http://localhost:4000/api/teachers/create", {
            id,
            name,
            email,
            role,
            subject,
            department
        });

        console.log(res.data);
        alert("Teacher registered successfully");

    } catch (error) {
        console.log(error.message);
        alert("Registration failed: " + error.message);
    }
};

    console.log("sending data to backend: ",formData)

    useEffect(()=>{
            AOS.init({
                duration:1200,
                once:true
            });

            AOS.refresh();
        },[]);

    return(
        <>
            <div className="register">
                <form data-aos="zoom-in" action="" className="inputContainer">
                    <h1>Teacher Register</h1>
                    <input className="inp" name="name" type="text" onChange={handleChange} placeholder="Enter your name" />
                    <div>
                        <input className="inp" name="email" type="text" onChange={handleChange} placeholder="Enter your email" />
                        <span className="email"><MdEmail /></span>
                    </div>
                    <input className="inp" name="role" type="text" onChange={handleChange} placeholder="Enter the role" />
                    <input className="inp" name="subject" type="text" onChange={handleChange} placeholder="Enter the subject" />
                    <input className="inp" name="department" type="text" onChange={handleChange} placeholder="Enter the depart or std" />
                    <button onClick={handleRegister}>Register</button>
                </form>
            </div>
        </>
    )
};