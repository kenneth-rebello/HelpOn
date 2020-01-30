import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'

const PrivateRoute = ({component: Component, user:{registered, loading}, ...rest}) => {
    return (
        <Route {...rest} render = {props => !registered &&!loading ? (
            <Redirect to= "/" />
        ):(
            <Component {...props}/>
        )}/>
    )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);