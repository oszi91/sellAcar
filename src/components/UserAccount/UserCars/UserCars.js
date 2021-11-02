import React from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';

import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';

import CarForm from '../../CarForm/CarForm';
import NoFavourites from '../NoCarsOrFav/NoCarsOrFav';
import OneUserCar from './subcomponents/OneUserCar';
import UserAccount from '../UserAccount';

const UserCars = () => {
	const {
		state: {
			user: { admin },
			carList,
			editMode,
		},
	} = useData();
	const { currentUser } = useAuth();
	const { adsStatus } = useParams();

	let carData;
	if (admin) {
		carData = carList;
	} else {
		carData = carList.filter(car => currentUser.uid === car.ownerId);
	}

	const activeAds = carData.filter(
		car => car.isActive === true && car.adminCheck === true
	);
	const pendingAds = carData.filter(car => car.adminCheck === false);
	const endAds = carData.filter(
		car => car.isActive === false && car.adminCheck === true
	);

	let categoryRules = {
		carCategory: carData,
		addToActiveBtn: null,
		addToEndBtn: null,
	};

	if (adsStatus === 'active') {
		categoryRules = {
			...categoryRules,
			carCategory: activeAds,
			addToActiveBtn: false,
			addToEndBtn: true,
		};
	} else if (adsStatus === 'pending') {
		categoryRules = {
			...categoryRules,
			carCategory: pendingAds,
		};
	} else if (adsStatus === 'ended') {
		categoryRules = {
			...categoryRules,
			carCategory: endAds,
			addToActiveBtn: true,
			addToEndBtn: false,
		};
	}

	const { carCategory, addToActiveBtn, addToEndBtn } = categoryRules;

	return (
		<>
			<UserAccount />
			<div className="advStatusContainer">
				<ul className="advStatusList">
					<li className="advStatusList__item">
						<NavLink
							className="advStatusList__item__link"
							to="/my-cars/active"
							activeClassName={'advStatusList__item--active'}
						>
							Active ({activeAds.length})
						</NavLink>
					</li>
					<li className="advStatusList__item">
						<NavLink
							className="advStatusList__item__link"
							to="/my-cars/pending"
							activeClassName={'advStatusList__item--active'}
						>
							Pending ({pendingAds.length})
						</NavLink>
					</li>
					<li className="advStatusList__item">
						<NavLink
							className="advStatusList__item__link"
							to="/my-cars/ended"
							activeClassName={'advStatusList__item--active'}
						>
							Ended ({endAds.length})
						</NavLink>
					</li>
				</ul>
			</div>
			<div className="container">
				{carData.length ? (
					<ul className="myCars">
						{carCategory.map(car => {
							return (
								<OneUserCar
									key={car.id}
									car={car}
									addToActiveBtn={addToActiveBtn}
									addToEndBtn={addToEndBtn}
								/>
							);
						})}
						{editMode ? (
							<div className="fullView">
								<CarForm />
							</div>
						) : (
							''
						)}
					</ul>
				) : (
					<NoFavourites fav={false} />
				)}
			</div>
		</>
	);
};

export default UserCars;
