import React, { useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Navbar from './components/layouts/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

const styles = {
  main:{
    marginTop:'64px'
  }
}

const App = ({currentUser}) => {


  return (
    <Router>
      <Navbar/>
      <div style={styles.main}>
        <Switch>
          <Route exact path="/" render={()=> currentUser ? (<Redirect to="/dashboard"/>):<Login/>}/>
          <Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect()(App);