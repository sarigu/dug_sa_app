import React from 'react';
import './NoAccess.css';

const NoAccess = () => (
    <div className="no-access-wrapper" >
        <div>
            <h2>Sorry, you don't have access to this page</h2>
            <a href='/'>Please log in here</a>
        </div>
    </div>
);

export default NoAccess;