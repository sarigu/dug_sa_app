import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { update_teacher, load_subjects, load_languages } from '../../../actions/auth';
import Carousel, { CarouselItem } from '../../Carousel/Carousel';
import '../SignUpForms.css';
import { validateYear, validateExperince, validatePhone } from '../../../utils';

const TeacherSignUpFlow = ({
  update_teacher, load_subjects, load_languages, subjects, languages, user, error,
}) => {
  useEffect(() => {
    load_subjects();
    load_languages();
  }, []);

  const [degreeError, setDegreeError] = useState(false);
  const [universityError, setUniversityError] = useState(false);
  const [graduationDateError, setGraduationDateError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [schoolError, setSchoolError] = useState(false);
  const [experienceError, setExperienceError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [poastalCodeError, setPoastalCodeError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [addressProofError, setAddressProofError] = useState(false);
  const [subjectsError, setSubjectsError] = useState(false);
  const [languagesError, setLanguagesError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [graduationDate, setGraduationDate] = useState();

  const [formData, setFormData] = useState({
    degree: '',
    university: '',
    year_of_graduation: undefined,
    last_position: '',
    last_school: '',
    years_of_experience: null,
    street: '',
    postal_code: '',
    city: '',
    proof_of_address: undefined,
    profile_image: undefined,
    phone_number: null,
  });

  const hiddenFileInputAddress = React.useRef(null);
  const hiddenFileInputProfileImage = React.useRef(null);

  const {
    degree, university, last_position, last_school, years_of_experience, street, postal_code, city, proof_of_address, profile_image, phone_number,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const checkData = () => {
    if (!phone_number) {
      setPhoneNumberError(true);
      setCarouselIndex(6);
      return false;
    } else {
      const isValidated = validatePhone(phone_number);
      if (!isValidated) {
        setPhoneNumberError(true);
        setCarouselIndex(6);
        return false;
      }
    }

    if (!profile_image) {
      setProfileImageError(true);
      setCarouselIndex(6);
      return false;
    }

    if (!proof_of_address) {
      setAddressProofError(true);
      setCarouselIndex(5);
      return false;
    }

    if (!street) {
      setStreetError(true);
      setCarouselIndex(5);
      return false;
    }

    if (!postal_code) {
      setPoastalCodeError(true);
      setCarouselIndex(5);
      return false;
    }

    if (!city) {
      setCityError(true);
      setCarouselIndex(5);
      return false;
    }

    if (!last_position) {
      setPositionError(true);
      setCarouselIndex(1);
      return false;
    }

    if (!last_school) {
      setSchoolError(true);
      setCarouselIndex(1);
      return false;
    }

    if (!years_of_experience) {
      setExperienceError(true);
      setCarouselIndex(1);
      return false;
    }
    const isValidated = validateExperince(years_of_experience);
    if (!isValidated) {
      setExperienceError(true);
      setCarouselIndex(1);
      return false;
    }

    if (!degree) {
      setDegreeError(true);
      setCarouselIndex(7);
      return false;
    }

    if (!university) {
      setUniversityError(true);
      setCarouselIndex(7);
      return false;
    }

    if (!graduationDate) {
      setGraduationDateError(true);
      setCarouselIndex(7);
      return false;
    } else {
      const isValidated = validateYear(graduationDate);
      if (!isValidated) {
        setGraduationDateError(true);
        setCarouselIndex(7);
        return false;
      }
    }

    if (!selectedSubjects || selectedSubjects.length <= 0) {
      setSubjectsError(true);
      setCarouselIndex(2);
      return false;
    }

    if (!selectedLanguages || selectedLanguages.length <= 0) {
      setLanguagesError(true);
      setCarouselIndex(3);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    const dataIsChecked = checkData();
    if (dataIsChecked) {
      update_teacher(user.id, degree, university, graduationDate, last_position, last_school, years_of_experience, street, postal_code, city, proof_of_address, profile_image, phone_number, selectedSubjects, selectedLanguages);
    }
  };

  const handleSelectedOptions = (e) => {
    e.preventDefault();
    const allSubjects = selectedSubjects;
    const allLanguages = selectedLanguages;

    const optionId = e.target.getAttribute('data-id');
    const optionType = e.target.getAttribute('data-type');
    if (optionType === 'subject') {
      setSubjectsError(false);
    } else {
      setLanguagesError(false);
    }
    const optionCards = document.querySelectorAll(`[data-type="${optionType}"]`);
    let card;
    optionCards.forEach((elem) => {
      if (elem.dataset.id === optionId) {
        card = elem;
      }
    });
    if (card.classList.contains('active-card')) {
      if (optionType === 'subject') {
        card.classList.remove('active-card');
        const index = allSubjects.indexOf(optionId);
        if (index !== -1) {
          allSubjects.splice(index, 1);
        }
      } else {
        card.classList.remove('active-card');
        const index = allLanguages.indexOf(optionId);
        if (index !== -1) {
          allLanguages.splice(index, 1);
        }
      }
    } else if (optionType === 'subject') {
      card.classList.add('active-card');
      allSubjects.push(optionId);
    } else {
      card.classList.add('active-card');
      allLanguages.push(optionId);
    }

    setSelectedSubjects(allSubjects);
    setSelectedLanguages(allLanguages);
  };

  const subjectsList = subjects.map((subject) => <div onClick={handleSelectedOptions} className="options-card" data-type="subject" data-id={subject.id}>{subject.name}</div>);
  const languageList = languages.map((language) => <div onClick={handleSelectedOptions} className="options-card" data-type="language" data-id={language.id}>{language.language}</div>);

  return (
    <div className="signup-flow-wrapper">
      <h2>Great to have you onboard</h2>
      <p>We need some more information to verify you as a teacher.</p>
      {error === 'teacher_update_fail' ? <div className="error-message">Oops, something went wrong. Please try again</div> : null}
      <Carousel onSubmit={handleSubmit} backToIndex={carouselIndex}>
        <CarouselItem>
          <div>
            <h3>Your education</h3>
            <input
              className={degreeError ? 'notValidated' : null}
              placeholder="Your degree"
              type="text"
              name="degree"
              value={degree}
              onChange={(e) => { setDegreeError(false); handleChange(e); }}
            />
            <input
              className={universityError ? 'notValidated' : null}
              placeholder="University"
              type="text"
              name="university"
              value={university}
              onChange={(e) => { setUniversityError(false); handleChange(e); }}
            />
            <input
              className={graduationDateError ? 'notValidated' : null}
              placeholder="Graduation Date (DD.MM.YYYY)"
              type="text"
              name="year_of_graduation"
              value={graduationDate}
              onChange={(e) => {
                setGraduationDateError(false);
                handleChange(e);
                let changedGraduationDate = e.target.value;
                changedGraduationDate = changedGraduationDate
                  .replace(/^(\d\d)(\d)$/g, '$1.$2')
                  .replace(/^(\d\d\.\d\d)(\d+)$/g, '$1.$2')
                  .replace(/[^\d\.]/g, '');
                setGraduationDate(changedGraduationDate);
              }}
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div>
            <h3>Your teaching experience</h3>
            <input
              className={positionError ? 'notValidated' : null}
              placeholder="Last position"
              type="text"
              name="last_position"
              value={last_position}
              onChange={(e) => { setPositionError(false); handleChange(e); }}
            />
            <input
              className={schoolError ? 'notValidated' : null}
              placeholder="Last school"
              type="text"
              name="last_school"
              value={last_school}
              onChange={(e) => { setSchoolError(false); handleChange(e); }}
            />
            <input
              className={experienceError ? 'notValidated' : null}
              placeholder="Years of experience"
              type="number"
              name="years_of_experience"
              value={years_of_experience}
              onChange={(e) => { setExperienceError(false); handleChange(e); }}
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div>
            {subjectsError ? <div className="error-message">Please select at least one subject</div> : null}
            <h3>
              Subjects you would
              <br />
              want to teach
            </h3>
            <div className="scroll-container">{subjectsList}</div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div>
            {languagesError ? <div className="error-message">Please select at least one language</div> : null}
            <h3>
              Languages you would
              <br />
              want to teach in
            </h3>
            <div className="scroll-container">{languageList}</div>

          </div>
        </CarouselItem>
        <CarouselItem>
          <div>
            <h3>
              Location you
              <br />
              want to teach at
            </h3>
            <div className="options-card active-card">Dug facility</div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div>
            <h3>Your address</h3>
            <input
              className={streetError ? 'notValidated' : null}
              placeholder="Street"
              type="text"
              name="street"
              value={street}
              onChange={(e) => { setStreetError(false); handleChange(e); }}
            />
            <input
              className={poastalCodeError ? 'notValidated' : null}
              placeholder="Postal Code"
              type="text"
              name="postal_code"
              value={postal_code}
              onChange={(e) => { setPoastalCodeError(false); handleChange(e); }}
            />
            <input
              className={cityError ? 'notValidated' : null}
              placeholder="City"
              type="text"
              name="city"
              value={city}
              onChange={(e) => { setCityError(false); handleChange(e); }}
            />
            {addressProofError
              ? <p className="errorMsg">Please upload a proof of address</p>
              : null}
            <div className="proof-of-address-container">
              <img alt="proof-of-address" id="proof-of-address" style={{ width: '160px', height: '180px', marginRight: '30px' }} />
              <button onClick={() => { setAddressProofError(false); hiddenFileInputAddress.current.click(); }}>Upload a proof of address</button>
              <input
                type="file"
                ref={hiddenFileInputAddress}
                style={{ display: 'none' }}
                placeholder="Proof of Address"
                name="proof_of_address"
                accept="image/*"
                onChange={(e) => { handleImageChange(e); document.getElementById('proof-of-address').src = window.URL.createObjectURL(e.target.files[0]); }}
              />
            </div>

          </div>
        </CarouselItem>
        <CarouselItem>
          <div>
            <h3>Details about you</h3>
            {profileImageError
              ? <p className="errorMsg">Please upload a profile image</p>
              : null}
            <img alt="profile" id="profile-image" src="" width="200" height="200" />
            <button onClick={() => { setProfileImageError(false); hiddenFileInputProfileImage.current.click(); }} style={{ width: '250px', margin: '10px 0 20px 0 ' }}>Upload a profile image</button>
            <input
              type="file"
              ref={hiddenFileInputProfileImage}
              style={{ display: 'none' }}
              placeholder="Profile Image"
              name="profile_image"
              accept="image/*"
              onChange={(e) => { handleImageChange(e); document.getElementById('profile-image').src = window.URL.createObjectURL(e.target.files[0]); }}
            />
            <input
              className={phoneNumberError ? 'notValidated' : null}
              placeholder="Phone number"
              type="tel"
              name="phone_number"
              value={phone_number}
              onChange={(e) => { setPhoneNumberError(false); handleChange(e); }}
            />
          </div>
        </CarouselItem>
      </Carousel>
    </div>

  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  subjects: state.auth.subjects,
  error: state.auth.error,
  languages: state.auth.languages,
});

export default connect(mapStateToProps, { update_teacher, load_subjects, load_languages })(TeacherSignUpFlow);
