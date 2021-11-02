import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';

import AuthInput from '../../Inputs/AuthInput/AuthInput';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const { logIn } = useAuth();

	const [err, setErr] = useState('');
	const [isDisable, setIsDisable] = useState(false);

	const history = useHistory();

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			setErr('');
			setIsDisable(true);
			await logIn(emailRef.current.value, passwordRef.current.value);
			history.push('/my-cars/active');
		} catch (error) {
			setErr(error.message);
			setIsDisable(false);
		}
	};

	return (
		<section className="auth">
			<form className="authForm" onSubmit={handleSubmit}>
				<h1 className="authForm__header">Log In</h1>
				{err && <h2 className="authForm__msg authForm__msg--err">{err}</h2>}
				<AuthInput label="E-mail" type="email" propRef={emailRef} />
				<AuthInput label="Password" type="password" propRef={passwordRef} />
				<button className="authForm__btn" disabled={isDisable}>
					Log In
				</button>
				<Link to="/reset-password" className="authForm__addText">
					Forgot Password?
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

export default Login;
