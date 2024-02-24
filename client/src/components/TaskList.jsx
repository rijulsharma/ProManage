import React, { useState } from 'react';
import check from '../assets/icons/check.png';
import uncheck from '../assets/icons/uncheck.png';
import Delete from '../assets/icons/delete.png';
import '../styles/component-styles/TaskList.css'
function TaskList({ taskId, deleteTask, handleCheck, isDelete }) {
    const [isChecked, setIsChecked] = useState(false);
  
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
      handleCheck(taskId, !isChecked);
    };
       
    return (
      <div className='taskList'>
        <div className='task-input'>
          {isChecked ? (
            <img src={check} alt='tick' onClick={() => toggleCheckbox()} />
          ) : (
            <img src={uncheck} alt='untick' onClick={() => toggleCheckbox()} />
          )}
          <input placeholder='Add a task'/>
        </div>
        {/* Conditionally render delete image based on the value of isDelete prop */}
        {isDelete && <img src={Delete} alt='del' onClick={() => deleteTask()} />}
      </div>
    );
  }
  
  export default TaskList;