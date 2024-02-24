import React, { useState, useEffect } from "react";
import "../styles/component-styles/Card.css";
import more from "../assets/icons/more.png";
import collapse from "../assets/icons/collapse.png";
import uncollapse from "../assets/icons/uncollapse.png";
import TaskList from "./TaskList";
import Filter from "./Filter";
function Card({item, collapseAll, isShare}) {
  const [currentSection, setCurrentSection] = useState('');
  const [isListboxVisible, setIsListboxVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {

    if(item.section === "To Do"){
      setCurrentSection("TO-DO");
    }
    else if(item.section === "In Progress"){
      setCurrentSection("PROGRESS");
    }
    else if(item.section === "Backlog"){
      setCurrentSection("BACKLOG");
    }
    else{
      setCurrentSection("DONE");
    }
  
    if (collapseAll === true) {
      setIsListboxVisible(false);
    }

  }, []);

  const toggleListboxVisibility = () => {
    setIsListboxVisible(!isListboxVisible);
    setIsCollapsed(!isCollapsed);
  };

  function handleMenuClick(option) {
    setSelectedOption(option);
    setShowFilter(false);
  }

  const allSections = ["BACKLOG", "TO-DO", "PROGRESS", "DONE"];
  const otherSections = allSections.filter((s) => s !== currentSection);
  console.log(otherSections);

  return (
    <div className="card">
      <div className="card-row">
        <div className="card-priority">
          <span className="bullet-point">&#8226;</span>
          <p>{item.priority}</p>
        </div>
        <img
          src={more}
          alt="more"
          onClick={() => setShowFilter(!showFilter)}
        ></img>
        {showFilter && (
          <Filter
            text1={"Edit"}
            text2={"Share"}
            text3={"Delete"}
            onSelectPeriod={handleMenuClick}
          />
        )}
        
      </div>

      <h4>{item.title}</h4>
      <div className="card-row">
        <p>Checklist(0/0)</p>
        {/* Toggle visibility based on isListboxVisible state */}
        <img
          src={isCollapsed ? uncollapse : collapse}
          alt="collapse"
          className={
            isCollapsed ? "collapse-button rotated" : "collapse-button"
          }
          onClick={toggleListboxVisibility}
        ></img>
      </div>
      {/* Conditional rendering based on isListboxVisible state */}
      {isListboxVisible && (
        <div className="card-row listbox">
          <TaskList isDelete={false}></TaskList>
          <TaskList isDelete={false}></TaskList>
        </div>
      )}
      <div className="card-row btn">
        {item.isDue && <div className="due-date-btn">{item.dueDate}</div> }
        <div className="section-btns">
          {otherSections.map((section) => (
            <button className="section-btn" key={section}>
              {section}
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Card;
