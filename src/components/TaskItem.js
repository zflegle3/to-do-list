import { useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';


function TaskItem(props) {
    //props.db
    //props.taskId
    //props.title
    //props.date
    //props.desc
    //props.status
    //props.proj
    //props.user
    //props.setUserData()
    const [editStatus, setEditStatus] = useState(false); //true for edit for, false for task item display
    const [formId, setFormId] = useState(uuidv4())

    // console.log(props.user);


    let statusOut="";
    let statusStyle =""
    // console.log("task status is",props.title,props.status);
    // console.log(typeof props.status);
    if (props.status) {
        if (props.date) {
            //call today's date
            let today = new Date();
            let dueDate = new Date(props.date);
            let sDiff = Math.abs(today - dueDate)*.001;
            let mDiff = Math.round(sDiff/60);
            let hDiff = Math.round(sDiff/3600);
            let dDiff = Math.round(hDiff/24);
            // console.log(mDiff);
            if (today <= dueDate) {
                // console.log("Due soon")
                if (hDiff >= 24) {
                    statusOut = `Due in ${dDiff} days`;   
                    statusStyle ="due-days";
                } else if (hDiff > 1) {
                    statusOut = `Due in ${hDiff} hours`; 
                    statusStyle ="due-hours";  
                } else if (hDiff === 1) {
                    statusOut = `Due in ${hDiff} hour`; 
                    statusStyle ="due-hours";    
                } else {
                    statusOut = `Due in ${mDiff} min`;    
                    statusStyle ="due-min";     
                }
            } else {
                // console.log("Past due by]")
                statusStyle ="past-due";     
                if (hDiff >= 24) {
                    statusOut = `Past due by ${dDiff} days`;   
                } else if (hDiff > 1) {
                    statusOut = `Past due by ${hDiff} hours`;   
                } else if (hDiff === 1) {
                    statusOut = `Past due by ${hDiff} hour`;   
                } else {
                    statusOut = `Past due by ${mDiff} min`;     
                }
            };
        } else {
            statusOut = `Incomplete`;   
        };
    } else {
        statusStyle ="complete";
        statusOut = `Complete`;     
    }


    let projectOut = "";
    if (props.proj !== "none") {
        let projectSelected = props.user.projects.filter((proj) => proj.id === props.proj);
        projectOut = projectSelected[0].title;
    }


    const editTask = (e) => {
        e.preventDefault();
        setEditStatus(true);
    }

    const cancelEdit = (e) => {
        setEditStatus(false);
    }

    const submitEdit = (e) => {
        e.preventDefault();
        // console.log("Submit, task:", props.taskId);
        let editForm = document.getElementById(`${formId}-task-edit-form`);
        // console.log(editForm);
        let formElements = editForm.elements;
        let editValues = [];
        for (let i=0; i< formElements.length; i++) {
            // console.log(formElements[i]);
            if (formElements[i].className === "task-input") {
                editValues.push(formElements[i])
            }
        }
        // console.log(editValues);
        if (validateVars(editValues)) {
            createTaskData(editValues);
            setEditStatus(false);
            editForm.reset();
            // turn off edit status
            // console.log(data);
            //write data to backend
        } else {
            // console.log("*invalid inputs*")
            //prevent submission
            //report errors
        }
    }

    const validateVars = (inputs) => {
        // console.log(inputs);
        inputs.className = "task-input";
        if (inputs[0].value.length < 1) {
            document.getElementById("task-edit-err-1").className="input-error"
            return false;
        } else {
            return true;
        }
    }

    async function createTaskData(inputs) {
        //copy user & user tasks
        let userCopy = props.user;
        let tasksCopy = userCopy.tasks;
        let taskIndex = tasksCopy.findIndex(currentTask => currentTask.id === props.taskId);
        //create new user task obj
        let titleIn = inputs[0].value.trim();
        let descIn = inputs[1].value.trim();
        let dateIn = inputs[2].value;
        let statusIn = inputs[3].value;
        let statusOut = false
        if (statusIn === "true") {
            statusOut = true
        };
        let projIn = inputs[4].value;
        let taskObj = {
            id: props.taskId,
            title: titleIn,
            desc: descIn,
            date: dateIn,
            proj: projIn,
            status: statusOut,
        }
        //replace tasks in user copy
        tasksCopy[taskIndex] = taskObj;
        userCopy.tasks = tasksCopy;
        // console.log(tasksCopy);
        //set user var state
        props.setUserData(userCopy);
        // console.log(userCopy);
        //write user copy doc to firebase
        const userDoc = doc(props.db, `users/U-${props.user.uid}`);
        setDoc(userDoc,userCopy);
    }

    async function removeTaskData(inputs) {
        //copy user & user tasks
        let userCopy = props.user;
        let tasksCopy = userCopy.tasks;
        let taskIndex = tasksCopy.findIndex(currentTask => currentTask.id === props.taskId);
        //splice out task at selected index
        tasksCopy.splice(taskIndex,1);
        // console.log(tasksCopy);
        //replace tasks in user copy
        userCopy.tasks = tasksCopy;
        // //set user var state
        props.setUserData(userCopy);
        // //write user copy doc to firebase
        const userDoc = doc(props.db, `users/U-${props.user.uid}`);
        setDoc(userDoc,userCopy);
    }



    const projOptions =  props.user.projects.map((project) => 
        <option key={uuidv4()} value={project.id}>{project.title}</option>
    );

    const deleteTask = (e) => {
        e.preventDefault();
        removeTaskData();
        alert("Task Deleted");
    }








    if (editStatus) {  
        return (
            <form className="task-edit-form" id={`${formId}-task-edit-form`}>
                <div className="form-edit-item">
                    <label htmlFor="task-title">Task Title:</label>
                    <input type="text" id="task-name" name="task-title" className="task-input" defaultValue={`${props.title}`}></input>
                    <p id="task-edit-err-1" className="input-error">Error 1</p>
                </div>

                <div className="form-edit-item">
                    <label htmlFor="task-desc">Description:</label>
                    <textarea id="task-desc" name="task-desc" className="task-input" defaultValue={`${props.desc}`}></textarea>
                    <p id="task-edit-err-2" className="input-error">Error</p>
                </div>

                <div className="form-edit-item" required>
                    <label htmlFor="task-date">Due Date:</label>
                    <input type="datetime-local" id="task-date" className="task-input" defaultValue={`${props.date}`}></input>
                    <p id="task-edit-err-3" className="input-error">Error</p>
                </div>

                <div className="form-edit-item">
                    <label htmlFor="task-proj">Status:</label>
                    <select id="task-proj" className="task-input" defaultValue={props.status}>
                        <option value={false} >Complete</option>
                        <option value={true} >Incomplete</option>
                    </select>
                    <p id="task-edit-err-4" className="input-error">Error</p>
                </div>

                <div className="form-edit-item">
                    <label htmlFor="task-proj">Project:</label>
                    <select id="task-proj" className="task-input" defaultValue={props.proj}>
                        <option value="none" >None</option>
                        {projOptions}
                    </select>
                    <p id="task-edit-err-4" className="input-error">Error</p>
                </div>

                <div className="button-container">
                    <button onClick={submitEdit} className="submit-button">Submit</button>
                    <button onClick={cancelEdit} className="cancel-button">Cancel</button>
                </div>
            </form>
        );
        

    } else {
        return (
            <div className={`task-item ${statusStyle}`}>
    
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
                    <button className="edit-button" onClick={editTask}>Edit</button>
                    <button className="cancel-button" onClick={deleteTask}>Delete</button>
                </div>
            </div>
        );
    }
}


export default TaskItem;