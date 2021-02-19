import React from 'react';
import ItemButton from './reusablesComponents/ItemButton';

const ItemsComponent = ({ selectItem }) => {
  return (
    <div className='ItemListContainer'>
      <section className='Items'>
        <h4>Fruit and vegetables</h4>
        <div className='ItemsContainer'>
          <ItemButton selectItem={selectItem} itemName='Banana' />
          <ItemButton selectItem={selectItem} itemName='Avocado' />
          <ItemButton
            selectItem={selectItem}
            itemName='Bunch of carrots 5pcs'
          />
          <ItemButton selectItem={selectItem} itemName='Chicken 1kg' />
          <ItemButton selectItem={selectItem} itemName='Pre-cooked corn 450g' />
          <ItemButton selectItem={selectItem} itemName='Mandarin Nadorcott' />
          <ItemButton selectItem={selectItem} itemName='Piele De Sapo Melon' />
          <ItemButton selectItem={selectItem} itemName='Watermelon' />
        </div>
      </section>

      <section className='Items'>
        <h4>Meat and Fish</h4>
        <div className='ItemsContainer'>
          <ItemButton selectItem={selectItem} itemName='Chicken leg box' />
          <ItemButton selectItem={selectItem} itemName='Chicken 1kg' />
          <ItemButton selectItem={selectItem} itemName='Pork fillets 450g' />
          <ItemButton selectItem={selectItem} itemName='Salmon 1kg' />
        </div>
      </section>

      <section className='Items'>
        <h4>Beverages</h4>
        <div className='ItemsContainer'>
          <ItemButton selectItem={selectItem} itemName='Avocado' />
          <ItemButton selectItem={selectItem} itemName='Banana' />
          <ItemButton
            selectItem={selectItem}
            itemName='Bunch of carrots 5pcs'
          />
          <ItemButton selectItem={selectItem} itemName='Chicken 1kg' />
          <ItemButton selectItem={selectItem} itemName='Pre-cooked corn 450g' />
          <ItemButton selectItem={selectItem} itemName='Mandarin Nadorcott' />
          <ItemButton selectItem={selectItem} itemName='Piele De Sapo Melon' />
          <ItemButton selectItem={selectItem} itemName='Watermelon' />
        </div>
      </section>

      <section className='Items'>
        <h4>Pets</h4>
        <div className='ItemsContainer'>
          <ItemButton selectItem={selectItem} itemName='Chicken leg box' />
          <ItemButton selectItem={selectItem} itemName='Chicken 1kg' />
          <ItemButton selectItem={selectItem} itemName='Pork fillets 450g' />
          <ItemButton selectItem={selectItem} itemName='Salmon 1kg' />
        </div>
      </section>
    </div>
  );
};

export default ItemsComponent;
