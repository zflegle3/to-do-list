import { useState } from "react";
import TaskForm from "./TaskForm"
import ProjectForm from "./ProjectForm"

function NewItemIn(props) {
    //props.formType
    //props.setFormType()
    //props.db
    //props.user
    //props.setUserData
    //propsresetControlBtnSelect()
    

    if (props.formType === "task") {
        return (
            <TaskForm db={props.db} setFormType={props.setFormType} user={props.user} setUserData={props.setUserData} resetControlBtnSelect={props.resetControlBtnSelect}/>
        );
    } 
    else if (props.formType === "proj") {
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