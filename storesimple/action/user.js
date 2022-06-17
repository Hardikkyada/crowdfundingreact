import AsyncStorage from '@react-native-async-storage/async-storage';
import {getActionFromState} from '@react-navigation/native';
import axios from 'axios';
import Authuser from '../../api/Authuser';

// export const Login = (user) =>{
//     return{
//                 type:"LOGIN",
//                 user:user
//             }
// }

const Loginsccess = user => {
  return {
    type: 'LOGIN',
    user: user,
  };
};

export const ChnagePass = user => {
  console.log('action',user);
  return {
    type: 'CHNAGEPASS',
    user: user,
  };
};
export const Login = user => {
  return dispatch => {
    console.log(user);
    Authuser.post('/login', user)
      .then(res => {
        loginres = res;
        console.log('sdftoken', loginres.data);
        AsyncStorage.setItem('token', loginres.data.token);
        dispatch(
          Loginsccess({
            user: loginres.data.user,
            token: loginres.data.token,
          }),
        );
      })
      .catch(e => {
        
        throw new Error(e.error);
      });
  };
};

export const googlelogin = user => {
  return dispatch => {
    console.log('Google Login =>', user);
    Authuser.post('/googlelogin', user)
      .then(res => {
        loginres = res;
        console.log('sdftoken', loginres.data);
        AsyncStorage.setItem('token', loginres.data.token);
        dispatch(
          Loginsccess({
            user: loginres.data.user,
            token: loginres.data.token,
          }),
        );
      })
      .catch(e => {
        throw new Error(e.message);
      });
  };
};

export const Signup = user => {
  console.log('action', user);

  return dispatch => {
    Authuser.post('/reg', user)
      .then(res => {
        console.log('sdftoken', res.data);
        AsyncStorage.setItem('token', res.data.token);
        dispatch(
          RegistrationSuccessful({
            user: res.data.user,
            token: res.data.token,
          }),
        );
      })
      .catch(e => {
        throw new Error(e);
      });
  };
};

export const setuser = user => {
  return {
    type: 'SETUSER',
    user: user,
  };
};

export const Edit = (id, user) => {
  console.log('action', id, user);
  // const formData = new FormData();

  // if (user.ProfileImg) {
  //   formData.append('profile', {
  //     name: 'profile.jpg',
  //     uri: user.ProfileImg,
  //     type: 'image/jpg',
  //   });
  // }

  // formData.append('data', JSON.stringify(user));

  return dispatch => {
    // Authuser.patch('/Updateuser/' + id, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data;',
    //   },
    //   transformRequest: (formData, headers) => {
    //     // !!! override data to return formData
    //     // since axios converts that to string
    //     return formData;
    //   },
    // })

    console.log(user);

    Authuser.patch('/Updateuser/' + id, user)

      .then(res => {
        console.log('resoin........', res.data);
        dispatch(Updateuser(res.data.user));
      })
      .catch(e => {
        throw new Error(e);
      });
  };
};
const Updateuser = user => {
  return {
    type: 'EDITUSER',
    user: user,
  };
};

export const setpost = id => {
  console.log(id);
  return dispatch => {
    Authuser.get('/getuserPost/' + id)
      .then(res => {
        // console.log(res.data);
        dispatch(GetData(res.data.data));
      })
      .catch(e => {
        if (e.response.status === 404) {
          console.log('Data Not Found');
          dispatch(GetData([]));
          return;
        }
        // throw new Error(e);
      });
  };
};

const GetData = data => {
  console.log(data);
  return {
    type: 'SETPOST',
    data: data,
  };
};

const RegistrationSuccessful = user => {
  return {
    type: 'SIGNUP',
    user: user,
  };
};

export const Settoken = token => {
  return {
    type: 'TOKEN',
    token: token,
  };
};
