import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';

function TaskForm(props) {
    //props.setFormType()
    //props.db
    //props.user
    //props.setUserData()
    //props.resetControlBtnSelect

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e);
        //get form variables/elements
        let form = document.getElementById("task-form");
        let taskInputs = document.querySelectorAll(".task-input");
        //validate variable
        if (validateVars(taskInputs)) {
            // console.log("valid inputs")
            //reset form
            //create and submit 
            createTaskData(taskInputs);
            form.reset();
            // console.log(data);
            //write data to backend
        } else {
            console.log("*invalid inputs*")
            //prevent submission
            //report errors
        }
    }

    const validateVars = (inputs) => {
        // console.log(inputs);
        inputs.className = "task-input";
        if (inputs[0].value.length < 1) {
            document.getElementById("task-input-err-1").className="input-error"
            return false;
        } else {
            return true;
        }
    }

    async function createTaskData(inputs) {
        //clean inputs
        // console.log(inputs[1].value);
        let titleIn = inputs[0].value.trim();
        let descIn = inputs[1].value.trim();
        let dateIn = inputs[2].value;
        let projIn = inputs[3].value;
        //creat object
        let taskObj = {
            id: uuidv4(),
            title: titleIn,
            desc: descIn,
            date: dateIn,
            proj: projIn,
            status: true,
        }
        //write object to firebase doc
        //get doc 
        // console.log(props.user.uid);
        const userDoc = doc(props.db, `users/U-${props.user.uid}`);
        // copy doc
        const userDocSnap = await getDoc(userDoc);
        // console.log(userDocSnap.data());
        if (userDocSnap.exists()) {
            let docDataCopy = userDocSnap.data();
            docDataCopy.tasks.push(taskObj);
            //set display update
            props.setUserData(docDataCopy);
            //setDoc
            // console.log(docDataCopy);
            setDoc(userDoc,docDataCopy);
        } else {
            console.log("error, no user doc found");
        };
    }

    const closeForm = (e) => {
        e.preventDefault();
        props.resetControlBtnSelect();
        props.setFormType(false);
    }

    const projOptions =  props.user.projects.map((project) => 
        <option key={uuidv4()} value={project.id}>{project.title}</option>
    );

    return (
        <form className="task-input-form" id="task-form">
            <div className="form-input-item">
                <label htmlFor="task-title">Task Title:</label>
                <input type="text" id="task-name" name="task-title" className="task-input" placeholder="Task Name"></input>
                <p id="task-input-err-1" className="input-error">Error 1</p>
            </div>
            <div className="form-input-item">
                <label htmlFor="task-desc">Description:</label>
                <textarea id="task-desc" name="task-desc" className="task-input"></textarea>
                <p id="task-input-err-2" className="input-error">Error</p>
            </div>
            <div className="form-input-item" required>
                <label htmlFor="task-date">Due Date:</label>
                <input type="datetime-local" id="task-date" className="task-input"></input>
                <p id="task-input-err-3" className="input-error">Error</p>
            </div>
            <div className="form-input-item">
                <label htmlFor="task-proj">Project:</label>
                <select id="task-proj" className="task-input">
                    <option value="none">None</option>
                    {projOptions}
                </select>
                <p id="task-input-err-4" className="input-error">Error</p>
            </div>
            <div className="button-container">
                <button onClick={handleSubmit} className="submit-button">Create New Task</button>
                <button onClick={closeForm} className="cancel-button">Cancel</button>
            </div>
        </form>
    );
}


export default TaskForm;