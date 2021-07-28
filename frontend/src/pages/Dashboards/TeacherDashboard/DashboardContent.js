import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import { connect } from 'react-redux';
import Card from '../../../components/Cards/Cards'
import AllClassesButton from '../../../components/Buttons/AllClassesButton'
import StudySessionCard from '../../../components/StudySessionCard/StudySessionCard';
import { useHistory } from "react-router-dom";
import { load_upcoming_teachers_study_session } from '../../../actions/data';

const DashboardContent = ({ upcomingStudySessions, load_upcoming_teachers_study_session }) => {

    const history = useHistory();

    useEffect(() => {
        load_upcoming_teachers_study_session();
    }, []);

    return (
        <div>
            <section className="reminder-container" >
                <div className="heading-wrapper">
                    <h2>Reminder</h2>
                    <AllClassesButton buttonWidth={"120px"} selectedCallback={() => history.push("/all-classes")} />
                </div>
                <div>
                    {upcomingStudySessions ?
                        upcomingStudySessions.map((studySession, index) =>
                            <StudySessionCard
                                key={index}
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
            <section className="cards-container">
                <Card emoji={<span>&#128198;</span>} title={"Schedule"} />
                <Card emoji={<span>&#128218;</span>} title={"Study material"} />
            </section>
        </div>
    );
};

const mapStateToProps = state => (console.log(state.data), {
    user: state.auth.user,
    upcomingStudySessions: state.data.upcomingStudySessions
});

export default connect(mapStateToProps, { load_upcoming_teachers_study_session })(DashboardContent);