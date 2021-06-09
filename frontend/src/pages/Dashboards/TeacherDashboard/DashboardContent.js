import React from 'react';
import './TeacherDashboard.css'
import Card from '../../../components/Cards/Cards'

const DashboardContent = () => {
    return (
        <div>
            <section>
                <h2>Reminder</h2>
            </section>
            <section className="cards-container">
                <Card emoji={<span>&#128198;</span>} title={"Schedule"} />
                <Card emoji={<span>&#128218;</span>} title={"Study material"} />
            </section>
        </div>
    );

};



export default DashboardContent;