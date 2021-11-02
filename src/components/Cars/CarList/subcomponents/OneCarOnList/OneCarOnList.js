import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../../../contexts/AuthContext';
import { useData } from '../../../../../contexts/DataContext';
import { useUserData } from '../../../../../contexts/UserContext';

import { cutTextIfToLong } from '../../../../../helpers/cutTextIfToLong';

const OneCarOnList = ({
	model,
	brand,
	year,
	kilometers,
	price,
	images,
	id,
	fuel,
}) => {
	const { currentUser } = useAuth();
	const {
		state: {
			user: { favourites, admin },
		},
		dispatch,
	} = useData();
	const { userInfoUpdate } = useUserData();

	const isPhotoAvailable = images.length
		? images[0].src
		: './images/empty-photo.png';
	const changeNameToURL = str => str.replace(/\s/g, '-').toLowerCase();
	const link = changeNameToURL(`${model}-${brand}-${year}-${kilometers}-${id}`);

	useEffect(() => {
		userInfoUpdate();
	}, [favourites]);

	const addFav = () => {
		if (favourites.includes(id)) {
			dispatch({ type: 'FAVOURITES', payload: id, toDelete: true });
		} else {
			dispatch({ type: 'FAVOURITES', payload: id, toDelete: false });
		}
		userInfoUpdate();
	};

	let favIconStatus = <i className="fas fa-star"></i>;
	if (favourites) {
		const isCarFavourite = favourites.indexOf(id) === -1;
		let isFav = false;
		if (isCarFavourite) isFav = true;
		favIconStatus = isFav ? (
			<i className="far fa-star"></i>
		) : (
			<i className="fas fa-star"></i>
		);
	}

	return (
		<li className="carList__item">
			{currentUser && !admin && (
				<div className="carList__item__fav" onClick={addFav}>
					{favIconStatus}
				</div>
			)}
			<Link to={link}>
				<div className="oneCar">
					<div className="oneCar__photo">
						<img className="oneCar__photo__img" src={isPhotoAvailable} />
						<div className="oneCar__photo__back" />
					</div>
					<h2 className="oneCar__name">
						{brand} {cutTextIfToLong(model, 10)}
					</h2>
					<div className="oneCar__container">
						<h3 className="oneCar__container__year">{year}</h3>
						<h4 className="oneCar__container__kilometers">{kilometers} km</h4>
						<h5 className="oneCar__container__fuel">{fuel}</h5>
					</div>
					<h6 className="oneCar__price">{price} PLN </h6>
				</div>
			</Link>
		</li>
	);
};

export default OneCarOnList;
