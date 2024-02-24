import React, { createContext, useState } from 'react';


export const BoardStateContext = createContext();


export const BoardStateProvider = ({ children }) => {
  
  const [boardState, setBoardState] = useState({
    'backlog': [],
    'to-do': [],
    'in-progress': [],
    'done': []
  });

  
  const updateBoardState = (updatedBoardState) => {
    setBoardState(updatedBoardState);
  };

  
  return (
    <BoardStateContext.Provider value={{ boardState, updateBoardState }}>
      {children}
    </BoardStateContext.Provider>
  );
};
