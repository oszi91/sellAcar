import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';

import { useData } from '../../../contexts/DataContext';

const OneCarView = ({ match: { params } }) => {
	const {
		state: { carList },
	} = useData();
	const { car } = params;

	const [showDescription, setShowDescription] = useState(false);
	const [showTel, setShowTel] = useState(false);

	const handleShowTel = () => {
		setShowTel(true);
	};

	const handleDescription = () => {
		setShowDescription(prevState => !prevState);
	};

	let dsc = ['Show', 'down'];
	showDescription ? (dsc = ['Hide', 'up']) : dsc;

	const showHideDescription = showDescription
		? 'oneCarEquipment__item__addDescription oneCarEquipment__item__addDescription--isHide'
		: 'oneCarEquipment__item__addDescription';

	const changeNameToURL = str => str.replace(/\s/g, '-').toLowerCase();
	const oneCar = carList.filter(
		({ model, brand, year, kilometers, id }) =>
			changeNameToURL(`${model}-${brand}-${year}-${kilometers}-${id}`) === car
	);

	return (
		<section className="oneCarViewContainer">
			{oneCar.map(car => {
				const arePhotosAvailable = car.images.length ? (
					<ImageGallery
						items={car.images.map(el => ({
							original: el.src,
							thumbnail: el.src,
						}))}
					/>
				) : (
					<img
						className="oneCarView__photos__img"
						src="./images/empty-photo-Bigger.png"
					/>
				);

				return (
					<React.Fragment key={car.id}>
						<div className="oneCarView" key={car.id}>
							<div className="oneCarView__photos">{arePhotosAvailable}</div>
							<div className="oneCarView__info">
								<h1 className="oneCarView__info__header">
									{car.brand} {car.model}
								</h1>
								<h2 className="oneCarView__info__header oneCarView__info__header--price">
									{car.price} PLN
								</h2>
								<div className="oneCarEquipment">
									<div className="oneCarEquipment__item">
										Brand:
										<span className="oneCarEquipment__item--bold">
											{car.brand}
										</span>
									</div>
									<div className="oneCarEquipment__item">
										Model:
										<span className="oneCarEquipment__item--bold">
											{car.model}
										</span>
									</div>
									<div className="oneCarEquipment__item oneCarEquipment__item--white">
										Year:
										<span className="oneCarEquipment__item--bold">
											{car.year}
										</span>
									</div>
									<div className="oneCarEquipment__item oneCarEquipment__item--white">
										Kilometers:
										<span className="oneCarEquipment__item--bold">
											{car.kilometers} km
										</span>
									</div>
									<div className="oneCarEquipment__item">
										Fuel:
										<span className="oneCarEquipment__item--bold">
											{car.fuel}
										</span>
									</div>
									<div className="oneCarEquipment__item">
										Engine:
										<span className="oneCarEquipment__item--bold">
											{car.engine}
										</span>
									</div>
									<div className="oneCarEquipment__item oneCarEquipment__item--white">
										Capacity:
										<span className="oneCarEquipment__item--bold">
											{car.capacity} cm3
										</span>
									</div>
									<div className="oneCarEquipment__item oneCarEquipment__item--white">
										Power:
										<span className="oneCarEquipment__item--bold">
											{car.power} KM
										</span>
									</div>
									<div
										onClick={handleDescription}
										className="oneCarEquipment__item oneCarEquipment__item__description"
									>
										{dsc[0]} description{' '}
										<i className={`fas fa-arrow-circle-${dsc[1]}`}></i>
									</div>
									<p className={showHideDescription}>{car.description}</p>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="contactContainer">
								<h3 className="contactContainer__header">USER INFO</h3>
								<div className="contactInfoListContainer">
									<div className="contactInfo">
										<p className="contactInfo__item contactInfo__item--icon">
											<i className="fas fa-user"></i>
										</p>
										<hr className="contactInfo__item__line" />
										<p className="contactInfo__item">
											<span className="contactInfo__item__label">Nick:</span>
											<span className="contactInfo__item__data">
												{car.userData.nick}
											</span>
										</p>
										<p className="contactInfo__item">
											<span className="contactInfo__item__label">Name:</span>
											<span className="contactInfo__item__data">
												{car.userData.name} {car.userData.surname}
											</span>
										</p>
									</div>
									<div className="contactInfo">
										<p className="contactInfo__item contactInfo__item--bigger">
											<i className="fas fa-info-circle"></i>
										</p>
										<hr className="contactInfo__item__line" />
										<p className="contactInfo__item">
											<span className="contactInfo__item__label">Tel.:</span>
											<span className="contactInfo__item__data">
												<a
													href={`tel:${
														showTel ? car.userData.phoneNumber : '*** *** ***'
													}`}
												>
													{showTel ? car.userData.phoneNumber : '*** *** ***'}
												</a>
												{!showTel && (
													<button
														onClick={handleShowTel}
														className="contactInfo__item__btn"
													>
														Show
													</button>
												)}
											</span>
										</p>
										<p className="contactInfo__item">
											<span className="contactInfo__item__label">E-mail:</span>
											<span className="contactInfo__item__data">
												<a href={`mailto:${car.userData.email}`}>
													{car.userData.email}
												</a>
											</span>
										</p>
										<p className="contactInfo__item">
											<span className="contactInfo__item__label">
												Location:
											</span>
											<span className="contactInfo__item__data">
												{car.userData.city}
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</React.Fragment>
				);
			})}
		</section>
	);
};

export default OneCarView;
