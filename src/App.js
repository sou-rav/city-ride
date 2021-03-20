import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login/Login';

import Error from './components/Error/Error';
import Destination from './components/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRoute from './components/Home/PrivateRoute/PrivateRoute';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser ] = useState({})
  return (
    <UserContext.Provider value ={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Switch>

        <Route path="/home">
          <Home></Home>
        </Route>

        <Route path="/login">
          <Login></Login>
        </Route>
        <PrivateRoute path="/destination">
         <Destination></Destination>
        </PrivateRoute>

        <PrivateRoute path="/type/:type">
        <Destination></Destination>
        </PrivateRoute>

        <Route exact path="/">
          <Home></Home>
        </Route>

        <Route path="*">
          <Error></Error>
        </Route>

      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
