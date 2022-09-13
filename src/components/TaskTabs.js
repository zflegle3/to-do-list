import { useState, useEffect, useCallback } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';

import Tab from "./Tab";

function TaskTabs(props) {
    //props.db
    //props.user
    //props.provider
    //props.setUserData()
    //props.tabData
    //props.setTabData()

    // console.log(props.tabData);
    console.log(props.tabData);
    // const [tabDataTest, setTabDataTest] = useState(props.tabData);

    
    // const tabsAll = props.tabData.map((tabDataItem) => 
    //     <Tab key={uuidv4()} tabDataItem={tabDataItem} user={props.user} setUserData={props.setUserData} db={props.db}/>
    // );

    const tabsAll = useCallback(() => props.tabData.map((tabDataItem) => (
        <Tab key={uuidv4()} tabDataItem={tabDataItem} user={props.user} setUserData={props.setUserData} db={props.db}/>
        )),[props.tabData]);



    // useEffect(() => {
    //     // console.log(props.tabData);
    //     // setTabDataTest(props.tabData);
    //     tabsAll = props.tabData.map((tabDataItem) => 
    //         <Tab key={uuidv4()} tabDataItem={tabDataItem} user={props.user} setUserData={props.setUserData} db={props.db}/>
    //     );
    // },[props.tabData]);



    return (
        <div className={"tabs-all"}>
            {tabsAll()}
        </div>
    );
}


export default TaskTabs;