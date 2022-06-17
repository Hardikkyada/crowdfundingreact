import Authuser from '../../api/Authuser';

export const ADDDATA = data => {
  return dispatch => {
    console.log(data);
    Authuser.post('/Addfund', data)
      .then(res => {
        dispatch(addtransaction(res.data.data));
      })
      .catch(e => {
        throw new Error(e.message);
      });
  };
};

const addtransaction = data => {
  console.log('3', data);
  return {
    type: 'ADDDATA',
    data: data,
  };
};

export const Setdata = data => {
  return {
    type: 'SETDATA',
    data: data,
  };
};
