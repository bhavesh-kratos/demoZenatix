import React, { Component } from 'react';
import Header from '../common/Header';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { login } from '../../actions/routines';
import { AUTO_LOGIN, FB_APPID } from '../../config/config';
import Loader from '../common/Loader';
import { loading } from '../../actions/routines';

class LoginScreen extends Component {
    // constructor(props) {
    //     super(props);
    // }
    // componentDidMount() {
    //     this.props.loading(true);
    // }
    responseFacebook = (response) => {
        console.log('ere', response, this.props);
        this.props.loading(false);
        if (typeof response !== 'undefined' && response !== null && response.accessToken !== null && response.name) {
            this.props.login(response);
        }
    }

    render() {
        return (
            <div className="score-screen">
                <Header />
                {/* {this.props.loading && <Loader />} */}
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
// function mapStateToProps(state) {
//     return {
//         loading: state.userData.loading
//     };
// }

export default connect(null, { login, loading })(LoginScreen);