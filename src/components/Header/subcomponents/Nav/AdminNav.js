import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const AdminNav = ({
	openMenu,
	closeMenu,
	isMenuOpenClass,
	handleLogout,
	reset,
	isMobileMenuOpen,
	setIsMobileMenuOpen,
}) => {
	const mobileMenuClass = isMobileMenuOpen ? 'navUser--isOpen' : '';
	const { pathname } = useLocation();

	return (
		<ul className={`navUser ${mobileMenuClass}`}>
			<li
				className="navUser__item navUser__item--admin"
				onMouseEnter={openMenu}
				onMouseLeave={closeMenu}
				onClick={() => {
					closeMenu();
					setIsMobileMenuOpen(false);
				}}
			>
				<NavLink
					onClick={reset}
					className="navUser__submenu__item__link"
					activeClassName="navUser__item__link--active"
					to="/my-cars/active"
					isActive={() =>
						['/my-cars/active', '/my-cars/pending', '/my-cars/ended'].includes(
							pathname
						)
					}
				>
					Admin Zone
					<i className="fas fa-user-alt"></i>
				</NavLink>
				<ul className={isMenuOpenClass}>
					<li className="navUser__submenu__item">
						<Link
							className="navUser__submenu__item__link"
							to="/my-personal-data"
						>
							Admin account
						</Link>
					</li>
					<li className="navUser__submenu__item">
						<Link className="navUser__submenu__item__link" to="/my-cars/active">
							Car List
						</Link>
					</li>
					<li className="navUser__submenu__item">
						<Link
							className="navUser__submenu__item__link"
							to="/my-cars/pending"
						>
							Car To Accept
						</Link>
					</li>
					<li className="navUser__submenu__item">
						<Link className="navUser__submenu__item__link" to="/all-users-list">
							User List
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
