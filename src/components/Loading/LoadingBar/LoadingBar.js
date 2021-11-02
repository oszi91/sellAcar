import React from 'react';

const LoadingBar = ({ uploadProgress }) => {
	return uploadProgress && uploadProgress < 100 ? (
		<div className="progressBarContainer">
			<div className="progressBar">
				<span
					className="progressBar--fill"
					style={{ width: `${uploadProgress}%` }}
				></span>
			</div>
		</div>
	) : (
		''
	);
};

export default LoadingBar;
