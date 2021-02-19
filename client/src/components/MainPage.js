import React from 'react';
import ItemsComponent from './ItemsComponent';
import HistoryComponent from './HistoryComponents';
import StatisticsComponent from './StatisticsComponents';
import '../css/mainPage.css';

const MainPage = ({ showItems, showStatistics, showHistory, selectItem }) => {
  return (
    <div className='MainPage'>
      {showItems && (
        <div className='MainPageContainer'>
          <header className='MainPageHeading'>
            <h2>
              <span>Shoppingify</span> allows you take your shopping list
              wherever you go
            </h2>
            <div className='SearchInputGroup'>
              <i className='material-icons SearchIcon'>search</i>
              <input
                className='SearchInput'
                type='text'
                placeholder='search item'
              />
            </div>
          </header>
          <ItemsComponent selectItem={selectItem} />
        </div>
      )}
      {showHistory && <HistoryComponent />}
      {showStatistics && <StatisticsComponent />}
    </div>
  );
};

export default MainPage;
