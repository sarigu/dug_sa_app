import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import './SignUp.css'
import StudentSignUpForm from '../../components/SignUpForms/StudentSignUpForm';
import TeacherSignUpForm from '../../components/SignUpForms/TeacherSignUpForm';

const SignUp = () => {
    const [selectedRole, setSelectedRole] = useState("student");

    const handleSignUpOption = e => {
        e.preventDefault();
        e.target.parentElement.querySelectorAll(".active").forEach(e => e.classList.remove("active"));
        e.target.classList.add("active");
        let role = e.target.getAttribute("data-role");
        setSelectedRole(role);
    }

    const staffSignUp = <div><h3>Nice to have you here!</h3><p>You need to be added by the DUG administration if you are staff. Please contact ..</p></div>;

    return (
        <div className="signup-wrapper">
            <h1>Welcome <span>&#128075;&#127998;</span> </h1>
            <p>Do you want to sign up as
                a student or teacher? </p>
            <div className="signup-options">
                <div className="shadow active" data-role="student" onClick={handleSignUpOption}>Student</div>
                <div className="shadow" data-role="teacher" onClick={handleSignUpOption}>Teacher</div>
                <div className="shadow" data-role="staff" onClick={handleSignUpOption}>Staff</div>
            </div>
            <div>
                {selectedRole === "student" ? <StudentSignUpForm /> : selectedRole === "staff" ? staffSignUp : selectedRole === "teacher" ? <TeacherSignUpForm /> : <StudentSignUpForm />}
            </div>

            <Link to='/' className="signup-link">  Already have an account? </Link>
        </div>
    );
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { signup })(SignUp);