import * as actionTypes from "./actionTypes";

export const submitPersonalDataSuccess = (id, personalData) => {
  console.log("SUCCESS");
  return {
    type: actionTypes.SUBMIT_PERSONAL_DATA_SUCCESS,
    personalDataId: id,
    personalData: personalData
  };
};

export const submitPersonalDataFail = error => {
  return {
    type: actionTypes.SUBMIT_PERSONAL_DATA_FAIL,
    error: error
  };
};

export const submitPersonalDataStart = () => {
  return {
    type: actionTypes.SUBMIT_PERSONAL_DATA_START
  };
};

export const submitPersonalData = (personalData, token) => {
  return {
    type: actionTypes.SUBMIT_PERSONAL_DATA,
    personalData: personalData,
    token: token
  };
};

export const submitPersonalDataInit = () => {
  return {
    type: actionTypes.SUBMIT_PERSONAL_DATA_INIT
  };
};

export const fetchPersonalDataSuccess = personalData => {

  return {
    type: actionTypes.FETCH_PERSONAL_DATA_SUCCESS,
    personalData: personalData
  };
};

export const fetchPersonalDataFail = error => {
  return {
    type: actionTypes.FETCH_PERSONAL_DATA_FAIL,
    error: error
  };
};

export const fetchPersonalDataStart = () => {
  return {
    type: actionTypes.FETCH_PERSONAL_DATA_START
  };
};

export const fetchPersonalData = (token, userId) => {
  return {
    type: actionTypes.FETCH_PERSONAL_DATA,
    token: token,
    userId: userId
  };
};
