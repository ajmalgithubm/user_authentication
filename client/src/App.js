import {Signup, Login} from './Pages';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
