import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';

// import TaskItem from "./TaskItem";

function ProjectList(props) {
    //props.tabData
    //props.user
    //props.setUserData


    let tasksAll = "";
    const selectProject = (e) => {
        console.log(e.target.id)
        let userCopy = props.user;
        let projectsCopy = props.user.projects;
        for (let i=0; i< projectsCopy.length; i++) {
            if (!projectsCopy[i].selected) { //if project doesnt have selected property yet
                if (projectsCopy[i].id === e.target.id) { //select it 
                    projectsCopy[i].selected = "tab-select";
                } else { //deselect it 
                    projectsCopy[i].selected = "tab-de-select";
                }
            } else { //if project has selected property already
                //toggle off/on select
                if (projectsCopy[i].id === e.target.id) { //toggle selected it 
                    if (projectsCopy[i].selected === "tab-select") {
                        projectsCopy[i].selected = "tab-de-select";
                    } else { //select it
                        projectsCopy[i].selected = "tab-select";
                    }
                } 
            }
        }
        userCopy.projects = projectsCopy;
        console.log(userCopy);
        props.setUserData(userCopy);
        props.testUpdate();
    }

    tasksAll = props.user.projects.map((project) => 
        <button key={uuidv4()} id={project.id} className={project.selected} onClick={selectProject}>{project.title}</button>
    );


    return (
        <div className={"projects-item"}>
            <p>Projects:</p>
            {tasksAll}
        </div>
    );
}


export default ProjectList;