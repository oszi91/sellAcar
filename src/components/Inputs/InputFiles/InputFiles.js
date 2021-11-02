import React from 'react';

const InputFiles = ({
	containerClass,
	labelClass,
	inputClass,
	labelText,
	type,
	id,
    propRef,
    onChange
}) => {
	return (
		<div className={containerClass}>
				<input
					ref={propRef}
					multiple
					onChange={onChange}
					className={inputClass}
					id={id}
					type={type}
				/>
				<label
					className={labelClass}
					htmlFor={id}
				>
					{labelText}
				</label>
			</div>
	);
};

InputFiles.defaultProps={type: 'file'}

export default InputFiles;
