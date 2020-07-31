import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; // import bootstrap

// import components
import Navbar from './components/navbar.component';
import Landing from './components/landing.component';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route path="/" exact component={Landing} />
      </div>
    </Router>
  );
}

export default App;
