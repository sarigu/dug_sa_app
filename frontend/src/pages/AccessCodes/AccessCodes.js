import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import BackButton from '../../components/Buttons/BackButton';
import TeacherDetails from '../../components/TeacherDetails/TeacherDetails';
import ApprovalFeedback from '../../components/ApprovalFeedback/ApprovalFeedback';
import PopUp from '../../components/PopUp/PopUp';
import { useHistory } from "react-router-dom";
import { load_active_access_codes, load_inactive_access_codes } from '../../actions/data';
import './AccessCodes.css';

const AccessCodes = ({ accessCodes, inactiveAccessCodes, load_active_access_codes, load_inactive_access_codes, rejectedTeachers, totalRejectedTeacherPages }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [index, setIndex] = useState(1);
    const [sortByInactive, setSortByInactive] = useState(false);
    const [sortByActive, setSortByActive] = useState(true);
    const [showFeedback, setShowFeedback] = useState(false);

    const history = useHistory();

    useEffect(() => {
        load_active_access_codes()
    }, []);

    useEffect(() => {
        console.log(accessCodes, "USE EFFECT")
        if (sortByActive) {
            setIsLoaded(true);
        }
    }, [accessCodes]);


    useEffect(() => {
        if (sortByInactive) {
            setIsLoaded(true)
        }
    }, [inactiveAccessCodes]);

    useEffect(() => {
        if (sortByActive) {
            setIsLoaded(false)
            load_active_access_codes()
        }
    }, [sortByActive]);

    useEffect(() => {
        if (sortByInactive) {
            setIsLoaded(false)
            load_inactive_access_codes()
        }
    }, [sortByInactive]);


    return (
        <div className="all-teachers-wrapper" >
            <BackButton buttonWidth={"70px"} selectedCallback={() => history.push("/dashboard")} />
            <div>
                <h2 style={{ marginTop: "40px" }}>Access Codes</h2>
                <div className="teacher-options">
                    <div className={sortByActive ? "active" : null} onClick={() => { setSortByActive(true); setSortByInactive(false) }} >Active</div>
                    <div className={sortByInactive ? "active" : null} onClick={() => { setSortByActive(false); setSortByInactive(true) }}>Inactive</div>
                </div>
                {!isLoaded ? <LoadingIcon /> :
                    <div>
                        {sortByActive ?
                            <div>
                                {accessCodes && accessCodes.length > 0 ?
                                    accessCodes.map((accessCode, index) =>
                                        <div className="access-code-card">
                                            <h4>{accessCode.code}</h4>
                                        </div>
                                    ) :
                                    <p>No access codes</p>
                                }
                            </div>
                            :
                            <div>
                                {inactiveAccessCodes && inactiveAccessCodes.length > 0 ?
                                    inactiveAccessCodes.map((inactiveAccessCode, index) =>
                                        <div className="access-code-card">
                                            <h4>{inactiveAccessCode.code}</h4>
                                        </div>
                                    ) :
                                    <p>No access codes</p>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
            {showPopup ?
                <PopUp selectedCallback={() => setShowPopup(false)}>
                    {showDetails ? <TeacherDetails selectedCallback={() => { setShowDetails(false); setShowFeedback(true) }} />
                        : showFeedback ? <ApprovalFeedback selectedCallback={() => setShowPopup(false)} />
                            : null}
                </PopUp>
                : null
            }
        </div >
    );
};

const mapStateToProps = state => ({
    accessCodes: state.data.accessCodes,
    inactiveAccessCodes: state.data.inactiveAccessCodes,
});

export default connect(mapStateToProps, { load_active_access_codes, load_inactive_access_codes })(AccessCodes);