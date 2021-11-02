import React, { createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { carsRef, timeRef, storageRef } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from './AuthContext';
import { useData } from './DataContext';

import { FormValidation } from '../components/CarForm/subcomponents/FormValidation/FormValidation';

const CRUDContext = createContext();

export const useCRUD = () => useContext(CRUDContext);

const CRUDProvider = ({ children }) => {
	const { currentUser } = useAuth();
	const {
		state,
		state: {
			carList,
			userDataInCar: { admin, creationDate, favourites, ...userData },
			car,
		},
		dispatch,
	} = useData();
	const history = useHistory();

	const carDataToAdd = {
		...car,
		ownerId: admin ? car.ownerId : currentUser?.uid,
		createTime: timeRef,
		updateTime: timeRef,
		userData,
		lastUpdateByAdmin: '',
		isActive: false,
		adminCheck: false,
	};

	let oneUserData;
	if (admin) {
		oneUserData = carList;
	} else {
		oneUserData = carList.filter(car => currentUser?.uid === car.ownerId);
	}

	const addOrUpdateData = async (ref, id, dataToAdd) => {
		try {
			const data = ref.doc(id);
			const updateorAddData = await data.set(dataToAdd);
		} catch (err) {
			dispatch({ type: 'ERROR', payload: { error: err.message } });
		}
	};

	const updateData = async (ref, id, dataToAdd) => {
		try {
			const data = ref.doc(id);
			const updateorAddData = await data.update(dataToAdd);
		} catch (err) {
			dispatch({ type: 'ERROR', payload: { error: err.message } });
		}
	};

	const addOrUpdateCar = async (id, dataToAdd) => {
		if (!Object.keys(FormValidation(state.car)).length) {
			try {
				const car = carsRef.doc(id);
				const updateorAddData = await car.set(dataToAdd);
				const reset = await dispatch({ type: 'RESETFORM' });
				const redirect = history.push('/my-cars/active');
			} catch (err) {
				dispatch({ type: 'ERROR', payload: { error: err.message } });
			}
		} else {
			dispatch({
				type: 'ERROR',
				payload: { errorsFrontend: FormValidation(state) },
			});
		}
	};

	const handleAdd = async e => {
		e.preventDefault();
		const addCar = await addOrUpdateCar(
			(carDataToAdd.id = uuidv4()),
			carDataToAdd
		);
	};

	const handleEditData = id => {
		const newData = oneUserData.filter(car => car.id === id);

		dispatch({
			type: 'EDIT_MODE',
			payload: newData[0],
			userData: newData[0].userData,
		});
	};

	const handleEditConfirm = async (e, cars) => {
		e.preventDefault();
		const { id, createTime, ownerId } = cars;

		let lastUpdateBy;
		if (ownerId !== currentUser.uid) {
			lastUpdateBy = 'admin';
		}

		const editCar = await addOrUpdateCar(id, {
			...carDataToAdd,
			id,
			createTime,
			updateTime: timeRef,
			lastUpdateByAdmin:
				lastUpdateBy === 'admin' ? timeRef : carDataToAdd.lastUpdateByAdmin,
			adminCheck: admin ? true : false,
			isActive: true,
		});
	};

	const handleDelete = async (e, carData) => {
		e.preventDefault();

		const { model, brand, vin, id } = carData;
		const photosToDelete = `${currentUser.uid}/${brand}-${model}-${vin}`;

		const car = carsRef.doc(id);

		try {
			await car.delete();
			const carRef = storageRef.ref(photosToDelete);
			const listResults = await carRef.listAll();
			const promises = listResults.items.map(item => item.delete());
			Promise.all(promises);
		} catch {
			dispatch({ type: 'ERROR', payload: { error: err.message } });
		}
	};

	const deleteImg = async (url, id, updateData) => {
		const fileRef = storageRef.refFromURL(url);
		await fileRef.delete();

		const updateImagesOrder = car.images
			.filter(item => item.src !== url)
			.map((item, i) => {
				return (item.order = i);
			});

		dispatch({
			type: 'UPDATE_PHOTO_WHEN_ADD',
			payload: {
				images: car.images.filter(item => item.src !== url),
			},
		});

		if (id) {
			addOrUpdateData(carsRef, id, updateData);
		}
	};

	const value = {
		carDataToAdd,
		addOrUpdateData,
		handleEditData,
		handleEditConfirm,
		handleAdd,
		handleDelete,
		deleteImg,
		updateData,
	};

	return <CRUDContext.Provider value={value}>{children}</CRUDContext.Provider>;
};

export default CRUDProvider;
