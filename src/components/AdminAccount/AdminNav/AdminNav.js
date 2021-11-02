import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
	return (
		<ul className="navUser">
			<li className="navUser__item">
				<Link className="navUser__item" to="/my-cars/active">
					All Cars list
				</Link>
			</li>
			<li className="navUser__item">
				<Link className="navUser__item" to="/my-cars/pending">
					Pending Cars
				</Link>
			</li>
			<li className="navUser__item">
				<Link className="navUser__item" to="/all-users-list">
					All Users list
				</Link>
			</li>
			<li
				className="navUser__item"
				onMouseEnter={() => setIsMenuOpen(true)}
				onMouseLeave={() => setIsMenuOpen(false)}
				onClick={() => setIsMenuOpen(false)}
			>
				<Link
					onClick={reset}
					className="navUser__submenu__item__link"
					to="/my-cars/active"
				>
					{currentUser.email}
				</Link>
				<ul className={isMenuOpenClass}>
					<li className="navUser__submenu__item">
						<Link
							className="navUser__submenu__item__link"
							to="/my-personal-data"
						>
							Admin account
						</Link>
					</li>
					<li className="navUser__submenu__item" onClick={handleLogout}>
						Log Out
					</li>
				</ul>
			</li>
		</ul>
	);
};

export default AdminNav;
