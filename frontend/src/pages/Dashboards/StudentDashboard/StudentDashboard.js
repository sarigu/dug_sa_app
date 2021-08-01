import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '../../../components/Cards/Cards';
import '../Dashboard.css';
import AllClassesButton from '../../../components/Buttons/AllClassesButton';
import StudySessionCard from '../../../components/StudySessionCard/StudySessionCard';
import { load_upcoming_booked_study_sessions, load_study_session } from '../../../actions/data';
import PopUp from '../../../components/PopUp/PopUp';
import StudySessionDetail from '../../../components/StudySessionDetail/StudySessionDetail';
import StudySessionFeedback from '../../../components/StudySessionFeedback/StudySessionFeedback';

const StudentDashboard = ({ load_upcoming_booked_study_sessions, upcomingStudySessions, load_study_session }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showStudySessionDetails, setShowStudySessionDetails] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [sessionType, setSessionType] = useState('booked-study-session');

  const history = useHistory();

  useEffect(() => {
    load_upcoming_booked_study_sessions();
  }, []);

  const handleSelectedStudySession = (studySessionId, isActive) => {
    load_study_session(studySessionId);
    setShowPopup(true);
    if (isActive) {
      setSessionType('booked-study-session');
    } else {
      setSessionType('cancelled-session');
    }
    setShowStudySessionDetails(true);
  };

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
        <Card emoji={<span>&#128587;&#127998;</span>} title="Find a teacher" link="/find-teachers" />
        <Card emoji={<span>&#128218;</span>} title="Self Study" link="/work-in-progress" />
        <Card emoji={<span>&#127793;</span>} title="Health & Mental Health" link="/work-in-progress" />
      </section>
      <section className="reminder-container">
        <div className="heading-wrapper">
          <h2>Reminder</h2>
          <AllClassesButton buttonWidth="120px" selectedCallback={() => history.push('/all-classes')} />
        </div>
        <div>
          {upcomingStudySessions && upcomingStudySessions.length > 0
            ? upcomingStudySessions.map((studySession, index) => (
              <StudySessionCard
                key={index}
                selectedCallback={(sessionId, isActive) => { handleSelectedStudySession(sessionId, isActive); }}
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
            ))
            : <p>No reminders at the moment</p>}
        </div>

      </section>
      {showPopup
        ? (
          <PopUp selectedCallback={() => setShowPopup(false)}>
            {showStudySessionDetails
              ? <StudySessionDetail sessionType={sessionType} selectedCallback={() => { setShowFeedback(true); setShowStudySessionDetails(false); }} />
              : showFeedback
                ? <StudySessionFeedback sessionType={sessionType} selectedCallback={() => setShowPopup(false)} />
                : null}
          </PopUp>
        )
        : null}
    </div>
  );
};

const mapStateToProps = (state) => (console.log(state.data), {
  user: state.auth.user,
  upcomingStudySessions: state.data.upcomingStudySessions,
});

export default connect(mapStateToProps, { load_upcoming_booked_study_sessions, load_study_session })(StudentDashboard);
