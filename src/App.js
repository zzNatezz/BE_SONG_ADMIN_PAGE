import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './layout/Home';
import Welcome from './layout/Section/welcome/Welcome';
import Notice from './layout/Section/welcome/Notification/Notice';

function App() {  
  return (
    <Routes>
      <Route path = "/" element = {<Home />} >
        <Route path='home' element = {<Welcome />} />
        <Route path='notice' element = {<Notice />} />
      </Route>
    </Routes>
  );
}

export default App;
