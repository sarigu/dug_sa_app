import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from '../../../components/Cards/Cards'
import '../Dashboard.css';
import AllClassesButton from '../../../components/Buttons/AllClassesButton';
import StudySessionCard from '../../../components/StudySessionCard/StudySessionCard';
import { useHistory } from "react-router-dom";
import { load_upcoming_booked_study_sessions } from '../../../actions/data';

const StudentDashboard = ({ user, load_upcoming_booked_study_sessions, upcomingStudySessions }) => {

    const history = useHistory();

    useEffect(() => {
        console.log(upcomingStudySessions, "upcomingStudySessions")
        load_upcoming_booked_study_sessions();
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
                    <AllClassesButton buttonWidth={"120px"} selectedCallback={() => history.push("/all-classes")} />
                </div>
                <div>
                    {upcomingStudySessions ?
                        upcomingStudySessions.map((studySession, index) =>
                            <StudySessionCard
                                key={index}
                                sessionId={studySession.id}
                                isActive={studySession.is_active}
                                subject={studySession.subject.name}
                                location={studySession.location.name}
                                teacher={studySession.teacher}
                                startTime={studySession.start_time}
                                endTime={studySession.end_time}
                                date={studySession.date}
                                subjectColor={studySession.subject.color}
                            />
                        )
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