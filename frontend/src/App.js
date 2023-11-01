import React, { useEffect, useState } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useParams,
    Navigate
} from 'react-router-dom';

import axios from 'axios';
import { NavBar } from './Components/NavBar/NavBar';
import { Home } from './Components/Home/Home';
import Login from './Components/Login/Login';
import { UserContext, UserProvider } from './Components/userContext';
import { ProtectedContent, ProtectedRoute } from './Components/ProtectedContent';
import { SignUp } from './Components/SignUp/SignUp';
import { PROTECTED_ROUTES } from './Components/ProtectedRoutes';

import Reset from './Components/Reset/Reset';
import FoodMain from './Components/FoodMain/FoodMain';

// React functional component
function App() {
    // state for storage of the information on the webpage of forms and list, uses hooks
    const [user, setUser] = useState({
        user: {
            userToken: "Token",
            isFarmer: true,
            username: "bob",
            user_id: 1,
        }
    });

    const logout = () => {
        console.log('logout');
    }
    useEffect(() => {

        // let use = window.localStorage.getItem('userData');

        // if(uer){
        //   setUser({userData: user, logout: logout});
        // }

    }, [])

    return (
        <UserProvider>
            <Router>
              <NavBar />
              <Routes>
                <Route exact path='/' element={<Home />} />
    
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/reset' element={<Reset />} />
                <Route path='/food' element={<FoodMain/>} />
                {
                  PROTECTED_ROUTES.map((route, index) => {
                    return <Route path={route.path}
                      element={<ProtectedContent> {route.element} </ProtectedContent>}
                      key={index}>
                      {route.children}
                    </Route>
    
                  })
                }
                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </Router>
        </UserProvider>
      )
    }
    
    export default App;