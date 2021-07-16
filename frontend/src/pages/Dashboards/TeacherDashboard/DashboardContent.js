import React from 'react';
import '../Dashboard.css'
import Card from '../../../components/Cards/Cards'
import AllClassesButton from '../../../components/Buttons/AllClassesButton/AllClassesButton'

const DashboardContent = () => {
    return (
        <div>
            <section className="reminder-container" >
                <div className="heading-wrapper">
                    <h2>Reminder</h2>
                    <AllClassesButton buttonWidth={"120px"} />
                </div>
                <p>No reminders at the moment</p>
            </section>
            <section className="cards-container">
                <Card emoji={<span>&#128198;</span>} title={"Schedule"} />
                <Card emoji={<span>&#128218;</span>} title={"Study material"} />
            </section>
        </div>
    );

};



export default DashboardContent;