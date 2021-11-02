import React from 'react';

import { useData } from '../../../contexts/DataContext';

import OneUser from './OneUser/OneUser';
import UserAccount from '../../UserAccount/UserAccount';

const AllUsersList = () => {
	const {
		state: { allUsers },
	} = useData();

	return (
		<>
			<UserAccount />
			<div className="container">
				<div className="allUsersContainer">
					<ul className="allUsersList">
						<li className="allUsersList__item allUsersList__item--label">
							<div className="allUsersList__item__user">User</div>
							<div
								className="allUsersList__item__blacklist"
							>
								On Blacklist
							</div>
							<div
								className="allUsersList__item__blacklist"
							>
								Add / Delete
							</div>
						</li>
						{allUsers.map(user => (
							<OneUser key={user.id} user={user} />
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default AllUsersList;
