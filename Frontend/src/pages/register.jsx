import {useEffect, useState } from "react";
import {auth} from "../firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

export default function Register () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    
    console.log("Role: "+role);

    console.log("Gender: "+gender);

    const handleRegister = async (e)=>{
        e.preventDefault();

        if(password !== rePassword){
            alert("Password do not match")
            return;
        }

        try {
            if(firstName && email && role && gender && password && rePassword){
                const UserCredinals = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(UserCredinals.user,{
                    displayName:`${firstName} ${lastName}`
                });

                const response = await fetch("http://localhost:4000/api/users/register", {
                    method:"POST",
                    headers:{"content-type":"application/json"},
                    body:JSON.stringify({name: `${firstName} ${lastName}`, email, password, role, gender})
                });

                const data = await response.json();

                if (!response.ok) {
                    console.log("Error:", data.message || data.error || "Unknown error");
                    alert(`Registration failed: ${data.message || data.error || "Unknown error"}`);
                    return;
                }

                console.log("Success:", data);
                alert("Registered successfully");
            }
            else{
                alert("Fill all the field to submit")
            }

            setFirstName("");
            setLastName("");
            setEmail("");
            setRole("");
            setGender("");
            setPassword("");
            setRePassword("");

        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                alert("This email as already registered. Please use instead.")
            }
            else{
                console.log(error.message);
                alert(error.message);
            }

            console.log("Fetch failed:", error.message);
            alert("Something went wrong. Please try again.");
        }
    }
    return(
        <>
        <div className="register">
            <form action="" className="inputContainer">
                <h1>Register</h1>
                <input className="inp" type="text" placeholder="Firstname" onChange={(e)=>{setFirstName(e.target.value)}} />
                <input className="inp" type="text" placeholder="Lastname" onChange={(e)=>{setLastName(e.target.value)}} />
                <input className="inp" type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
                <select value={role} onChange={(e)=>{setRole(e.target.value)}}>
                    <option value="">--Select role--</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <div>
                    <h3>Gender</h3>
                    <div>
                        <label><input type="radio" value="Male" checked={gender === "Male"} onChange={(e)=>{setGender(e.target.value)}} /> Male</label>
                        <label><input type="radio" value="Female" checked={gender === "Female"} onChange={(e)=>{setGender(e.target.value)}} /> Female</label>
                    </div>
                </div>
                <input className="inp" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                <input className="inp" type="password" placeholder="Re-Password" onChange={(e)=>{setRePassword(e.target.value)}} />
                <button onClick={handleRegister}>Submit</button>
            </form>
        </div>
        </>
    )
}