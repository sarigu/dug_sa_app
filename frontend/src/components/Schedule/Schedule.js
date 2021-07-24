import React, { useState, useEffect } from 'react';
import './Schedule.css';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { connect } from 'react-redux';
import { load_study_sessions } from '../../actions/data';


const localizer = momentLocalizer(moment)


function Event({ event }) {
    return (
        <span  >
            <strong>{event.title}</strong> <br></br>
            {event.desc} <br></br>
            {event.taken_spots + " from "} {event.available_spots}
            <button>Book</button>
        </span>
    )
}



const StudySessionCalendar = props => (
    <div>
        <Calendar
            localizer={localizer}
            events={props.list}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            defaultView={Views.DAY}
            defaultDate={moment().toDate()}
            eventPropGetter={event => {
                const eventData = props.list.find(ot => ot.id === event.id);
                console.log(eventData.type);
                const type = eventData.type;
                return { className: type };
            }}
            components={{
                event: Event,

            }}
        />
    </div>
)
const Schedule = ({ props, studySessions, bookedStudySessions }) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        console.log("FINALLY", studySessions, bookedStudySessions)
        if (studySessions && bookedStudySessions) {
            const allStudySessionSlots = []
            studySessions.forEach((studySession) => {
                let start = (moment(studySession.date + " " + studySession.start_time).toDate())
                let end = (moment(studySession.date + " " + studySession.end_time).toDate())
                //let start_at = (new Date(date + " " + studySession));
                //let end_at
                console.log("DATE", start)
                allStudySessionSlots.push({ id: studySession.id, title: studySession.subject.name + " with " + studySession.teacher.first_name + " " + studySession.teacher.last_name, start: start, end: end, type: "study-session", desc: "at " + studySession.location.name, available_spots: studySession.available_spots, taken_spots: studySession.taken_spots })
            })

            bookedStudySessions.forEach((studySession) => {
                let start = (moment(studySession.date + " " + studySession.start_time).toDate())
                let end = (moment(studySession.date + " " + studySession.end_time).toDate())
                //let start_at = (new Date(date + " " + studySession));
                //let end_at
                console.log("DATE", start)
                allStudySessionSlots.push({ id: studySession.id, title: studySession.subject.name + " with " + studySession.teacher.first_name + " " + studySession.teacher.last_name, start: start, end: end, type: "booked-study-session", desc: "at " + studySession.location.name, available_spots: studySession.available_spots, taken_spots: studySession.taken_spots })
            })
            console.log("studySession", allStudySessionSlots)
            setList(allStudySessionSlots, bookedStudySessions)
        }

    }, [studySessions, bookedStudySessions]);

    return (
        <div >
            Schedule
            <StudySessionCalendar list={list} />
        </div>
    );
};


const mapStateToProps = (state, props) => ({
    props: props,
    studySessions: state.data.studySessions,
    bookedStudySessions: state.data.bookedStudySessions,
});

export default connect(mapStateToProps, null)(Schedule);

