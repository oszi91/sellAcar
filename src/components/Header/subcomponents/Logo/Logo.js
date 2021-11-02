import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ setIsMobileMenuOpen }) => (
	<div onClick={() => setIsMobileMenuOpen(false)} className="nav__logo">
		<Link className="nav__logo__txt" to="/">
			sell
			<span className="nav__logo__txt--color">A</span>
			car
		</Link>
	</div>
);

export default Logo;
