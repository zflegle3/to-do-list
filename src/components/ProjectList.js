import { v4 as uuidv4 } from 'uuid';

function ProjectList(props) {
    //props.tabData
    //props.user
    //props.setUserData()
    //props.updateTabData

    let tasksAll = "";
    const selectProject = (e) => {
        let selectedIndex = props.tabData.findIndex((tabData) => tabData.filterValue === e.target.id);
        let newTabData = [...props.tabData];
        if (selectedIndex === -1) { //new project selected > add selection 
            newTabData.push({
                filterType: "proj",
                filterValue: `${e.target.id}`,
            });
            props.updateTabData(newTabData); //update tabData by adding new project
        } else { //project already selected > un-select
            newTabData.splice(selectedIndex,1);
            props.updateTabData(newTabData); //update tabData by removing project
        }
    }

    const returnButtonClass = (buttonId) => {
        let selectedIndex = props.tabData.findIndex((tabData) => tabData.filterValue === buttonId);
        if (selectedIndex === -1) {
            return "tab-deselect";
        } else {
            return "tab-select";
        }
    }

    tasksAll = props.user.projects.map((project) => 
        <button key={uuidv4()} id={project.id} className={returnButtonClass(project.id)} onClick={selectProject}>{project.title}</button>
    );

    return (
        <div className={"projects-list"}>
            {tasksAll}
        </div>
    );
}


export default ProjectList;