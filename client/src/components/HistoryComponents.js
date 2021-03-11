import React, { useState } from 'react';

const HistoryComponents = () => {
  const [showHistory, setShowHistory] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const showDetailsHandler = () => {
    setShowHistory(false);
    setShowDetails(true);
  };

  const hideDetailsHandler = () => {
    setShowHistory(true);
    setShowDetails(false);
  };

  return (
    <div className='HistoryContainer'>
      {showHistory && (
        <>
          <header className='HistoryHeading'>
            <h3>Shopping history</h3>
          </header>

          <div className='HistoryDetailsContainer'>
            <p className='DetailsMonth'>August 2020</p>
            <div className='HistoryDetails'>
              <div className='ShoppingName'>
                <p>Grocery List</p>
              </div>
              <div className='ShoppingStatus'>
                <i className='material-icons EventNoteIcon'>event_note</i>
                <p className='EventDate'>Mon 16.7.2020</p>
                <p className='DetailsStatus'>completed</p>
                <i
                  className='material-icons ExpandMoreIcon'
                  onClick={showDetailsHandler}
                >
                  expand_more
                </i>
              </div>
            </div>
          </div>
        </>
      )}

      {showDetails && (
        <>
          <div className='DetailBackBtn' onClick={hideDetailsHandler}>
            <i className='material-icons ArrowRight2'>arrow_right_alt</i>
            <p>back</p>
          </div>

          <h3 className='DetailsHeading'>Eero’s farewell party</h3>

          <div className='DetailsDate'>
            <i className='material-icons EventNoteIcon'>event_note</i>
            <p className='EventDate' style={{ marginLeft: '5px' }}>
              Mon 16.7.2020
            </p>
          </div>

          <div className='ListDetailsContainer'>
            <h4>Cookies</h4>

            <div className='ListDetails'>
              <div className='ListItemDetails'>
                <p className='ListItemName'>Cookies Chocolate </p>
                <p className='ListItemQuantity'>3 pcs</p>
              </div>
              <div className='ListItemDetails'>
                <p className='ListItemName'>Doris Truffle</p>
                <p className='ListItemQuantity'>1 pcs</p>
              </div>
            </div>
          </div>

          <div className='ListDetailsContainer'>
            <h4>Beverages</h4>

            <div className='ListDetails'>
              <div className='ListItemDetails'>
                <p className='ListItemName'>2 x soft drink 1.5 l</p>
                <p className='ListItemQuantity'>2 pcs</p>
              </div>
              <div className='ListItemDetails'>
                <p className='ListItemName'>Beer</p>
                <p className='ListItemQuantity'>8 pcs</p>
              </div>
              <div className='ListItemDetails'>
                <p className='ListItemName'>Cider</p>
                <p className='ListItemQuantity'>6 pcs</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryComponents;
