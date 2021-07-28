import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BackButton from '../../components/Buttons/BackButton';
import { useHistory } from "react-router-dom";
import { load_upcoming_booked_study_sessions_list, load_previous_booked_study_sessions_list } from '../../actions/data';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import StudySessionCard from '../../components/StudySessionCard/StudySessionCard';
import NextButton from '../../components/Buttons/NextButton';
import PrevButton from '../../components/Buttons/PrevButton';
import './AllClasses.css';

const AllClasses = ({ upcomingStudySessions, previousStudySessions, totalPreviousStudySessionPages, totalUpcomingStudySessionPages, load_upcoming_booked_study_sessions_list, load_previous_booked_study_sessions_list }) => {
    const [sortByUpcoming, setSortByUpcoming] = useState(true);
    const [sortByPrevious, setSortByPrevious] = useState(false);
    const [upcomingIsLoaded, setUpcomingIsLoaded] = useState(false);
    const [previousIsLoaded, setPreviousIsLoaded] = useState(false);
    const [allUpcomingStudySessions, setAllUpcomingStudySessions] = useState([])
    const [allPreviousStudySessions, setAllPreviousStudySessions] = useState([])
    const [index, setIndex] = useState(1);

    const history = useHistory();

    useEffect(() => {
        load_upcoming_booked_study_sessions_list(index);
        load_previous_booked_study_sessions_list(index);
    }, []);


    useEffect(() => {
        setUpcomingIsLoaded(true);
        setAllUpcomingStudySessions(upcomingStudySessions)
    }, [upcomingStudySessions]);


    useEffect(() => {
        setPreviousIsLoaded(true);
        console.log("previousStudySessions", previousStudySessions)
        setAllPreviousStudySessions(previousStudySessions)
    }, [previousStudySessions]);

    const handleNextPage = () => {
        if (sortByUpcoming) {
            if (index + 1 <= totalUpcomingStudySessionPages) {
                load_upcoming_booked_study_sessions_list(index + 1);
                setUpcomingIsLoaded(false);
                setIndex(index + 1);
            }
        } else {
            if (index + 1 <= totalPreviousStudySessionPages) {
                load_previous_booked_study_sessions_list(index + 1);
                setPreviousIsLoaded(false);
                setIndex(index + 1);
            }
        }
    }

    const handlePrevPage = () => {
        if (sortByUpcoming) {
            if (index - 1 > 0) {
                load_upcoming_booked_study_sessions_list(index - 1);
                setUpcomingIsLoaded(false);
                setIndex(index - 1);
            } else {
                load_upcoming_booked_study_sessions_list(1);
                setUpcomingIsLoaded(false);
                setIndex(1);
            }

        } else {
            if (index - 1 > 0) {
                load_previous_booked_study_sessions_list(index - 1);
                setPreviousIsLoaded(false);
                setIndex(index - 1);
            } else {
                load_previous_booked_study_sessions_list(1);
                setPreviousIsLoaded(false);
                setIndex(1);
            }
        }
    }

    return (
        <div className="all-classes-wrapper">
            <BackButton buttonWidth={"70px"} selectedCallback={() => history.push("/dashboard")} />
            <h2 style={{ marginTop: "40px" }}>All classes</h2>
            <div className="all-classes-options">
                <div className={sortByUpcoming ? "active" : null} onClick={() => { setSortByUpcoming(true); setSortByPrevious(false); setIndex(1) }}>Upcoming</div>
                <div className={sortByPrevious ? "active" : null} onClick={() => { setSortByPrevious(true); setSortByUpcoming(false); setIndex(1) }}>Previous</div>
            </div>
            <div>
                {sortByUpcoming && upcomingIsLoaded ?
                    <>
                        {allUpcomingStudySessions && allUpcomingStudySessions.length > 0 ?
                            allUpcomingStudySessions.map((studySession, index) =>
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
                                allPreviousStudySessions && allPreviousStudySessions.length > 0 ?
                                    allPreviousStudySessions.map((studySession, index) =>
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
            <div className="bottom-navigation">
                {sortByUpcoming && allUpcomingStudySessions && allUpcomingStudySessions.length > 0 ?
                    <>
                        {index <= 1 ? null :
                            <div onClick={handlePrevPage}><PrevButton /></div>
                        }
                        <p> {index <= totalUpcomingStudySessionPages && index > 0 ? index : index <= 0 ? 1 : totalUpcomingStudySessionPages}</p>
                        {index >= totalUpcomingStudySessionPages ? null :
                            <div onClick={handleNextPage}><NextButton /></div>
                        }
                    </>
                    : sortByPrevious && allPreviousStudySessions && allPreviousStudySessions.length > 0 ? <>
                        {index <= 1 ? null :
                            <div onClick={handlePrevPage}><PrevButton /></div>
                        }
                        <p> {index <= totalPreviousStudySessionPages && index > 0 ? index : index <= 0 ? 1 : totalPreviousStudySessionPages}</p>
                        {index >= totalPreviousStudySessionPages ? null :
                            <div onClick={handleNextPage}><NextButton /></div>
                        }
                    </> : null}
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