import React, { useState } from 'react';
import { connect } from 'react-redux';
import { add_access_code } from '../../actions/data';

const AccessCodeForm = ({ props, add_access_code }) => {
  const [code, setCode] = useState();
  const [error, setError] = useState();

  const handleSubmit = () => {
    if (!error && code) {
      add_access_code(code);
      props.selectedCallback();
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <h2>Add a new access code</h2>
      {error ? <div className="error-message">Please enter a code</div> : null}
      <div>
        <h3>Code</h3>
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setError(false);
            setCode(e.target.value);
          }}
        />
      </div>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  props,
  subjects: state.auth.subjects,
  languages: state.auth.languages,
});

export default connect(mapStateToProps, { add_access_code })(AccessCodeForm);
