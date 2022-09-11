import { useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';


function TaskItem(props) {
    //props.taskId
    //props.title
    //props.date
    //props.desc
    //props.status
    //props.proj
    //props.user
    const [editStatus, setEditStatus] = useState(false);

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


    const editTask = (e) => {
        e.preventDefault();
        setEditStatus(true);
    }

    const cancelEdit = (e) => {
        setEditStatus(false);
    }

    const submitEdit = (e) => {
        e.preventDefault();
        console.log("Submit, task:", props.taskId);
        //validate variables
        //if valid 
            //copy user 
            //copy user tasks
            //copy user task
            //replace vars in task
            //create user variable
            //set user var state
            //write user doc to firebase
    }

    const projOptions =  props.user.projects.map((project) => 
        <option key={uuidv4()} value={project.id}>{project.title}</option>
    );



    if (editStatus) {  
        return (
            <form className="task-edit-form" id="task-edit-form">
                <div className="form-edit-item">
                    <label htmlFor="task-title">Task Title:</label>
                    <input type="text" id="task-name" name="task-title" className="task-input" defaultValue={`${props.title}`}></input>
                    <p id="task-input-err-1" className="input-error">Error 1</p>
                </div>

                <div className="form-edit-item">
                    <label htmlFor="task-desc">Description:</label>
                    <textarea id="task-desc" name="task-desc" className="task-input" defaultValue={`${props.desc}`}></textarea>
                    <p id="task-input-err-2" className="input-error">Error</p>
                </div>

                <div className="form-edit-item" required>
                    <label htmlFor="task-date">Due Date:</label>
                    <input type="datetime-local" id="task-date" className="task-input" defaultValue={`${props.date}`}></input>
                    <p id="task-input-err-3" className="input-error">Error</p>
                </div>

                <div className="form-edit-item">
                    <label htmlFor="task-proj">Project:</label>
                    <select id="task-proj" className="task-input" defaultValue={props.proj}>
                        <option value="none" >None</option>
                        {projOptions}
                    </select>
                    <p id="task-input-err-4" className="input-error">Error</p>
                </div>

                <div className="button-container">
                    <button onClick={submitEdit} className="submit-button">Submit</button>
                    <button onClick={cancelEdit} className="cancel-button">Cancel</button>
                </div>
            </form>
        );
        

    } else {
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
                    <button className="edit-button" onClick={editTask}>Edit</button>
                    <button className="cancel-button">Delete</button>
                </div>
            </div>
        );
    }
}


export default TaskItem;