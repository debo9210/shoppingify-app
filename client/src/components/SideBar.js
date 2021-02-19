import React from 'react';
import '../css/sideBar.css';
import Logo from '../images/source.svg';
import NoItems from '../images/undraw_shopping_app_flsj 1.svg';

const SideBar = ({ showList, noList }) => {
  const noItems = <div className='NoItems'>No items</div>;
  // console.log(showList);

  return (
    <div className='SidebarContainer'>
      <div className='Sidebar'>
        <div className='AddItemContainer'>
          <div className='LogoContainer'>
            <img src={Logo} alt='logo' />
          </div>
          <div className='AddItem'>
            <p>Didn’t find what you need?</p>
            <button className='AddItemBtn'>Add item</button>
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
            <h1>ShowList</h1>
          </div>
        )}
      </div>
      <div className='EnterItemContainer'>
        <div className='EnterItemGroup'>
          <input className='EnterItem' type='text' placeholder='Enter a name' />
          <button className='EnterItemBtn'>Save</button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
