import React from 'react';

import { useData } from '../../../../contexts/DataContext';

import {
	brandOptions,
	fuelOptions,
	sortOptions,
	yearOptions,
} from '../../../Inputs/OptionsToInput/OptionsToInput';
import Input from '../../../Inputs/Input/Input';
import InputSelect from '../../../Inputs/InputSelect/InputSelect';
import { settingsForSearch } from '../../../Inputs/CONFIG/CONFIG';

const Search = ({ results, scrollToResults }) => {
	const {
		state: {
			filters: {
				sortBy,
				brand,
				model,
				priceFrom,
				priceTo,
				yearFrom,
				yearTo,
				kilometersFrom,
				kilometersTo,
				fuelType,
			},
		},
	} = useData();

	const scrolll = e => {
		e.preventDefault();
		scrollToResults();
	};

	return (
		<>
			<section className="searchSection">
				<div className="container">
					<div className="search">
						<form className="search__form">
							<h1 className="search__form__header">Find your car</h1>
							<InputSelect
								{...settingsForSearch}
								dispatchFieldName="brand"
								labelText="Vehicle Brand"
								id="brand"
								state={brand}
								options={brandOptions}
								blankOption="brand"
							/>
							<Input
								{...settingsForSearch}
								dispatchFieldName="model"
								labelText="Vehicle Model"
								id="model"
								placeholder="model"
								state={model}
							/>
							<div className="search__form__inputsContainer">
								<div className="search__form__inputsContainer__inputs">
									<InputSelect
										{...settingsForSearch}
										inputClass="search__form__inputsContainer__select search__form__inputsContainer__select--small"
										dispatchFieldName="yearFrom"
										labelText="Year"
										id="yearFrom"
										state={yearFrom}
										options={yearOptions}
										blankOption="from"
									/>
									<InputSelect
										{...settingsForSearch}
										inputClass="search__form__inputsContainer__select search__form__inputsContainer__select--small"
										dispatchFieldName="yearTo"
										labelText="&nbsp;"
										id="yearTo"
										state={yearTo}
										options={yearOptions}
										blankOption="to"
									/>
								</div>
							</div>
							<div className="search__form__inputsContainer">
								<div className="search__form__inputsContainer__inputs">
									<Input
										{...settingsForSearch}
										dispatchFieldName="priceFrom"
										labelText="Price"
										id="priceFrom"
										placeholder="from"
										state={priceFrom}
									/>
									<Input
										{...settingsForSearch}
										dispatchFieldName="priceTo"
										labelText="&nbsp;"
										id="priceTo"
										placeholder="to"
										state={priceTo}
									/>
								</div>
							</div>
							<div className="search__form__inputsContainer">
								<div className="search__form__inputsContainer__inputs">
									<Input
										{...settingsForSearch}
										dispatchFieldName="kilometersFrom"
										labelText="Kilometers"
										id="kilometersFrom"
										placeholder="from"
										state={kilometersFrom}
									/>
									<Input
										{...settingsForSearch}
										dispatchFieldName="kilometersTo"
										labelText="&nbsp;"
										id="kilometersTo"
										placeholder="to"
										state={kilometersTo}
									/>
								</div>
							</div>
							<InputSelect
								{...settingsForSearch}
								dispatchFieldName="fuelType"
								labelText="Fuel Type"
								id="fuelType"
								state={fuelType}
								options={fuelOptions}
								blankOption="fuel"
							/>
							<button onClick={scrolll} className="search__form__btn">
								Show results ({results})
							</button>
						</form>
					</div>
				</div>
				<div className="carListContainer__header">
					<InputSelect
						{...settingsForSearch}
						containerClass="search__form__inputsContainer search__form__inputsContainer--sort"
						labelClass="search__form__inputsContainer__label search__form__inputsContainer__label--sort"
						inputClass="search__form__inputsContainer__select search__form__inputsContainer__select--sort"
						dispatchFieldName="sortBy"
						labelText="Sort by"
						id="sortBy"
						state={sortBy}
						options={sortOptions}
					/>
				</div>
			</section>
		</>
	);
};

export default Search;
