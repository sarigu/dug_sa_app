import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import '../App.css'

const AuthWrapper = ({ checkAuthenticated, load_user, children }) => {
    useEffect(() => {
        console.log("USE EFFECT");
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <div className="main">
            {children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user })(AuthWrapper);