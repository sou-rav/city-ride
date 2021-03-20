import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="nav-style ">
            <nav className="nav">
                <ul>
                    <li>
                        <Link id="logo" to="/home">City Ride</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>

                    <li>
                        <Link to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        {loggedInUser.name}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;