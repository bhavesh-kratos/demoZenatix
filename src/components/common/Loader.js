import React, { Component } from 'react';
import { Dimmer, Modal } from 'semantic-ui-react';


const Loader = () => {
    return (<Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
            </Dimmer>
    );
}

export default Loader;