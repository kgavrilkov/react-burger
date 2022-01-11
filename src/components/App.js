/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import AppHeader from './app-header/app-header.js';
import Main from './main/main.js';
import Modal from './modal/modal.js';
import IngredientDetails from './ingredient-details/ingredient-details.js';
import OrderDetails from './order-details/order-details.js';
import sum from '../utils/total.js';
import { InitialDataContext } from '../context/initialdata-context.js';
import { getCards, saveOrder } from '../utils/api.js';
import TotalPrice from './total-price/total-price.js';

function App() {
  const [cards, setCards] = React.useState([]);
  const [isBurgerIngredientsVisible, setIsBurgerIngredientsVisible] = React.useState(true);
  const [isBurgerConstructorVisible, setIsBurgerConstructorVisible] = React.useState(true);
  const [isAppHeaderVisible, setIsAppHeaderVisible] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [title, setTitle] = React.useState();
  const [content, setContent] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState();
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [orderNumber, setOrderNumber] = React.useState();
  const tablet = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });
  
  React.useEffect(() => {
    getCards()
      .then(result => setCards(result.data))
      .catch((err) => {console.log(`Ошибка при загрузке: ${err}`)});
  }, []);

  React.useEffect(() => {
    let total = 2510;
    cards.slice(2).map(card => total += card.price);
    setTotalPrice(total);
  }, [cards, setTotalPrice]);

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
  } 

  const handleToggle = () => {
    if (tablet) {
      setIsBurgerIngredientsVisible(!isBurgerIngredientsVisible);
      setIsBurgerConstructorVisible(!isBurgerConstructorVisible);
    }
    if (mobile) {
      handleChange();
    }
  }

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const storeOrder = () => {
    saveOrder()
      .then((res) => {
        setOrderNumber(res.order.number);
      })
      .catch((err) => {console.log(`Ошибка при сохранении заказа: ${err}`)});
  };

  return (
    <InitialDataContext.Provider value={cards}>
      <AppHeader isAppHeaderVisible={isAppHeaderVisible} handleToggle={handleToggle} />
      <Main isBurgerIngredientsVisible={isBurgerIngredientsVisible} isBurgerConstructorVisible={isBurgerConstructorVisible} handleToggle={handleToggle} handleModalOpen={handleModalOpen} setTitle={setTitle} setContent={setContent} handleCardClick={handleCardClick} />
      <TotalPrice isBurgerConstructorVisible={isBurgerConstructorVisible} handleToggle={handleToggle} handleModalOpen={handleModalOpen} setTitle={setTitle} setContent={setContent} storeOrder={storeOrder} totalPrice={totalPrice} />
      <Modal isModalVisible={isModalVisible} handleModalClose={handleModalClose} title={title}>
        {content ? <IngredientDetails card={selectedCard} /> : <OrderDetails sum={sum} orderNumber={orderNumber} />}
      </Modal>
    </InitialDataContext.Provider>
  );
}

export default App;
