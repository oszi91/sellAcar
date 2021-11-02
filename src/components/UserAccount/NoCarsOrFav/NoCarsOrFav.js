import React from 'react';
import { Link } from 'react-router-dom';

const NoCarsOrFav = ({ fav }) => (
	<div className="container">
		<div className="noFavourites">
			{fav ? (
				<>
					<h1 className="noFavourites__header">No Favourites</h1>
					<h2 className="noFavourites__txt">
						If you want add favourite car, just click{' '}
						<i className="far fa-star"></i> on car list.
					</h2>
				</>
			) : (
				<>
					<h1 className="noFavourites__header">No Cars</h1>
					<h2 className="noFavourites__txt">
						If you want add a car, just click{' '}
						<Link to="/add-car">
							here <i className="fas fa-plus-circle"></i>
						</Link>
						.
					</h2>
				</>
			)}
			<img
				className="noFavourites__img"
				src="https://firebasestorage.googleapis.com/v0/b/auth-sellacar-dev.appspot.com/o/noFavourites.png?alt=media&token=93572a0d-2bcb-4782-a58c-e2f303c5b1d9"
			/>
		</div>
	</div>
);

export default NoCarsOrFav;
