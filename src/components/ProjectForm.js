import { useState } from "react";

function ProjectForm(props) {
    //props.setFormType()
    //props.db

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        let form = document.getElementById("proj-form");
        let projInputs = document.querySelectorAll(".proj-input");
        // console.log(projInputs[0].value);
        //get form variables
        //validate variable
        if (validateVars(projInputs)) {
            console.log("valid inputs")
            //reset form
            //create and submit 
            let data = createProjectData(projInputs);
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
        inputs.className = "proj-input";
        if (inputs[0].value.length < 1) {
            document.getElementById("input-err-1").className="proj-input error"
            return false;
        } else {
            return true;
        }
    }

    const createProjectData = (inputs) => {
        let obj = {
            projectName: inputs[0].value,
        }
        return(obj);
    }

    const closeForm = (e) => {
        e.preventDefault();
        props.setFormType(false);
    }

    return (
        <form className="project-input-form" id="proj-form">
            <div className="form-input-item">
                <label htmlFor="proj-name">Project Name:</label>
                <input type="text" id="proj-name" name="proj-name" className="proj-input" placeholder="Project Name"></input>
                <p id="input-err-1">Error</p>
            </div>
            <button onClick={handleSubmit}>Create New Project</button>
            <button onClick={closeForm}>Cancel</button>
        </form>
    );
}


export default ProjectForm;