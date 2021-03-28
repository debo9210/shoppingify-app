import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemButton from './reusablesComponents/ItemButton';
import { getCategories } from '../redux/actions/CategoryActions';
import Loader from './Loader';

const ItemsComponent = ({ selectItemHandler, selectItemName }) => {
  const dispatch = useDispatch();

  const { itemCategories, loading, error } = useSelector(
    (state) => state.categories
  );

  let itemsDisplay;
  if (itemCategories) {
    itemsDisplay = itemCategories.map((item, i) => (
      <section key={i} className='Items'>
        <h4>{item.categoryName}</h4>
        <div className='ItemsContainer'>
          {item.itemDetails.map((name, i) => (
            <ItemButton
              key={i}
              selectItemHandler={selectItemHandler}
              selectItemName={selectItemName}
              itemName={name.itemName}
            />
          ))}
        </div>
      </section>
    ));
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className='ItemListContainer'>
      {error ? (
        <p className='CategoryError'>
          Something went wrong! Try reloading the page
        </p>
      ) : null}
      {loading ? <Loader /> : itemsDisplay}
    </div>
  );
};

export default ItemsComponent;
