import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideMenu from './SideMenu';
import MainPage from './MainPage';
import SideBar from './SideBar';
import { getCategories } from '../redux/actions/CategoryActions';

const ShoppingifyPage = () => {
  const dispatch = useDispatch();

  const { itemCategories } = useSelector((state) => state.categories);

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
    // console.log(e.target);
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

    if (itemName.indexOf(itemNameText) === -1) {
      let itemCount = JSON.parse(sessionStorage.getItem('count'));

      sessionStorage.setItem('count', JSON.stringify(itemCount + 1));
    }
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
    // console.log(e.target);
    const itemNameText = e.target.textContent;
    const itemHeadingText =
      e.target.parentElement.parentElement.previousSibling.textContent;

    setItemHeading(itemHeadingText);
    setItemNameText(itemNameText);

    setShowItemInfo(true);
    setShoppingColumn(false);
    setAddItem(false);
  };

  let details;
  if (itemCategories) {
    details = itemCategories
      .filter((item) => item.categoryName === itemHeading)
      .map((item) => item.itemDetails)
      .map((item) => item);
  }

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

  const deleteItemHandler = (e) => {
    let i;

    const categoryTitle =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.firstChild.textContent;

    const itemName =
      e.target.parentElement.parentElement.previousSibling.firstChild.lastChild
        .textContent;

    const category = JSON.parse(localStorage.getItem(categoryTitle)) || [];

    for (i = 0; i < category.length; i++) {
      if (category[i] === itemName) {
        category.splice(i, 1);
      }
    }
    localStorage.setItem(categoryTitle, JSON.stringify(category));

    if (category.length === 0) {
      localStorage.removeItem(categoryTitle);
    }

    let itemCount = JSON.parse(sessionStorage.getItem('count'));

    sessionStorage.setItem('count', JSON.stringify(itemCount - 1));

    window.location.reload();
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
      itemInputGroupRef.current.children[1].classList.add('EnterItemBtnActive');
    } else {
      itemInputGroupRef.current.classList.remove('EnterItemGroupActive');
      itemInputGroupRef.current.children[1].classList.remove(
        'EnterItemBtnActive'
      );
    }
  }, [showList, itemInputGroupRef]);

  useEffect(() => {
    let names = [];
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

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
        categoryTitle={itemHeading}
        categoryDetails={details}
        itemName={itemNameText}
        itemCategories={itemCategories}
        deleteItemHandler={deleteItemHandler}
      />
    </div>
  );
};

export default ShoppingifyPage;
