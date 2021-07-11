import React from 'react';
import { useHistory } from "react-router-dom";
import './BackButton.css';


const BackButton = () => {
    let history = useHistory();
    return (
        <div className="back-button" onClick={() => history.goBack()}>
            Back
         </div>
    );
};


export default BackButton;