import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from '../../../components/Cards/Cards'
import '../Dashboard.css';
import AllClassesButton from '../../../components/Buttons/AllClassesButton'
import { load_upcoming_booked_study_sessions } from '../../../actions/data';

const StudentDashboard = ({ user, load_upcoming_booked_study_sessions, upcomingStudySessions }) => {

    useEffect(() => {
        load_upcoming_booked_study_sessions();
        console.log("upcomingStudySessions", upcomingStudySessions)
    }, []);

    return (
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
            <section className="reminder-container">
                <div className="heading-wrapper">
                    <h2>Reminder</h2>
                    <AllClassesButton buttonWidth={"120px"} />
                </div>
                <div>
                    {upcomingStudySessions ?
                        upcomingStudySessions.map((studySession, index) =>
                            <div key={index} className={studySession.study_session.is_active ? "reminder-card" : "reminder-card cancelled-card"}>
                                {!studySession.study_session.is_active ? <div className="cancelled-heading-wrapper"><strong>Cancelled</strong><span>&#128680;</span></div> : null}
                                <strong>{studySession.study_session.subject.name + " with " + studySession.study_session.teacher.first_name + " " + studySession.study_session.teacher.last_name}</strong>
                                <p>{studySession.study_session.start_time + " - " + studySession.study_session.end_time + " on " + studySession.study_session.date}</p>
                                <p>{"at " + studySession.study_session.location.name}</p>
                            </div>)
                        : <p>No reminders at the moment</p>}
                </div>

            </section>
        </div>
    );

};

const mapStateToProps = state => (console.log(state.data), {
    user: state.auth.user,
    upcomingStudySessions: state.data.upcomingStudySessions
});

export default connect(mapStateToProps, { load_upcoming_booked_study_sessions })(StudentDashboard);