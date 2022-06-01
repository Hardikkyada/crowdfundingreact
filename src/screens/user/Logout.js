import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SETTOKEN } from '../../store/scllie/user';

const Logout = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    localStorage.removeItem('token');
    dispatch(SETTOKEN(''))
  },[])
  return 
};

export default Logout;
