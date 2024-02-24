import React from 'react';
import '../styles/component-styles/PopUp.css';
import '../styles/component-styles/Common.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContexts'


function PopUp({ PopUpText, handleClose }) {

  const { loginInfo, setLoginInfo } = useContext(LoginContext);

  const navigate = useNavigate();
  
  function handlePopUpClose(value){
      if(value === true){
        localStorage.removeItem('LoginInfo');
        setLoginInfo(null);        
        navigate('/login');
      }
      else{
        handleClose();
      }
  }
  return (
    <>
      <div className="overlay">
        <div className="popup-container">
          <p>Are you sure you want to {PopUpText}?</p>
          
          <button className='blue-btn' onClick={() => handlePopUpClose(true)}>Yes, {PopUpText}</button>
          <button className='cancel-btn' onClick={() => handlePopUpClose(false)}>Cancel</button>
          
        </div>
      </div>
    </>
  );
}

export default PopUp;
