import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';

function Login(props) {
    //props.auth
    //props.provider
    //props.setUserData()

    const signInWithGoogle = () => {
        let errorOut = document.getElementById;
        errorOut.innerHtml = "";
        signInWithPopup(props.auth, props.provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            //Get or write new doc
            getUserDoc(user);
            // console.log(user);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            errorOut.innerHtml = `${errorMessage}`;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    };

   async function getUserDoc(user) {
        // console.log(user);
        const userDoc = doc(props.db, `users/U-${user.uid}` );
        //`users/example-user-doc` test case
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) { //if doc exists pull latest messages
            const docData = userDocSnap.data();
            props.setUserData(docData);
        } else {
            //get colleciton
            // const usersCollection = collection(props.db, "users");
            //add doc
            const newDoc = doc(props.db, `users/U-${user.uid}`);
            const newDocData = {
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                projects: [],
                tasks: [],
            };
            setDoc(newDoc,newDocData);

        }
        
        

        //if doc doesn't exist create new doc

   } 





    return (
        <div className={"log-in"}>
            <p>toDo List</p>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <p className="login-error"></p>
        </div>
    );
}


export default Login;