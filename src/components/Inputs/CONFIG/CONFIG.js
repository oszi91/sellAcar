const carFormClass = {
	containerClass: 'addCarForm__inputsContainer',
	labelClass: 'addCarForm__inputsContainer__label',
	inputClass: 'addCarForm__inputsContainer__input',
}

export const settingsForCarForm = {
	...carFormClass,
	searchOptions: false,
	dispatchType: 'FIELD',
};

export const settingsForUsersFormInCar = {
	...carFormClass,
	dispatchType: 'FIELD_USER',
};

export const settingsForUserAccount = {
	...carFormClass,
	dispatchType: 'PERSONAL_DATA',
};

export const settingsForSearch = {
	containerClass: 'search__form__inputsContainer',
	labelClass: 'search__form__inputsContainer__label',
	inputClass: 'search__form__inputsContainer__select',
	dispatchType: 'SEARCH',
	searchOptions: true,
};
