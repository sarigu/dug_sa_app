import React from 'react';
import { connect } from 'react-redux';
import Card from '../../../components/Cards/Cards'
import '../Dashboard.css';

const StudentDashboard = ({ user }) => (
    <div>
        <section className="motivational-section">
            <div className="motivational-quote">
                <div className="motivational-quote-content">
                    <span>&#128170;&#127998;</span>
                    <p>„Believe in yourself. Your limitation - it’s only your imagination“</p>
                </div>
            </div>
        </section>
        <section className="cards-container">
            <Card emoji={<span>&#128587;&#127998;</span>} title={"Find a teacher"} link={"/find-teachers"} />
            <Card emoji={<span>&#128218;</span>} title={"Self Study"} />
            <Card emoji={<span>&#127793;</span>} title={"Health & Mental Health"} />
        </section>
        <section>
            <h2>Reminder</h2>
            <p>No reminders at the moment</p>
        </section>
    </div>
);

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, null)(StudentDashboard);