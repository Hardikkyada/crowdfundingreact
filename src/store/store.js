import {configureStore} from '@reduxjs/toolkit';
import user from './scllie/user';
import Fundpost from './scllie/Fundpost';
const store = configureStore({
  reducer: {
    user,
    Fundpost
  },
});


export default store