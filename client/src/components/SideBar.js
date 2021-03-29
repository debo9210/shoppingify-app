import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalConfirmation from './ModalComponent';
import '../css/sideBar.css';
import Logo from '../images/source.svg';
import NoItems from '../images/undraw_shopping_app_flsj 1.svg';
import NoImage from '../images/no-image-icon-15.png';
import {
  createCategory,
  getCategories,
} from '../redux/actions/CategoryActions';
import {
  createShoppingHistory,
  clearError,
  clearSuccess,
  updateShoppingStatus,
} from '../redux/actions/ShoppingHistoryActions';

const SideBar = ({
  showList,
  noList,
  itemInputGroupRef,
  itemCategoryRef,
  showItemInfo,
  addItem,
  shoppingColumn,
  showAddItemHandler,
  cancelAddItemHandler,
  categoryInputRef,
  backBtnHandler,
  itemHeadingRef,
  categoryList,
  addItemToListHandler,
  removeItemFromListHandler,
  categoryTitle,
  categoryDetails,
  itemName,
  itemCategories,
  deleteItemHandler,
}) => {
  const dispatch = useDispatch();

  // console.log(categoryDetails);

  const [saveItem, setSaveItem] = useState(true);
  const [editItem, setEditItem] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [catItemName, setCatItemName] = useState('');
  const [catItemNote, setCatItemNote] = useState('');
  const [catItemImage, setCatItemImage] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [listName, setListName] = useState('');
  const [shoppingHistoryID, setShoppingHistoryID] = useState('');

  const categoryDropDownRef = useRef(null);
  const inputItemNameRef = useRef(null);
  const textAreaItemNoteRef = useRef(null);
  const inputItemImageRef = useRef(null);
  const categoryIconRef = useRef(null);
  const inputListNameRef = useRef(null);
  const successMsgRef = useRef(null);

  const { error, success, history } = useSelector(
    (state) => state.createShoppingHistory
  );

  if (success) {
    successMsgRef.current.style.display = 'block';
  }

  const hideSuccessMsgHandler = () => {
    successMsgRef.current.style.display = 'none';
    dispatch(clearSuccess());
  };

  const showCategoryListHandler = (e) => {
    if (e.target.textContent === 'arrow_drop_down') {
      e.target.textContent = 'clear';
      categoryDropDownRef.current.classList.remove('CategoryListHidden');
    } else {
      e.target.textContent = 'arrow_drop_down';
      categoryDropDownRef.current.classList.add('CategoryListHidden');
    }
  };

  const categoryValueHandler = (e) => {
    categoryInputRef.current.value = e.target.textContent;
    setCategoryName(e.target.textContent);
    categoryDropDownRef.current.classList.add('CategoryListHidden');
    categoryIconRef.current.textContent = 'arrow_drop_down';
  };

  const inputCheck = Array.from(document.querySelectorAll('.InputLabel'));
  const editListHandler = () => {
    setEditItem(true);
    setSaveItem(false);

    inputCheck.forEach((i) => {
      if (i.className === 'InputLabel') {
        i.classList.toggle('InputLabel2');
      }
    });
  };

  const body = document.querySelector('body');
  const shoppingifyPage = document.querySelector('.Shoppingify');
  const cancelEditListHandler = (e) => {
    setShowModal(true);
    body.style.backgroundColor = '#ccc';
    body.style.overflow = 'hidden';
    shoppingifyPage.classList.add('ShoppingifyBlur');
    // console.log(body);
  };

  const closeModalHandler = () => {
    inputCheck.forEach((i) => {
      i.classList.remove('InputLabel2');
    });
    setSaveItem(true);
    setEditItem(false);
    setShowModal(false);
    body.style.backgroundColor = '#fafafe';
    body.style.overflow = 'scroll';
    shoppingifyPage.classList.remove('ShoppingifyBlur');
  };

  const completeHandler = (e) => {
    dispatch(updateShoppingStatus(shoppingHistoryID, 'completed', listName));
    inputCheck.forEach((i) => {
      i.classList.remove('InputLabel2');
    });
    setSaveItem(true);
    setEditItem(false);
  };

  const deleteListHandler = () => {
    let i;
    for (i = 0; i < categoryList.length; i++) {
      localStorage.removeItem(categoryList[i].name);
    }
    dispatch(updateShoppingStatus(shoppingHistoryID, 'cancelled', listName));
    setShowModal(false);
    sessionStorage.setItem('count', JSON.stringify(0));
    window.location.reload();
  };

  const showQuantityOptions = (e) => {
    e.target.parentElement.classList.toggle('ItemContainerBackground');

    const divChildren = e.target.parentElement.children;
    for (let i = 0; i < divChildren.length; i++) {
      if (divChildren[i].tagName === 'BUTTON') {
        divChildren[i].classList.toggle('DisplayIcons');
      }
    }
  };

  const increaseItemHandler = (e) => {
    let itemNum = e.target.parentNode.previousSibling;

    var value = parseInt(itemNum.innerText);
    value = isNaN(value) ? 0 : value;
    value++;

    itemNum.innerText = `${value} pcs`;
  };

  const decreaseItemHandler = (e) => {
    let itemNum = e.target.parentNode.nextSibling;

    var value = parseInt(itemNum.innerText);
    value = isNaN(value) ? 0 : value;
    value--;

    if (value < 0) return;

    itemNum.innerText = `${value} pcs`;
  };

  const noItems = <div className='NoItems'>No items</div>;

  const categoriesList = categoryList.map((title, i) => (
    <div key={i} className='ItemListContainer'>
      <h5 className='ItemHeading' ref={itemHeadingRef}>
        {title.name}
      </h5>

      <ul>
        {Array.from(title.value).map((item, i) => (
          <div key={i} className='ItemListDisplay'>
            <div className='ListContainer'>
              <label className='InputLabel'>
                <input
                  className='CheckInput'
                  type='checkbox'
                  name='key'
                  value='value'
                />
                <li>{item}</li>
              </label>
            </div>
            <div
              className='ItemQuantityContainer'
              onClick={showQuantityOptions}
            >
              <button className='DelItemBtn'>
                <i
                  className='material-icons'
                  onClick={deleteItemHandler}
                  title='remove item'
                >
                  delete_outline
                </i>
              </button>
              <button className='RemoveBtn' onClick={decreaseItemHandler}>
                <i className='material-icons'>remove</i>
              </button>
              <p
                className='ItemNum'
                title='click to increase, decrease or delete item'
              >
                1 <span>pcs</span>
              </p>
              <button className='AddBtn' onClick={increaseItemHandler}>
                <i className='material-icons'>add</i>
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  ));

  const saveListHandler = (e) => {
    dispatch(clearError());
    inputListNameRef.current.value = '';
    const CATEGORYDETAILS = [];
    const itemsTotal = [];
    const categoryDetails = Array.from(itemCategoryRef.current.children);

    categoryDetails.forEach((category) => {
      const itemCategory = {};
      const ITEMS = [];
      let itemCategoryName;
      itemCategoryName = category.firstChild.textContent;

      const firstLayer = category.lastChild.children;

      for (let i = 0; i < firstLayer.length; i++) {
        const itemName =
          firstLayer[i].children[0].firstChild.lastChild.textContent;

        const itemQuantity = parseInt(
          firstLayer[i].children[1].children[2].textContent
        );

        ITEMS.push([itemName, itemQuantity]);
        itemsTotal.push(itemQuantity);
      }

      itemCategory[itemCategoryName] = ITEMS;

      CATEGORYDETAILS.push(itemCategory);
    });

    let itemSum = itemsTotal.reduce((itemNum, sum) => {
      return itemNum + sum;
    }, 0);

    // console.log(itemSum);

    const historyData = {
      historyName: listName,
      historyDetails: CATEGORYDETAILS,
      itemsTotal: itemSum,
    };
    dispatch(createShoppingHistory(historyData));
  };

  let itemNote, itemImage, ItemName;
  if (categoryDetails) {
    itemNote = categoryDetails.itemNote;
    itemImage = categoryDetails.itemImage;
    itemName = categoryDetails.itemName;
  }

  let categoryListDropdown;
  if (itemCategories) {
    categoryListDropdown = itemCategories.map((category, i) => (
      <li key={i} onClick={categoryValueHandler}>
        {category.categoryName}
      </li>
    ));
  }

  const saveItemHandler = (e) => {
    const categoryData = {
      categoryName: categoryName,
      itemNote: catItemNote,
      itemImage: catItemImage,
      itemName: catItemName,
    };

    dispatch(createCategory(categoryData));
    inputItemNameRef.current.value = '';
    textAreaItemNoteRef.current.value = '';
    inputItemImageRef.current.value = '';
    categoryInputRef.current.value = '';

    setTimeout(() => {
      dispatch(getCategories());
    }, 5000);
  };

  useEffect(() => {
    if (history) {
      setShoppingHistoryID(history._id);
      // console.log(history);
    }
  }, [history]);

  return (
    <>
      {shoppingColumn && (
        <div className='SidebarContainer'>
          <div className='Sidebar'>
            <div className='AddItemContainer'>
              <div className='LogoContainer'>
                <img src={Logo} alt='logo' />
              </div>
              <div className='AddItem'>
                <p>Didn’t find what you need?</p>
                <button onClick={showAddItemHandler} className='AddItemBtn'>
                  Add item
                </button>
              </div>
            </div>
            {noList && (
              <div className='NoItemsContainer'>
                {noItems}
                <div className='NoItemsImage'>
                  <img src={NoItems} alt='no-items' />
                </div>
              </div>
            )}

            {showList && (
              <div className='ShowListContainer'>
                <header className='ShowListHeading'>
                  <h4>Shopping list</h4>
                  <i
                    className='material-icons EditIcon'
                    onClick={editListHandler}
                  >
                    edit
                  </i>
                </header>
                <div className='ItemCategory' ref={itemCategoryRef}>
                  {categoriesList}
                </div>
              </div>
            )}
          </div>
          <div className='EnterItemContainer'>
            {saveItem && (
              <>
                <div className='EnterItemGroup' ref={itemInputGroupRef}>
                  <input
                    className='EnterItem'
                    type='text'
                    placeholder='Enter a name'
                    onChange={(e) => setListName(e.target.value)}
                    ref={inputListNameRef}
                  />
                  <button className='EnterItemBtn' onClick={saveListHandler}>
                    Save
                  </button>
                  <small>{error ? error.historyName : null}</small>
                  <div className='SuccessMsg' ref={successMsgRef}>
                    <div className='SuccessContainer'>
                      <p>List saved</p>
                      <i
                        className='material-icons'
                        onClick={hideSuccessMsgHandler}
                      >
                        clear
                      </i>
                    </div>
                  </div>
                </div>
              </>
            )}
            {editItem && (
              <div className='AddItemBtnGroup'>
                <button
                  className='CancelItemBtn'
                  onClick={cancelEditListHandler}
                >
                  cancel
                </button>
                <button
                  className='SaveItemBtn CompleteItemBtn'
                  onClick={completeHandler}
                >
                  Complete
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {addItem && (
        <div className='AddNewItemContainer'>
          <div className='AddNewItem'>
            <h3>Add a new item</h3>
            <div className='AddItemInputGroup'>
              <label htmlFor=''>Name</label>
              <input
                type='text'
                placeholder='Enter a name'
                onChange={(e) => setCatItemName(e.target.value)}
                ref={inputItemNameRef}
              />
            </div>
            <div className='AddItemInputGroup'>
              <label htmlFor=''>Note (optional)</label>
              <textarea
                placeholder='Enter a note'
                onChange={(e) => setCatItemNote(e.target.value)}
                ref={textAreaItemNoteRef}
              ></textarea>
            </div>
            <div className='AddItemInputGroup'>
              <label htmlFor=''>Image (optional)</label>
              <input
                type='text'
                placeholder='Enter a url'
                onChange={(e) => setCatItemImage(e.target.value)}
                ref={inputItemImageRef}
              />
            </div>

            <div className='AddItemInputGroup'>
              <label htmlFor=''>Category</label>
              <div className='CategoryGroup'>
                <input
                  type='text'
                  placeholder='Enter a category'
                  ref={categoryInputRef}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <i
                  className='material-icons CategoryIcon'
                  onClick={showCategoryListHandler}
                  ref={categoryIconRef}
                >
                  arrow_drop_down
                </i>
              </div>
              <div
                className='CategoryList CategoryListHidden'
                ref={categoryDropDownRef}
              >
                <ul>{categoryListDropdown}</ul>
              </div>
            </div>
            <div className='AddItemBtnGroup'>
              <button className='CancelItemBtn' onClick={cancelAddItemHandler}>
                cancel
              </button>
              <button className='SaveItemBtn' onClick={saveItemHandler}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showItemInfo && (
        <div className='ShowItemInfoContainer'>
          <div className='ShowItemInfo'>
            <div className='BackBtnContainer' onClick={backBtnHandler}>
              <i className='material-icons ArrowAltIcon'>arrow_right_alt</i>
              <p className='BackText'>back</p>
            </div>
            <div
              className='ItemImage'
              style={{
                backgroundImage: `url(${itemImage ? itemImage : NoImage})`,
              }}
            ></div>
            <div className='ItemAbout'>
              <h4>name</h4>
              <p className='Name'>{ItemName}</p>
            </div>
            <div className='ItemAbout'>
              <h4>category</h4>
              <p className='Category'>{categoryTitle}</p>
            </div>
            <div className='ItemAbout'>
              <h4>note</h4>
              <p className='Note'>{itemNote ? itemNote : null}</p>
            </div>

            <div className='AddToListBtnGroup'>
              <button
                className='CancelItemBtn'
                onClick={removeItemFromListHandler}
              >
                delete
              </button>
              <button
                className='SaveItemBtn AddToList'
                onClick={addItemToListHandler}
              >
                Add to list
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <ModalConfirmation
          closeModalHandler={closeModalHandler}
          deleteListHandler={deleteListHandler}
        />
      )}
    </>
  );
};

export default SideBar;
