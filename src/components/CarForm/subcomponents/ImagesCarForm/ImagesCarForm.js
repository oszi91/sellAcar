import React, { useEffect, useRef, useState } from 'react';

import { carsRef, storageRef, timeRef } from '../../../../firebase';

import { useAuth } from '../../../../contexts/AuthContext';
import { useCRUD } from '../../../../contexts/CRUDContext';
import { useData } from '../../../../contexts/DataContext';

import ImagesCarFormBasicHandle from './subcomponents/ImagesCarFormBasicHandle/ImagesCarFormBasicHandle';
import ImagesInCarFormView from './subcomponents/ImagesInCarFormView/ImagesInCarFormView';
import InputFiles from '../../../Inputs/InputFiles/InputFiles';
import LoadingBar from '../../../Loading/LoadingBar/LoadingBar';

const ImagesCarForm = ({ editMode }) => {
	const {
		state,
		state: {
			car: { images, id, createTime },
			user: { admin },
		},
		dispatch,
	} = useData();

	const { currentUser } = useAuth();
	const { carDataToAdd, addOrUpdateData } = useCRUD();

	const [uploadProgress, setUploadProgress] = useState(null);

	useEffect(() => {
		if (!editMode) {
			dispatch({ type: 'UPDATE_PHOTO_WHEN_ADD', payload: { images: [] } });
		}
	}, []);

	const imgInputRef = useRef();

	const onFileChange = async e => {
		const { imgArr, catalog, fileName } = ImagesCarFormBasicHandle(
			e,
			state,
			currentUser.uid
		);

		const promises = [];
		imgArr.forEach(file => {
			const uploadTask = storageRef
				.ref(catalog)
				.child(fileName(file))
				.put(file);

			promises.push(uploadTask);
			uploadTask.on(
				'state_changed',
				snapshot => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					if (snapshot.state === 'running') {
						setUploadProgress(progress);
					}
				},
				error =>
					dispatch({
						type: 'ERROR',
						payload: {
							error: error.message,
						},
					}),
				async () => {
					const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
					images.push({ src: downloadURL, order: images.length });

					if (id) {
						addOrUpdateData(carsRef, id, {
							...carDataToAdd,
							id,
							createTime,
							updateTime: timeRef,
						});
					}

					dispatch({
						type: 'UPDATE_PHOTO_WHEN_ADD',
						payload: { images },
					});
				}
			);
		});

		(async () => {
			try {
				Promise.all(promises);
			} catch (err) {
				console.log(err);
			}
		})();

		imgInputRef.current.value = '';
	};

	return (
		<>
			<LoadingBar uploadProgress={uploadProgress} />
			<ImagesInCarFormView />
			{!admin && (
				<InputFiles
					containerClass="addCarForm__inputsContainer"
					labelClass="addCarForm__inputsContainer__labelImagesInput"
					inputClass="addCarForm__inputsContainer__imagesInput"
					labelText="Add your photos"
					onChange={onFileChange}
					id="images"
					propRef={imgInputRef}
				/>
			)}
		</>
	);
};

export default ImagesCarForm;
