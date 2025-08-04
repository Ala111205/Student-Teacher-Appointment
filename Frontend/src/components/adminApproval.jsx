import { useState, useEffect } from "react";
import api from "../axios";

export default function AdminApproval() {
    const [pendingStudents, setPendingStudents] = useState([]);
    const [pendingTeachers, setPendingTeachers] = useState([]);

    const fetchPending = async () => {
        try {
            const res = await api.get("/api/admins/pending", {
                headers: { "Cache-Control": "no-cache" }
            });
            setPendingStudents(res.data.students || []);
            setPendingTeachers(res.data.teachers || []);
        } catch (error) {
            console.log("Fetch Error: ", error.message);
        }
    };

    const handleApprove = async (type, id) => {
        try {
            await api.put(`/api/admins/approved/${type}/${id}`);
            if (type === "student") {
                setPendingStudents(prev => prev.filter(user => user._id !== id));
                alert("Student Approved");
            } else {
                setPendingTeachers(prev => prev.filter(user => user._id !== id));
                alert("Teacher Approved");
            }
        } catch (error) {
            console.log(`${type} Approval Error: `, error.message);
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    return (
       <>
            <div className="approval">
                <div className="content">
                    <h2>Pending Approvals</h2>
                </div>
                {pendingStudents.map((user)=>{
                    return(
                        <div className="approve" key={user._id}>
                            <div>
                                <span>Name:- {user.name}</span> 
                                <span>Role:- {user.role}</span> 
                                <span>Subject:-{user.subject}</span> 
                                <span className="spbut" onClick={() => handleApprove("student", user._id)}>Approve</span></div>
                        </div>
                    )
                })}
                {pendingTeachers.map((user)=>{
                    return(
                        <div className="approve" key={user._id}>
                            <div><span>Name:- {user.name}</span> 
                            <span>Role:- {user.role}</span> 
                            <span>Subject:-{user.subject}</span> 
                            <span className="spbut" onClick={() => handleApprove("teacher", user._id)}>Approve</span></div>
                        </div>
                    )
                })}
            </div>
       </>
    );
}
