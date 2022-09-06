import { useState } from "react";

function TaskForm(props) {
    //props.setFormType()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        //get form variables/elements
        let form = document.getElementById("task-form");
        let taskInputs = document.querySelectorAll(".task-input");
        //validate variable
        if (validateVars(taskInputs)) {
            console.log("valid inputs")
            //reset form
            //create and submit 
            let data = createTaskData(taskInputs);
            form.reset();
            console.log(data);
            //write data to backend
        } else {
            console.log("*invalid inputs*")
            //prevent submission
            //report errors
        }
    }

    const validateVars = (inputs) => {
        console.log(inputs);
        inputs.className = "task-input";
        if (inputs[0].value.length < 1) {
            document.getElementById("task-input-err-1").className="task-input error"
            return false;
        } else {
            return true;
        }
    }

    const createTaskData = (inputs) => {
        let obj = {
            title: inputs[0].value,
        }
        return(obj);
    }

    const closeForm = (e) => {
        e.preventDefault();
        props.setFormType(false);
    }



    return (
        <form className="task-input-form" id="task-form" required>
            <div className="form-input-item">
                <label htmlFor="task-title">Task Title:</label>
                <input type="text" id="task-name" name="task-title" className="task-input" placeholder="Task Name"></input>
                <p id="task-input-err-1">Error</p>
            </div>
            <div className="form-input-item">
                <label htmlFor="task-desc">Description:</label>
                {/* <input type="text" id="task-desc" name="task-desc" class="task-input"></input> */}
                <textarea id="task-desc" name="task-desc" className="task-input"></textarea>
                <p id="task-input-err-2">Error</p>
            </div>
            <div className="form-input-item" required>
                <label htmlFor="task-date">Due Date:</label>
                <input type="datetime-local" id="task-date" className="task-date" class="task-input"></input>
                <p id="task-input-err-3">Error</p>
            </div>
            <div className="form-input-item">
                <label htmlFor="task-proj">Project:</label>
                <input type="select" id="task-proj" className="task-proj"></input>
                <p id="task-input-err-4">Error</p>
            </div>
            <button onClick={handleSubmit}>Create New Task</button>
            <button onClick={closeForm}>Cancel</button>
        </form>
    );
}


export default TaskForm;