import React, { useState, useContext } from "react";
import auth from "../firebase";
import firebase from "firebase";

export const AuthContext = React.createContext([]);

export const useAuthContext = () => useContext(UserAuthProvider);

const UserAuthProvider = ({ children }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [userLogged, setUserLogged] = useState(false)
	//const [loading, setLoading] = useState(false)
	const [hideSidebar, setHideSidebar] = useState(true);
	const [resetPass, setResetPass] = useState(false);

	const sendEmailVerification = () => {
		firebase
			.auth()
			.currentUser.sendEmailVerification()
			.then(function () {
				// Email Verification sent!
				alert("Email Verification Sent!");
			});
	};

	const signUp = (e) => {
		e.preventDefault();

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;

				user.updateProfile({
					displayName: username,
				});
				console.log(user);
				console.log(user.displayName);
				sendEmailVerification();
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorCode, errorMessage);
			});

		setUsername("");
		setPassword("");
		setEmail("");
		setHideSidebar(false);
	};

	const signIn = (e) => {
		e.preventDefault();

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				setUserLogged(true);
				setHideSidebar(false);
				// const user = userCredential.user;
				// console.log(`user logged in: ${user}`)
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorCode, errorMessage);
			});
		setUsername("");
		setPassword("");
		setEmail("");
	};

	const logOut = () => {
		auth.signOut();
		setUserLogged(false)
		setHideSidebar(true);
	};

	const sendPasswordReset = (email) => {
		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(function () {
				// Password Reset Email Sent!
				alert("Password Reset Email Sent!");
				setResetPass(false);
			})
			.catch(function (error) {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				if (errorCode === "auth/invalid-email") {
					alert(errorMessage);
				} else if (errorCode === "auth/user-not-found") {
					alert(errorMessage);
				}
				console.log(error);
			});
	};

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signUp,
				username,
				setUsername,
				email,
				setEmail,
				password,
				setPassword,
				hideSidebar,
				logOut,
				sendPasswordReset,
				resetPass,
				setResetPass,
				userLogged, 
				setUserLogged
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default UserAuthProvider;
