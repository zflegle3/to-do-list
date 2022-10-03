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
        console.log("Edit Project");
        if (editStatus) {
            setEditStatus(false);
        } else {
            setEditStatus(true);
        }
    };

    const submitProject = () => {
        console.log(props.btnId);

        let selectedProj = props.user.projects.filter(project => project.id === props.btnId)[0];
        let newTitle = document.querySelector(`#input-${props.btnId}`).value.trim();

        if (newTitle === selectedProj.title) {
            console.log("same title, close edit");
            setEditStatus(false);
        } else {
            console.log("submit new title");
            //copy props.user.projects
            selectedProj.title = newTitle;
            console.log(selectedProj);
            editProjectData(selectedProj);
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
            console.log(projectDataCopy);

            docDataCopy.projects = projectDataCopy;
            //set display update
            props.setUserData(docDataCopy);
            //setDoc
            setDoc(userDoc,docDataCopy);
        } else {
            console.log("error, no user doc found, cant create project.");
        };
    }

    const deleteProject = (e) => {
        //first Send popup to confirm
        //if confirmed...
        console.log("Delete Project");

            //Delete Project
            //copy props.user.projects
            console.log(props.user.projects);
            //filter out projects that match the project id
            console.log(e.target.id);
            //set doc with new filtered out data

            //Delete Tasks
            //copy props.user.tasks
            console.log(props.user.projects);
            //filter out tasks that match the project id
            console.log(e.target.id);
            //set doc with new filtered out data

    };

    console.log(editStatus);
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