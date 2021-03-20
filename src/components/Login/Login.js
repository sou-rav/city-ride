import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../Home/Header/Header';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        email: '',
        password: '',
        name: '',
        error: '',
        success: false
    });

    const handleBlur = (e) => {
        let isFieldValid;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if (e.target.name === 'name') {
            isFieldValid = e.target.value.length > 4;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    const { displayName, email } = res.user;
                    const signInUser = { name: displayName, email };
                    setLoggedInUser(signInUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    const { displayName, email } = res.user;
                    const signInUser = { name: displayName, email };
                    setLoggedInUser(signInUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

        }

        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('updated')
        }).catch(function (error) {
            console.log(error)
        });
    };


    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signInUser = { name: displayName, email }
                console.log(signInUser)
                setLoggedInUser(signInUser)
                history.replace(from)

            }).catch((error) => {
                console.log(error)
            });
    }


    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div style={{ textAlign: 'center' }} >
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="" id="" />
                <label htmlFor="newUser">New User SignUp</label>

            </div>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }} >
                {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="enter your name" />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="enter your email" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="enter your password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign In'} />
            </form>
            <div style={{ textAlign: 'center' }}>
                <button onClick={handleGoogleSignIn} >Google Login</button>
            </div>

            <p style={{ color: "red" }}>{user.error}</p>
            {user.success && <p style={{ color: "green" }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}

        </div>
    );
};
export default Login;