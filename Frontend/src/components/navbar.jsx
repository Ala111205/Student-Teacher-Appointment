import { useState } from "react";
import { Link } from "react-router-dom";
import { TbBrandBooking } from "react-icons/tb";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function Navbar(props){     
    const {show, setShow} = props

    const click = ()=>{
        setShow(!show)
    }

    return(
        <>
        <nav className="navbar">
            <h2><span className="book"><TbBrandBooking /></span> <span className="text" data-text="Nomine">Nomine</span></h2>
            <ul className={`${show ? "center": "down"}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link className="signup" to="/enroll">Enroll</Link></li>
                <li><Link to="/adminApproval">Admin</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
            <h1 className="icon" onClick={click}>{show ? <FaBars />: <RxCross2 />}</h1>
        </nav>
        </>
    )
};