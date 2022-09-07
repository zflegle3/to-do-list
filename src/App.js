import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useState } from "react";


import './App.css';
import Nav from "./components/Nav";
import Login from "./components/Login"
import TaskTabs from "./components/TaskTabs"

// Your web app's Firebase configuration
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
  const [userCurrent, setUserCurrent] = useState(false);
  const [userData, setUserData] = useState(false);
  const [tabData, setTabData] = useState([{filterType: "all", filterValue: "all"}]);

  console.log(userData);




  if (!userData) {
    return (
      <Login auth={auth} provider={provider} setUserCurrent={setUserCurrent} setUserData={setUserData} db={db}/>
    );
  } else {
    return (
      <div className="App">
        <Nav user={userData} setUserCurrent={setUserCurrent} setUserData={setUserData} auth={auth} db={db}/>
        <TaskTabs tabData={tabData} user={userData} setUserCurrent={setUserCurrent} setUserData={setUserData} auth={auth} db={db}/>
      </div>
    );
  }
}

export default App;
