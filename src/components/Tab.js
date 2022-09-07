import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';

// import TaskItem from "./TaskItem";

function Tab(props) {
    //props.tabDataItem
    //props.user

    console.log(props.user.tasks);

    let tasksAll;
    switch (props.tabDataItem.filterType) {
        case "all":
            tasksAll = props.user.tasks.map((task) =>
                <div>
                    <p>{task.title}</p>
                </div>
            );
            console.log("return all");
            break;
        case "proj":
            console.log("return proj");
            break;
        default:
    }

    return (
        <div className={"task-item"}>
            {tasksAll}
        </div>
    );
}


export default Tab;