import React, { useRef, useState } from 'react';
import SideMenu from './SideMenu';
import MainPage from './MainPage';
import SideBar from './SideBar';

const ShoppingifyPage = () => {
  const [showItems, setShowItems] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showList, setShowList] = useState(false);
  const [noItems, setNoItems] = useState(true);

  const itemsRef = useRef(null);
  const historyRef = useRef(null);
  const statisticsRef = useRef(null);

  const itemsHandler = (e) => {
    e.target.classList.add('AddBorder');
    historyRef.current.classList.remove('AddBorder');
    statisticsRef.current.classList.remove('AddBorder');
    setShowItems(true);
    setShowHistory(false);
    setShowStatistics(false);
  };

  const historyHandler = (e) => {
    e.target.classList.add('AddBorder');
    itemsRef.current.classList.remove('AddBorder');
    statisticsRef.current.classList.remove('AddBorder');
    setShowItems(false);
    setShowHistory(true);
    setShowStatistics(false);
  };

  const statisticsHandler = (e) => {
    e.target.classList.add('AddBorder');
    historyRef.current.classList.remove('AddBorder');
    itemsRef.current.classList.remove('AddBorder');
    setShowItems(false);
    setShowHistory(false);
    setShowStatistics(true);
  };

  const selectItemHandler = (e) => {
    // console.log(e.target);
    setShowList(true);
    setNoItems(false);
  };

  return (
    <div className='Shoppingify'>
      <SideMenu
        itemsRef={itemsRef}
        historyRef={historyRef}
        statisticsRef={statisticsRef}
        itemsHandler={itemsHandler}
        historyHandler={historyHandler}
        statisticsHandler={statisticsHandler}
      />
      <MainPage
        showItems={showItems}
        showStatistics={showStatistics}
        showHistory={showHistory}
        selectItem={selectItemHandler}
      />
      <SideBar showList={showList} noList={noItems} />
    </div>
  );
};

export default ShoppingifyPage;
