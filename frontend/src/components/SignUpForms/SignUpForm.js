import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import './SignUpForms.css';
import { validateEmail, validatePassword } from './utils';

const SignUpForm = ({ signup, error, selectedRole, signUpStatus }) => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [accessCodeError, setAccessCodeError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [repasswordError, setRePasswordError] = useState(false);
    const [errors, setErrors] = useState(false);
    const [displayPasswordInfo, setDisplayPasswordInfo] = useState(false);

    const history = useHistory();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        access_code: '',
        password: '',
        re_password: '',
        role: selectedRole,
    });

    const { first_name, last_name, email, access_code, password, re_password, role, } = formData;

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setShowError(false);
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(false);

        if (!first_name) {
            setFirstNameError(true);
            setErrors(true);
        }

        if (!last_name) {
            setLastNameError(true);
            setErrors(true);
        }

        if (!email) {
            setEmailError(true);
            setErrors(true);
        } else {
            const isValidated = validateEmail(email);
            if (!isValidated) {
                setEmailError(true);
                setErrors(true);
            }
        }

        if (!access_code) {
            setAccessCodeError(true);
            setErrors(true);
        }

        if (!password) {
            setPasswordError(true);
            setErrors(true);
        } else {
            const isValidated = validatePassword(password);
            if (!isValidated) {
                setPasswordError(true);
                setErrors(true);
            }
        }

        if (!re_password) {
            setRePasswordError(true);
            setErrors(true);
        } else {
            const isValidated = validatePassword(re_password);
            if (!isValidated) {
                setRePasswordError(true);
                setErrors(true);
            }
        }

        if (password !== re_password) {
            setShowError(true);
            setErrorMessage("Please make sure the passwords match");
            setPasswordError(true);
            setRePasswordError(true);
            setErrors(true);
        }


        if (!errors) {
            signup(first_name, last_name, email, access_code, password, re_password, selectedRole);
        }

    };

    useEffect(() => {
        if (signUpStatus === "success") {
            history.push("/");
        }
    }, [signUpStatus]);


    return (
        <div>
            {error === "signup_fail" ? <div className="error-message">Oops, something went wrong. Please try again</div> : showError && errorMessage ? <div className="error-message">{errorMessage}</div> : null}
            <div className="signup-form">
                <input
                    className={firstNameError ? "notValidated" : null}
                    type='text'
                    placeholder='First Name*'
                    name='first_name'
                    value={first_name}
                    onChange={e => { setFirstNameError(false); handleChange(e) }}
                />
                <input
                    className={lastNameError ? "notValidated" : null}
                    type='text'
                    placeholder='Last Name*'
                    name='last_name'
                    value={last_name}
                    onChange={e => { setLastNameError(false); handleChange(e) }}
                />
                <input
                    className={emailError ? "notValidated" : null}
                    type='email'
                    placeholder='Email*'
                    name='email'
                    value={email}
                    onChange={e => { setEmailError(false); handleChange(e) }}
                />
                <input
                    className={accessCodeError ? "notValidated" : null}
                    type='text'
                    placeholder='Access Code*'
                    name='access_code'
                    value={access_code}
                    onChange={e => { setAccessCodeError(false); handleChange(e) }}
                />
                <input
                    className={passwordError ? "notValidated" : null}
                    type='password'
                    placeholder='Password*'
                    name='password'
                    value={password}
                    onChange={e => { setPasswordError(false); handleChange(e); setDisplayPasswordInfo(true) }}
                    onBlur={() => setDisplayPasswordInfo(false)}
                    minLength='8'
                />
                {displayPasswordInfo ? <div>Your password needs to include the following: <br></br><ul><li>Min 8 characters</li><li>A mix of numbers and letters</li></ul></div> : null}
                <input
                    className={repasswordError ? "notValidated" : null}
                    type='password'
                    placeholder='Confirm Password*'
                    name='re_password'
                    value={re_password}
                    onChange={e => { setRePasswordError(false); handleChange(e) }}
                    minLength='8'
                    required
                />
                <button onClick={e => handleSubmit(e)}>Sign Up</button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    error: state.auth.error,
    selectedRole: state.auth.selectedRole,
    isAuthenticated: state.auth.isAuthenticated,
    signUpStatus: state.auth.signUpStatus,
});

export default connect(mapStateToProps, { signup })(SignUpForm);