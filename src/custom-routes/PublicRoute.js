import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  console.log('isauthen', isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  console.log('ads', state.auth);
  return {
    isAuthenticated: !!state.userData.user_data
  };
}

export default connect(mapStateToProps)(PublicRoute);
