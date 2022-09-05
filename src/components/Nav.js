import { useState } from "react";
import NewItemIn from "./NewItemIn";
import newTaskBtn from "../images/new-task-dark.png";
import newProjBtn from "../images/new-proj-dark.png";
import newItemBtn from "../images/new-item-dark.png";
import closeBtn from "../images/close-dark.png";


function Nav() {
    const [formStatus, setFormStatus] = useState(false); //task or //filter
    const [formType, setFormType] = useState("proj"); //task or //filter
    

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.id)
        switch (e.target.id) {
            case "task-btn":
                setFormType("task");
                break;
            case "proj-btn":
                setFormType("proj");
                break;
            default:
        }
    }

    const openCloseNav = (e) => {
        e.preventDefault();
        // let navBar = document.getElementById()
        switch (e.target.id) {
            case "open-nav":
                setFormStatus(true);
                break;
            case "close-nav":
                setFormStatus(false);
                break;
            default:
        }
    }




    if (formStatus) {
        return (
            <div className="nav-left" id="nav-bar">
                <div className="header">
                    <div className="siteLogo">
                        <img></img>
                        <p>toDo List</p>
                    </div>
                </div>
                <div className="controls">
                    <button id="task-btn" onClick={handleClick} className={"button"}>
                        <img id="task-btn" src={newTaskBtn} alt="new task button"></img>
                    </button>
                    <button id="proj-btn" onClick={handleClick} className={"button"}>
                        <img id="proj-btn" src={newProjBtn} alt="new task button"></img>
                    </button>
                    <button id="close-nav" onClick={openCloseNav} className={"button-main"}>
                        <img id="close-nav" src={closeBtn} alt="close nav button"></img>
                    </button>
                </div>
                <NewItemIn formType={formType}/>
            </div>
          );
    } else {
        return (
            <div className="nav-left compact" id="open-nav" onClick={openCloseNav}>
                <div className="header">
                    <div className="siteLogo compact" id="open-nav">
                        <img id="open-nav"></img>
                        <p id="open-nav">toDo List</p>
                    </div>
                </div>
                <div className="controls compact" id="open-nav">
                    <button id="open-nav" className={"button-main compact"}>
                        <img src={newItemBtn} alt="new item button" id="open-nav"></img>
                    </button>
                </div>
            </div>
        );
    }
}

export default Nav;