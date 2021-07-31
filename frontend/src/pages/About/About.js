import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import BackButton from '../../components/Buttons/BackButton';
import logo from '../../assets/images/logo.png';
import './About.css';

const About = () => {

    const history = useHistory();

    return (
        <div className="about-wrapper">
            <div className="content-container">
                <BackButton buttonWidth={"70px"} selectedCallback={() => history.push("/dashboard")} />
                <h2 style={{ marginTop: "40px" }}>About</h2>
                <img src={logo}></img>
                <p>The youth of "Designers Without Borders South Africa" came up with the idea
                    to link students and volunteering teachers in the area for study sessions
                    in order to combat the impact the current Covid-19 pandamic has on the local youth and their education.
                </p>
            </div>
        </div>
    );
};


export default About;