import {createSlice} from '@reduxjs/toolkit';
import Authuser from '../../api/Authuser';

const initialState = {
  users: [],
  userpost: [],
  token: '',
  error: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SETUSER: (state, action) => {
      state.users = action.payload;
    },
    LOGIN: (state, action) => {
      console.log(action.payload);
      state.users = action.payload.user;
      state.token = action.payload.token;
      state.error = '';
    },
    SIGNUP: (state, action) => {
      // console.log(state.users);
      //   console.log(user);
      // const res = await Authuser.post('/reg', user);
      // (state.users = res.data.user), (state.token = res.data.token);
      console.log(action.payload);
      state.users = action.payload.user;
      state.token = action.payload.token;
      state.error = '';
    },
    SETTOKEN: (state, action) => {
      state.token = action.payload;
      state.error = '';
    },
    SETERROR: (state, action) => {
      state.error = action.payload;
    },
    SETPOST: (state, action) => {
      state.userpost = action.payload;
    },
  },
  // extraReducers:{
  //   [LOGIN.fullfilled]:(state.action) => {
  //     state.error = ""
  //   }
  // }
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
        console.log(e.response.data.error);
        dispatch(SETERROR(e.response.data.error));
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
        console.log(e.response.data.error);
        dispatch(SETERROR(e.response.data.error));
      });
  };
};

export const setpostdata = id => {
  return dispatch => {
    Authuser.get('/getuserPost/' + id)
      .then(res => {
        // console.log(res.data);
        dispatch(SETPOST(res.data.data));
      })
      .catch(e => {
        if (e.response.status === 404) {
          console.log('Data Not Found');
          dispatch(SETPOST([]));
          return;
        }
        // throw new Error(e);
      });
  };
};

export const {LOGIN, SIGNUP, SETTOKEN, SETUSER, SETERROR, SETPOST} =
  user.actions;

export default user.reducer;
