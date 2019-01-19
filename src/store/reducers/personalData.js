import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    personalData: [],
    loading: false,
    submitted: false
};

const submitPersonalDataInit = ( state, action ) => {
    return updateObject( state, { submitted: false } );
};

const submitPersonalDataStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const submitPersonalDataSuccess = ( state, action ) => {
    const submittedPersonalData = updateObject( action.orderData, { id: action.personalDataId } );
    return updateObject( state, {
        loading: false,
        submitted: true,
        personalData: state.personalData.concat( submittedPersonalData )
    } );
};

const submitPersonalDataFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchPersonalDataStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchPersonalDataSuccess = ( state, action ) => {
    return updateObject( state, {
        personalData: action.personalData,
        loading: false
    } );
};

const fetchPersonalDataFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SUBMIT_PERSONAL_DATA_INIT: return submitPersonalDataInit( state, action );
        case actionTypes.SUBMIT_PERSONAL_DATA_START: return submitPersonalDataStart( state, action );
        case actionTypes.SUBMIT_PERSONAL_DATA_SUCCESS: return submitPersonalDataSuccess( state, action )
        case actionTypes.SUBMIT_PERSONAL_DATA_FAIL: return submitPersonalDataFail( state, action );
        case actionTypes.FETCH_PERSONAL_DATA_START: return fetchPersonalDataStart( state, action );
        case actionTypes.FETCH_PERSONAL_DATA_SUCCESS: return fetchPersonalDataSuccess( state, action );
        case actionTypes.FETCH_PERSONAL_DATA_FAIL: return fetchPersonalDataFail( state, action );
        default: return state;
    }
};

export default reducer;
