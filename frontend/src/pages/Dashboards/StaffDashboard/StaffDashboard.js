import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../../components/Navbar/Navbar';
import Card from '../../../components/Cards/Cards'

const StudentDashboard = ({ user }) => (
    <div>
        <Navbar />
        <div>
            Staff
        </div>
    </div>
);

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, null)(StudentDashboard);