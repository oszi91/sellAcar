export const initalState = {
	carList: [],
	allUsers: [],
	blacklist: [],
	loading: true,
	editMode: false,
	errors: {
		error: '',
		errorsFrontend: '',
	},
	car: {
		brand: '',
		model: '',
		year: '',
		price: '',
		kilometers: '',
		engine: '',
		capacity: '',
		power: '',
		vin: '',
		fuel: '',
		description: '',
		images: [],
		id: '',
		ownerId: '',
	},
	userDataInCar: {
		nick: '',
		email: '',
		name: '',
		surname: '',
		phoneNumber: '',
		street: '',
		streetNumber: '',
		postCode: '',
		city: '',
		favourites: [],
	},
	user: {
		nick: '',
		email: '',
		name: '',
		surname: '',
		phoneNumber: '',
		street: '',
		streetNumber: '',
		postCode: '',
		city: '',
		favourites: [],
	},
	filters: {
		sortBy: '',
		brand: '',
		model: '',
		priceFrom: '',
		priceTo: '',
		yearFrom: '',
		yearTo: '',
		kilometersFrom: '',
		kilometersTo: '',
		fuelType: '',
	},
};

export const dataReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH': {
			return {
				...state,
				carList: action.carList,
				loading: false,
			};
		}
		case 'FETCH_USERS': {
			return {
				...state,
				user: action.dataUsers,
				userDataInCar: action.dataUsers,
			};
		}
		case 'FETCH_ALL_USERS': {
			return {
				...state,
				allUsers: action.dataUsers,
			};
		}
		case 'FETCH_USERS_FROM_BLACKLIST': {
			return {
				...state,
				blacklist: action.blacklist,
			};
		}
		case 'FAVOURITES': {
			if (action.toDelete === false) {
				return {
					...state,
					user: {
						...state.user,
						favourites: [...state.user.favourites, action.payload],
					},
				};
			} else {
				return {
					...state,
					user: {
						...state.user,
						favourites: state.user.favourites.filter(
							car => car !== action.payload
						),
					},
				};
			}
		}
		case 'FIELD': {
			return {
				...state,
				car: { ...state.car, [action.fieldName]: action.payload },
			};
		}
		case 'FIELD_USER': {
			return {
				...state,
				userDataInCar: {
					...state.userDataInCar,
					[action.fieldName]: action.payload,
				},
			};
		}
		case 'PERSONAL_DATA': {
			return {
				...state,
				user: { ...state.user, [action.fieldName]: action.payload },
			};
		}
		case 'SEARCH': {
			return {
				...state,
				filters: { ...state.filters, [action.fieldName]: action.payload },
			};
		}
		case 'UPDATE': {
			return {
				...state,
				filters: { ...filters, ...action.payload },
			};
		}
		case 'UPDATE_PHOTO_WHEN_ADD': {
			return {
				...state,
				car: { ...state.car, ...action.payload },
			};
		}
		case 'EDIT_MODE':
			return {
				...state,
				car: { ...state.car, ...action.payload },
				userDataInCar: { ...state.userDataInCar, ...action.userData },
				editMode: true,
			};
		case 'RESET':
			return { ...initalState, user: { ...state.user } };
		case 'RESETFORM':
			return {
				...state,
				car: {
					brand: '',
					model: '',
					year: '',
					price: '',
					kilometers: '',
					engine: '',
					capacity: '',
					power: '',
					vin: '',
					fuel: '',
					description: '',
					images: [],
					id: '',
				},
				errors: {
					error: '',
					errorsFrontend: '',
				},
				editMode: false,
			};
		case 'ERROR':
			if (action.payload.errorsFrontend) {
				return {
					...state,
					errors: { errorsFrontend: action.payload.errorsFrontend },
				};
			} else {
				return {
					...state,
					errors: { error: action.payload.error },
				};
			}
		default:
			return state;
	}
};
