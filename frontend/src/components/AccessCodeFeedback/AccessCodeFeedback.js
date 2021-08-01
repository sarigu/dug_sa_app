import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../LoadingIcon/LoadingIcon';

const AccessCodeUpdateSuccess = () => {
    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#9989;</span>
            <h3>You've updated the access code successfully!</h3>
            <button onClick={() => { window.location.href = "/dashboard" }}>Go back</button>
        </div>
    );
};

const FailMessage = () => {
    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#127871;</span>
            <h3>Ooops, something went wrong! <br />Please try again later</h3>
            <button onClick={() => { window.location.href = "/dashboard" }}>Go back</button>
        </div>
    );
};


const AccessCodeFeedback = ({ accessCodeIsUpdated, selectedCallback }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        console.log(accessCodeIsUpdated, "accessCodeIsUpdated")
        setIsLoaded(true);
    }, [accessCodeIsUpdated]);

    return (
        <div className="feedback-container" >
            {isLoaded ?
                <div>
                    {accessCodeIsUpdated ?
                        <AccessCodeUpdateSuccess selectedCallback={selectedCallback} />
                        : <FailMessage selectedCallback={selectedCallback} />}
                </div>
                :
                <div className="feedback-loading-icon">
                    <LoadingIcon />
                </div>
            }
        </div>
    );
};


const mapStateToProps = (state, props) => ({
    accessCodeIsUpdated: state.data.accessCodeIsUpdated,
    selectedCallback: props.selectedCallback
});

export default connect(mapStateToProps, null)(AccessCodeFeedback);