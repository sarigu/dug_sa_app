import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import './StudySessionDetail.css';

const StudySessionDetail = ({ studySession }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [formattedDate, setFormattedDate] = useState();

    useEffect(() => {
        setIsLoaded(true);
        if (studySession) {
            let [year, month, day] = studySession.date.split('-');
            let date = day + "." + month + "." + year;
            setFormattedDate(date);
        }
    }, [studySession]);

    return (
        <div >
            {isLoaded ?
                <div className="study-session-container">
                    <h2>Do you want to book a slot for this study session?</h2>
                    <div className="study-session-details">
                        <h3>Teacher</h3>
                        <p>{studySession.teacher.first_name + " " + studySession.teacher.last_name}</p>
                        <h3>Subject</h3>
                        <p>{studySession.subject.name}</p>
                        <h3>Date</h3>
                        <p>{formattedDate}</p>
                        <h3>Time</h3>
                        <p>{studySession.start_time + " - " + studySession.end_time}</p>
                        <h3>Location</h3>
                        <p>{studySession.location.name}</p>
                        <p>{studySession.location.street + " ," + studySession.location.postal_code + " ," + studySession.location.city}</p>
                        <h3>Spots</h3>
                        <p>{studySession.taken_spots + " taken from " + studySession.available_spots}</p>
                    </div>
                    <button>Yes, book a slot!</button>
                </div>
                : <LoadingIcon />
            }
        </div>
    );
};


const mapStateToProps = state => ({
    studySession: state.data.studySession,
});

export default connect(mapStateToProps, {})(StudySessionDetail);