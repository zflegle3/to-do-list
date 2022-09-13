import { v4 as uuidv4 } from 'uuid';

import Tab from "./Tab";

function TaskTabs(props) {
    //props.db
    //props.user
    //props.provider
    //props.setUserData()
    //props.tabData
    //props.setTabData()

    const tabsAll = props.tabData.map((tabDataItem) => 
        <Tab key={uuidv4()} tabDataItem={tabDataItem} user={props.user} setUserData={props.setUserData} db={props.db}/>
    );

    return (
        <div className={"tabs-all"}>
            {tabsAll}
        </div>
    );
}


export default TaskTabs;