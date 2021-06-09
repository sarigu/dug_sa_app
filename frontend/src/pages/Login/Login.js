import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import './Login.css'

const Login = ({ login, isAuthenticated, error }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showError, setShowError] = useState();
    const { email, password } = formData;

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setShowError(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        login(email, password);
        setShowError(true);
    };

    const handleGoToSignUp = () => {
        setShowError(false);
    }

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }
    return (
        <div className="login-wrapper">
            <h1>Welcome <span>&#128075;&#127998;</span> </h1>
            {error === "login_fail" && showError ? <div className="error-message">Oops, something went wrong. Please try again</div> : null}
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={e => handleChange(e)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={e => handleChange(e)}
                    required
                />
                <button type='submit'>Login</button>
            </form>
            <div className="login-links-container">
                <Link to='/signup' onClick={handleGoToSignUp}>Create an account</Link>
                <Link to='/reset-password'>Forgot password?</Link>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
});

export default connect(mapStateToProps, { login })(Login);