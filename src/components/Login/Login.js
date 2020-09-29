import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebaseConfig';
import {loggedInUserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    if(firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
    const [loggedInUser, setLoggedInUser] = useContext(loggedInUserContext);
    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/"}};

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const {displayName, email} = result.user;
                const signedInUser = {
                    name: displayName,
                    email: email
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(error => { });
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn}>Google sign in</button>
        </div>
    );
};

export default Login;