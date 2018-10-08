export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = ( value, state, currentControl ) => {
    let isValid = true;
        
    if ( !state.controls[currentControl].validation ) {
        return true;
    }

    if ( state.controls[currentControl].validation.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( state.controls[currentControl].validation.minLength ) {
        isValid = value.length >= state.controls[currentControl].validation.minLength && isValid
    }

    if ( state.controls[currentControl].validation.maxLength ) {
        isValid = value.length <= state.controls[currentControl].validation.maxLength && isValid
    }

    if ( state.controls[currentControl].validation.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( state.controls[currentControl].validation.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
};

export const confirmPasswords = ( password, passwordConfirm ) => {

    if ( password === passwordConfirm ) {
      return true;
    } else {
      return false;
    }

};
