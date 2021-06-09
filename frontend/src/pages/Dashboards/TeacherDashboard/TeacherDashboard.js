import React from 'react';
import { connect } from 'react-redux';
import TeacherSignUpFlow from '../../../components/SignUpForms/TeacherSignUpFlow/TeacherSignUpFlow';
import DashboardContent from './DashboardContent';
import Navbar from '../../../components/Navbar/Navbar';
import './TeacherDashboard.css';

const TeacherDashboard = ({ user }) => (
    <div>
        <Navbar />
        <div className="content-container">
            {
                user.provided_information && user.is_approved ? <DashboardContent /> :
                    user.provided_information && !user.is_approved ?
                        <div><h2>Thank you for signing up!</h2><p>Please wait for approval.</p></div>
                        : <TeacherSignUpFlow />
            }
        </div>
    </div>
);

const mapStateToProps = state => ({
    user: state.auth.user,
    userType: state.auth.userType
});

export default connect(mapStateToProps, null)(TeacherDashboard);