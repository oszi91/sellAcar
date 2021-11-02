import React, { createContext, useContext } from 'react';

import { usersRef, usersBlackListRef } from '../firebase';

import { useAuth } from './AuthContext';
import { useData } from './DataContext';

const UserContext = createContext();

export const useUserData = () => useContext(UserContext);

const UserProvider = ({ children }) => {
	const { currentUser } = useAuth();
	const {
		dispatch,
		state: { user },
	} = useData();

	const userInfoUpdate = e => {
		if (e) {
			e.preventDefault();
		}

		if (currentUser) {
			const userData = {
				...user,
			};

			usersRef
				.doc(currentUser.uid)
				.update(userData)
				.catch(err => {
					dispatch({ type: 'ERROR', payload: { error: err.message } });
				});
		}
	};

	const addUserToBlackList = user => {
		usersBlackListRef
			.doc(user.id)
			.set(user)
			.catch(err => {
				dispatch({ type: 'ERROR', payload: { error: err.message } });
			});
	};

	const deleteUserFromBlackList = user => {
		usersBlackListRef
			.doc(user.id)
			.delete()
			.catch(err => {
				dispatch({ type: 'ERROR', payload: { error: err.message } });
			});
	};

	const value = { userInfoUpdate, addUserToBlackList, deleteUserFromBlackList };
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
