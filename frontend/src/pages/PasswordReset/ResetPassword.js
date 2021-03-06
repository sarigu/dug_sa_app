import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../actions/auth';
import Logo from '../../components/Logo/Logo';
import './PasswordReset.css';

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Redirect to="/" />;
  }

  return (
    <div className="password-reset-page">
      <Logo />
      <div className="request-password-reset-wrapper">
        <h1>Get a password reset link</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
        <Link to="/" className="to-login-link"> Go back to Sign in </Link>
      </div>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
