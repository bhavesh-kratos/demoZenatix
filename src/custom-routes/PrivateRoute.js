import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, hasGivenExam, component: Component, ...rest }) => {
  console.log('isauthen', isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
            <Redirect to={'/login'} /> //hasGivenExam ? <Redirect to={'/score'} /> : <Redirect to={'/'} />
          )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.userData.user_data,
    hasGivenExam: !state.examState.can_attempt
  };
}

export default connect(mapStateToProps)(PrivateRoute);
