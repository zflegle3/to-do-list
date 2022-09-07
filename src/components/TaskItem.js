import { useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';


function TaskItem(props) {
    //props.title
    //props.date
    //props.desc
    //props.status

    return (
        <div className={"task-item"}>
            <p>{props.title}</p>
            <p>{props.date}</p>
            <p>{props.desc}</p>
            <p>{props.status}</p>
        </div>
    );
}


export default TaskItem;