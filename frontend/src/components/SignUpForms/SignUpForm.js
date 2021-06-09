import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';

const SignUpForm = ({ signup, error, selectedRole, signUpStatus }) => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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

        if (password !== re_password) {
            setShowError(true);
            setErrorMessage("Please make sure the passwords match");
        } else {
            signup(first_name, last_name, email, access_code, password, re_password, role);
        }
    };

    useEffect(() => {
        if (signUpStatus === "success") {
            history.push("/");
        }
    }, [signUpStatus]);


    return (
        <div>
            {error ? <div className="error-message">Oops, something went wrong. Please try again</div> : showError && errorMessage ? <div className="error-message">{errorMessage}</div> : null}
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    type='text'
                    placeholder='First Name*'
                    name='first_name'
                    value={first_name}
                    onChange={e => handleChange(e)}
                    required
                />
                <input
                    type='text'
                    placeholder='Last Name*'
                    name='last_name'
                    value={last_name}
                    onChange={e => handleChange(e)}
                    required
                />
                <input
                    type='email'
                    placeholder='Email*'
                    name='email'
                    value={email}
                    onChange={e => handleChange(e)}
                    required
                />
                <input
                    type='text'
                    placeholder='Access Code*'
                    name='access_code'
                    value={access_code}
                    onChange={e => handleChange(e)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password*'
                    name='password'
                    value={password}
                    onChange={e => handleChange(e)}
                    minLength='8'
                    required
                />
                <input
                    type='password'
                    placeholder='Confirm Password*'
                    name='re_password'
                    value={re_password}
                    onChange={e => handleChange(e)}
                    minLength='8'
                    required
                />
                <button type='submit'>Sign Up</button>
            </form>
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