import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './layout/Home';
import Welcome from './layout/Section/welcome/Welcome';
import Notice from './layout/Section/welcome/Notification/Notice';
import Login from './layout/login/Login';
import { useContext, useEffect } from 'react';
import { AppContext } from './Context/Context';

function App() { 
  const {isLogin} = useContext(AppContext)
  const navigate = useNavigate()
  useEffect(()=>{
    isLogin === false ? navigate('/login') : navigate('/home')
  },[isLogin])

  return (
    <Routes>
      <Route path='/login' element = {<Login />} />
      <Route path = "/" element = {<Home />} >
        <Route path='home' element = {<Welcome />} />
        <Route path='notice' element = {<Notice />} />
      </Route>
    </Routes>
  );
}

export default App;
