import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import { useState } from "react";

import './App.css';
import './styles/styles.scss';

import Header from "./components/Header"
import Nav from "./components/Nav";
import Login from "./components/Login"
import TaskTabs from "./components/TaskTabs"

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0ZLG9uo5ApNhWCZF-R3XqjwiZZSKa9Bw",
  authDomain: "to-do-list-ab042.firebaseapp.com",
  projectId: "to-do-list-ab042",
  storageBucket: "to-do-list-ab042.appspot.com",
  messagingSenderId: "401959567858",
  appId: "1:401959567858:web:ed0a0f6b3adea686df2b6b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);



function App() {
  const [userData, setUserData] = useState(false); //copy of user's firebase doc (includes tasks & projects)
  const [tabData, setTabData] = useState([{filterType: "all", filterValue: "all"}]); //tabs selected to display
  const [openState, setOpenState] = useState(true); //tabs selected to display

  const updateTabData = (newData) => {
    //
    setTabData(newData);
  }

  const toggleNav = () => {
    if (openState) {
      setOpenState(false);
    } else {
      setOpenState(true);
    }
  }

  

  if (!userData) {
    return (
      <Login auth={auth} provider={provider}setUserData={setUserData} db={db}/>
    );
  } else {
    if (openState) {
      return (
        <div className="App">
          <Header openState={openState} toggleNav={toggleNav}/>
          <div className="content-container">
            <Nav user={userData} setUserData={setUserData} auth={auth} db={db} updateTabData={updateTabData} tabData={tabData} setTabData={setTabData}/>
            <TaskTabs tabData={tabData} setTabData={setTabData} user={userData} setUserData={setUserData} auth={auth} db={db}/>
          </div>

        </div>
      );
    } else {
      return (
        <div className="App">
          <Header openState={openState} toggleNav={toggleNav}/>
          <div className="content-container">
            <TaskTabs tabData={tabData} setTabData={setTabData} user={userData} setUserData={setUserData} auth={auth} db={db}/>
          </div>
        </div>
      );
    };

  };
};

export default App;
