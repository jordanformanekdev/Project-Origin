import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './PersonalData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class PersonalData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    //Handles order submission from
    orderHandler = ( event ) => {

        //Prevents action from being submitted twice
        event.preventDefault();

        //Variable used to capture current state of orderForm
        const formData = {};

        //Populate form data with orderForm data from state
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        //Construct json map of order data
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        //Sends to mapDispatchToProps
        this.props.onOrderBurger(order, this.props.token);

    }

    //Handles changes in inputs when user enters information
    inputChangedHandler = (event, inputIdentifier) => {

        //Variable used to update state of element when input changes and is verified
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });

        //Variable used to update state of form when input changes
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        //Variable used to detect form validity
        let formIsValid = true;

        //Loop through state of orderForm to check validity placholder
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        //Alter state with the updated form and it's validity
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {

        //Array of form elements (aka: Input Components)
        const formElementsArray = [];

        // Create formElementsArray according to the
        // orderForm structure provided in state
        for (let key in this.state.orderForm) {
            //Add key and input configs
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        //Create form to render
        let form = (
            //Submits to orderHandler where it will be dispatched
            <form onSubmit={this.orderHandler}>
                 {/* Event Submitted to orderHandler */}
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
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        //Initiate spinner while data loads
        if ( this.props.loading ) {
            form = <Spinner />;
        }

        return (
            //JSX that renders form
            <div className={classes.PersonalData}>
                <h4>Enter your Personal Data</h4>
                {/* form object as created above */}
                {form}
            </div>
        );
    }
}

//Pieces of state from other components
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

//Submits order to action purchasBurger
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PersonalData, axios));
