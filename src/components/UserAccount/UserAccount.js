import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const UserAccount = () => {
	const {
		state: {
			user: { admin },
		},
	} = useData();
	const { currentUser } = useAuth();
	const { pathname } = useLocation();

	return (
		<>
			<section className="userAccount">
				<div className="userMenu">
					<h1 className="userMenu__header">
						{admin ? 'Admin ' : 'User '} Panel
					</h1>
					<ul className="userMenu__list">
						<li className="userMenu__list__item">
							<NavLink
								to="/my-cars/active"
								className="userMenu__list__item__link"
								activeClassName="userMenu__list__item__link--active"
								isActive={() =>
									[
										'/my-cars/active',
										'/my-cars/pending',
										'/my-cars/ended',
									].includes(pathname)
								}
							>
								{currentUser && admin ? 'Car List' : 'My Cars'}
							</NavLink>
						</li>
						<li className="userMenu__list__item">
							<NavLink
								to="/my-personal-data"
								className="userMenu__list__item__link"
								activeClassName="userMenu__list__item__link--active"
							>
								My Account
							</NavLink>
						</li>
						{currentUser && !admin && (
							<li className="userMenu__list__item">
								<NavLink
									to="/my-favourites"
									className="userMenu__list__item__link"
									activeClassName="userMenu__list__item__link--active"
								>
									My Favourites
								</NavLink>
							</li>
						)}
						{admin && (
							<li className="userMenu__list__item">
								<NavLink
									to="/all-users-list"
									className="userMenu__list__item__link"
									activeClassName="userMenu__list__item__link--active"
								>
									User List
								</NavLink>
							</li>
						)}
					</ul>
				</div>
			</section>
		</>
	);
};

export default UserAccount;
