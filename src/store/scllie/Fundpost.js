import {createSlice} from '@reduxjs/toolkit';
import Authuser from '../../api/Authuser';

const initialState = {
  FundPost: [],
  topic: [],
};

export const Fundpost = createSlice({
  name: 'fundpost',
  initialState,
  reducers: {
    GETALLPOST: (state, action) => {
      state.FundPost = action.payload.data;
    },
    SETTOPIC: (state, action) => {
      state.topic = action.payload.data;
    },
    ADDPOST: (state, action) => {
      state.FundPost.push(action.payload.data);
    },
    EDITPOST:(state,action)=>{
      console.log('Edit', action.data);

      const pindex = state.FundPost.findIndex(prod => prod._id === action.id);

      const newpost = [...state.FundPost];
      newpost[pindex] = action.data.post;
    }
  },
});

export const editpostdata = (id,post) => {
  return dispatch => {
    Authuser.patch('/Editpost/' + id, post)
      .then(res => {
        console.log('res........', res.data);
        dispatch(EDITPOST(id, res.data));
      })
      .catch(e => {
        throw new Error(e);
      });
  };
};


export const addpostdata = post => {
  return dispatch => {
    Authuser.post('/AddPost', post)
      .then(res => {
        console.log('res........', res.data);
        dispatch(ADDPOST(res.data));
      })
      .catch(e => {
        throw new Error(e);
      });
  };
};

export const setpostdata = type => {
  return dispatch => {  
    Authuser.get('/getallPost/' + type)
      .then(res => {
        // console.log(res.data);
        dispatch(GETALLPOST(res.data));
      })
      .catch(e => {
        if (e.response.status === 404) {
          console.log('Data Not Found');
          dispatch(GETALLPOST([]));
          return;
        }
        // throw new Error(e);
      });
  };
};
export const Gettopicdata = type => {
  return dispatch => {
    Authuser.get('/getalltopic')
      .then(res => {
        // console.log("action",res.data);
        dispatch(SETTOPIC(res.data));
      })
      .catch(e => {
        throw new Error(e);
      });
  };
};

export const {GETALLPOST, SETTOPIC,ADDPOST,EDITPOST} = Fundpost.actions;

export default Fundpost.reducer;
