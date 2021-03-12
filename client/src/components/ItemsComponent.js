import React from 'react';
import ItemButton from './reusablesComponents/ItemButton';

const ItemsComponent = ({ selectItemHandler, selectItemName }) => {
  const itemCategories = [
    {
      name: 'Fruit and vegetables',
      items: [
        'Banana',
        'Avocado',
        'Bunch of carrots 5pcs',
        'Chicken 1kg',
        'Pre-cooked corn 450g',
        'Mandarin Nadorcott',
        'Piele De Sapo Melon',
        'Watermelon',
      ],
    },

    {
      name: 'Meat and Fish',
      items: [
        'Chicken leg box',
        'Chicken 1kg',
        'Pork fillets 450g',
        'Salmon 1kg',
      ],
    },
    {
      name: 'Beverages',
      items: [
        'Avocado',
        'Banana',
        'Bunch of carrots 5pcs',
        'Chicken 1kg',
        'Pre-cooked corn 450g',
        'Mandarin Nadorcott',
        'Piele De Sapo Melon',
        'Watermelon',
      ],
    },
    {
      name: 'Pets',
      items: [
        'Chicken leg box',
        'Chicken 1kg',
        'Pork fillets 450g',
        'Salmon 1kg',
      ],
    },
  ];

  const itemsDisplay = itemCategories.map((itemTitle, i) => (
    <section key={i} className='Items'>
      {/* <h4>{itemTitle[0]}</h4> */}
      <h4>{itemTitle.name}</h4>
      <div className='ItemsContainer'>
        {itemTitle.items.map((itemName, i) => (
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
