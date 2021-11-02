import React from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';

const LoggedUserNav = ({
	openMenu,
	closeMenu,
	isMenuOpenClass,
	reset,
	handleLogout,
	isOnBlacklist,
	favourites,
	setIsMobileMenuOpen,
	isMobileMenuOpen,
}) => {
	const { pathname } = useLocation();

	const favNum = favourites ? `(${favourites})` : '';

	const mobileMenuClass = isMobileMenuOpen ? 'navUser--isOpen' : '';

	return (
		<ul className={`navUser ${mobileMenuClass}`}>
			<li className="navUser__item">
				<NavLink
					activeClassName="navUser__item__link--active"
					className="navUser__item__link"
					to="/my-favourites"
				>
					Favourites {favNum} <i className="fas fa-star"></i>
				</NavLink>
			</li>
			<li
				className="navUser__item"
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
					to="/my-cars/active"
					isActive={() =>
						[
							'/my-cars/active',
							'/my-cars/pending',
							'/my-cars/ended',
							'/my-personal-data',
						].includes(pathname)
					}
					activeClassName="navUser__item__link--active"
				>
					My Zone
					<i className="fas fa-user-alt"></i>
				</NavLink>
				<ul className={isMenuOpenClass}>
					<li className="navUser__submenu__item">
						{isOnBlacklist ? (
							<Link
								onClick={reset}
								className="navUser__submenu__item__link"
								to="/add-car"
							>
								Add New Car
							</Link>
						) : (
							<Link className="navUser__submenu__item__link" to="/">
								Your account is blocked
							</Link>
						)}
					</li>
					<li className="navUser__submenu__item">
						<Link
							onClick={reset}
							className="navUser__submenu__item__link"
							to="/my-cars/active"
						>
							My Cars
						</Link>
					</li>
					<li className="navUser__submenu__item">
						<Link
							className="navUser__submenu__item__link"
							to="/my-personal-data"
						>
							My Account
						</Link>
					</li>
					<li className="navUser__submenu__item">
						<Link className="navUser__submenu__item__link" to="/my-favourites">
							My Favourites
						</Link>
					</li>
					<li className="navUser__submenu__item" onClick={handleLogout}>
						Log Out
					</li>
				</ul>
			</li>
			<li className="navUser__item">
				{isOnBlacklist ? (
					<NavLink
						className="navUser__item__link"
						activeClassName="navUser__item__link--active"
						to="/add-car"
						onClick={reset}
					>
						Add New Car
						<i className="fas fa-plus-circle"></i>
					</NavLink>
				) : (
					<Link className="navUser__item__link" to="/">
						Your account is blocked
					</Link>
				)}
			</li>
		</ul>
	);
};

export default LoggedUserNav;
