import React, { useEffect } from 'react';

import { useData } from '../../../contexts/DataContext';
import { useUserData } from '../../../contexts/UserContext';

import CarList from './../../Cars/CarList/CarList';
import NoFavourites from '../NoCarsOrFav/NoCarsOrFav';
import UserAccount from '../UserAccount';

const UserFavourites = () => {
	const {
		state: {
			user: { favourites },
			carList,
		},
	} = useData();
	const { userInfoUpdate } = useUserData();

	useEffect(() => {
		userInfoUpdate();
	}, [favourites]);

	const favCars = carList.filter(car => favourites.indexOf(car.id) !== -1);

	const hasUserFavourites = favCars.length ? (
		<CarList filteredData={favCars} />
	) : (
		<NoFavourites fav={true} />
	);

	return (
		<>
			<UserAccount />
			{hasUserFavourites}
		</>
	);
};

export default UserFavourites;
