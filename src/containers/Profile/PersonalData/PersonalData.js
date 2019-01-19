import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './PersonalData.css';
import axios from '../../../axios-submission';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class PersonalData extends Component {
    state = {
        personalData: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            middleName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Middle'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    }

<<<<<<< HEAD
    //Handles personalData submission from
    personalDataHandler = ( event ) => {
=======
    //Handles profile submission from
    profileHandler = ( event ) => {
>>>>>>> d608db93fd7c03974bc418a9705482061982cb16

        //Prevents action from being submitted twice
        event.preventDefault();

<<<<<<< HEAD
        //Variable used to capture current state of personalData
        const formData = {};

        //Populate form data with personalData input from state
        for (let formElementIdentifier in this.state.personalData) {
            formData[formElementIdentifier] = this.state.personalData[formElementIdentifier].value;
        }

        //Construct json map of personal data
        const personalData = {
=======
        //Variable used to capture current state of profileForm
        const formData = {};

        //Populate form data with profileForm data from state
        for (let formElementIdentifier in this.state.profileForm) {
            formData[formElementIdentifier] = this.state.profileForm[formElementIdentifier].value;
        }

        //Construct json map of profile data
        const profile = {
            ingredients: this.props.ings,
            price: this.props.price,
>>>>>>> d608db93fd7c03974bc418a9705482061982cb16
            personalData: formData,
            userId: this.props.userId
        }

        //Sends to mapDispatchToProps
<<<<<<< HEAD
        this.props.onPersonalDataSubmit(personalData, this.props.token);
=======
        this.props.onprofileBurger(profile, this.props.token);
>>>>>>> d608db93fd7c03974bc418a9705482061982cb16

    }

    //Handles changes in inputs when user enters information
    inputChangedHandler = (event, inputIdentifier) => {

        //Variable used to update state of element when input changes and is verified
<<<<<<< HEAD
        const updatedFormElement = updateObject(this.state.personalData[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.personalData[inputIdentifier].validation),
=======
        const updatedFormElement = updateObject(this.state.profileForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.profileForm[inputIdentifier].validation),
>>>>>>> d608db93fd7c03974bc418a9705482061982cb16
            touched: true
        });

        //Variable used to update state of form when input changes
<<<<<<< HEAD
        const updatedpersonalData = updateObject(this.state.personalData, {
=======
        const updatedprofileForm = updateObject(this.state.profileForm, {
>>>>>>> d608db93fd7c03974bc418a9705482061982cb16
            [inputIdentifier]: updatedFormElement
        });

        //Variable used to detect form validity
        let formIsValid = true;

<<<<<<< HEAD
        //Loop through state of personalData to check validity placholder
        for (let inputIdentifier in updatedpersonalData) {
            formIsValid = updatedpersonalData[inputIdentifier].valid && formIsValid;
        }

        //Alter state with the updated form and it's validity
        this.setState({personalData: updatedpersonalData, formIsValid: formIsValid});
=======
        //Loop through state of profileForm to check validity placholder
        for (let inputIdentifier in updatedprofileForm) {
            formIsValid = updatedprofileForm[inputIdentifier].valid && formIsValid;
        }

        //Alter state with the updated form and it's validity
        this.setState({profileForm: updatedprofileForm, formIsValid: formIsValid});
>>>>>>> d608db93fd7c03974bc418a9705482061982cb16
    }

    render () {

        //Array of form elements (aka: Input Components)
        const formElementsArray = [];

        // Create formElementsArray according to the
<<<<<<< HEAD
        // personalData structure provided in state
        for (let key in this.state.personalData) {
            //Add key and input configs
            formElementsArray.push({
                id: key,
                config: this.state.personalData[key]
=======
        // profileForm structure provided in state
        for (let key in this.state.profileForm) {
            //Add key and input configs
            formElementsArray.push({
                id: key,
                config: this.state.profileForm[key]
>>>>>>> d608db93fd7c03974bc418a9705482061982cb16
            });
        }

        //Create form to render
        let form = (
<<<<<<< HEAD
            //Submits to pesonalDataHandler where it will be dispatched
            <form onSubmit={this.personalDataHandler}>
                 {/* Event Submitted to personalDataHandler */}
=======
            //Submits to profileHandler where it will be dispatched
            <form onSubmit={this.profileHandler}>
                 {/* Event Submitted to profileHandler */}
>>>>>>> d608db93fd7c03974bc418a9705482061982cb16
                {formElementsArray.map(formElement => (
                    //Input Component [src/components/UI/Input]
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}

                {/* Button Component [src/components/UI/Button] (submits Input event) */}
<<<<<<< HEAD

=======
>>>>>>> d608db93fd7c03974bc418a9705482061982cb16
                <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
        );

        //Initiate spinner while data loads
        if ( this.props.loading ) {
            form = <Spinner />;
        }

        return (
            //JSX that renders form
            <div className={classes.PersonalData}>
                <h4>Who are you?</h4>
                {/* form object as created above */}
                {form}
            </div>
        );
    }
}

//Pieces of state from other components
const mapStateToProps = state => {
    return {
<<<<<<< HEAD
        loading: state.personalData.loading,
=======
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.profile.loading,
>>>>>>> d608db93fd7c03974bc418a9705482061982cb16
        token: state.auth.token,
        userId: state.auth.userId
    }
};

<<<<<<< HEAD
//Submits personalData to action purchasBurger
const mapDispatchToProps = dispatch => {
    return {
        onPersonalDataSubmit: (personalData, token) => dispatch(actions.submitPersonalData(personalData, token))
=======
//Submits profile to action purchasBurger
const mapDispatchToProps = dispatch => {
    return {
        onprofileBurger: (personalData, token) => dispatch(actions.purchaseBurger(personalData, token))
>>>>>>> d608db93fd7c03974bc418a9705482061982cb16
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PersonalData, axiosProfile));
