import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { useHistory } from "react-router-dom";
import './StudySessionBookingFeedback.css';

const BookingSuccessMessage = () => {
    const history = useHistory();

    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#127881;</span>
            <h3>You successfully booked your spot!</h3>
            <button onClick={() => history.push("/dashboard")}>Go back</button>
        </div>
    );
};

const BookingFailMessage = () => {
    const history = useHistory();

    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#127871;</span>
            <h3>Ooops, something went wrong! <br />Maybe you are offline or all spots are taken. Please try again later</h3>
            <button onClick={() => history.push("/dashboard")}>Go back</button>
        </div>
    );
};


const StudySessionBookingFeedback = ({ isBooked }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, [isBooked]);

    return (
        <div className="feedback-container" >
            {isLoaded ?
                <div>
                    {isBooked ? <BookingSuccessMessage /> : <BookingFailMessage />}
                </div>
                : <LoadingIcon />}
        </div>
    );
};


const mapStateToProps = state => ({
    isBooked: state.data.isBooked
});

export default connect(mapStateToProps, {})(StudySessionBookingFeedback);