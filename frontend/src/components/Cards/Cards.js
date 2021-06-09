import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css'

const Card = (props) => {
    return (
        <Link to={props.link}>
            <div className="card-container">
                <div className="card-content">
                    {props.emoji}
                    <h5>{props.title}</h5>
                </div>
            </div>
        </Link>
    );

};



export default Card;