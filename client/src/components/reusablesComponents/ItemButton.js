import React from 'react';
import '../../css/mainPage.css';

const ItemButton = ({ itemName, selectItem }) => {
  return (
    <div className='ItemButtonContainer'>
      <p className='ItemName'>{itemName}</p>
      <i className='material-icons AddIcon' onClick={selectItem}>
        add
      </i>
    </div>
  );
};

export default ItemButton;
