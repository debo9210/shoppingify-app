import React, { useRef, useState, useEffect } from 'react';
import SideMenu from './SideMenu';
import MainPage from './MainPage';
import SideBar from './SideBar';

const ShoppingifyPage = () => {
  const [showItems, setShowItems] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showList, setShowList] = useState(false);
  const [noItems, setNoItems] = useState(true);
  const [addItem, setAddItem] = useState(false);
  const [shoppingColumn, setShoppingColumn] = useState(true);
  const [itemInfo, setShowItemInfo] = useState(false);
  const [itemHeading, setItemHeading] = useState('');
  const [itemName, setItemName] = useState([]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [itemNameText, setItemNameText] = useState('');

  const itemsRef = useRef(null);
  const historyRef = useRef(null);
  const statisticsRef = useRef(null);
  const itemInputGroupRef = useRef(null);
  const itemCategoryRef = useRef(null);
  const categoryInputRef = useRef(null);
  const itemHeadingRef = useRef(null);

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
    const itemHeadingText =
      e.target.parentElement.parentElement.previousSibling.textContent;

    const itemNameText = e.target.parentElement.firstChild.textContent;

    if (itemName.indexOf(itemNameText) === -1) {
      setItemName((itemName) => [...itemName, itemNameText]);
    }

    if (categoryArr.indexOf(itemHeadingText) === -1) {
      setCategoryArr((categoryArr) => [...categoryArr, itemHeadingText]);
    }

    setItemHeading(itemHeadingText);
    setItemNameText(itemNameText);

    setShowList(true);
    setNoItems(false);
  };

  // console.log(count);

  const showAddItemHandler = () => {
    setAddItem(true);
    setShoppingColumn(false);
  };

  const cancelAddItemHandler = () => {
    setAddItem(false);
    setShoppingColumn(true);
    categoryInputRef.current.value = '';
  };

  const selectItemNameHandler = (e) => {
    const itemNameText = e.target.textContent;
    const itemHeadingText =
      e.target.parentElement.parentElement.previousSibling.textContent;

    setItemHeading(itemHeadingText);
    setItemNameText(itemNameText);

    setShowItemInfo(true);
    setShoppingColumn(false);
    setAddItem(false);
  };

  const backBtnHandler = () => {
    setShowItemInfo(false);
    setShoppingColumn(true);
    // setAddItem(true);
  };

  const addItemToListHandler = (e) => {
    if (categoryArr.indexOf(itemHeading) === -1) {
      setCategoryArr((categoryArr) => [...categoryArr, itemHeading]);
    }

    if (itemName.indexOf(itemNameText) === -1) {
      setItemName((itemName) => [...itemName, itemNameText]);
    }

    setShowItemInfo(false);
    setShoppingColumn(true);
  };

  const removeItemFromListHandler = () => {
    let i;

    const categoryTitle = itemHeading;

    const itemName = itemNameText;

    const category = JSON.parse(localStorage.getItem(categoryTitle)) || [];

    for (i = 0; i < category.length; i++) {
      if (category[i] === itemName) {
        category.splice(i, 1);
      }
    }
    localStorage.setItem(categoryTitle, JSON.stringify(category));
    setShowItemInfo(false);
    setShoppingColumn(true);
    window.location.reload();
  };

  useEffect(() => {
    if (!showList) {
      itemInputGroupRef.current.classList.add('EnterItemGroupActive');
      itemInputGroupRef.current.lastChild.classList.add('EnterItemBtnActive');
    } else {
      itemInputGroupRef.current.classList.remove('EnterItemGroupActive');
      itemInputGroupRef.current.lastChild.classList.remove(
        'EnterItemBtnActive'
      );
    }
  }, [showList, itemInputGroupRef]);

  useEffect(() => {
    var names = [];
    let i;
    for (i = 0; i < categoryArr.length; i++) {
      if (itemHeading === categoryArr[i]) {
        names = JSON.parse(localStorage.getItem(categoryArr[i])) || [];

        if (names.indexOf(itemNameText) === -1) {
          names.push(itemNameText);
        }

        localStorage.setItem(categoryArr[i], JSON.stringify(names));
      }
    }
  }, [categoryArr, itemHeading, itemNameText]);

  useEffect(() => {
    let key;
    let i;
    const categoryArr = [];
    for (i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      var value = JSON.parse(localStorage.getItem(key));

      const categoryObj = {
        name: key,
        value: value,
      };
      categoryArr.push(categoryObj);
    }
    setCategoryList(categoryArr);

    if (localStorage.length > 0) {
      setNoItems(false);
      setShowList(true);
    }
  }, [itemName, itemHeading]);

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
        selectItemHandler={selectItemHandler}
        selectItemName={selectItemNameHandler}
      />
      <SideBar
        showList={showList}
        noList={noItems}
        itemInputGroupRef={itemInputGroupRef}
        itemCategoryRef={itemCategoryRef}
        showItemInfo={itemInfo}
        addItem={addItem}
        shoppingColumn={shoppingColumn}
        showAddItemHandler={showAddItemHandler}
        cancelAddItemHandler={cancelAddItemHandler}
        categoryInputRef={categoryInputRef}
        backBtnHandler={backBtnHandler}
        itemHeadingRef={itemHeadingRef}
        categoryList={categoryList}
        addItemToListHandler={addItemToListHandler}
        removeItemFromListHandler={removeItemFromListHandler}
      />
    </div>
  );
};

export default ShoppingifyPage;
