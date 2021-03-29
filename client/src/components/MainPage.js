import React, { useRef, useEffect } from 'react';
import ItemsComponent from './ItemsComponent';
import HistoryComponent from './HistoryComponents';
import StatisticsComponent from './StatisticsComponents';
import '../css/mainPage.css';

const MainPage = ({
  showItems,
  showStatistics,
  showHistory,
  selectItemHandler,
  selectItemName,
  itemCategories,
  showItemDetailsHandler,
}) => {
  const searchListRef = useRef(null);

  const allItems = [];
  if (itemCategories) {
    for (let i = 0; i < itemCategories.length; i++) {
      // console.log(itemCategories[i]);
      const itemDetails = itemCategories[i].itemDetails;
      for (let j = 0; j < itemDetails.length; j++) {
        if (allItems.indexOf(itemDetails[j].itemName) === -1) {
          allItems.push(itemDetails[j].itemName);
        }
      }
    }
  }

  let itemsList;
  if (allItems) {
    itemsList = allItems.map((items, i) => (
      <li className='ListItems' key={i}>
        <a href='#/' onClick={showItemDetailsHandler}>
          {items}
        </a>
      </li>
    ));
  }

  const searchItemsHandler = () => {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.querySelector('.SearchInput');
    filter = input.value.toUpperCase();
    ul = document.querySelector('.ListUL');
    li = ul.getElementsByClassName('ListItems');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName('a')[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  };

  const showSearchListHandler = () => {
    searchListRef.current.style.display = 'block';
  };

  const hideSearchListHandler = () => {
    setTimeout(() => {
      searchListRef.current.style.display = 'none';
    }, 200);
  };

  useEffect(() => {}, []);

  return (
    <div className='MainPage'>
      {showItems && (
        <div className='MainPageContainer'>
          <header className='MainPageHeading'>
            <h2>
              <span>Shoppingify</span> allows you take your shopping list
              wherever you go
            </h2>
            <div className='SearchInputContainer'>
              <div className='SearchInputGroup'>
                <i className='material-icons SearchIcon'>search</i>
                <input
                  className='SearchInput'
                  type='text'
                  placeholder='search item'
                  onKeyUp={searchItemsHandler}
                  onFocus={showSearchListHandler}
                  onBlur={hideSearchListHandler}
                />
              </div>
              <div className='SearchList' ref={searchListRef}>
                <ul className='ListUL'>{itemsList}</ul>
              </div>
            </div>
          </header>
          <ItemsComponent
            selectItemHandler={selectItemHandler}
            selectItemName={selectItemName}
          />
        </div>
      )}
      {showHistory && <HistoryComponent />}
      {showStatistics && <StatisticsComponent />}
    </div>
  );
};

export default MainPage;
