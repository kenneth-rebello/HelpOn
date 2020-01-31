import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setCurrentUser } from './actions/user.action';
import { auth, createUserProfile } from './firebase/firebase.utils';
import { Grid } from '@material-ui/core';
import PrivateRoute from './components/routing/PrivateRoute';

import Navbar from './components/layouts/Navbar';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Sidenav from './components/layouts/Sidenav';
import Regsiter from './components/forms/Regsiter';
import Scanner from './components/donate/Scanner';
import Merchant from './components/dashboard/Merchant';
import NewMember from './components/forms/NewMember';
import Members from './components/members/Members';

const styles = {
  main:{
    marginTop:'64px'
  }
}

axios.defaults.baseURL = "http://localhost:5000";

const App = ({currentUser, setCurrentUser}) => {

  const [size, setSize] = useState(1000);

  useEffect(() => {

    setSize(window.innerWidth);
    window.addEventListener('resize', updateSize);

    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
          
        const userRef = await createUserProfile(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })
      }
    });

    return () => {
      unsubscribeFromAuth();
      window.removeEventListener('resize', updateSize)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateSize = () => {
    setSize(window.innerWidth)
  }

  return (
    <Router>
      <Grid container>
        {size>800 && <Grid item sm={2} style={styles.main}>
          <Sidenav/>
        </Grid>}
        <Grid item sm={size>800 ? 10 : 12} style={styles.main}>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/merchant-dashboard" component={Merchant}/>
            <Route exact path="/register" component={Regsiter}/>
            <Route exact path="/new-member" component={NewMember}/>
            <Route exact path="/donate" component={Scanner}/>
            <Route exact path="/codes" component={Members}/>
          </Switch>
        </Grid>
      </Grid>
    </Router>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps, {setCurrentUser})(App);