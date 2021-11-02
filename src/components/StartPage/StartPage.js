import React, { useRef } from 'react';

import { useData } from '../../contexts/DataContext';

import CarList from '../Cars/CarList/CarList';
import Search from './subcomponents/Search/Search';
import useFiltersSearch from './subcomponents/FiltersSearch/useFiltersSearch';

const StartPage = () => {
	const {
		state: {
			carList,
			blacklist,
			user: { admin },
		},
	} = useData();

	const carListRef = useRef(null);
	const scrollToPosition = () =>
		carListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

	let activeAds = carList.filter(
		car => car.isActive === true && car.adminCheck === true
	);

	let carsIncludeBlacklist = activeAds;
	if (blacklist.length && !admin) {
		carsIncludeBlacklist = activeAds.filter(car =>
			blacklist.find(user => car.ownerId !== user.id)
		);
	}

	let updateData = [...carsIncludeBlacklist];
	const { filteredData } = useFiltersSearch(updateData);

	return (
		<main className="startPage">
			<Search
				results={filteredData.length}
				scrollToResults={scrollToPosition}
			/>
			<CarList carListRef={carListRef} filteredData={filteredData} />
		</main>
	);
};

export default StartPage;
