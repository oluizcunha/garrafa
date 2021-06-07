import {
  CREATE_CLASSIFIED,
  RETRIEVE_CLASSIFIEDS,
  UPDATE_CLASSIFIED,
} from '../actions/types';

const initialState = [];

function classifiedReducer(classifieds = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CLASSIFIED:
      return [...classifieds, payload];

    case RETRIEVE_CLASSIFIEDS:
      return payload;

    case UPDATE_CLASSIFIED:
      return classifieds.map((classified) => {
        if (classified.id === payload.id) {
          return {
            ...classified,
            ...payload,
          };
        } else {
          return classified;
        }
      });

    default:
      return classifieds;
  }
}

export default classifiedReducer;
