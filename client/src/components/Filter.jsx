import React from 'react';
import '../styles/component-styles/Filter.css';

function Filter({ text1, text2, text3, onSelectPeriod }) {
  const textStyle = text3 === 'Delete' ? { color: '#CF3636' } : {};
  const filterClassName = text3 === 'Delete' ? 'filter menu' : 'filter';

  const formatText = (text) => {
    switch (text) {
      case 'today':
        return 'Today';
      case 'week':
        return 'This week';
      case 'month':
        return 'This month';
      default:
        return text;
    }
  };

  return (
    <div className={filterClassName}>
      <p onClick={() => onSelectPeriod(text1)}>{formatText(text1)}</p>
      <p onClick={() => onSelectPeriod(text2)}>{formatText(text2)}</p>
      <p onClick={() => onSelectPeriod(text3)} style={textStyle}>{formatText(text3)}</p>
    </div>
  );
}

export default Filter;

