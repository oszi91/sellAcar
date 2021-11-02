import React, { createContext, useContext, useEffect, useState } from 'react';

import { auth, usersRef } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const addUserInfo = {
		id: '',
		creationDate: '',
		nick: '',
		email: '',
		admin: false,
		name: '',
		surname: '',
		phoneNumber: '',
		street: '',
		streetNumber: '',
		postCode: '',
		city: '',
		favourites: [],
	};

	const signUp = async (email, password, nick) => {
		const additionalUserInfo = async (id, creationDate, email, nick) => {
			await usersRef.doc(id).set({
				...addUserInfo,
				id,
				creationDate,
				email,
				nick,
			});
		};

		const createUserBasic = await auth.createUserWithEmailAndPassword(
			email,
			password
		);

		const {
			uid,
			metadata: { creationTime },
			email: nEmail,
		} = createUserBasic.user;
		await additionalUserInfo(uid, creationTime, nEmail, nick);
	};

	const logIn = (email, password) =>
		auth.signInWithEmailAndPassword(email, password);

	const logOut = () => {
		auth.signOut();
	};

	const resetPassword = email => auth.sendPasswordResetEmail(email);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signUp,
		logIn,
		logOut,
		resetPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
