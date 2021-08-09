import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { load_subjects, load_languages } from '../../actions/auth';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { edit_study_session } from '../../actions/data';

const StudySessionEdit = ({
  load_subjects, load_languages, subjects, languages, userType, studySession, edit_study_session, selectedCallback, studySessionParticipants,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formattedDate, setFormattedDate] = useState();
  const [language, setLanguage] = useState();
  const [subject, setSubject] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [error, setError] = useState(false);
  const [description, setDescription] = useState('');
  const [wordCountdown, setWordCountdown] = useState(500);

  useEffect(() => {
    load_subjects();
    load_languages();
  }, []);

  useEffect(() => {
    if (studySession) {
      setIsLoaded(true);
      if (studySession.date) {
        const [year, month, day] = studySession.date.split('-');
        const date = `${day}.${month}.${year}`;
        setFormattedDate(date);
      }
      setDescription(studySession.description);
      setStartTime(studySession.start_time);
      setEndTime(studySession.end_time);

      if (studySession.subject) {
        setSubject(studySession.subject.name);
      }
      if (studySession.language) {
        setLanguage(studySession.language.language);
      }

      setError(false);
    }
  }, [studySession]);

  const handleUpdate = () => {
    if (error || startTime > endTime || startTime === endTime) {
      setError(true);
    } else {
      edit_study_session(studySession.id, language, subject, startTime, endTime, description, true);
      selectedCallback();
    }
  };

  return (
    <div>
      {isLoaded && studySession
        ? (
          <div className="study-session-container">
            <h2>Update the class</h2>
            {error ? <div className="error-message">Oops, something went wrong. Please check all the fields again</div> : null}
            <div style={{ margin: '40px 0' }}>
              <h3>Teacher</h3>
              <p>{studySession.teacher ? `${studySession.teacher.first_name} ${studySession.teacher.last_name}` : null}</p>
              <h3>Subject</h3>
              <select onChange={(e) => { setError(false); setSubject(e.target.value); }}>{subjects && subjects.map((elem, index) => <option key={index} selected={elem.name === subject} value={elem.name}>{elem.name}</option>)}</select>
              <h3>Language</h3>
              <select onChange={(e) => { setError(false); setLanguage(e.target.value); }}>{languages && languages.map((elem, index) => <option key={index} selected={elem.language === language} value={elem.language}>{elem.language}</option>)}</select>
              <h3>Date</h3>
              <p>{formattedDate || null}</p>
              <h3>Start Time</h3>
              <input
                type="time"
                min="08:00"
                max="23:00"
                value={startTime}
                onChange={(e) => {
                  setError(false);
                  let newStartTime = e.target.value;
                  newStartTime = newStartTime
                    .replace(/^(\d\d)(\d)$/g, '$1:$2')
                    .replace(/^(\d\d\:\d\d)(\d+)$/g, '$1:$2')
                    .replace(/[^\d\:]/g, '');
                  setStartTime(newStartTime);
                }}
              />
              <h3>End Time</h3>
              <input
                type="time"
                min="08:00"
                max="23:00"
                value={endTime}
                onChange={(e) => {
                  setError(false);
                  let newEndTime = e.target.value;
                  newEndTime = newEndTime
                    .replace(/^(\d\d)(\d)$/g, '$1:$2')
                    .replace(/^(\d\d\:\d\d)(\d+)$/g, '$1:$2')
                    .replace(/[^\d\:]/g, '');
                  setEndTime(newEndTime);
                }}
              />
              <h3>Location</h3>
              <p style={{ marginBottom: '30px' }}>{studySession.location ? studySession.location.name : null}</p>
              <p>{studySession.location ? `${studySession.location.street} ,${studySession.location.postal_code} ,${studySession.location.city}` : null}</p>
              <h3>Spots</h3>
              <p>{`${studySession.taken_spots} taken from ${studySession.available_spots}`}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <h3 style={{ marginRight: '20px' }}>Description</h3>
                <span>
                  Words left:
                  {' '}
                  {wordCountdown}
                </span>
              </div>
              <textarea
                onKeyUp={(e) => (500 - e.target.value.length > 0 ? setWordCountdown(500 - e.target.value.length) : setWordCountdown(0))}
                rows="10"
                cols="30"
                placeholder="Tell the students what the class will be about"
                maxLength="500"
                value={description}
                onChange={(e) => { setError(false); setDescription(e.target.value); }}
              />
              {userType === 'staff' && studySessionParticipants && studySessionParticipants.length > 0
                ? (
                  <>
                    <h3>Participants</h3>
                    {studySessionParticipants.map((participant) => <p>{`${participant.user.first_name} ${participant.user.last_name}`}</p>)}
                  </>
                )
                : null}
            </div>
            <button onClick={handleUpdate}>Update</button>
          </div>
        )
        : <LoadingIcon />}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  studySession: state.data.studySession,
  selectedCallback: props.selectedCallback,
  sessionType: props.sessionType,
  userType: state.auth.userType,
  studySessionParticipants: state.data.studySessionParticipants,
  handleEdit: props.handleEdit,
  subjects: state.auth.subjects,
  languages: state.auth.languages,
});

export default connect(mapStateToProps, { load_subjects, load_languages, edit_study_session })(StudySessionEdit);
