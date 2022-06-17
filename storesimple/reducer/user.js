const initialState = {
  users: [],
  userpost: [],
  token: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SETUSER':
      // console.log('reducer', action.user);
      return {
        ...state,
        users: action.user,
      };
    case 'LOGIN':
      console.log('actionlogin', action);

      return {
        ...state,
        users: action.user.user,
        token: action.user.token,
      };

    case 'SIGNUP':
      console.log('reducersigupuser', action);
      return {
        ...state,
        users: action.user.user,
        token: action.user.token,
      };
    case 'SETPOST':
      console.log('reduceruser', action);
      return {
        ...state,
        userpost: action.data,
      };
    case 'ADDPOST':
      console.log(action.data);
      return {
        ...state,
        userpost: [action.data.data, ...state.userpost],
      };

    case 'DELETEPOST':
      const newdata = state.userpost.filter(pro => pro._id !== action.id);
      return {
        ...state,
        userpost: newdata,
      };
    case 'EDITUSER':
      console.log('from reducer', action);
      return {
        ...state,
        users: action.user,
      };

    case 'EDITPOST':
      console.log('Edit', action.data);
      const pindex = state.userpost.findIndex(prod => prod._id === action.id);

      const newpost = [...state.userpost];
      newpost[pindex] = action.data.post;

      return {
        ...state,
        userpost: newpost,
      };

    case 'TOKEN':
      return {
        ...state,
        token: action.token,
      };

    case 'CHNAGEPASS':
      return {
        ...state,
        users: action.user.data,
      };
  }
  return state;
};
