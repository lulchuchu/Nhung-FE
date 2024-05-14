import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Status from './components/Status';


function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/car' element= {<Home></Home>}></Route>
                    <Route path='/table' element= {<Status></Status>}></Route>
                    <Route path='/signup' element= {<Signup></Signup>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;