import React from 'react';
import { useHistory } from 'react-router-dom';
import './WorkInProgress.css';

const WorkInProgress = () => {
  const history = useHistory();

  return (
    <div className="work-in-progress-wrapper">
      <div className="content-container">
        <span>&#128679;</span>
        <h2>Work in progress</h2>
        <p>We are working on content for you, see you soon!</p>
        <button onClick={() => { history.push('/dashboard'); }}>Go back</button>
      </div>
    </div>
  );
};

export default WorkInProgress;
