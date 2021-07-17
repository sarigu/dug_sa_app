import React from 'react';
import { connect } from 'react-redux';
import TeacherDashboard from './TeacherDashboard/TeacherDashboard';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import StaffDashboard from './StaffDashboard/StaffDashboard';

const Dashboard = ({ userType }) => {
    return (
        <div className="dashboard-wrapper">
            {userType && userType === "student" ? <StudentDashboard /> :
                userType && userType === "teacher" ? <TeacherDashboard /> :
                    userType && userType === "staff" ? <StaffDashboard /> : <></>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    userType: state.auth.userType,
});

export default connect(mapStateToProps, null)(Dashboard);