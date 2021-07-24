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



const MyCalendar = props => (
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
const Schedule = ({ props, load_study_sessions, studySessions }) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        load_study_sessions()
    }, []);

    useEffect(() => {
        console.log("FINALLY", studySessions)
        if (studySessions) {
            const holidays = []
            studySessions.forEach((holiday) => {
                let start = (moment(holiday.date + " " + holiday.start_time).toDate())
                let end = (moment(holiday.date + " " + holiday.end_time).toDate())
                //let start_at = (new Date(date + " " + holiday));
                //let end_at
                console.log("DATE", start)
                holidays.push({ id: holiday.id, title: holiday.subject.name + " with " + holiday.teacher.first_name, start: start, end: end, type: "study-session", desc: "at " + holiday.location.name, available_spots: holiday.available_spots, taken_spots: holiday.taken_spots })
            })
            console.log("HOLIDAY", holidays)
            setList(holidays)
        }



    }, [studySessions]);

    return (
        <div >
            Schedule
            <MyCalendar list={list} />
        </div>
    );
};


const mapStateToProps = (state, props) => ({
    props: props,
    studySessions: state.data.studySessions,
});

export default connect(mapStateToProps, { load_study_sessions })(Schedule);

