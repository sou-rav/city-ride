import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import fakeData from '../../fakeData/data.json';
import Counter from './Counter/Counter';
import './Home.css'
import backGroundImg from '../../Bg.png'

const Home = () => {
    const [cars, setCars] = useState([]);
    console.log(cars)
    useEffect(() => {
        setCars(fakeData)
    }, [])
    return (
        <div className="container">
        <div id="backgroundImage" style={{backgroundImage:`url(${backGroundImg})`}}>
            <Header></Header>
            <div className="divStyle">
            {
                cars.map(car => <Counter car={car} key={car.id}></Counter>)
            }
            </div>
        </div>
        </div>
    );
};

export default Home;