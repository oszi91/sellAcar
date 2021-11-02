export const FormValidation = cars => {
	let errorsList = {};

	if (typeof cars.brand !== 'string' || cars.brand === '') {
		errorsList = { ...errorsList, brand: `Field can't be empty` };
	}
	if (typeof cars.model !== 'string' || cars.model === '') {
		errorsList = { ...errorsList, model: `Field can't be empty` };
	}
	if (typeof cars.year !== 'number' || cars.year === '') {
		errorsList = { ...errorsList, year: `Field can't be empty` };
	}
	if (typeof cars.price !== 'number' || cars.price === '') {
		errorsList = { ...errorsList, price: `Field can't be empty` };
	}
	if (typeof cars.kilometers !== 'number' || cars.kilometers === '') {
		errorsList = { ...errorsList, kilometers: `Field can't be empty` };
	}
	if (typeof cars.fuel !== 'string' || cars.fuel === '') {
		errorsList = { ...errorsList, fuel: `Field can't be empty` };
	}
	if (typeof cars.vin !== 'string' || cars.vin === '') {
		errorsList = { ...errorsList, vin: `Field can't be empty` };
	}

	return errorsList;
};

export const obligatoryFieldsValid = ({
	brand,
	model,
	year,
	price,
	kilometers,
	fuel,
	vin,
}) => {
	const reqFieldsCount = [0, 0, 0, 0, 0, 0, 0];
	const countRequierdFields = (org, req) => {
		if (org) {
			req++;
		}
		return req;
	};

	let obligatory =
		countRequierdFields(brand, reqFieldsCount[0]) +
		countRequierdFields(model, reqFieldsCount[1]) +
		countRequierdFields(year, reqFieldsCount[2]) +
		countRequierdFields(price, reqFieldsCount[3]) +
		countRequierdFields(kilometers, reqFieldsCount[4]) +
		countRequierdFields(fuel, reqFieldsCount[5]) +
		countRequierdFields(vin, reqFieldsCount[6]);
	const couldAddCar = obligatory - reqFieldsCount.length === 0;

	let amountValidFields = `*${obligatory}/${reqFieldsCount.length} `;

	return { couldAddCar, amountValidFields };
};
