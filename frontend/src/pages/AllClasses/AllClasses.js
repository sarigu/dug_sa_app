import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BackButton from '../../components/Buttons/BackButton';
import { useHistory } from "react-router-dom";
import { load_upcoming_booked_study_sessions_list, load_previous_booked_study_sessions_list } from '../../actions/data';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import StudySessionCard from '../../components/StudySessionCard/StudySessionCard';
import './AllClasses.css';

const AllClasses = ({ upcomingStudySessions, previousStudySessions, totalPreviousStudySessionPages, totalUpcomingStudySessionPages, load_upcoming_booked_study_sessions_list, load_previous_booked_study_sessions_list }) => {
    const [sortByUpcoming, setSortByUpcoming] = useState(true);
    const [sortByPrevious, setSortByPrevious] = useState(false);
    const [upcomingIsLoaded, setUpcomingIsLoaded] = useState(false);
    const [previousIsLoaded, setPreviousIsLoaded] = useState(false);

    const history = useHistory();

    useEffect(() => {
        load_upcoming_booked_study_sessions_list();
        load_previous_booked_study_sessions_list();
    }, []);


    useEffect(() => {
        setUpcomingIsLoaded(true);
    }, [upcomingStudySessions]);


    useEffect(() => {
        setPreviousIsLoaded(true);
    }, [previousStudySessions]);

    return (
        <div className="all-classes-wrapper">
            <BackButton buttonWidth={"70px"} selectedCallback={() => history.push("/dashboard")} />
            <h2 style={{ marginTop: "40px" }}>All classes</h2>
            <div className="all-classes-options">
                <div className={sortByUpcoming ? "active" : null} onClick={() => { setSortByUpcoming(true); setSortByPrevious(false) }}>Upcoming</div>
                <div className={sortByPrevious ? "active" : null} onClick={() => { setSortByPrevious(true); setSortByUpcoming(false) }}>Previous</div>
            </div>
            <div>
                {sortByUpcoming && upcomingIsLoaded ?
                    <>
                        {upcomingStudySessions && upcomingStudySessions.length > 0 ?
                            upcomingStudySessions.map((studySession, index) =>
                                <StudySessionCard
                                    key={index}
                                    isActive={studySession.study_session.is_active}
                                    subject={studySession.study_session.subject.name}
                                    location={studySession.study_session.location.name}
                                    teacher={studySession.study_session.teacher}
                                    startTime={studySession.study_session.start_time}
                                    endTime={studySession.study_session.end_time}
                                    date={studySession.study_session.date}
                                    subjectColor={studySession.study_session.subject.color}
                                />
                            ) : <p>No classes</p>
                        }
                    </>
                    : sortByPrevious && previousIsLoaded ?
                        <>
                            {
                                previousStudySessions && previousStudySessions.length > 0 ?
                                    previousStudySessions.map((studySession, index) =>
                                        <StudySessionCard
                                            key={index}
                                            isActive={studySession.study_session.is_active}
                                            subject={studySession.study_session.subject.name}
                                            location={studySession.study_session.location.name}
                                            teacher={studySession.study_session.teacher}
                                            startTime={studySession.study_session.start_time}
                                            endTime={studySession.study_session.end_time}
                                            date={studySession.study_session.date}
                                            subjectColor={studySession.study_session.subject.color}
                                        />)
                                    : <p>No classes</p>
                            }
                        </> : <LoadingIcon />}
            </div>
        </div>
    );
};


const mapStateToProps = (state, props) => ({
    upcomingStudySessions: state.data.allUpcomingStudySessions,
    previousStudySessions: state.data.allPreviousStudySessions,
    totalPreviousStudySessionPages: state.data.totalPreviousStudySessionPages,
    totalUpcomingStudySessionPages: state.data.totalUpcomingStudySessionPages,
});

export default connect(mapStateToProps, { load_upcoming_booked_study_sessions_list, load_previous_booked_study_sessions_list })(AllClasses);