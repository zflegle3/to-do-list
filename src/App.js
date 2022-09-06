import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';


import logo from './logo.svg';
import { useState } from "react";
import './App.css';
import Nav from "./components/Nav";
import Login from "./components/Login"

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
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// const db = getFirestore(app);





function App() {
  const [userCurrent, setUserCurrent] = useState(false);




  if (!userCurrent) {
    return (
      <Login auth={auth} provider={provider} setUserCurrent={setUserCurrent}/>
    );
  } else {
    return (
      <div className="App">
        <div className="content">
          <div className="left"></div>
        </div>
        <Nav user={userCurrent} setUserCurrent={setUserCurrent} auth={auth}/>
      </div>
    );
  }
}

export default App;
