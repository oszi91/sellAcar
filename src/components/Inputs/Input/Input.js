import React from 'react';
import { useData } from '../../../contexts/DataContext';

const Input = ({
	containerClass,
	disabled,
	labelClass,
	inputClass,
	dispatchType,
	dispatchFieldName,
	labelText,
	type,
	id,
	placeholder,
	state,
	err,
}) => {
	const { dispatch } = useData();

	return (
		<div className={containerClass}>
			<label className={labelClass} htmlFor={id}>
				{labelText}
			</label>
			<input
				value={state}
				onChange={e =>
					dispatch({
						type: dispatchType,
						fieldName: dispatchFieldName,
						payload:
							type === 'tel'
								? parseFloat(e.currentTarget.value, 10) || ''
								: e.currentTarget.value.toUpperCase(),
					})
				}
				className={inputClass}
				name={id}
				id={id}
				type={type}
				placeholder={placeholder}
				disabled={disabled}
			/>
			{err && <p className="addCarForm__inputsContainer__err">{err}</p>}
		</div>
	);
};

Input.defaultProps = { type: 'text', dispatchType: 'FIELD', disabled: false };

export default Input;
