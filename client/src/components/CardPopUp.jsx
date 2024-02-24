import React, { useState, useEffect, useContext } from "react";
import "../styles/component-styles/CardPopUp.css";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LoginContext } from "../contexts/LoginContexts";
import { CardDetailsContext } from '../util/CardDetailsContext';



function CardPopUp({ handleClose }) {

  const { updateSection } = useContext(CardDetailsContext);
 
  const { loginInfo } = useContext(LoginContext);


  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);
  const [taskLists, setTaskLists] = useState([]);
  const [taskStatus, setTaskStatus] = useState();
  const [priority, setPriority] = useState("LOW PRIORITY");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [isDue, setIsDue] = useState(false);
  const section = "to-do";
  const handleDueDateChange = (date) => {
    setIsDue(true);
    setDueDate(date); // Update the due date when selected in the calendar
  };


  const addCard = async () => {
    
    const userId = loginInfo.user._id;
    let ISODueDate = dueDate.toISOString();


    const payload = {
      userId: userId,
      title: title,
      priority: priority,
      isDue: isDue,
      section: "To Do",
      dueDate: ISODueDate,
    };

    const url = `${process.env.REACT_APP_API_BASE_URL}/task/create`;
    const response = await fetch( url, {
      method: "POST",
      headers: { 
        'Authorization': `Bearer ${loginInfo.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return response;
  }

  const handleAddCard = async (value) => {
    if (value === true) {
      console.log("I'm creating a new card");

      let response = await addCard();
      if(response.ok){
        response = await response.json();
        updateSection("backlog");
        console.log(response);
      }
      else{
        console.log("couldnt add due to som error");
      }
      handleClose();
    } else {
      handleClose();
    }
  }
  function AddNewList() {
    const newTaskList = { id: taskLists.length + 1, title: "", tasks: [] };
    setTaskLists([...taskLists, newTaskList]);
    setTotal(total + 1);
  }
  function DeleteTask(taskId) {
    const updatedTaskLists = taskLists.filter(
      (taskList) => taskList.id !== taskId
    );
    setTaskLists(updatedTaskLists);
    setTotal(total - 1);
    //if the deleted task was checked, then setDone(done - 1)
  }

  function handleCheck(taskId, isChecked) {
    if (isChecked) {
      setDone(done + 1);
    } else {
      setDone(done - 1);
    }
  }

  return (
    <>
      <div className="overlay">
        <div className="card-popup-container">
          <div className="cp-content">
            <div className="cp-input">
              <label>
                Title <span className="asterisk">*</span>
              </label>
              <input placeholder="Enter Task Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>

            <div className="cp-select">
              <p>
                Select Priority <span className="asterisk">*</span>
              </p>
              <div className="cp-select-priorities">
                <div
                  className="priority"
                  onClick={() => setPriority("HIGH PRIORITY")}
                >
                  <span className="bullet-point">&#8226;</span>
                  <p>HIGH PRIORITY</p>
                </div>
                <div
                  className="priority"
                  onClick={() => setPriority("MODERATE PRIORITY")}
                >
                  <span className="bullet-point m">&#8226;</span>
                  <p>MODERATE PRIORITY</p>
                </div>
                <div
                  className="priority"
                  onClick={() => setPriority("LOW PRIORITY")}
                >
                  <span className="bullet-point l">&#8226;</span>
                  <p>LOW PRIORITY</p>
                </div>
              </div>
            </div>
            <div className="cp-checklist">
              <p>
                Checklist({done}/{total}) <span className="asterisk">*</span>
              </p>
            </div>
            <div className="cp-checklist">
              <button className="add-task-btn" onClick={() => AddNewList()}>
                + Add New
              </button>
            </div>
            <div className="listbox">
              {taskLists.map((taskList, index) => (
                <TaskList
                  key={taskList.id}
                  deleteTask={() => DeleteTask(taskList.id)}
                  handleCheck={handleCheck}
                  isDelete={true}
                />
              ))}
            </div>
          </div>

          <div className="cp-content-2">
            <div className="cp-date-picker">
              <DatePicker
                className="date-picker"
                selected={dueDate}
                onChange={handleDueDateChange}
                placeholderText="Select Due Date"
              >
                {" "}
              </DatePicker>{" "}
            </div>

            <div className="cp-buttons">
              <button className="btn" onClick={() => handleAddCard(false)}>
                Cancel
              </button>
              <button className="btn save" onClick={() => handleAddCard(true)}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPopUp;
