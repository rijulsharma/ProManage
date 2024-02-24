
import Menu from '../components/Menu';
import '../styles/scene-styles/Home.css';
import Board from '../components/Board';
import Settings from '../components/Settings';
import Analytics from '../components/Analytics';
import { useLocation } from 'react-router-dom';
import PopUp from '../components/PopUp';
import { useState, useContext } from 'react';
import CardPopUp from '../components/CardPopUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContexts'



function Home({path}) {

  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const [showPopup, setShowPopup] = useState(false); 
  const [showCardPopup, setShowCardPopup] = useState(false); 

  const handleLogout = () => {
    setShowPopup(true); 
  };

  const handleClosePopup = () => {
    setShowPopup(false); 
  };
  const handleAddCard = () => {
    setShowCardPopup(true);
  };

  const handleCloseCardPopup = () => {
    setShowCardPopup(false);
  };

  
  return (
    <div className="home">
      <Menu handleLogout={handleLogout} />
      {showPopup && <PopUp PopUpText={'logout'} handleClose={handleClosePopup} />}
      <div className="home-main">
        <Routes>
          <Route path="settings" element={<Settings/>} />
          <Route path="board" element={<Board handleAddCard={handleAddCard} />} />
          <Route path="" element={<Board handleAddCard={handleAddCard} />} />
          <Route path="analytics" element={<Analytics/>} />
        </Routes>
        {showCardPopup && <CardPopUp handleClose={handleCloseCardPopup} />}
      </div>
    </div>
  );
}

export default Home;

