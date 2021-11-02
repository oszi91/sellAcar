import React, { useState } from 'react';
import { useCRUD } from '../../../../contexts/CRUDContext';
import { useData } from '../../../../contexts/DataContext';
import { carsRef } from '../../../../firebase';
import { cutTextIfToLong } from '../../../../helpers/cutTextIfToLong';
import ScrollToTop from '../../../../helpers/ScrollToTop';

const OneUserCar = ({ car, addToActiveBtn, addToEndBtn }) => {
	const {
		state: {
			user: { admin },
		},
	} = useData();
	const { handleEditData, handleDelete, updateData, carDataToAdd } = useCRUD();

	const [modalOpen, setModalOpen] = useState(false);

	const modalClass = modalOpen ? 'modal' : 'modal modal--isActive';

	const isPhotoAvailable = car.images.length
		? car.images[0].src
		: './images/empty-photo.png';

	return (
		<li key={car.id} className="myCars__item">
			<div className="oneCarOnList">
				<div className="oneCarOnList__photo">
					<img className="oneCarOnList__photo__img" src={isPhotoAvailable} />
				</div>
				<p className="oneCarOnList__name">
					<span className="oneCarOnList__name--brand">{car.brand}</span>
					<span className="oneCarOnList__name--model">
						{cutTextIfToLong(car.model, 6)}
					</span>
					<span className="oneCarOnList__name--year">{car.year}</span>
				</p>
				<div className="oneCarOnList__data">
					<p className="oneCarOnList__price">
						<span>{car.price}</span> PLN
					</p>
				</div>
				<div className="oneCarOnList__btns">
					<button
						onClick={() => {
							handleEditData(car.id);
							window.scrollTo(0, 0)
						}}
						className="oneCarOnList__btns__btn"
					>
						<i className="fas fa-edit"></i> Edit
					</button>
					<div className={modalClass}>
						<div className="modal__content">
							<h1 className="modal__content__header">
								Are you sure you want to delete this car?
							</h1>
							<div className="btn__container">
								<button
									onClick={e => handleDelete(e, car)}
									className="oneCarOnList__btns__btn oneCarOnList__btns__btn--yes"
								>
									Yes
								</button>
								<button
									onClick={() => setModalOpen(false)}
									className="oneCarOnList__btns__btn oneCarOnList__btns__btn--no"
								>
									No
								</button>
							</div>
						</div>
					</div>
					<button
						onClick={() => setModalOpen(true)}
						className="oneCarOnList__btns__btn oneCarOnList__btns__btn--delete"
					>
						<i className="fas fa-trash"></i> Delete
					</button>
				</div>
				{admin && !car.adminCheck && (
					<button
						onClick={() =>
							updateData(carsRef, car.id, {
								adminCheck: true,
								isActive: true,
							})
						}
						className="oneCarOnList__btns__btn oneCarOnList__btns__btn--accept"
					>
						<i className="fas fa-thumbs-up"></i> Accept
					</button>
				)}
				{addToEndBtn && !admin && (
					<button
						onClick={() => updateData(carsRef, car.id, { isActive: false })}
						className="oneCarOnList__btns__btn oneCarOnList__btns__btn--end"
					>
						<i className="fas fa-times-circle"></i> End
					</button>
				)}
				{addToActiveBtn && !admin && (
					<button
						onClick={() =>
							updateData(carsRef, car.id, { isActive: true, adminCheck: false })
						}
						className="oneCarOnList__btns__btn oneCarOnList__btns__btn--active"
					>
						<i className="fas fa-check-circle"></i> Activate
					</button>
				)}
			</div>
		</li>
	);
};

export default OneUserCar;
