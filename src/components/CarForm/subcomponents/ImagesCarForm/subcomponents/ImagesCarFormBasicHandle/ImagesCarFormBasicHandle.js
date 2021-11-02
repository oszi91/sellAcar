import { v4 as uuidv4 } from 'uuid';

const ImagesCarFormBasicHandle = (
	e,
	{ editMode, car: { ownerId, brand, model, vin } },
	currentUser
) => {
	let imgArr = [];

	e.preventDefault();
	const imagesInput = e.target.files;

	for (let i = 0; i < imagesInput.length; i++) {
		const newImg = imagesInput[i];
		imgArr.push(newImg);
	}

	let userId;
	if (editMode) {
		userId = ownerId;
	} else {
		userId = currentUser;
	}

	const catalog = `${userId}/${brand}-${model}-${vin}`;
	const fileName = file =>
		`${file.name.substr(0, file.name.lastIndexOf('.'))}-${uuidv4()}`;

	return { imgArr, catalog, fileName };
};

export default ImagesCarFormBasicHandle;
