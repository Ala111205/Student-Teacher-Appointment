import { useState, useEffect } from "react";
import api from "../axios";

export default function Studentdata(){
    const [studentdata, setStudentData] = useState([]);

    const handleData = async ()=>{
        try {
            const res = await api.get("http://localhost:4000/api/students/approved");
            
            console.log("students data: ", res.data)
            setStudentData(res.data);
        } catch (error) {
            console.log("Error fetching approved student: ", error)
        }
    };

    useEffect(()=>{
        handleData();
    },[]);

    return(
        <>
            <div className="data">
                <div>
                    <h2>Student List</h2>
                </div>
                {studentdata.map((data)=>(
                    <div className="approved" key={data._id}>
                        <div>
                            <span>Name: {data.name}</span>
                            <span>Role :{data.role}</span>
                            <span>Subject: {data.subject}</span>
                            <span>Department: {data.department}</span>
                            <span>Email: {data.email}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}