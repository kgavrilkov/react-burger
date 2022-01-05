/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import AppHeader from './app-header/app-header.js';
import Main from './main/main.js';
import Modal from './modal/modal.js';
import IngredientDetails from './ingredient-details/ingredient-details.js';
import OrderDetails from './order-details/order-details.js';
import sum from '../utils/total.js';

function App() {
  const [cards, setCards]=React.useState([]);
  const [isBurgerIngredientsVisible, setIsBurgerIngredientsVisible]=React.useState(true);
  const [isBurgerConstructorVisible, setIsBurgerConstructorVisible]=React.useState(true);
  const [isAppHeaderVisible, setIsAppHeaderVisible]=React.useState(false);
  const [isModalVisible, setIsModalVisible]=React.useState(false);
  const [title, setTitle]=React.useState();
  const [content, setContent]=React.useState();
  const [selectedCard, setSelectedCard]=React.useState();
  const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';
  const tablet = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });

  const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  const getCards = () => {
    fetch(BASE_URL)
      .then(checkResponse)
      .then(result => setCards(result.data))
      .catch((err) => {console.log(`Ошибка при загрузке: ${err}`)});
  };
  
  React.useEffect(() => {
    getCards();
  }, []);

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

  return (
    <>
      <AppHeader isAppHeaderVisible={isAppHeaderVisible} handleToggle={handleToggle} />
      <Main isBurgerIngredientsVisible={isBurgerIngredientsVisible} isBurgerConstructorVisible={isBurgerConstructorVisible} handleToggle={handleToggle} cards={cards} handleModalOpen={handleModalOpen} setTitle={setTitle} setContent={setContent} handleCardClick={handleCardClick} />
      <Modal isModalVisible={isModalVisible} handleModalClose={handleModalClose} title={title}>
        {content ? <IngredientDetails card={selectedCard} /> : <OrderDetails sum={sum} />}
      </Modal>
    </>
  );
}

export default App;
