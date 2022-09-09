import { useState } from "react";
import TaskForm from "./TaskForm"
import ProjectForm from "./ProjectForm"

function NewItemIn(props) {
    const [formStatus, setFormStatus] = useState(false); //task or //filter
    //props.formType
    //props.setFormType()
    //props.db
    //props.user
    //props.setUserData
    //propsresetControlBtnSelect()
    console.log(props.formType);
    


    if (props.formType === "task") {
        console.log("Render Task Form");
        return (
            <TaskForm db={props.db} setFormType={props.setFormType} user={props.user} setUserData={props.setUserData} resetControlBtnSelect={props.resetControlBtnSelect}/>
        );
    } 
    else if (props.formType === "proj") {
        console.log("Render Project Form");
        return (
            <ProjectForm db={props.db} setFormType={props.setFormType} user={props.user} setUserData={props.setUserData} resetControlBtnSelect={props.resetControlBtnSelect}/>
        );
    } 
    else {
        return (
            <div></div>
        );
    }
}

export default NewItemIn;