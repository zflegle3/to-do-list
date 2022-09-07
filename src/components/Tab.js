import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';

import TaskItem from "./TaskItem";

function Tab(props) {
    //props.tabDataItem
    //props.user

    console.log(props.tabDataItem);
    console.log(props.user.tasks);

    let tasksAll;
    let tabTitle;
    switch (props.tabDataItem.filterType) {
        case "all":
            tabTitle= "All Tasks"
            tasksAll = props.user.tasks.map((task) =>
                <TaskItem key={uuidv4()} title={task.title}/>
            );
            console.log("return all");
            break;
        case "proj":
            console.log("return proj");
            let selectedProj = props.user.projects.filter((proj) => proj.id === props.tabDataItem.filterValue);
            tabTitle= selectedProj[0].title;
            console.log(tabTitle);
            let projTasks = props.user.tasks.filter(task => task.proj === props.tabDataItem.filterValue);
            console.log(projTasks);
            if (projTasks.length >0) {
                tasksAll = projTasks.map((task) =>
                    <TaskItem key={uuidv4()} title={task.title}/>
                );
            }
            console.log(projTasks);
            break;
        default:
    }



    return (
        <div className={"proj-tab"}>
            <p>{tabTitle}</p>
            {tasksAll}
        </div>
    );
}


export default Tab;