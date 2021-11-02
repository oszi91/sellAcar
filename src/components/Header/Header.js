import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

import AdminNav from './subcomponents/Nav/AdminNav';
import Logo from './subcomponents/Logo/Logo';
import LoggedUserNav from './subcomponents/Nav/LoggedUserNav';
import UnloggedUserNav from './subcomponents/Nav/UnloggedUserNav';

const Header = () => {
	const { currentUser, logOut } = useAuth();
	const {
		state: {
			user: { admin, favourites },
			blacklist,
		},
		dispatch,
	} = useData();

	const [err, setErr] = useState('');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const history = useHistory();

	const mobileMenuHandle = () => {
		setIsMobileMenuOpen(prevState => !prevState);
	};

	const handleLogout = async () => {
		setErr('');

		try {
			await logOut();
			history.push('/');
		} catch (err) {
			setErr(err.message);
		}
	};

	const isOnBlacklist =
		currentUser && blacklist.findIndex(i => i.id === currentUser.uid);

	const reset = () => dispatch({ type: 'RESETFORM' });

	const isMenuOpenClass = isMenuOpen
		? 'navUser__submenu isSubmenuActive'
		: 'navUser__submenu';

	return (
		<>
			<div className="header-black"></div>
			<header className="header">
				<div className="container">
					<div className="headerContainer">
						<nav className="nav" >
							<Logo setIsMobileMenuOpen={setIsMobileMenuOpen} />
							{currentUser && !admin && (
								<LoggedUserNav
									openMenu={() => setIsMenuOpen(true)}
									closeMenu={() => setIsMenuOpen(false)}
									currentUserEmail={currentUser.email}
									isMenuOpenClass={isMenuOpenClass}
									reset={reset}
									handleLogout={handleLogout}
									isOnBlacklist={isOnBlacklist}
									favourites={favourites.length}
									isMobileMenuOpen={isMobileMenuOpen}
									setIsMobileMenuOpen={setIsMobileMenuOpen}
									err={err}
								/>
							)}
							{!currentUser && <UnloggedUserNav />}
							{currentUser && admin && (
								<AdminNav
									openMenu={() => setIsMenuOpen(true)}
									closeMenu={() => setIsMenuOpen(false)}
									currentUserEmail={currentUser.email}
									isMenuOpenClass={isMenuOpenClass}
									handleLogout={handleLogout}
									reset={reset}
									isMobileMenuOpen={isMobileMenuOpen}
									setIsMobileMenuOpen={setIsMobileMenuOpen}
									err={err}
								/>
							)}
						</nav>
						{currentUser && (
							<ul className="mobileMenuContainer">
								<li
									onClick={mobileMenuHandle}
									className="mobileMenuContainer__item"
								>
									{isMobileMenuOpen ? (
										<i className="fab fa-xing"></i>
									) : (
										<i className="fas fa-bars"></i>
									)}
								</li>
								{(!admin || !isOnBlacklist) && (
									<li className="mobileMenuContainer__item">
										<NavLink to="/add-car" onClick={reset}>
											<i className="fas fa-plus-circle"></i>
										</NavLink>
									</li>
								)}
							</ul>
						)}
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
