import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';

const TeacherSignUpForm = ({ signup, isAuthenticated }) => {
    const [accountWasCreated, setAccountWasCreated] = useState(false);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        access_code: 'dug_teacher',
        password: '',
        re_password: '',
        role: 'teacher',
    });

    const { first_name, last_name, email, access_code, password, re_password, role, } = formData;

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (password === re_password) {
            signup(first_name, last_name, email, access_code, password, re_password, role);
            setAccountWasCreated(true);
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    if (accountWasCreated) {
        return <Redirect to='/' />
    }

    return (
        <div>
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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(TeacherSignUpForm);