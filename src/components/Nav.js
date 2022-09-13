import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import gsap from "gsap";

import NewItemIn from "./NewItemIn";
import newTaskBtn from "../images/new-task-light.png";
import newProjBtn from "../images/new-proj-light.png";
import newItemBtn from "../images/new-item-dark.png";
import closeBtn from "../images/close-light.png";
import ProjectList from "./ProjectList"




function Nav(props) {
    const [navStatus, setNavStatus] = useState(false); //task or //filter
    const [formType, setFormType] = useState(false); //task or //filter
    //props.user
    //props.db
    //props.setUserData()
    //props.tabData
    //props.updateTabData
    // console.log(props.user)

    const handleClick = (e) => {
        e.preventDefault();
        switch (e.target.id) {
            case "task-btn":
                setFormType("task");
                controlSelect(e);
                break;
            case "proj-btn":
                setFormType("proj");
                controlSelect(e);
                break;
            default:
        }
    }

    const openCloseNav = (e) => {
        e.preventDefault();
        let nav = document.getElementById("nav-left");
        // console.log(e.target.id);
        // nav.classList.toggle("compact");
        // let navBar = document.getElementById()
        switch (e.target.id) {
            case "open-nav":
                // setTimeout(() => ) 
                setNavStatus(true);
                nav.classList ="nav-left";
                break;
            case "close-nav":
                setNavStatus(false);
                nav.classList ="nav-left compact";
                break;
            default:
        }

    }

    const userLogOut = () => {
        signOut(props.auth).then(() => {
            // Sign-out successful
            // Set current user
            props.setUserData(false);
        }).catch((error) => {
        // An error happened.
        });
    }

    const controlSelect = (e) => {
        // console.log(e.target);
        let btnSelected = document.querySelector(`button#${e.target.id}`);
        resetControlBtnSelect()
        btnSelected.className = "controls-btn selected"
    }

    const resetControlBtnSelect = () => {
        let controlBtns = document.querySelectorAll(".controls-btn");
        for (let i=0; i< controlBtns.length; i++) {
            // console.log(controlBtns[i]);
            controlBtns[i].className = "controls-btn";
        }
        
    }


    if (navStatus) {
        return (
            <div className="nav-content">
                <div className="header">
                    <div className="siteLogo">
                        <p>toDo List</p>
                    </div>
                </div>
                <div className="nav-container">
                    <div className="controls">
                        <button id="task-btn" onClick={handleClick} className={"controls-btn"}>
                            <img id="task-btn" src={newTaskBtn} alt="new task button"></img>
                            <p id="task-btn">New Task</p>
                        </button>
                        <button id="proj-btn" onClick={handleClick} className={"controls-btn"}>
                            <img id="proj-btn" src={newProjBtn} alt="new task button"></img>
                            <p id="proj-btn">New Project</p>
                        </button>
                        <button id="close-nav" onClick={openCloseNav} className={"button-main"}>
                            <img id="close-nav" src={closeBtn} alt="close nav button"></img>
                            <p id="close-nav">Close Nav</p>
                        </button>
                    </div>
                    <NewItemIn formType={formType} setFormType={setFormType} db={props.db} user={props.user} setUserData={props.setUserData} resetControlBtnSelect={resetControlBtnSelect}/>
                    <div className={"projects-header"}>
                        <p>Projects:</p>
                    </div>
                    <ProjectList user={props.user} setUserData={props.setUserData} updateTabData={props.updateTabData} tabData={props.tabData}/>
                    <div className="user-profile">
                        <p>{props.user.email}</p>
                        <button className="cancel-button" onClick={userLogOut}>Log Out</button>
                    </div>
                </div>
            </div>
          );
    } else {
        return (
            <div className="nav-content compact" id="open-nav" onClick={openCloseNav}>
                <div id="open-nav" className="header compact">
                    <div className="siteLogo compact" id="open-nav">
                        <p id="open-nav">toDo List</p>
                    </div>
                </div>   
                <div className="nav-container compact"></div> 
            </div>
        );
    }
}

export default Nav;