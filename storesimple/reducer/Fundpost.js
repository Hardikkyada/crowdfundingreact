const initialState = {
  FundPost: [],
  topic: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GETALLPOST':
      // console.log(action.data.data);
      return {
        ...state,
        FundPost: action.data.data,
      };

    case 'GETALLTOPIC':
      // console.log(action.data);
      return {
        ...state,
        topic: action.data.data,
      };
    case 'ADDPOST':
      console.log(action.data);
      return {
        ...state,
        FundPost: [action.data.data, ...state.FundPost],
      };

    case 'EDITPOST':
      console.log('Edit', action.data);

      const pindex = state.FundPost.findIndex(prod => prod._id === action.id);

      const newpost = [...state.FundPost];
      newpost[pindex] = action.data.post;
      
      return {
        ...state,
        FundPost: newpost,
      };

      case 'DELETEPOST':
        const newdata = state.FundPost.filter(pro => pro._id !== action.id)
        return{
          ...state,
          FundPost: newdata
        }
  }
  return state;
};
