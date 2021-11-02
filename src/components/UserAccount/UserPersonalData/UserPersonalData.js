import React, { useState } from 'react';

import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';
import { useUserData } from '../../../contexts/UserContext';

import Input from '../../Inputs/Input/Input';
import { settingsForUserAccount } from '../../Inputs/CONFIG/CONFIG';
import UserAccount from '../UserAccount';

const UserPersonalData = () => {
	const {
		state: {
			user: {
				name,
				surname,
				phoneNumber,
				street,
				streetNumber,
				postCode,
				city,
				nick,
			},
		},
	} = useData();
	const {
		currentUser: {
			email,
			metadata: { creationTime },
		},
	} = useAuth();
	const { userInfoUpdate } = useUserData();

	const [isDisabled, setIsDisabled] = useState(true);
	const handleDisabledBtn = () => setIsDisabled(prevState => !prevState);
	const btnEditOrConfirm = isDisabled
		? {
				mode: 'Edit',
				className: 'addCarForm__confirm__btn',
				icon: 'fas fa-edit',
		  }
		: {
				mode: 'Confirm',
				className: 'addCarForm__confirm__btn addCarForm__confirm__btn--confirm',
				icon: 'fas fa-check-square',
		  };

	return (
		<>
			<UserAccount />
			<div className="addNewCar addNewCar--user">
				<form className="addCarForm addCarForm--user" onSubmit={userInfoUpdate}>
					<div className="addCarForm__section addCarForm__section--user">
						<h1 className="addCarForm__section__header addCarForm__section__header--user">
							My Personal Data
						</h1>
						<ul className="userFixedData">
							<li className="userFixedData__item">
								<span className="userFixedData__item__label">Nick:</span>
								<span className="userFixedData__item__data">{nick}</span>
							</li>
							<li className="userFixedData__item">
								<span className="userFixedData__item__label">E-mail:</span>
								<span className="userFixedData__item__data">{email}</span>
							</li>
							<li className="userFixedData__item">
								<span className="userFixedData__item__label">Since:</span>
								<span className="userFixedData__item__data">
									{creationTime}
								</span>
							</li>
						</ul>
						<div className="btnUserContainer">
							<button
								onClick={handleDisabledBtn}
								className={btnEditOrConfirm.className}
							>
								<i className={btnEditOrConfirm.icon}></i>
								{btnEditOrConfirm.mode}
							</button>
						</div>
						<div className="addCarForm__container__2inputs">
							<Input
								{...settingsForUserAccount}
								dispatchFieldName="name"
								labelText="Name"
								id="name"
								state={name}
								disabled={isDisabled}
							/>
							<Input
								{...settingsForUserAccount}
								dispatchFieldName="surname"
								labelText="Surname"
								id="surname"
								state={surname}
								disabled={isDisabled}
							/>
						</div>
						<div className="addCarForm__container__2inputs">
							<Input
								{...settingsForUserAccount}
								dispatchFieldName="street"
								labelText="Street"
								id="street"
								state={street}
								disabled={isDisabled}
							/>
							<Input
								{...settingsForUserAccount}
								dispatchFieldName="streetNumber"
								labelText="Number"
								id="streetNumber"
								state={streetNumber}
								disabled={isDisabled}
								type="tel"
							/>
						</div>
						<div className="addCarForm__container__2inputs">
							<Input
								{...settingsForUserAccount}
								dispatchFieldName="postCode"
								labelText="post Code"
								id="postCode"
								state={postCode}
								disabled={isDisabled}
							/>
							<Input
								{...settingsForUserAccount}
								dispatchFieldName="city"
								labelText="City"
								id="city"
								state={city}
								disabled={isDisabled}
							/>
						</div>
						<div className="addCarForm__container__2inputs">
							<Input
								{...settingsForUserAccount}
								dispatchFieldName="phoneNumber"
								labelText="phone number"
								id="phoneNumber"
								state={phoneNumber}
								disabled={isDisabled}
								type="tel"
							/>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default UserPersonalData;
