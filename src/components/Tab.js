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
            if (props.user.tasks.length > 0) {
                tasksAll = props.user.tasks.map((task) =>
                    <TaskItem key={uuidv4()} title={task.title} date={task.date} desc={task.desc} status={task.status}/>
                );
            } else {
                tasksAll = <p>No tasks for this project.</p>
            }
            break;
        case "proj":
            console.log("return proj");
            let selectedProj = props.user.projects.filter((proj) => proj.id === props.tabDataItem.filterValue);
            tabTitle= selectedProj[0].title;
            console.log(tabTitle);
            console.log(props.tabDataItem.filterValue);
            let projTasks = props.user.tasks.filter(task => task.proj === props.tabDataItem.filterValue);
            console.log(projTasks);
            if (projTasks.length >0) {
                tasksAll = projTasks.map((task) =>
                    <TaskItem key={uuidv4()} title={task.title} date={task.date} desc={task.desc} status={task.status}/>
                );
            } else {
                tasksAll = <p>No tasks for this project.</p>
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