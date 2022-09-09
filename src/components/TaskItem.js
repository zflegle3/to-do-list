import { useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';


function TaskItem(props) {
    //props.title
    //props.date
    //props.desc
    //props.status
    //props.proj
    //props.user
    console.log(props.proj);

    let statusOut="";
    if (!props.status) {
        statusOut= "Complete";
    }

    let projectOut = "";
    if (props.proj !== "none") {
        let projectSelected = props.user.projects.filter((proj) => proj.id === props.proj);
        projectOut = projectSelected[0].title;
    }

    return (
        <div className={"task-item"}>

            <div className={"task-item-content"}>
                <p className={"task-item-title"}>{props.title}</p>

                <div className={"task-item-text-item"}>
                    <p>Description:</p>
                    <p>{props.desc}</p>
                </div>

                <div className={"task-item-text-item"}>
                    <p>Due Date:</p>
                    <p>{props.date}</p>
                </div>

                <div className={"task-item-text-item"}>
                    <p>Status:</p>
                    <p>{statusOut}</p>
                </div>

                <div className={"task-item-text-item"}>
                    <p>Project:</p>
                    <p>{projectOut}</p>
                </div>
      
            </div>
            <div className={"task-item-controls"}>
                <button className="submit-button">Complete </button>
                <button className="edit-button">Edit</button>
                <button className="cancel-button">Delete</button>
            </div>

        </div>
    );
}


export default TaskItem;