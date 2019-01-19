import { put } from "redux-saga/effects";

import axios from "../../axios-submission";
import * as actions from "../actions";

export function* submitPersonalDataSaga(action) {
  console.log("TRIGGERED " + action);
  yield put(actions.submitPersonalDataStart());
  console.log("Test " + JSON.stringify(action));
  try {
    const response = yield axios.post(
      "/personalData.json?auth=" + action.token,
      action.personalData
    );
    console.log("Tests " + response);
    yield put(
      actions.submitPersonalDataSuccess(response.data.name, action.personalData)
    );
    console.log("Testsss");
  } catch (error) {
    yield put(actions.submitPersonalDataFail(error));
  }
}

export function* fetchPersonalDataSaga(action) {
  yield put(actions.fetchPersonalDataStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("/personalData.json" + queryParams);
    const fetchedPersonalData = [];
    for (let key in response.data) {
      fetchedPersonalData.push({
        ...response.data[key],
        id: key
      });
    }
    yield put(actions.fetchPersonalDataSuccess(fetchedPersonalData));
  } catch (error) {
    yield put(actions.fetchPersonalDataFail(error));
  }
}
