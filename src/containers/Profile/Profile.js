import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import PersonalData from './PersonalData/PersonalData';

class Profile extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/profile/personal-data' );
    }

    render () {

        let summary = (
            <div>
                <Route
                    path={this.props.match.path + '/personal-data'}
                    component={PersonalData} />
            </div>
        );

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect( mapStateToProps )( Profile );
