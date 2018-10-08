import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            },
            passwordConfirm: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            }
        },
        isSignup: false,
        error: null
    }

    componentDidMount () {
        if ( !this.props.buildingBurger && this.props.authRedirectPath !== '/' ) {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = ( event, controlName ) => {

        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state, controlName ),
                touched: true,
                confirmed: this.state.controls['password'] === this.state.controls['passwordConfirm'] ? true : false
            } )
        } );
        this.setState( { controls: updatedControls } );

    }

    submitHandler = ( event ) => {
        event.preventDefault();

        if( !this.state.isSignup) {

          this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );

        } else if( this.state.isSignup && this.state.controls.password.value === this.state.controls.passwordConfirm.value ) {

          this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );

        } else {
          this.setState( prevState => {
            return { error: "Passwords do not match"}
          });
        }

    }

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return { isSignup: !prevState.isSignup };
        } );
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
          if(this.state.isSignup) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
          } else {
            if(key !== 'passwordConfirm') {
              formElementsArray.push( {
                  id: key,
                  config: this.state.controls[key]
              } );
            }
          }

        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        if ( this.props.loading ) {
            form = <Spinner />
        }

        let errorMessage = null;

        if ( this.props.error ) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        if ( this.state.isSignup ) {
          if ( this.state.controls.passwordConfirm.touched && this.state.controls.password.value !== this.state.controls.passwordConfirm.value ) {
            errorMessage = (
                <p>{"Passwords Must Match"}</p>
            );
          }

        }

        let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignup ? "Sign Up" : "Sign In"}</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger"> {this.state.isSignup ? "Already have an Account?" : "Don't have an Account?"}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );
