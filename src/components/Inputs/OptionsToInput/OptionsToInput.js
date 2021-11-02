export const brandOptions = [
	{ value: 'Volkswagen', txt: 'Volkswagen' },
	{ value: 'Opel', txt: 'Opel' },
	{ value: 'Audi', txt: 'Audi' },
	{ value: 'BMW', txt: 'BMW' },
	{ value: 'Ford', txt: 'Ford' },
	{ value: 'Mercedes-Benz', txt: 'Mercedes-Benz' },
	{ value: 'Toyota', txt: 'Toyota' },
	{ value: 'Skoda', txt: 'Skoda' },
	{ value: 'Peugeot', txt: 'Peugeot' },
	{ value: 'Porsche', txt: 'Porsche' },
	{ value: 'Mazda', txt: 'Mazda' },
];

const year = new Date().getFullYear();
const years = Array.from(new Array(30), (val, index) => year - index);

export const yearOptions = years.map(year => {
	return { value: year, txt: year };
});

export const fuelOptions = [
	{ value: 'petrol', txt: 'Petrol' },
	{ value: 'diesel', txt: 'Diesel' },
	{ value: 'gas', txt: 'Gas' },
	{ value: 'electric', txt: 'Electric' },
];

export const sortOptions = [
	{ value: 'latest', txt: 'Latest' },
	{ value: 'priceLowToHigh', txt: 'Price (Low to High)' },
	{ value: 'priceHighToLow', txt: 'Price (High to Low)' },
	{ value: 'kmsLowToHigh', txt: 'Kms (Low to High)' },
	{ value: 'kmsHighToLow', txt: 'Kms (High to Low)' },
	{ value: 'yearLowToHigh', txt: 'Year Made (Low to High)' },
	{ value: 'yearHighToLow', txt: 'Year Made (High to Low)' },
	{ value: 'alphabetically', txt: 'Alphabetically' },
];
