
import './App.css';
import {Route,Routes,Router} from 'react-router-dom';
import Login from './Screens/Authentication/Login';
import Performance from './Screens/Performance'
import Dashboard from './Screens/Dashboard';
import Result from './Screens/Result'
import {Provider} from 'react-redux';
import store from './store';


export default function App() {
  return(
    <Provider store = {store}>
    <Routes>
        <Route path='/login' element = {<Login/>} />
        <Route path = '/dashboard' element = {<Dashboard/>}/>
        <Route path = '/performance' element= {<Performance/>}/>
        <Route path = '/result' element= {<Result/>}/>
    </Routes>
  </Provider>
    
  );

  
}

