import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { update_access_code } from '../../actions/data';
import './AccessCodeDetails.css';

const AccessCodeDetails = ({ accessCode, selectedCallback, update_access_code }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, [accessCode]);


    const handleRemoveAccessCode = () => {
        if (accessCode) {
            update_access_code(accessCode.id, false);
            selectedCallback();
        }
    }

    const handleActivateAccessCode = () => {
        if (accessCode) {
            update_access_code(accessCode.id, true);
            selectedCallback();
        }
    }

    return (
        <div >
            {isLoaded && accessCode ?
                <div>
                    {accessCode.is_active ?
                        <div className="study-session-container">
                            <h2>Do you want to remove the code? </h2>
                            <h3>Code</h3>
                            <p>{accessCode.code}</p>
                            <button onClick={handleRemoveAccessCode} style={{ backgroundColor: "red" }}>Remove</button>
                        </div>
                        :
                        <div className="study-session-container">
                            <h2>Do you want to reactivate the code? </h2>
                            <h3>Code</h3>
                            <p>{accessCode.code}</p>
                            <button onClick={handleActivateAccessCode} style={{ backgroundColor: "green" }}>Activate</button>
                        </div>
                    }
                </div>

                : <LoadingIcon />
            }
        </div>
    );
};

const mapStateToProps = (state, props) => ({
    selectedCallback: props.selectedCallback,
    accessCode: state.data.accessCode,
});

export default connect(mapStateToProps, { update_access_code })(AccessCodeDetails);