const SET_DATA = 'SET_DATA';
const SET_ITEM = 'SET_ITEM';

const initialState = {
  data: [],
  item: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return {
        ...state,
        data: action.payload
      }
    }

    case SET_ITEM: {
      return {
        ...state,
        item: action.payload
      }
    }

    default:
      return state;
  };
};

export const setData = payload => ({
  type: SET_DATA,
  payload 
});

export const setItem = payload => ({
  type: SET_ITEM,
  payload 
});
