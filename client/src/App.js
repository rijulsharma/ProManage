import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AuthForm from './scenes/AuthForm';
import Home from './scenes/Home';
import Board from './components/Board';
import Settings from './components/Settings';
import Analytics from './components/Analytics';
import { LoginContext } from "./contexts/LoginContexts"
import { useState } from 'react';
// Import the context providers
import { CardDetailsProvider } from './util/CardDetailsContext';
import { BoardStateProvider } from './util/BoardStateContext';
import SharePage from './scenes/SharePage';
function App() {

  const [loginInfo, setLoginInfo] = useState(null);

  return (
    <LoginContext.Provider value={{ loginInfo, setLoginInfo}} >
      <CardDetailsProvider>
        <BoardStateProvider>
          <Router>
            <Routes> 
              <Route exact path="/login" element={ loginInfo ? <Navigate to="/" /> : <AuthForm path={'/login'} /> } />
              <Route exact path="/register" element={ loginInfo ? <Navigate to="/" /> : <AuthForm path={'/register'} /> } />
              <Route exact path='/share' element={ <SharePage/>}></Route>
              <Route exact path="/*" element={ loginInfo ? <Home/> : <Navigate to="/login" /> } />
            </Routes>
          </Router>
        </BoardStateProvider>
      </CardDetailsProvider>
    </LoginContext.Provider> 
  );
}

export default App;
