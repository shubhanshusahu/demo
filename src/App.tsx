import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Registeration';
import Paginate from './components/Paginate';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Login from './components/Login';
function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Router>
          <Routes>
          <Route path='/' element ={ <Register/>}/>
          <Route path='/login' element ={ <Login/>}/>
          <Route path='/home' element ={ <Paginate/>}/>
          </Routes>
        </Router>
       
      </header>
    </div>
  );
}

export default App;
