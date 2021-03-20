import React from 'react';
import { Link } from 'react-router-dom';
import './Counter.css'

const Counter = (props) => {
    const {img, type} = props.car
    return (
        <div className="div-style shadow">
            <img src={img} alt=""/>
            <Link to={"/type/"+type}><h3>{type}</h3></Link>
        </div>
    );
};

export default Counter;