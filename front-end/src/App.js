import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Manage from './pages/Manage';
import PrivateRoute from './guard/auth';

import { useDispatch } from 'react-redux';

import * as API from './services/axios';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(API.itemSearch());
  }, []);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <PrivateRoute path="/manage" component={Manage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
