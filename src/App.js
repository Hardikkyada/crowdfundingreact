import './App.css';
import React from 'react';
import Navigate from './Navigation/Navigate';
import ResponsiveAppBar from './componets/UI/Fund/Appbar';
import {useSelector} from 'react-redux';
function App() {
  const token = useSelector(state => state.user.token);
  return (
    <div className="App">
      {token && <ResponsiveAppBar />}
      <Navigate />
    </div>
  );
}

export default App;
