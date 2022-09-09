import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';

function ProjectForm(props) {
    //props.setFormType()
    //props.db
    //props.user
    //props.setUserData()
    //props.resetControlBtnSelect()

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e);
        let form = document.getElementById("proj-form");
        let projInputs = document.querySelectorAll(".proj-input");
        // console.log(projInputs[0].value);
        //get form variables
        //validate variable
        if (validateVars(projInputs)) {
            // console.log("valid inputs")
            //reset form
            //create and submit 
            createProjectData(projInputs);
            form.reset();
            //write data to backend
        } else {
            // console.log("*invalid inputs*")
            //prevent submission
            //report errors
        }
    }

    const validateVars = (inputs) => {
        // console.log(inputs);
        inputs.className = "proj-input";
        if (inputs[0].value.length < 1) {
            document.getElementById("input-err-1").className="proj-input error"
            return false;
        } else {
            return true;
        }
    }

    async function createProjectData(inputs) {
        //clean inputs
        let name = inputs[0].value.trim();
        //creat object
        let projObj = {
            id: uuidv4(),
            title: name,
            status: true,
        }
        //write object to firebase doc
        //get doc 
        const userDoc = doc(props.db, `users/U-${props.user.uid}`);
        // copy doc
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
            let docDataCopy = userDocSnap.data();
            docDataCopy.projects.push(projObj);
            //set display update
            props.setUserData(docDataCopy);
            //setDoc
            // console.log(docDataCopy);
            setDoc(userDoc,docDataCopy);
        } else {
            console.log("error, no user doc found, cant create project.");
        };
    }

    const closeForm = (e) => {
        e.preventDefault();
        props.resetControlBtnSelect();
        props.setFormType(false);
    }

    return (
        <form className="project-input-form" id="proj-form">
            <div className="form-input-item">
                <label htmlFor="proj-name">Project Name:</label>
                <input type="text" id="proj-name" name="proj-name" className="proj-input" placeholder="Project Name"></input>
                <p id="input-err-1">Error</p>
            </div>
            <div className="button-container">
                <button onClick={handleSubmit} className="submit-button">Create New Task</button>
                <button onClick={closeForm} className="cancel-button">Cancel</button>
            </div>
        </form>
    );
}


export default ProjectForm;