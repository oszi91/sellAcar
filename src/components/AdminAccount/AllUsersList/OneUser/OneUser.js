import React from 'react';

import { useData } from '../../../../contexts/DataContext';
import { useUserData } from '../../../../contexts/UserContext';

const OneUser = ({ user }) => {
	const { addUserToBlackList, deleteUserFromBlackList } = useUserData();
	const {
		state: { blacklist },
	} = useData();

	const isTrue = blacklist.find(i => i.id === user.id);

	return (
		<>
			<li className="allUsersList__item">
				<div className="allUsersList__item__user">{user.nick}</div>
				{!isTrue ? (
					<button className="allUsersList__item__blacklist">
						No <i className="far fa-smile"></i>
					</button>
				) : (
					<button className="allUsersList__item__blacklist">
						Yes <i className="fas fa-check-circle"></i>
					</button>
				)}
				{!isTrue ? (
					<button
						className="allUsersList__item__blacklist"
						onClick={() => addUserToBlackList(user)}
					>
						Add <i className="fas fa-plus-circle"></i>
					</button>
				) : (
					<button
						className="allUsersList__item__blacklist"
						onClick={() => deleteUserFromBlackList(user)}
					>
						Delete <i className="fas fa-trash"></i>
					</button>
				)}
			</li>
		</>
	);
};

export default OneUser;
