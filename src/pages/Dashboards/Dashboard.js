import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TeacherDashboard from './TeacherDashboard/TeacherDashboard';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import StaffDashboard from './StaffDashboard/StaffDashboard';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

const Dashboard = ({ userType }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [userType]);

  return (
    <div className="dashboard-wrapper">
      {isLoaded
        ? (
          <div>
            {userType && userType === 'student' ? <StudentDashboard />
              : userType && userType === 'teacher' ? <TeacherDashboard />
                : userType && userType === 'staff' ? <StaffDashboard />
                  : <></>}
          </div>
        )
        : <LoadingIcon />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userType: state.auth.userType,
});

export default connect(mapStateToProps, null)(Dashboard);
