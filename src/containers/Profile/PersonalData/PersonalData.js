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

    //Handles personalData submission from
    personalDataHandler = ( event ) => {

        //Prevents action from being submitted twice
        event.preventDefault();

        //Variable used to capture current state of personalData
        const formData = {};

        //Populate form data with personalData input from state
        for (let formElementIdentifier in this.state.personalData) {
            formData[formElementIdentifier] = this.state.personalData[formElementIdentifier].value;
        }

        //Construct json map of personal data
        const personalData = {
            personalData: formData,
            userId: this.props.userId
        }

        //Sends to mapDispatchToProps
        this.props.onPersonalDataSubmit(personalData, this.props.token);

    }

    //Handles changes in inputs when user enters information
    inputChangedHandler = (event, inputIdentifier) => {

        //Variable used to update state of element when input changes and is verified
        const updatedFormElement = updateObject(this.state.personalData[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.personalData[inputIdentifier].validation),
            touched: true
        });

        //Variable used to update state of form when input changes
        const updatedpersonalData = updateObject(this.state.personalData, {
            [inputIdentifier]: updatedFormElement
        });

        //Variable used to detect form validity
        let formIsValid = true;

        //Loop through state of personalData to check validity placholder
        for (let inputIdentifier in updatedpersonalData) {
            formIsValid = updatedpersonalData[inputIdentifier].valid && formIsValid;
        }

        //Alter state with the updated form and it's validity
        this.setState({personalData: updatedpersonalData, formIsValid: formIsValid});
    }

    render () {

        //Array of form elements (aka: Input Components)
        const formElementsArray = [];

        // Create formElementsArray according to the
        // personalData structure provided in state
        for (let key in this.state.personalData) {
            //Add key and input configs
            formElementsArray.push({
                id: key,
                config: this.state.personalData[key]
            });
        }

        //Create form to render
        let form = (
            //Submits to pesonalDataHandler where it will be dispatched
            <form onSubmit={this.personalDataHandler}>
                 {/* Event Submitted to personalDataHandler */}
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
        loading: state.personalData.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

//Submits personalData to action purchasBurger
const mapDispatchToProps = dispatch => {
    return {
        onPersonalDataSubmit: (personalData, token) => dispatch(actions.submitPersonalData(personalData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PersonalData, axios));
