import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';

function ProjectForm(props) {
    //props.setFormType()
    //props.db
    //props.user
    //props.setUserData()
    //props.resetControlBtnSelect()

    const handleSubmit = (e) => {
        e.preventDefault();
        let form = document.getElementById("proj-form");
        let projInputs = document.querySelectorAll(".proj-input");
        resetErrors();
        if (validateVars(projInputs)) {
            //reset form
            //create and submit 
            createProjectData(projInputs);
            form.reset();
        } else {
            console.log("*invalid inputs*")
            //prevent submission
            //report errors
        }
    }

    const validateVars = (inputs) => {
        if (inputs[0].value.length < 1) {
            let errorMsg = document.getElementById("proj-input-err-1");
            errorMsg.className="input-error erroneous";
            errorMsg.className="input-error erroneous";
            return false;
        } else {
            return true;
        }
    }

    const resetErrors = () => {
        let errorsAll = document.querySelector(".input-error");
        for (let i=0; i< errorsAll.length; i++) {
            errorsAll[i].className = "input-error";
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
                <p id="proj-input-err-1" className="input-error">Must enter a project name</p>
            </div>
            <div className="button-container">
                <button onClick={handleSubmit} className="submit-button">Create New Project</button>
                <button onClick={closeForm} className="cancel-button">Cancel</button>
            </div>
        </form>
    );
}


export default ProjectForm;