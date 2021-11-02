import React from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useCRUD } from '../../contexts/CRUDContext';
import { useData } from '../../contexts/DataContext';

import {
	fuelOptions,
	brandOptions,
	yearOptions,
} from '../Inputs/OptionsToInput/OptionsToInput';
import ImagesCarForm from '../CarForm/subcomponents/ImagesCarForm/ImagesCarForm';
import InputSelect from '../Inputs/InputSelect/InputSelect';
import Input from '../Inputs/Input/Input';
import {
	settingsForCarForm,
	settingsForUsersFormInCar,
} from '../Inputs/CONFIG/CONFIG';
import { obligatoryFieldsValid } from './subcomponents/FormValidation/FormValidation';
import Textarea from '../Inputs/Textarea/Textarea';

const CarForm = () => {
	const {
		dispatch,
		state,
		state: {
			blacklist,
			editMode,
			car,
			car: {
				brand,
				model,
				year,
				price,
				kilometers,
				engine,
				capacity,
				power,
				vin,
				fuel,
				description,
			},
			errors: { errorsFrontend, error },
			userDataInCar: {
				name,
				surname,
				phoneNumber,
				email,
				street,
				streetNumber,
				postCode,
				city,
			},
		},
	} = useData();
	const { handleAdd, handleEditConfirm } = useCRUD();
	const { couldAddCar, amountValidFields } = obligatoryFieldsValid(car);
	const { currentUser } = useAuth();

	const reset = () => dispatch({ type: 'RESETFORM' });

	const isOnBlacklist =
		currentUser && blacklist.findIndex(i => i.id === currentUser.uid);

	return (
		<>
			{!isOnBlacklist && !editMode ? (
				<div className="blockAccount">Your account has been blocked.</div>
			) : (
				<section className="myAccount">
					<div className="addNewCar">
						<form
							className="addCarForm"
							onSubmit={editMode ? () => {} : handleAdd}
						>
							{error && <h1>{error}</h1>}
							<div className="addCarForm__section">
								<h1 className="addCarForm__section__header">*Required info</h1>
								<div className="addCarForm__container__2inputs">
									<InputSelect
										{...settingsForCarForm}
										dispatchFieldName="brand"
										labelText="Brand"
										id="brand"
										state={brand}
										options={brandOptions}
									/>
									<Input
										{...settingsForCarForm}
										dispatchFieldName="model"
										labelText="Model"
										id="model"
										state={model}
										err={errorsFrontend.model}
									/>
								</div>
								<div className="addCarForm__container__2inputs">
									<InputSelect
										{...settingsForCarForm}
										dispatchFieldName="year"
										labelText="Year"
										id="year"
										state={year}
										options={yearOptions}
										type="number"
									/>
									<Input
										{...settingsForCarForm}
										dispatchFieldName="price"
										labelText="Price"
										id="price"
										state={price}
										type="tel"
										err={errorsFrontend.price}
									/>
								</div>
								<div className="addCarForm__container__2inputs">
									<Input
										{...settingsForCarForm}
										dispatchFieldName="kilometers"
										labelText="Kilometers"
										id="kilometers"
										state={kilometers}
										type="tel"
										err={errorsFrontend.kilometers}
									/>
									<InputSelect
										{...settingsForCarForm}
										dispatchFieldName="fuel"
										labelText="Fuel"
										id="fuel"
										state={fuel}
										options={fuelOptions}
										err={errorsFrontend.fuel}
									/>
								</div>
								<div className="addCarForm__container__2inputs">
									<Input
										{...settingsForCarForm}
										dispatchFieldName="vin"
										labelText="VIN"
										id="vin"
										state={vin}
									/>
								</div>
							</div>
							<div className="addCarForm__section">
								<h1 className="addCarForm__section__header">Additional info</h1>
								<div className="addCarForm__container__2inputs">
									<Input
										{...settingsForCarForm}
										dispatchFieldName="engine"
										labelText="Engine"
										id="engine"
										state={engine}
									/>
									<Input
										{...settingsForCarForm}
										dispatchFieldName="capacity"
										labelText="Capacity"
										id="capacity"
										state={capacity}
										type="tel"
									/>
									<Input
										{...settingsForCarForm}
										dispatchFieldName="power"
										labelText="Power"
										id="power"
										state={power}
										type="tel"
									/>
								</div>
								<Textarea
									{...settingsForCarForm}
									containerClass="addCarForm__inputsContainer addCarForm__inputsContainer--textarea"
									inputClass="addCarForm__inputsContainer__input addCarForm__inputsContainer__input--textarea"
									labelText="Description"
									rows="4"
									dispatchFieldName="description"
									id="description"
									state={description}
								/>
							</div>
							<div className="addCarForm__section addCarForm__section--images">
								<h1 className="addCarForm__section__header">Upload photos</h1>
								{couldAddCar ? (
									<ImagesCarForm editMode={editMode} />
								) : (
									<p className="addCarForm__section__uploadTxt">
										To upload photos please fill in the above requireds fields
									</p>
								)}
							</div>
							<div className="addCarForm__section">
								<h1 className="addCarForm__section__header">Contact</h1>
								<div className="addCarForm__container__2inputs">
									<Input
										{...settingsForUsersFormInCar}
										dispatchFieldName="name"
										labelText="Name"
										id="name"
										state={name}
									/>
									<Input
										{...settingsForUsersFormInCar}
										dispatchFieldName="surname"
										labelText="Surname"
										id="surname"
										state={surname}
									/>
								</div>
								<div className="addCarForm__container__2inputs">
									<Input
										{...settingsForUsersFormInCar}
										dispatchFieldName="street"
										labelText="Street"
										id="street"
										state={street}
									/>
									<Input
										{...settingsForUsersFormInCar}
										dispatchFieldName="streetNumber"
										labelText="Number"
										id="streetNumber"
										state={streetNumber}
										type="tel"
									/>
								</div>
								<div className="addCarForm__container__2inputs">
									<Input
										{...settingsForUsersFormInCar}
										dispatchFieldName="postCode"
										labelText="post Code"
										id="postCode"
										state={postCode}
									/>
									<Input
										{...settingsForUsersFormInCar}
										dispatchFieldName="city"
										labelText="City"
										id="city"
										state={city}
									/>
								</div>
								<div className="addCarForm__container__2inputs">
									<Input
										{...settingsForUsersFormInCar}
										dispatchFieldName="phoneNumber"
										labelText="phone number"
										id="phoneNumber"
										state={phoneNumber}
										type="tel"
									/>
									<Input
										{...settingsForUsersFormInCar}
										dispatchFieldName="email"
										labelText="email"
										id="email"
										state={email}
									/>
								</div>
							</div>
							<div className="addCarForm__confirm">
								{editMode ? (
									<>
										<button
											className="addCarForm__confirm__btn"
											onClick={e => handleEditConfirm(e, state.car)}
											disabled={!couldAddCar}
											style={{
												background: couldAddCar ? 'black' : 'lightgrey',
												color: couldAddCar ? 'white' : 'grey',
											}}
										>
											{couldAddCar ? '' : amountValidFields}
											Confirm
										</button>
										<button
											onClick={reset}
											className="addCarForm__confirm__btn addCarForm__confirm__btn--cancelBtn"
										>
											Cancel
										</button>
									</>
								) : (
									<button
										className="addCarForm__confirm__btn"
										disabled={!couldAddCar}
										style={{
											background: couldAddCar ? 'black' : 'lightgrey',
											color: couldAddCar ? 'white' : 'grey',
										}}
									>
										{couldAddCar ? '' : amountValidFields}
										Add
									</button>
								)}
							</div>
						</form>
					</div>
				</section>
			)}
		</>
	);
};

export default CarForm;
