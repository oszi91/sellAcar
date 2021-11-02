import React from 'react';

import { useData } from '../../../contexts/DataContext';

const Textarea = ({
	containerClass,
	labelClass,
	inputClass,
	dispatchType,
	dispatchFieldName,
	labelText,
	id,
	state,
	rows,
	err,
}) => {
	const { dispatch } = useData();

	return (
		<div className={containerClass}>
			<label className={labelClass} htmlFor={id}>
				{labelText}
			</label>
			<textarea
				rows={rows}
				value={state}
				onChange={e =>
					dispatch({
						type: dispatchType,
						fieldName: dispatchFieldName,
						payload: e.currentTarget.value,
					})
				}
				className={inputClass}
				id={id}
			/>
			{err && <p className="addCarForm__inputsContainer__err">{err}</p>}
		</div>
	);
};

export default Textarea;
