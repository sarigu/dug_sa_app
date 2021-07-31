import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import { connect } from 'react-redux';
import Card from '../../../components/Cards/Cards'
import AllClassesButton from '../../../components/Buttons/AllClassesButton'
import StudySessionCard from '../../../components/StudySessionCard/StudySessionCard';
import { useHistory } from "react-router-dom";
import { load_upcoming_teachers_study_session, load_study_session } from '../../../actions/data';
import PopUp from '../../../components/PopUp/PopUp';
import StudySessionDetail from '../../../components/StudySessionDetail/StudySessionDetail';
import StudySessionFeedback from '../../../components/StudySessionFeedback/StudySessionFeedback';
import StudySessionEdit from '../../../components/StudySessionEdit/StudySessionEdit';

const DashboardContent = ({ upcomingStudySessions, load_upcoming_teachers_study_session, load_study_session, isCancelled, isCreated }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [showStudySessionDetails, setShowStudySessionDetails] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showStudySessionEdit, setShowStudySessionEdit] = useState(false);
    const [sessionType, setSessionType] = useState("teacher-study-session");

    const history = useHistory();

    useEffect(() => {
        load_upcoming_teachers_study_session();
    }, []);

    useEffect(() => {
        load_upcoming_teachers_study_session();
    }, [isCancelled, isCreated]);

    const handleSelectedStudySession = (studySessionId, isActive) => {
        load_study_session(studySessionId);
        setShowPopup(true);
        if (isActive) {
            setSessionType("teacher-study-session");
        } else {
            setSessionType("cancelled-session");
        }
        setShowStudySessionDetails(true);
    }

    return (
        < div >
            <section className="reminder-container" >
                <div className="heading-wrapper">
                    <h2>Reminder</h2>
                    <AllClassesButton buttonWidth={"120px"} selectedCallback={() => history.push("/all-classes")} />
                </div>
                <div>
                    {upcomingStudySessions && upcomingStudySessions.length > 0 ?
                        upcomingStudySessions.map((studySession, index) =>
                            <StudySessionCard
                                selectedCallback={(sessionId, isActive) => { handleSelectedStudySession(sessionId, isActive) }}
                                key={index}
                                sessionId={studySession.id}
                                isActive={studySession.is_active}
                                subject={studySession.subject.name}
                                language={studySession.language.language}
                                location={studySession.location.name}
                                teacher={studySession.teacher}
                                startTime={studySession.start_time}
                                endTime={studySession.end_time}
                                date={studySession.date}
                                subjectColor={studySession.subject.color}
                                wasUpdated={studySession.was_updated}
                            />
                        )
                        : <p>No reminders at the moment</p>}
                </div>
            </section>
            <section className="cards-container">
                <Card emoji={<span>&#128198;</span>} title={"Schedule"} link="/schedule" />
                <Card emoji={<span>&#128218;</span>} title={"Study material"} link="/work-in-progress" />
            </section>
            {showPopup ?
                <PopUp selectedCallback={() => setShowPopup(false)} >
                    {showStudySessionDetails ? <StudySessionDetail sessionType={sessionType} selectedCallback={() => { setShowFeedback(true); setShowStudySessionDetails(false) }} handleEdit={() => { setShowStudySessionEdit(true); setShowStudySessionDetails(false) }} />
                        : showFeedback ? <StudySessionFeedback sessionType={sessionType} selectedCallback={() => setShowPopup(false)} /> :
                            showStudySessionEdit ? <StudySessionEdit selectedCallback={() => { setShowFeedback(true); setShowStudySessionEdit(false); setSessionType("updated-session") }} /> :
                                null}
                </PopUp>
                : null
            }
        </div >
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    upcomingStudySessions: state.data.upcomingStudySessions,
    isCancelled: state.data.isCancelled,
    isCreated: state.data.isCreated,
});

export default connect(mapStateToProps, { load_upcoming_teachers_study_session, load_study_session })(DashboardContent);