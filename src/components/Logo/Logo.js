import React from 'react';

import burgerLogo from '../../assets/images/fortunes.ico';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="Fortunes" />
    </div>
);

export default logo;
