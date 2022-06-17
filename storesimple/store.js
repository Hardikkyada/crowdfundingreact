// import cart from './reduce/cart';
// import order from './reduce/order';
// import products from './reduce/products';
import user from './reducer/user';
import fundpost from './reducer/Fundpost';
import funddata from './reducer/Fund';
import reduxthunk from 'redux-thunk'
import {createStore,combineReducers, applyMiddleware } from 'redux'

const rootReducer = combineReducers({
    user,
    fundpost,
    funddata
  })
  
  const middlewares = [
    reduxthunk
  ];

  if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
  }

 const store = createStore(rootReducer,applyMiddleware(...middlewares));

 export default store