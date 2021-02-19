import React, { useRef } from 'react';
import '../css/sideMenu.css';
import Brand from '../images/logo.svg';

const SideMenu = ({
  itemsRef,
  historyRef,
  statisticsRef,
  itemsHandler,
  historyHandler,
  statisticsHandler,
}) => {
  const showItemsBanner = () => {
    itemsRef.current.nextSibling.style.display = 'block';
  };

  const hideItemsBanner = () => {
    itemsRef.current.nextSibling.style.display = 'none';
  };

  const showHistoryBanner = () => {
    historyRef.current.nextSibling.style.display = 'block';
  };

  const hideHistoryBanner = () => {
    historyRef.current.nextSibling.style.display = 'none';
  };

  const showStatisticsBanner = () => {
    statisticsRef.current.nextSibling.style.display = 'block';
  };

  const hideStatisticsBanner = () => {
    statisticsRef.current.nextSibling.style.display = 'none';
  };

  return (
    <div className='SideMenuContainer'>
      <div className='BrandContainer'>
        <div
          className='Brand'
          style={{ backgroundImage: `url(${Brand})` }}
        ></div>
      </div>
      <div className='MenuContainer'>
        <div className='Menu'>
          <div className='IconContainer'>
            <i
              className='material-icons AddBorder'
              onClick={itemsHandler}
              onMouseEnter={showItemsBanner}
              onMouseLeave={hideItemsBanner}
              ref={itemsRef}
            >
              format_list_bulleted
            </i>
            <div className='Banner'>items</div>
          </div>
          <div className='IconContainer'>
            <i
              className='material-icons'
              onClick={historyHandler}
              onMouseEnter={showHistoryBanner}
              onMouseLeave={hideHistoryBanner}
              ref={historyRef}
            >
              replay
            </i>
            <div className='Banner'>history</div>
          </div>
          <div className='IconContainer'>
            <i
              className='material-icons'
              onClick={statisticsHandler}
              onMouseEnter={showStatisticsBanner}
              onMouseLeave={hideStatisticsBanner}
              ref={statisticsRef}
            >
              insert_chart_outlined
            </i>
            <div className='Banner'>statistics</div>
          </div>
          {/* {menuIcons} */}
        </div>
      </div>
      <div className='CartContainer'>
        <div className='Cart'>
          <div className='CartNum'>5</div>
          <i className='material-icons'>add_shopping_cart</i>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
