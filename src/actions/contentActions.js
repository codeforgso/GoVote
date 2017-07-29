import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';
require('es6-promise').polyfill();

export function loadContentSuccess(content) {
  return {
    type: types.LOAD_CONTENT_SUCCESS,
    content,
  };
}

export function loadMainContentSuccess(content) {
  return {
    type: types.LOAD_MAIN_CONTENT_SUCCESS,
    content,
  };
}

// This is a thunk
export function loadContent(jurisdiction, topic) {
  return (dispatch) => {
    fetch(`/api/${jurisdiction}/${topic}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }

        return response.json();
      })
      .then((content) => {
        dispatch(loadContentSuccess(content));
      });
  };
}

// This is also a thunk
export function loadMainContent() {
  return (dispatch) => {
    fetch('/api/main')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }

        return response.json();
      })
      .then((content) => {
        dispatch(loadMainContentSuccess(content));
      });
  };
}

// TODO: Create dispatch action for on failure requestContent
