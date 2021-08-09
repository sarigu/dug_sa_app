import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import Accordion from '../Accordion/Accordion';
import CloseButton from '../Buttons/CloseButton';
import { add_teacher_review } from '../../actions/data';
import './TeacherDetails.css';

const TeacherDetails = ({ teacherData, add_teacher_review, selectedCallback }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formattedDate, setFormattedDate] = useState();
  const [showAdressProofDetails, setShowAdressProofDetails] = useState(false);
  const [subjects, setSubjects] = useState();
  const [languages, setLanguages] = useState();
  const [facilities, setFacilities] = useState();
  const [teacher, setTeacher] = useState();

  useEffect(() => {
    if (teacherData) {
      setIsLoaded(true);
      setSubjects(teacherData.subjects);
      setLanguages(teacherData.languages);
      setFacilities(teacherData.facilities);
      setTeacher(teacherData.teacher);
      if (teacherData.year_of_graduation) {
        const [year, month, day] = teacher.year_of_graduation.split('-');
        const date = `${day}.${month}.${year}`;
        setFormattedDate(date);
      }
    }
  }, [teacherData]);

  const handleApproveTeacher = () => {
    add_teacher_review(teacher.id, true);
    selectedCallback();
  };

  const handleRejectTeacher = () => {
    add_teacher_review(teacher.id, false);
    selectedCallback();
  };

  return (
    <div className="teacher-details-container">
      {isLoaded && teacher
        ? (
          <div className="details-wrapper">
            <div className="image-container">
              <div>
                {teacher.is_reviewed && teacher.is_approved
                  ? <h2 style={{ margin: '0 0 30px 0' }}>Teacher Details</h2>
                  : teacher.is_reviewed && !teacher.is_approved ? <h2 style={{ margin: ' 0 0 30px 0' }}>(Rejected) Teacher Details</h2>
                    : null}
                <div className="profile-image" style={{ backgroundImage: `url(${teacher.profile_image})` }} />
                {!teacher.is_reviewed
                  ? (
                    <div>
                      <h3>Proof of address</h3>
                      <div onClick={() => { setShowAdressProofDetails(true); }} className="address-proof-image" style={{ backgroundImage: `url( ${teacher.proof_of_address})` }} />
                    </div>
                  )
                  : null}
              </div>
              {teacher.is_reviewed && teacher.is_approved
                ? <button className="pink-background" onClick={handleRejectTeacher}>Remove</button>
                : teacher.is_reviewed && !teacher.is_approved
                  ? <button className="green-background" onClick={handleApproveTeacher}>Activate</button>
                  : <button className="pink-background" onClick={handleRejectTeacher}>Reject</button>}
            </div>
            <div className="info-container">
              <div style={{ padding: '5px' }}>
                {!teacher.is_reviewed
                  ? <h2 style={{ margin: '0 0 30px 0 ' }}>New Teacher</h2>
                  : null}
                <Accordion title="Contact info">
                  <div>
                    <h3>Name</h3>
                    <p>{`${teacher.first_name} ${teacher.last_name}`}</p>
                    <h3>Email</h3>
                    <p>{teacher.email}</p>
                    <h3>Phone</h3>
                    <p>{teacher.phone}</p>
                    <h3>Address</h3>
                    <p>{teacher.street}</p>
                    <p>{`${teacher.postal_code}, ${teacher.city}`}</p>
                  </div>
                </Accordion>
                <Accordion title="Education">
                  <div>
                    <h3>Degree</h3>
                    <p>{teacher.degree}</p>
                    <h3>University</h3>
                    <p>{teacher.university}</p>
                    <h3>Year of graduation</h3>
                    <p>{formattedDate}</p>
                  </div>
                </Accordion>
                <Accordion title="Teaching experience">
                  <div>
                    <h3>Last workplace</h3>
                    <p>{teacher.last_workplace}</p>
                    <h3>Last position</h3>
                    <p>{teacher.last_position}</p>
                    <h3>Years of experience</h3>
                    <p>{`${teacher.years_of_experience} years`}</p>
                  </div>
                </Accordion>
                <Accordion title="Teaching at DUG">
                  <div>
                    <h3>Subject they wish to teach</h3>
                    {console.log(subjects, languages, facilities)}
                    {subjects && subjects.map((subject, index) => <p key={index}>{subject.name}</p>)}
                    <h3>Languages they wish to teach in</h3>
                    {languages && languages.map((language, index) => <p key={index}>{language.language}</p>)}
                    <h3>Places they wish to teach at</h3>
                    {facilities && facilities.map((facility, index) => <p key={index}>{facility.name}</p>)}
                  </div>
                </Accordion>
              </div>
              {teacher.is_reviewed ? null
                : <button onClick={handleApproveTeacher}>Approve</button>}
            </div>
          </div>
        )
        : <LoadingIcon />}
      {showAdressProofDetails
        ? (
          <div className="address-proof-detail-view">
            <div style={{ alignSelf: 'flex-end' }}>
              <CloseButton selectedCallback={() => setShowAdressProofDetails(false)} />
            </div>
            <div className="address-proof-image">
              <img alt="address-proof" src={teacher.proof_of_address} />
            </div>
          </div>
        )
        : null}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  teacherData: state.data.teacher,
  selectedCallback: props.selectedCallback,
});

export default connect(mapStateToProps, { add_teacher_review })(TeacherDetails);
