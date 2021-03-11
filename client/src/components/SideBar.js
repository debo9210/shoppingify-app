import React, { useState, useRef, useEffect } from 'react';
import ModalConfirmation from './ModalComponent';
import '../css/sideBar.css';
import Logo from '../images/source.svg';
import NoItems from '../images/undraw_shopping_app_flsj 1.svg';
import Avocado from '../images/introducing-avocado-to-babies.jpg';

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
}) => {
  const [saveItem, setSaveItem] = useState(true);
  const [editItem, setEditItem] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const categoryDropDownRef = useRef(null);

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

  const deleteListHandler = () => {
    let i;
    for (i = 0; i < categoryList.length; i++) {
      localStorage.removeItem(categoryList[i].name);
    }
    setShowModal(false);
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

    var value = parseInt(itemNum.innerText, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    itemNum.innerText = `${value} pcs`;
  };

  const decreaseItemHandler = (e) => {
    let itemNum = e.target.parentNode.nextSibling;

    var value = parseInt(itemNum.innerText, 10);
    value = isNaN(value) ? 0 : value;
    value--;

    if (value < 0) return;

    itemNum.innerText = `${value} pcs`;
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

    window.location.reload();
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
              <div className='EnterItemGroup' ref={itemInputGroupRef}>
                <input
                  className='EnterItem'
                  type='text'
                  placeholder='Enter a name'
                />
                <button className='EnterItemBtn'>Save</button>
              </div>
            )}
            {editItem && (
              <div className='AddItemBtnGroup'>
                <button
                  className='CancelItemBtn'
                  onClick={cancelEditListHandler}
                >
                  cancel
                </button>
                <button className='SaveItemBtn CompleteItemBtn'>
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
              <input type='text' placeholder='Enter a name' />
            </div>
            <div className='AddItemInputGroup'>
              <label htmlFor=''>Note (optional)</label>
              <textarea placeholder='Enter a note'></textarea>
            </div>
            <div className='AddItemInputGroup'>
              <label htmlFor=''>Image (optional)</label>
              <input type='text' placeholder='Enter a url' />
            </div>

            <div className='AddItemInputGroup'>
              <label htmlFor=''>Category</label>
              <div className='CategoryGroup'>
                <input
                  type='text'
                  placeholder='Enter a category'
                  ref={categoryInputRef}
                />
                <i
                  className='material-icons CategoryIcon'
                  onClick={showCategoryListHandler}
                >
                  arrow_drop_down
                </i>
              </div>
              <div
                className='CategoryList CategoryListHidden'
                ref={categoryDropDownRef}
              >
                <ul>
                  <li onClick={categoryValueHandler}>Fruit and vegetables</li>
                  <li onClick={categoryValueHandler}>Meat and Fish</li>
                  <li onClick={categoryValueHandler}>Beverages</li>
                  <li onClick={categoryValueHandler}>Pets</li>
                </ul>
              </div>
            </div>
            <div className='AddItemBtnGroup'>
              <button className='CancelItemBtn' onClick={cancelAddItemHandler}>
                cancel
              </button>
              <button className='SaveItemBtn'>Save</button>
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
              style={{ backgroundImage: `url(${Avocado})` }}
            ></div>
            <div className='ItemAbout'>
              <h4>name</h4>
              <p className='Name'>Avocado</p>
            </div>
            <div className='ItemAbout'>
              <h4>category</h4>
              <p className='Category'>Fruit and vegetables</p>
            </div>
            <div className='ItemAbout'>
              <h4>note</h4>
              <p className='Note'>
                Nutrient-dense foods are those that provide substantial amounts
                of vitamins, minerals and other nutrients with relatively few
                calories. One-third of a medium avocado (50 g) has 80 calories
                and contributes nearly 20 vitamins and minerals, making it a
                great nutrient-dense food choice.{' '}
              </p>
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
