import React from 'react';
import ItemButton from './reusablesComponents/ItemButton';

const ItemsComponent = ({ selectItemHandler, selectItemName }) => {
  const ItemCategories = [
    [
      'Fruit and vegetables',
      [
        'Banana',
        'Avocado',
        'Bunch of carrots 5pcs',
        'Chicken 1kg',
        'Pre-cooked corn 450g',
        'Mandarin Nadorcott',
        'Piele De Sapo Melon',
        'Watermelon',
      ],
    ],
    [
      'Meat and Fish',
      ['Chicken leg box', 'Chicken 1kg', 'Pork fillets 450g', 'Salmon 1kg'],
    ],
    [
      'Beverages',
      [
        'Avocado',
        'Banana',
        'Bunch of carrots 5pcs',
        'Chicken 1kg',
        'Pre-cooked corn 450g',
        'Mandarin Nadorcott',
        'Piele De Sapo Melon',
        'Watermelon',
      ],
    ],
    [
      'Pets',
      ['Chicken leg box', 'Chicken 1kg', 'Pork fillets 450g', 'Salmon 1kg'],
    ],
  ];

  const itemsDisplay = ItemCategories.map((itemTitle, i) => (
    <section key={i} className='Items'>
      <h4>{itemTitle[0]}</h4>
      <div className='ItemsContainer'>
        {itemTitle[1].map((itemName, i) => (
          <ItemButton
            key={i}
            selectItemHandler={selectItemHandler}
            selectItemName={selectItemName}
            itemName={itemName}
          />
        ))}
      </div>
    </section>
  ));

  return <div className='ItemListContainer'>{itemsDisplay}</div>;
};

export default ItemsComponent;
