import React from 'react';
import { connect } from 'react-redux';
import { Image, Button } from 'semantic-ui-react';

const Header = ({ picture, name, logout }) => {
    return <div className="exam-header-theme exam-header app-header ui raised" style={{ minWidth: '100%' }}>
        <div className="user">
            {picture && <Image src={picture.data.url} avatar />}
            <span className="display-name">{name ? name : 'Demo App'}</span>
        </div>
        {logout && <Button size="small" className="traverse-button" onClick={() => logout()}>Logout</Button>}
    </div>
}
Header.defaultProps = { picture: null, name: null, logout: null };
export default Header;