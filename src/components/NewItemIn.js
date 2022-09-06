import { useState } from "react";
import TaskForm from "./TaskForm"
import ProjectForm from "./ProjectForm"

function NewItemIn(props) {
    const [formStatus, setFormStatus] = useState(false); //task or //filter
    //props.formType
    //props.setFormType()
    console.log(props.formType);
    


    if (props.formType === "task") {
        console.log("Render Task Form");
        return (
            <TaskForm setFormType={props.setFormType}/>
        );
    } 
    else if (props.formType === "proj") {
        console.log("Render Project Form");
        return (
            <ProjectForm setFormType={props.setFormType}/>
        );
    } 
    else {
        return (
            <p>Nothing</p>
        );
    }
}

export default NewItemIn;