import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

function Login(props) {
    //props.auth
    //props.provider
    //props.setUserCurrent()

    const signInWithGoogle = () => {
        signInWithPopup(props.auth, props.provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            props.setUserCurrent(user);
            console.log(user);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
      };


    return (
        <div className={"log-in"}>
            <p>toDo List</p>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    );
}


export default Login;