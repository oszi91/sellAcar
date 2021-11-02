import { useState, useEffect } from 'react';
import { useData } from '../../../../contexts/DataContext';

const useFiltersSearch = filteredData => {
	const {
		state: {
			filters,
			filters: {
				brand,
				model,
				yearFrom,
				yearTo,
				priceFrom,
				priceTo,
				kilometersFrom,
				kilometersTo,
				fuelType,
				sortBy,
			},
		},
	} = useData();

	const [filtersSearch, useFiltersSearch] = useState({
		brandSearch: () => res => res,
		modelSearch: () => res => res,
		yearFrom: () => res => res,
		yearTo: () => res => res,
		priceFrom: () => res => res,
		priceTo: () => res => res,
		kilometersFrom: () => res => res,
		kilometersTo: () => res => res,
		fuelType: () => res => res,
		sortData: (a, b) => b.sort - a.sort,
	});

	const filterSearchCar = (searchName, value, stateVal, type) => {
		let searchCar = res => res;

		if (searchName) {
			switch (type) {
				case 'search':
					searchCar = res =>
						res[value.toString()]
							.toLowerCase()
							.indexOf(searchName.toLowerCase()) !== -1;
					break;
				case 'from':
					if (searchName === 'all') {
						searchCar = res => res;
					} else {
						searchCar = res => res[value.toString()] >= searchName;
					}
					break;
				case 'to':
					if (searchName === 'all') {
						searchCar = res => res;
					} else {
						searchCar = res => res[value.toString()] <= searchName;
					}
					break;
				case 'select':
					if (searchName === 'all') {
						searchCar = res => res;
					} else {
						searchCar = res => res[value.toString()] === searchName;
					}
					break;
				case 'sort':
					switch (searchName) {
						case 'latest':
							searchCar = res => res;
						case 'priceLowToHigh':
							searchCar = (a, b) => a.price - b.price;
							break;
						case 'priceHighToLow':
							searchCar = (a, b) => b.price - a.price;
							break;
						case 'kmsLowToHigh':
							searchCar = (a, b) => a.kilometers - b.kilometers;
							break;
						case 'kmsHighToLow':
							searchCar = (a, b) => b.kilometers - a.kilometers;
							break;
						case 'yearLowToHigh':
							searchCar = (a, b) => a.year - b.year;
							break;
						case 'yearHighToLow':
							searchCar = (a, b) => b.year - a.year;
							break;
						case 'alphabetically':
							searchCar = (a, b) => a.brand.localeCompare(b.brand);
							break;
					}
			}
		} else {
			searchCar = res => res;
		}

		useFiltersSearch(prevState => {
			return { ...prevState, [stateVal]: searchCar };
		});
	};

	useEffect(() => {
		filterSearchCar(brand, 'brand', 'brandSearch', 'select');
		filterSearchCar(model, 'model', 'modelSearch', 'search');
		filterSearchCar(yearFrom, 'year', 'yearFrom', 'from');
		filterSearchCar(yearTo, 'year', 'yearTo', 'to');
		filterSearchCar(priceFrom, 'price', 'priceFrom', 'from');
		filterSearchCar(priceTo, 'price', 'priceTo', 'to');
		filterSearchCar(kilometersFrom, 'kilometers', 'kilometersFrom', 'from');
		filterSearchCar(kilometersTo, 'kilometers', 'kilometersTo', 'to');
		filterSearchCar(fuelType, 'fuel', 'fuelType', 'select');
		filterSearchCar(sortBy, 'sort', 'sortBy', 'sort');
	}, [filters]);

	filteredData = filteredData
		.filter(filtersSearch.brandSearch)
		.filter(filtersSearch.modelSearch)
		.filter(filtersSearch.yearFrom)
		.filter(filtersSearch.yearTo)
		.filter(filtersSearch.priceFrom)
		.filter(filtersSearch.priceTo)
		.filter(filtersSearch.kilometersFrom)
		.filter(filtersSearch.kilometersTo)
		.filter(filtersSearch.fuelType)
		.sort(filtersSearch.sortBy);

	return { filteredData };
};

export default useFiltersSearch;
