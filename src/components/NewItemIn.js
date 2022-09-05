import { useState } from "react";
import TaskForm from "./TaskForm"
import ProjectForm from "./ProjectForm"

function NewItemIn(props) {
    //props.formType
    console.log(props.formType);
    // const [formType, setFormType] = useState(props.formType); //task or //filter
    


    if (props.formType === "task") {
        console.log("Render Task Form");
        return (
            <div>
                <p>Task</p>
                <TaskForm />
            </div>

        );
    } 
    else if (props.formType === "proj") {
        console.log("Render Project Form");
        return (
            <div>
                <p>Project</p>
                <ProjectForm />
            </div>
        );
    } 
    else {
        return (
            <p>Nothing</p>
        );
    }
}

export default NewItemIn;