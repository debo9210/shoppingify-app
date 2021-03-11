import React from 'react';
import '../../css/mainPage.css';

const ItemButton = ({ itemName, selectItemHandler, selectItemName }) => {
  return (
    <div className='ItemButtonContainer'>
      <p className='ItemName' onClick={selectItemName}>
        {itemName}
      </p>
      <i className='material-icons AddIcon' onClick={selectItemHandler}>
        add
      </i>
    </div>
  );
};

export default ItemButton;
