import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { carsRef, usersRef, usersBlackListRef } from '../firebase';

import { dataReducer, initalState } from '../reducers/dataReducer';

import { useAuth } from './AuthContext';

import Loading from '../components/Loading/Loading';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
	const { currentUser } = useAuth();
	const [state, dispatch] = useReducer(dataReducer, initalState);
	const {
		carList,
		dataUsers,
		loading,
		user: { admin },
	} = state;

	const getCarList = () => {
		carsRef.onSnapshot(querySnapshot => {
			const carList = [];
			querySnapshot.forEach(doc => {
				carList.push(doc.data());
			});
			dispatch({ type: 'FETCH', carList });
		});
	};

	const getDataUsers = () => {
		usersBlackListRef.onSnapshot(querySnapshot => {
			let blacklist = [];
			querySnapshot.forEach(doc => {
				blacklist.push(doc.data());
			});
			dispatch({ type: 'FETCH_USERS_FROM_BLACKLIST', blacklist });
		});

		if (currentUser) {
			usersRef.where('id', '==', currentUser.uid).onSnapshot(querySnapshot => {
				let userInfo = {};
				querySnapshot.forEach(doc => {
					userInfo = doc.data();
					dispatch({ type: 'FETCH_USERS', dataUsers: userInfo });
				});

				if (admin) {
					usersRef.onSnapshot(querySnapshot => {
						let userInfo = [];
						querySnapshot.forEach(doc => {
							userInfo.push(doc.data());
						});

						dispatch({
							type: 'FETCH_ALL_USERS',
							dataUsers: userInfo.filter(user => user.admin === false),
						});
					});
				}
			});
		}
	};

	useEffect(() => {
		getDataUsers();
		getCarList();
	}, [currentUser, carList.length, dataUsers, admin]);

	const value = {
		dispatch,
		state,
	};

	const areDataLoaded = loading ? <Loading /> : children;

	return (
		<DataContext.Provider value={value}>{areDataLoaded}</DataContext.Provider>
	);
};

export default DataProvider;
