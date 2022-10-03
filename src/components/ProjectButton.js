import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';

import { ReactComponent as EditSvg } from '../images/icons/ellipsis.svg';
import { ReactComponent as SubmitSvg } from '../images/icons/submit.svg';
import { ReactComponent as DeleteSvg } from '../images/icons/delete.svg';

function ProjectButton(props) {
    //props.projectTitle
    //props.btnId
    //props.btnClass
    //props.selectProject()
    //props.db
    //props.user
    //props.setUserData()

    //props.user
    //props.provider
    //props.setUserData()
    //props.tabData
    //props.setTabData()
    const [editStatus, setEditStatus] = useState(false);


    const editProject = (e) => {
        if (editStatus) {
            setEditStatus(false);
        } else {
            setEditStatus(true);
        }
    };

    const submitProject = () => {
        let selectedProj = props.user.projects.filter(project => project.id === props.btnId)[0];
        let newTitle = document.querySelector(`#input-${props.btnId}`).value.trim();

        if (newTitle === selectedProj.title) {
            setEditStatus(false);
        } else {
            if (newTitle.length > 0) {
                selectedProj.title = newTitle;
                editProjectData(selectedProj);
            } else {
                setEditStatus(false);
            }
        };
    };

    async function editProjectData(newProjData) {
        //write object to firebase doc
        //get doc 
        const userDoc = doc(props.db, `users/U-${props.user.uid}`);
        // copy doc
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
            let docDataCopy = userDocSnap.data();
            let projectDataCopy = [];
            for (let i=0; i< docDataCopy.projects.length; i++) {
                if (docDataCopy.projects[i].id ===props.btnId) {
                    projectDataCopy.push(newProjData)
                } else {
                    projectDataCopy.push(docDataCopy.projects[i])
                }
            };
            docDataCopy.projects = projectDataCopy;
            //set display update
            props.setUserData(docDataCopy);
            //setDoc with updated data
            setDoc(userDoc,docDataCopy);
        } else {
            console.log("error, no user doc found, cant create project.");
        };
    }

    const deleteProject = () => {
        if (window.confirm("Are you sure you want to delete this project and all related tasks?")) {
            deleteProjectData(props.btnId);
        } 
    };

    async function deleteProjectData(deleteId) {
        //get doc 
        const userDoc = doc(props.db, `users/U-${props.user.uid}`);
        // copy doc
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
            //Copy data and remove deleted data
            let docDataCopy = userDocSnap.data();
            let projectDataCopy = docDataCopy.projects.filter(project => project.id !== deleteId);
            let projectTaskCopy = docDataCopy.tasks.filter(task => task.proj !== deleteId);
            //Replace projects and tasks into doc copy
            docDataCopy.projects = projectDataCopy;
            docDataCopy.tasks = projectTaskCopy;
            //set display update
            props.setUserData(docDataCopy);
            //setDoc w/ new data
            setDoc(userDoc,docDataCopy);
        } else {
            console.log("error, no user doc found, cant create project.");
        };
    }

    if (!editStatus) {
        return (
            <div className={props.btnClass}>
                <button id={props.btnId} onClick={props.selectProject}>
                    {props.projectTitle}
                </button>
                <EditSvg onClick={editProject}/>
            </div>
        )
    } else {
        return (
            <div className="edit-proj">
                <form id={`form-${props.btnId}`}>
                    <input id={`input-${props.btnId}`} defaultValue={props.projectTitle}></input>
                </form>
                <SubmitSvg className="submit-proj" id={props.btnId} onClick={submitProject}/>
                <DeleteSvg className="delete-proj" id={props.btnId} onClick={deleteProject}/>
            </div>
        )
    }
}


export default ProjectButton;