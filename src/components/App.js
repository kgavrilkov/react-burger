/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from './app-header/app-header.js';
import Main from './main/main.js';
import Modal from './modal/modal.js';
import IngredientDetails from './ingredient-details/ingredient-details.js';
import OrderDetails from './order-details/order-details.js';
import sum from '../utils/total.js';
import TotalPrice from './total-price/total-price.js';

function App() {
  const [isBurgerIngredientsVisible, setIsBurgerIngredientsVisible] = React.useState(true);
  const [isBurgerConstructorVisible, setIsBurgerConstructorVisible] = React.useState(true);
  const [isAppHeaderVisible, setIsAppHeaderVisible] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [title, setTitle] = React.useState();
  const [content, setContent] = React.useState();

  const tablet = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });
  
  const selectedCard = useSelector(store => store.itemToView.ingredient);
  const orderNumber = useSelector(store => store.order.number);

  React.useEffect(() => {
    if (tablet) {
      setIsBurgerIngredientsVisible(true);
      setIsBurgerConstructorVisible(false);
    } else {
      setIsBurgerIngredientsVisible(true);
      setIsBurgerConstructorVisible(true);
    }
  }, [tablet]);

  const handleChange = () => {
    setIsAppHeaderVisible(!isAppHeaderVisible);
  }; 

  const handleToggle = () => {
    if (tablet) {
      setIsBurgerIngredientsVisible(!isBurgerIngredientsVisible);
      setIsBurgerConstructorVisible(!isBurgerConstructorVisible);
    }
    if (mobile) {
      handleChange();
    }
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <AppHeader isAppHeaderVisible={isAppHeaderVisible} handleToggle={handleToggle} />
      <DndProvider backend={HTML5Backend}>
        <Main isBurgerIngredientsVisible={isBurgerIngredientsVisible} isBurgerConstructorVisible={isBurgerConstructorVisible} handleToggle={handleToggle} handleModalOpen={handleModalOpen} setTitle={setTitle} setContent={setContent} />
      </DndProvider>
      <TotalPrice isBurgerConstructorVisible={isBurgerConstructorVisible} handleToggle={handleToggle} handleModalOpen={handleModalOpen} setTitle={setTitle} setContent={setContent} />
      <Modal isModalVisible={isModalVisible} handleModalClose={handleModalClose} title={title}>
        {content ? <IngredientDetails card={selectedCard} /> : <OrderDetails sum={sum} orderNumber={orderNumber} />}
      </Modal>
    </>
  );
}

export default App;
