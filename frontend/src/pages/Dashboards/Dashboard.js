import React from 'react';
import { connect } from 'react-redux';
import TeacherDashboard from './TeacherDashboard/TeacherDashboard';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import StaffDashboard from './StaffDashboard/StaffDashboard';

const Dashboard = ({ userType, user }) => (
    console.log(userType, user),
    <div >
        {userType && userType === "student" ? <StudentDashboard /> :
            userType && userType === "teacher" ? <TeacherDashboard /> :
                <StaffDashboard />
        }
    </div>
);

const mapStateToProps = state => ({
    user: state.auth.user,
    userType: state.auth.userType
});

export default connect(mapStateToProps, null)(Dashboard);