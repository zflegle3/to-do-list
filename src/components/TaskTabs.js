import { useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';

import Tab from "./Tab";

function TaskTabs(props) {
    //props.user
    //props.provider
    //props.setUserCurrent()
    //props.setUserData()
    //props.tabData
    //props.setTabData()

    // console.log(props.tabData);
    
    let tabsAll = props.tabData.map((tabDataItem) => 
        <Tab key={uuidv4()} tabDataItem={tabDataItem} user={props.user} />
    )

    return (
        <div className={"tabs-all"}>
            {tabsAll}
        </div>
    );
}


export default TaskTabs;