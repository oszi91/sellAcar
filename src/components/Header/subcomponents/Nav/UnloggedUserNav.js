import React from 'react';
import { NavLink } from 'react-router-dom';

const UnloggedUserNav = () => (
	<ul className="navUser navUser--unlogged">
		<li className="navUser__item navUser__item--unlogged">
			<NavLink
				className="navUser__item__link navUser__item__link--unlogged"
				activeClassName="navUser__item__link--active"
				to="/login"
			>
				Login
			</NavLink>
		</li>
		<span>|</span>
		<li className="navUser__item navUser__item--unlogged">
			<NavLink
				className="navUser__item__link navUser__item__link--unlogged"
				activeClassName="navUser__item__link--active"
				to="/sign-up"
			>
				Sign Up
			</NavLink>
		</li>
	</ul>
);

export default UnloggedUserNav;
