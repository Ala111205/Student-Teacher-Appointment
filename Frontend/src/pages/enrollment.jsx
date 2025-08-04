import { PiStudentBold } from "react-icons/pi";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {useRef, useEffect} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

export default function(){
    const navigate = useNavigate();

    const studentRef = useRef(null);
    const teacherRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        let ctx;

        const setupAnimations = () => {
            // Kill existing triggers before reinitializing
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            ctx = gsap.context(() => {
            ScrollTrigger.matchMedia({
                "(min-width: 0px)": function () {
                gsap.fromTo(
                    studentRef.current,
                    { y: 100, opacity: 0 },
                    {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: studentRef.current,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse",
                    },
                    }
                );

                gsap.fromTo(
                    teacherRef.current,
                    { y: 100, opacity: 0 },
                    {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: teacherRef.current,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse",
                    },
                    }
                );

                ScrollTrigger.refresh();
                },
            });
            });
        };

        // Initial setup
        setupAnimations();

        // Re-run on resize
        const handleResize = () => {
            setupAnimations();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            ctx && ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
  }, []);

    return(
        <>
            <div className="enroll">
                <div ref={studentRef} className="student">
                    <h1>Student enrollment</h1>
                    <div>
                        <p>student lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis omnis consequuntur nostrum quam reiciendis doloremque. Nostrum eum corrupti et alias quos dolor iusto iure. Repellendus?</p>
                    </div>
                    <div><h1><PiStudentBold /></h1> <span onClick={()=>navigate("/studentRegister")}>Enroll Now</span></div>
                </div>
                <div ref={teacherRef} className="teacher">
                    <h1>Teacher enrollment</h1>
                    <div>
                        <p>Teacher lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis omnis consequuntur nostrum quam reiciendis doloremque. Nostrum eum corrupti et alias quos dolor iusto iure. Repellendus?</p>
                    </div>
                    <div><h1><PiChalkboardTeacherFill /></h1> <span onClick={()=>navigate("/teacherRegister")}>Enroll Now</span></div>
                </div>
            </div>
        </>
    )
}