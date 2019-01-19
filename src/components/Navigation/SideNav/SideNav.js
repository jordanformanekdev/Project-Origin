import React from 'react';

import classes from './SideNav.css';
import SideNavItems from '../SideNavItems/SideNavItems';


const sideNav = ( props ) => (
    <header className={(props.isAuth ? classes.SideNav : classes.Hide)}>
        <nav className={classes.DesktopOnly}>
            <SideNavItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default sideNav;
