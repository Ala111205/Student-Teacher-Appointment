import { useNavigate } from "react-router-dom"

export default function Home(){
    const Navigate = useNavigate();

    return(
        <>
            <div className="home">
                <div className="image"></div>
                <div>
                    <h1>Online Student Enrollment</h1>
                    <p>In this system, online student enrollment allows learners to register digitally with a school or college through a secure web interface.
                         Students enter key details such as their name, email, password, subject and academic interests. This information is stored in a centralized
                         database, ensuring data security and easy access. Upon successful registration, students gain access to essential platform 
                         features, including viewing available teachers, booking appointments, and receiving approvals. The enrollment process is designed to be user-friendly,
                         eliminating the need for manual paperwork and enabling a smooth, fast, and efficient onboarding experience from any location.</p>
                    <h3><span tabIndex="0" onClick={()=>Navigate("/teacherData")}>View</span> List here</h3>
                </div>
                <div>
                    <h1>Online Teacher Enrollment</h1>
                    <p>The online teacher registration process enables qualified educators to securely sign up and offer their services through the system.
                         Teachers provide essential information such as name, email, password, department, and subjects they specialize in. 
                         Upon registration, their data is stored securely in database and marked as pending approval. Admins review and verify each teacher's 
                         details before granting access to the platform. Once approved, teachers can manage their profiles, view student appointment requests, and interact with enrolled students. This streamlined 
                         registration ensures only verified and relevant teachers are added to the system, maintaining the platform’s quality and credibility.</p>
                    <h3><span tabIndex="0" onClick={()=>Navigate("/studentData")}>View</span> List here</h3>   
                </div>
            </div>
        </>
    )
}