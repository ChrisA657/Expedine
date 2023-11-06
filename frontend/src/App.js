import React, { useEffect } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';


import { NavBar } from './Components/NavBar/NavBar';
import { Home } from './Components/Home/Home';
import FoodMain from './Components/FoodMain/FoodMain';

function App() {
    useEffect(() => {

    }, [])

    return (
  
            <Router>
              <NavBar />
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/food' element={<FoodMain/>} />
                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </Router>
      )
    }
    
    export default App;