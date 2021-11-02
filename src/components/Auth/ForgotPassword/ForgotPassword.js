import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';

import AuthInput from '../../Inputs/AuthInput/AuthInput';

const ForgotPassword = () => {
	const emailRef = useRef();

	const { resetPassword } = useAuth();

	const [message, setMessage] = useState('');
	const [err, setErr] = useState('');
	const [isDisable, setIsDisable] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			setMessage('');
			setErr('');
			setIsDisable(true);
			await resetPassword(emailRef.current.value);
			setMessage('Check your inbox');
		} catch (error) {
			setErr(error.message);
			setIsDisable(false);
		}
	};

	return (
		<section className="auth">
			<form className="authForm" onSubmit={handleSubmit}>
				<h1 className="authForm__header">Reset Password</h1>
				{message && <h3 className="authForm__msg">{message}</h3>}
				{err && <h2 className="authForm__msg authForm__msg--err">{err}</h2>}
				<AuthInput label="E-mail" type="email" propRef={emailRef} />
				<button className="authForm__btn" disabled={isDisable}>
					Reset Password
				</button>
				<Link to="/login" className="authForm__addText">
					Go back to Log In
				</Link>
			</form>
			<p className="auth__txt">
				Don't have an account?{' '}
				<Link to="/sign-up" className="authForm__addText">
					Sign Up
				</Link>
			</p>
		</section>
	);
};

export default ForgotPassword;
