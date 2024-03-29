import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';

import { ReactComponent as GoogleSvg } from '../images/icons/google-plus.svg';

function Login(props) {
    //props.auth
    //props.provider
    //props.setUserData()

    const signInWithGoogle = () => { 
        console.log("login");
        let errorOut = document.getElementById;
        errorOut.innerHtml = "";
        signInWithPopup(props.auth, props.provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            //Get or write new doc
            getUserDoc(user);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            errorOut.innerHtml = `${errorMessage}`;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    };

   async function getUserDoc(user) {
        const userDoc = doc(props.db, `users/U-${user.uid}` );
        //`users/example-user-doc` test case
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) { //if doc exists pull latest messages
            const docData = userDocSnap.data();
            props.setUserData(docData);
        } else {
            //create & add doc
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
   } 


    return (
        <div className={"log-in"}>
            <p>toDo Tracker</p>
            <button onClick={signInWithGoogle}>
                <GoogleSvg />
                <p> Sign In With Google </p>
            </button>
            <p className="login-error"></p>
        </div>
    );
}


export default Login;