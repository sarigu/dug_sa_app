import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import BackButton from '../../components/Buttons/BackButton';
import AccessCodeDetails from '../../components/AccessCodeDetails/AccessCodeDetails';
import AccessCodeFeedback from '../../components/AccessCodeFeedback/AccessCodeFeedback';
import PopUp from '../../components/PopUp/PopUp';
import PlusButton from '../../components/Buttons/PlusButton';
import AccessCodeForm from '../../components/AccessCodeForm/AccessCodeForm';
import { load_active_access_codes, load_inactive_access_codes, load_access_code } from '../../actions/data';
import './AccessCodes.css';

const AccessCodes = ({
  accessCodes, inactiveAccessCodes, load_active_access_codes, load_inactive_access_codes, load_access_code,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [sortByInactive, setSortByInactive] = useState(false);
  const [sortByActive, setSortByActive] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [addAccessCode, setAddAccessCode] = useState(false);
  const [showAccessCodeCreatedFeeback, setShowAccessCodeCreatedFeeback] = useState(false);

  const history = useHistory();

  useEffect(() => {
    load_active_access_codes();
  }, []);

  useEffect(() => {
    if (sortByActive) {
      setIsLoaded(true);
    }
  }, [accessCodes]);

  useEffect(() => {
    if (sortByInactive) {
      setIsLoaded(true);
    }
  }, [inactiveAccessCodes]);

  useEffect(() => {
    if (sortByActive) {
      setIsLoaded(false);
      load_active_access_codes();
    }
  }, [sortByActive]);

  useEffect(() => {
    if (sortByInactive) {
      setIsLoaded(false);
      load_inactive_access_codes();
    }
  }, [sortByInactive]);

  const handleSelectedAccessCode = (accessCodeId) => {
    load_access_code(accessCodeId);
    setShowPopup(true);
    setShowDetails(true);
  };

  const handleCreateAccessCode = () => {
    setAddAccessCode(true);
    setShowDetails(false);
    setShowPopup(true);
  };

  return (
    <div className="access-codes-wrapper">
      <BackButton buttonWidth="70px" selectedCallback={() => history.push('/dashboard')} />
      <div>
        <h2 style={{ marginTop: '40px' }}>Access Codes</h2>
        <div className="teacher-options">
          <div className={sortByActive ? 'active' : null} onClick={() => { setSortByActive(true); setSortByInactive(false); }}>Active</div>
          <div className={sortByInactive ? 'active' : null} onClick={() => { setSortByActive(false); setSortByInactive(true); }}>Inactive</div>
        </div>
        {!isLoaded ? <LoadingIcon />
          : (
            <div>
              {sortByActive
                ? (
                  <div>
                    {accessCodes && accessCodes.length > 0
                      ? accessCodes.map((accessCode, index) => (
                        <div key={index} className="access-code-card" onClick={() => handleSelectedAccessCode(accessCode.id)}>
                          <h4>{accessCode.code}</h4>
                        </div>
                      ))
                      : <p>No access codes</p>}
                  </div>
                )
                : (
                  <div>
                    {inactiveAccessCodes && inactiveAccessCodes.length > 0
                      ? inactiveAccessCodes.map((inactiveAccessCode, index) => (
                        <div key={index} className="access-code-card" onClick={() => handleSelectedAccessCode(inactiveAccessCode.id)}>
                          <h4>{inactiveAccessCode.code}</h4>
                        </div>
                      ))
                      : <p>No access codes</p>}
                  </div>
                )}
            </div>
          )}
        {sortByActive ? (
          <div className="plus-button-container">
            {' '}
            <PlusButton selectedCallback={handleCreateAccessCode} />
          </div>
        ) : null}
      </div>
      {showPopup
        ? (
          <PopUp selectedCallback={() => setShowPopup(false)}>
            {showDetails ? <AccessCodeDetails selectedCallback={() => { setShowDetails(false); setShowFeedback(true); }} />
              : showFeedback ? <AccessCodeFeedback feedbackType="updated-access-code" />
                : addAccessCode ? <AccessCodeForm selectedCallback={() => { setShowAccessCodeCreatedFeeback(true); setAddAccessCode(false); }} />
                  : showAccessCodeCreatedFeeback ? <AccessCodeFeedback feedbackType="added-access-code" />
                    : null}
          </PopUp>
        )
        : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessCodes: state.data.accessCodes,
  inactiveAccessCodes: state.data.inactiveAccessCodes,
});

export default connect(mapStateToProps, { load_active_access_codes, load_inactive_access_codes, load_access_code })(AccessCodes);
