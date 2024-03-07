import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './layout/Home';
import Welcome from './layout/Section/Welcome';

function App() {
  return (
    <Routes>
      <Route path = "/home" element = {<Home />} >
        <Route path='' element = {<Welcome />} />
      </Route>
    </Routes>
  );
}

export default App;
