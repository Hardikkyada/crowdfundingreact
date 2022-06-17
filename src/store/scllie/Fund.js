import {createSlice} from '@reduxjs/toolkit';
import Authuser from '../../api/Authuser';

const initialState = {
  transaction: [],
};

export const Fund = createSlice({
  name: 'fund',
  initialState,
  reducers: {
    SETTRAN: (state, action) => {
      state.transaction.push(action.payload.data);
    },
  },
});

export const addtrandata = data => {
  return dispatch => {
    console.log(data);
    Authuser.post('/Addfund', data)
      .then(res => {
        dispatch(SETTRAN(res.data.data));
      })
      .catch(e => {
        throw new Error(e.message);
      });
  };
};

export const {SETTRAN} = Fund.actions;

export default Fund.reducer;
