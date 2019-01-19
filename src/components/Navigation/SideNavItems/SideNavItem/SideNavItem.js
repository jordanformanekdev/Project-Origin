import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './SideNavItem.css';

const sideNavItem = ( props ) => (
    <li className={classes.SideNavItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default sideNavItem;
