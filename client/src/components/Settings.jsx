import React from 'react'
import '../styles/component-styles/Settings.css'
import Field from '../components/Field'
import user from '../assets/icons/user.png'
import lock from '../assets/icons/lock.png'
import view from '../assets/icons/view.png'
import '../styles/component-styles/Form.css'

import { useState, useContext, useEffect } from 'react'
import { LoginContext } from '../contexts/LoginContexts'

function Settings() {

  const { loginInfo } = useContext(LoginContext);

  const handleUserUpdate =  async (formData) => {

    const payload = {
        name: formData.name,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        _id: loginInfo.user._id
    };

    const url = `${process.env.REACT_APP_API_BASE_URL}/profile/update`;
    console.log(url);
    let response = await fetch(
      url, {
        method: 'PATCH',
        headers: {
           Authorization: `Bearer ${loginInfo.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
    return response;
  };
  
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError("");
    setNewPasswordError("");

    console.log(newPassword);
    if(newPassword){
      console.log("new pass hit");
      if (!oldPassword) {
        setNewPasswordError('Please enter current password');
        return;
      }
  
      if (newPassword.length < 6) {
        setNewPasswordError('New password must contain at least 6 characters.');
        return;
      } 
      if (!/\d/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
        setNewPasswordError('New password must contain at least one numeric and one special character.');
        return;
      }
      if (newPassword === oldPassword) {
        setNewPasswordError("New password cant be same as old password");
        return;
      }
    }
    else{
      if( name == ''){
        setNameError('Name cannot be empty');
        return;
      }
    }

    if (name && (/[^a-zA-Z\s]/.test(name))) {
      setNameError('Name cant have numbers or special characters');
      return;
    }
    if( /(^\s)|(\s$)/.test(name) ){
      setNameError('Name cannto start or end with spaces');
      return;
    }

    const success = await handleUserUpdate({ name, oldPassword, newPassword });
    if (success.ok) {
      setNewPasswordError('YAY worked');
      //NEED A TOAST HERE
    } else {
      setNewPasswordError('Old password entered is incorrect');
    }
  };
  
  
  return  (
    <div className='settings'>
      <div className='home-title-row'>
        <h1>Settings</h1>
      </div>
      <div className='settings-content'>
        <form onSubmit={handleSubmit} noValidate>
          <Field
            icon={user}
            placeholder={'Name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="error-message">{nameError}</p>}
          <Field
            icon={lock}
            placeholder={'Old Password'}
            view={view}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type={"password"}
          />
          <Field 
            icon={lock}
            placeholder={'New Password'}
            type={"password"}
            view={view}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {newPasswordError && <p className="error-message">{newPasswordError}</p>}
          <button type="submit" className='reg-button login'>Update</button>
        </form>
      </div>
    </div>
  ) ;
}

export default Settings
