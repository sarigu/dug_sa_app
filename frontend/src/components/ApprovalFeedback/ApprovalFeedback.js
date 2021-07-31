import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../LoadingIcon/LoadingIcon';

const ApprovalSuccessMessage = () => {
    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#9989;</span>
            <h3>The teacher is reviewed and will be notified!</h3>
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


const ApprovalFeedback = ({ isReviewed, selectedCallback }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        console.log("isReviewed", isReviewed)
    }, [isReviewed]);



    return (
        <div className="feedback-container" >
            {isLoaded ?
                <div>
                    {isReviewed ?
                        <ApprovalSuccessMessage selectedCallback={selectedCallback} />
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
    isReviewed: state.data.isReviewed,
    selectedCallback: props.selectedCallback
});

export default connect(mapStateToProps, null)(ApprovalFeedback);