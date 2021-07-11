import React from 'react';
import { connect } from 'react-redux';

const StudentDashboard = ({ user }) => (
    <div>
        Staff
    </div>
);

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, null)(StudentDashboard);