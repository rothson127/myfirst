//import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import Lecture from './Lecture';
import User from './User';
import Myinfo from './Myinfo';
import Vocation from './Vocation';
import Task from './Task';

function App() {

  if (localStorage.getItem("token")) {
    return (<BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/machine' element={<Home/>}></Route>
          <Route path='/lecture' element={<Lecture/>}></Route>
          <Route path='/user' element={<User/>}></Route>    
          <Route path='/myinfo' element={<Myinfo/>}></Route>
          <Route path='/vocation' element={<Vocation/>}></Route>
          <Route path='/task' element={<Task/>}></Route>
      </Routes>
    </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>);

}

export default App;
