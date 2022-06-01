import {createSlice} from '@reduxjs/toolkit';
import Authuser from '../../api/Authuser';

const initialState = {
  users: [],
  userpost: [],
  token: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SETUSER: (state, action) => {
      state.users = action.payload;
    },
    LOGIN: (state, action) => {
      // console.log('state', state.users);
      // const user = {
      //   email: action.payload.email,
      //   password: action.payload.password,
      // };
      console.log(action.payload);
      state.users = action.payload.user;
      state.token = action.payload.token;
    },
    SIGNUP: (state, action) => {
      // console.log(state.users);
      //   console.log(user);
      // const res = await Authuser.post('/reg', user);
      // (state.users = res.data.user), (state.token = res.data.token);
      console.log(action.payload);
      state.users = action.payload.user;
      state.token = action.payload.token;
    },
    SETTOKEN: (state, action) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const CheckLogin = userdata => {
  return dispatch => {
    Authuser.post('/login', userdata)
      .then(res => {
        console.log('*****', res.data);
        localStorage.setItem('token', res.data.token);
        Authuser.defaults.headers.common['Authorization'] =
          'Bearer ' + res.data.token;
        dispatch(LOGIN(res.data));
      })
      .catch(e => {
        console.log(e);
      });
  };
};

export const CheckReg = userdata => {
  return dispatch => {
    Authuser.post('/reg', userdata)
      .then(res => {
        console.log('*****', res.data);
        localStorage.setItem('token', res.data.token);
        Authuser.defaults.headers.common['Authorization'] =
          'Bearer ' + res.data.token;
        dispatch(SIGNUP(res.data));
      })
      .catch(e => {
        console.log(e);
      });
  };
};

export const {LOGIN, SIGNUP, SETTOKEN, SETUSER} = user.actions;

export default user.reducer;
