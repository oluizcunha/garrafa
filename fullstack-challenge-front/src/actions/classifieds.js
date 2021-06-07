import {
  CREATE_CLASSIFIED,
  RETRIEVE_CLASSIFIEDS,
  UPDATE_CLASSIFIED,
} from './types';

import ClassifiedDataService from '../services/classified.service';

export const createClassified = (title, description) => async (dispatch) => {
  try {
    const res = await ClassifiedDataService.create({ title, description });

    dispatch({
      type: CREATE_CLASSIFIED,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveClassifieds = () => async (dispatch) => {
  try {
    const res = await ClassifiedDataService.getAll();

    dispatch({
      type: RETRIEVE_CLASSIFIEDS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateClassified = (id, data) => async (dispatch) => {
  try {
    const res = await ClassifiedDataService.update(id, data);

    dispatch({
      type: UPDATE_CLASSIFIED,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findClassifiedsByTitle = (title) => async (dispatch) => {
  try {
    const res = await ClassifiedDataService.findByTitle(title);

    dispatch({
      type: RETRIEVE_CLASSIFIEDS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
