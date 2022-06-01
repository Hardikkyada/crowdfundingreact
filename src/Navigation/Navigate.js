import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Authuser from '../api/Authuser';
import DonationpaymentScreen from '../screens/Fund/DonationpaymentScreen';
import FundRashingDetailesScreen from '../screens/Fund/FundRashingDetailesScreen';
import FundRashingOverviewScreen from '../screens/Fund/FundRashingOverviewScreen';
import Home from '../screens/Fund/Home';
import MakeFunRashingPost from '../screens/Fund/MakeFunRashingPost';
import AuthScreen from '../screens/user/AuthScreen';
import Logout from '../screens/user/Logout';
import Profilescreen from '../screens/user/Profilescreen';
import {Gettopicdata, setpostdata} from '../store/scllie/Fundpost';
import {SETTOKEN, SETUSER} from '../store/scllie/user';

const Navigate = () => {
  const token = useSelector(state => state.user.token);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      console.log('Navigation', token);
      navigate('/');
    }
    const tokendata = localStorage.getItem('token');
    if (tokendata) {
      dispatch(SETTOKEN(tokendata));
      Authuser.defaults.headers.common['Authorization'] = 'Bearer ' + tokendata;
      console.log('sdf', Authuser.defaults.headers.common['Authorization']);
      if (Authuser.defaults.headers.common['Authorization']) {
        try {
          Authuser.get('/user').then(res => {
            dispatch(SETUSER(res.data.data));
          });
          // console.log(user.data.data);
        } catch (e) {
          if (e.response?.status === 401) {
            console.log('TimeExipred');
            // await AsyncStorage.removeItem('token');
            return;
          }
        }
        dispatch(setpostdata('All'));
        dispatch(Gettopicdata());
      }
      navigate('/home');
    }
    //  console.log('Token Not Found');
  }, [token]);

  return (
    // <Router>
    <>
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/home" element={<FundRashingOverviewScreen />} />
        <Route path="/Profile" element={<Profilescreen />} />
        <Route path="/DonationDetails/:id" element={<DonationpaymentScreen />} />
        <Route path="/Makepost" element={<MakeFunRashingPost />} />
        <Route path="/Makepost/:id" element={<MakeFunRashingPost />} />
        <Route
          path="/FundDetails/:id"
          element={<FundRashingDetailesScreen />}
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
    // </Router>
  );
};

export default Navigate;
