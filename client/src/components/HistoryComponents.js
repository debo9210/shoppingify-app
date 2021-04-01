import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShoppingHistory } from '../redux/actions/ShoppingHistoryActions';
import moment from 'moment';
import Loader from './Loader';

const HistoryComponents = () => {
  const dispatch = useDispatch();

  const [showHistory, setShowHistory] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [shoppingListName, setShoppingListName] = useState('');
  const [shoppingDate, setShoppingDate] = useState('');
  const [shoppingDetails, setShoppingDetails] = useState([]);

  const { history, loading } = useSelector((state) => state.shoppingHistory);

  const showDetailsHandler = (e) => {
    const listName =
      e.target.parentElement.parentElement.parentElement.firstChild.firstChild
        .textContent;

    for (let i = 0; i < history.length; i++) {
      for (let j = 0; j < history[i].monthDetails.length; j++) {
        if (history[i].monthDetails[j].historyName === listName) {
          setShoppingListName(history[i].monthDetails[j].historyName);
          setShoppingDate(
            moment(history[i].monthDetails[j].date).format('ddd DD.MM.YYYY')
          );
          setShoppingDetails(history[i].monthDetails[j].historyDetails);
        }
      }
    }

    setShowHistory(false);
    setShowDetails(true);
  };

  const hideDetailsHandler = () => {
    setShowHistory(true);
    setShowDetails(false);
  };

  let shoppingHistoryDetails;
  if (shoppingDetails) {
    shoppingHistoryDetails = shoppingDetails.map((details, i) => (
      <div key={i} className='ListDetailsContainer'>
        <h4>{Object.keys(details)[0]}</h4>

        <div className='ListDetails'>
          {Object.values(details)[0].map((item, i) => (
            <div key={i} className='ListItemDetails'>
              <p className='ListItemName'>{item[0]} </p>
              <p className='ListItemQuantity'>{item[1]} pcs</p>
            </div>
          ))}
        </div>
      </div>
    ));
  }

  let historyDetails;
  if (history) {
    historyDetails = history.map((details) => (
      <div className='Details' key={details._id}>
        <p className='DetailsMonth'>{details.historyMonth}</p>
        {details.monthDetails.map((det) => (
          <div key={det._id} className='HistoryDetails'>
            <div className='ShoppingName'>
              <p>{det.historyName}</p>
            </div>
            <div className='ShoppingStatus'>
              <i className='material-icons EventNoteIcon'>event_note</i>
              <p className='EventDate'>
                {moment(det.date).format('ddd DD.MM.YYYY')}
              </p>
              <div className='DetailsStatus'>
                <p
                  style={
                    det.historyStatus === 'cancelled'
                      ? {
                          border: '1px solid #EB5757',
                          color: '#EB5757',
                          padding: '2px 5px 2px 8px',
                        }
                      : null
                  }
                >
                  {det.historyStatus}
                </p>
              </div>
              <div className='ExpandMoreIcon'>
                <i className='material-icons ' onClick={showDetailsHandler}>
                  expand_more
                </i>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
  }

  useEffect(() => {
    if (history) {
      // console.log(history);
    }
  }, [history]);

  useEffect(() => {
    dispatch(getShoppingHistory());
  }, [dispatch]);

  return (
    <div className='HistoryContainer'>
      {showHistory && (
        <>
          <header className='HistoryHeading'>
            <h3>Shopping history</h3>
          </header>

          <div className='HistoryDetailsContainer'>
            <>{loading ? <Loader /> : historyDetails}</>
          </div>
        </>
      )}

      {showDetails && (
        <>
          <div className='DetailBackBtn' onClick={hideDetailsHandler}>
            <i className='material-icons ArrowRight2'>arrow_right_alt</i>
            <p>back</p>
          </div>

          <h3 className='DetailsHeading'>{shoppingListName}</h3>

          <div className='DetailsDate'>
            <i className='material-icons EventNoteIcon'>event_note</i>
            <p className='EventDate' style={{ marginLeft: '5px' }}>
              {shoppingDate}
            </p>
          </div>

          {shoppingHistoryDetails}
        </>
      )}
    </div>
  );
};

export default HistoryComponents;
