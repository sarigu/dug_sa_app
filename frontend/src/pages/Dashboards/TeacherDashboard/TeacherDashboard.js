import React from 'react';
import { connect } from 'react-redux';
import TeacherSignUpFlow from '../../../components/SignUpForms/TeacherSignUpFlow/TeacherSignUpFlow';
import DashboardContent from './DashboardContent';
import '../Dashboard.css';

const TeacherDashboard = ({ user }) => (
    <div>
        {user.provided_information && user.is_approved ? <DashboardContent /> :
            user.provided_information && !user.is_approved ?
                <div style={{ margin: "30px 0 0 30px" }}><h2>Thank you for signing up!</h2><p>Please wait for approval.</p></div>
                : <TeacherSignUpFlow />
        }
    </div>
);

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, null)(TeacherDashboard);