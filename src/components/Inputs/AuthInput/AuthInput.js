import React from 'react';

const AuthInput = ({ label, type, propRef }) => (
    <div className="authForm__inputsContainer">
        <label className="authForm__inputsContainer__label">{label}</label>
        <input className="authForm__inputsContainer__input" type={type} ref={propRef} />
    </div>
);

export default AuthInput;