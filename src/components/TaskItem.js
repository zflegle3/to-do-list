import { useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';


function TaskItem(props) {
    //props.title
    //props.date
    //props.desc
    //props.status

    let statusOut="";
    if (!props.status) {
        statusOut= "Complete";
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
                    <p>{props.desc}</p>
                </div>

                <div className={"task-item-text-item"}>
                    <p>Status:</p>
                    <p>{props.desc}</p>
                </div>

                <div className={"task-item-text-item"}>
                    <p>Project:</p>
                    <p>{props.desc}</p>
                </div>
      
            </div>
            <div className={"task-item-controls"}>
                <button class="submit-button">Complete </button>
                <button class="edit-button">Edit</button>
                <button class="cancel-button">Delete</button>
            </div>

        </div>
    );
}


export default TaskItem;