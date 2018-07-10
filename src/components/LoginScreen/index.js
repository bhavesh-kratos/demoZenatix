import React, { Component } from 'react';
import Header from '../common/Header';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { login } from '../../actions/routines';
import { AUTO_LOGIN, FB_APPID } from '../../config/config';
import Loader from '../common/Loader';

class LoginScreen extends Component {

    responseFacebook = (response) => {
        console.log('ere', response, this.props);
        if (typeof response !== 'undefined' && response !== null && response.accessToken !== null && response.name) {
            console.log('response', this.props);
            this.props.login(response);
        }
    }

    render() {
        return (
            <div className="score-screen">
                <Header />
                <FacebookLogin
                    appId={FB_APPID}
                    autoLoad={AUTO_LOGIN}
                    fields="name,email,picture"
                    scope="public_profile,user_friends,user_posts"
                    callback={this.responseFacebook}
                    icon="facebook"
                    cssClass="ui facebook button"
                />
            </div>
        )
    }
}

export default connect(null, { login })(LoginScreen);