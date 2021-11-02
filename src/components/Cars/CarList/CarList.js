import React from 'react';

import OneCarOnList from './subcomponents/OneCarOnList/OneCarOnList';

const CarList = ({ filteredData, carListRef }) => {
	return (
		<main className="carListContainer">
			<div className="container">
				<ul ref={carListRef} className="carList">
					{filteredData.map(car => {
						return <OneCarOnList key={car.id} {...car} />;
					})}
				</ul>
			</div>
		</main>
	);
};

export default CarList;
