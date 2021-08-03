import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { update_selected_role } from '../../actions/auth';
import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForms/SignUpForm';
import './SignUp.css';

const SignUp = ({ update_selected_role }) => {
  const [selectedRole, setSelectedRole] = useState('student');

  const handleSignUpOption = (e) => {
    e.preventDefault();
    e.target.parentElement.querySelectorAll('.clicked').forEach((e) => e.classList.remove('clicked'));
    e.target.classList.add('clicked');
    const role = e.target.getAttribute('data-role');
    setSelectedRole(role);
    update_selected_role(role);
  };

  const staffSignUp = (
    <div>
      <h3>Nice to have you here!</h3>
      <p>You need to be added by the Designers Withou Borders South Africa administration if you are staff.</p>
    </div>
  );

  return (
    <div className="signup-page">
      <Logo />
      <div className="signup-wrapper">
        <h1>
          Welcome
          <span>&#128075;&#127998;</span>
        </h1>
        <p>
          Do you want to sign up as
          a student, teacher or staff?
          {' '}
        </p>
        <div className="signup-options">
          <div className="shadow clicked" data-role="student" onClick={handleSignUpOption}>Student</div>
          <div className="shadow" data-role="teacher" onClick={handleSignUpOption}>Teacher</div>
          <div className="shadow" data-role="staff" onClick={handleSignUpOption}>Staff</div>
        </div>
        <div>
          {selectedRole === 'student' || selectedRole === 'teacher' ? <SignUpForm /> : staffSignUp}
        </div>
        <Link to="/" className="signup-link">  Already have an account? </Link>
      </div>
    </div>
  );
};

export default connect(null, { update_selected_role })(SignUp);
