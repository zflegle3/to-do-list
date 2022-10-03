import { v4 as uuidv4 } from 'uuid';

function FilterList(props) {
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
                filterType: `${e.target.id}`,
                filterValue: `${e.target.id}`,
            });
            props.updateTabData(newTabData); //update tabData by adding new project
        } else { //project already selected > un-select
            newTabData.splice(selectedIndex,1);
            props.updateTabData(newTabData); //update tabData by removing project
        }
    };

    const returnButtonClass = (buttonId) => {
        //finds if button/filter's ID is in selected tab Data & adds class per selection
        let selectedIndex = props.tabData.findIndex((tabData) => tabData.filterValue === buttonId);
        if (selectedIndex === -1) {
            return "tab-deselect";
        } else {
            return "tab-select";
        }
    };

    return (
        <div className={"filter-list"}>
            <button id="all" className={returnButtonClass("all")} onClick={selectProject}>All Tasks</button>
            <button id="today" className={returnButtonClass("today")} onClick={selectProject}>Due Today</button>
            <button id="week" className={returnButtonClass("week")} onClick={selectProject}>Due this Week</button>
        </div>
    );
}

export default FilterList;