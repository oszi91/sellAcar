import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { usersRef } from '../../../firebase';

import { useAuth } from '../../../contexts/AuthContext';

import AuthInput from '../../Inputs/AuthInput/AuthInput';

const SingUp = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const nickRef = useRef();
	const { signUp } = useAuth();

	const [err, setErr] = useState('');
	const [isDisable, setIsDisable] = useState(false);

	const history = useHistory();

	const handleSubmit = async e => {
		e.preventDefault();

		const isNicknameExist = await usersRef
			.where('nick', '==', nickRef.current.value)
			.get();

		if (!isNicknameExist.empty) {
			return setErr('This username is already taken!');
		}

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setErr(`Passwords don't match`);
		}

		try {
			setErr('');
			setIsDisable(true);
			await signUp(
				emailRef.current.value,
				passwordRef.current.value,
				nickRef.current.value
			);
			history.push('/my-personal-data');
		} catch (err) {
			setErr(err.message);
			setIsDisable(false);
		}
	};

	return (
		<section className="auth">
			<form className="authForm" onSubmit={handleSubmit}>
				<h1 className="authForm__header">Sign Up</h1>
				{err && <h2 className="authForm__msg authForm__msg--err">{err}</h2>}
				<AuthInput label="Nick" type="text" propRef={nickRef} />
				<AuthInput label="E-mail" type="email" propRef={emailRef} />
				<AuthInput label="Password" type="password" propRef={passwordRef} />
				<AuthInput
					label="Password Confirmation"
					type="password"
					propRef={passwordConfirmRef}
				/>
				<button className="authForm__btn" disabled={isDisable}>
					Sign Up
				</button>
			</form>
			<p className="auth__txt">
				Already have an account?
				<Link to="/login" className="authForm__addText">
					Log in
				</Link>
			</p>
		</section>
	);
};

export default SingUp;
