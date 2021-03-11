import React from 'react';

const ModalComponent = ({ closeModalHandler, deleteListHandler }) => {
  return (
    <div className='ModalConfirmationContainer'>
      <div className='IconClearContainer'>
        <i className='material-icons' onClick={closeModalHandler}>
          clear
        </i>
      </div>
      <p>Are you sure that you want to cancel this list?</p>
      <div className='ModalButtonContainer'>
        <button className='ModalBtnCancel' onClick={closeModalHandler}>
          cancel
        </button>
        <button className='ModalBtnConfirm' onClick={deleteListHandler}>
          Yes
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
