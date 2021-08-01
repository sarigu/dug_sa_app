import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../LoadingIcon/LoadingIcon';

const AccessCodeUpdateSuccess = () => (
  <div className="feedback-content">
    <span className="feedback-icon">&#9989;</span>
    <h3>You've updated the access code successfully!</h3>
    <button onClick={() => { window.location.href = '/access-codes'; }}>Go back</button>
  </div>
);

const AccessCodeCreateSuccess = () => (
  <div className="feedback-content">
    <span className="feedback-icon">&#128272;</span>
    <h3>You successfully created a new access code!</h3>
    <button onClick={() => { window.location.href = '/access-codes'; }}>Go back</button>
  </div>
);

const FailMessage = () => (
  <div className="feedback-content">
    <span className="feedback-icon">&#127871;</span>
    <h3>
      Ooops, something went wrong!
      <br />
      Please try again later
    </h3>
    <button onClick={() => { window.location.href = '/access-codes'; }}>Go back</button>
  </div>
);

const AccessCodeFeedback = ({ accessCodeIsUpdated, feedbackType, accessCodeIsCreated }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [accessCodeIsUpdated, accessCodeIsCreated]);

  return (
    <div className="feedback-container">
      {isLoaded
        ? (
          <div>
            {feedbackType && feedbackType === 'updated-access-code' && accessCodeIsUpdated
              ? <AccessCodeUpdateSuccess />
              : feedbackType && feedbackType === 'added-access-code' && accessCodeIsCreated
                ? <AccessCodeCreateSuccess />
                : <FailMessage />}
          </div>
        )
        : (
          <div className="feedback-loading-icon">
            <LoadingIcon />
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  accessCodeIsUpdated: state.data.accessCodeIsUpdated,
  accessCodeIsCreated: state.data.accessCodeIsCreated,
  feedbackType: props.feedbackType,
});

export default connect(mapStateToProps, null)(AccessCodeFeedback);
