import React from 'react';
import { connect } from 'react-redux';
import TeacherSignUpFlow from '../../../components/SignUpForms/TeacherSignUpFlow/TeacherSignUpFlow';
import DashboardContent from './DashboardContent';
import '../Dashboard.css';

const TeacherDashboard = ({ user }) => (
    console.log("teacherr", user),
    <div>
        {user.provided_information && user.is_reviewed && user.is_approved ?
            <DashboardContent />
            : user.provided_information && !user.is_reviewed ?
                <div style={{ margin: "30px 0 0 30px" }}>
                    <h2>Thank you for signing up!</h2>
                    <p>Please wait for approval.</p>
                </div>
                : user.provided_information && user.is_reviewed && !user.is_approved ?
                    <div style={{ margin: "30px 0 0 30px" }}>
                        <h2>We are sorry to inform you that you have not been approved</h2>
                        <p>Please contact the staff at DUG if you have any questions regarding the reason behind the decision.</p>
                    </div>
                    : <TeacherSignUpFlow />
        }
    </div>
);

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, null)(TeacherDashboard);