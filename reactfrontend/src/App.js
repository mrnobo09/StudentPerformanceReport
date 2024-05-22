
import './App.css';
import {Route,Routes,Router} from 'react-router-dom';
import Login from './Screens/Authentication/Login';
import Dashboard from './Screens/Dashboard';
import {Provider} from 'react-redux';
import store from './store';


export default function App() {
  return(
    <Provider store = {store}>
    <Routes>
        <Route path='/login' element = {<Login/>} />
        <Route path = '/dashboard' element = {<Dashboard/>}/>
    </Routes>
  </Provider>
    
  );

  
}

