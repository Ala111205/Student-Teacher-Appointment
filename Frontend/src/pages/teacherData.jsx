import { useState, useEffect } from "react";
import api from "../axios";

export default function TeacherData(){
    const [teacherData, setTeacherData] = useState([]);

    const handleData = async ()=>{
        try {
            const res = await api.get("/api/teachers/approved");
            setTeacherData(res.data);
        } catch (error) {
            console.log("Error fetching approved teacher:", error)
        }
    }

    useEffect(()=>{
        handleData();
    },[]);

    return(
        <>
            <div className="data">
                <div>
                    <h2>Teachers List</h2>
                </div>
                {teacherData.map((data)=>(
                    <div className="approved" key={data._id}>
                        <div>
                            <span>Name: {data.name}</span>
                            <span>Role: {data.role}</span>
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