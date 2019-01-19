import React from 'react';

import classes from './SideNavItems.css';
import SideNavItem from './SideNavItem/SideNavItem';



const sideNavItems = ( props ) => (
    <ul className={classes.SideNavItems}>

        {props.isAuthenticated ? <SideNavItem link="/profile/personal-data">Profile</SideNavItem> : null}
        {props.isAuthenticated ? <SideNavItem link="/orders">Orders</SideNavItem> : null}
        {!props.isAuthenticated
            ? <SideNavItem link="/auth">Authenticate</SideNavItem>
            : <SideNavItem link="/logout">Logout</SideNavItem>}
    </ul>
);

export default sideNavItems;
