import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';

const AdminRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useAuth();
	const {
		state: {
			user: { admin },
		},
	} = useData();

	return (
		<Route
			{...rest}
			render={props =>
				currentUser && admin ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

export default AdminRoute;
