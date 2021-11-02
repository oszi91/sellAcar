import React from 'react';

import { useData } from '../../../contexts/DataContext';

const InputSelect = ({
	containerClass,
	labelClass,
	inputClass,
	dispatchType,
	dispatchFieldName,
	labelText,
	id,
	state,
	options,
	blankOption,
	type,
	searchOptions,
}) => {
	const { dispatch } = useData();

	const extraOptions =
		id === 'sortBy' ? (
			''
		) : (
			<>
				<option value="" disabled defaultValue>
					{blankOption}
				</option>
				{searchOptions && <option value="all">All</option>}
			</>
		);

	return (
		<div className={containerClass}>
			<label className={labelClass} htmlFor={id}>
				{labelText}
			</label>
			<select
				value={state}
				onChange={e =>
					dispatch({
						type: dispatchType,
						fieldName: dispatchFieldName,
						payload:
							type === 'number'
								? Number(e.currentTarget.value)
								: e.currentTarget.value,
					})
				}
				className={inputClass}
				name={id}
				id={id}
			>
				{extraOptions}
				{options.map(el => (
					<option key={el.value} value={el.value}>
						{el.txt}
					</option>
				))}
			</select>
		</div>
	);
};

export default InputSelect;
