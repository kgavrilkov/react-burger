/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from './app-header/app-header.js';
import Main from './main/main.js';
import Modal from './modal/modal.js';
import IngredientDetails from './ingredient-details/ingredient-details.js';
import OrderDetails from './order-details/order-details.js';
import sum from '../utils/total.js';
import TotalPrice from './total-price/total-price.js';
import { RESET_ITEM_TO_VIEW } from '../services/actions/item-to-view.js';
import Login from '../pages/login/login.js';
import Register from '../pages/register/register.js';
import ForgotPassword from '../pages/forgot-password/forgot-password.js';
import ResetPassword from '../pages/reset-password/reset-password.js';
import Ingredients from '../pages/ingredients/ingredients.js';
import Profile from '../pages/profile/profile.js';
import NotFound from '../pages/not-found/not-found.js';

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

  const dispatch = useDispatch();

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
    dispatch({
      type: RESET_ITEM_TO_VIEW
    });
  };

  return (
    <Router>
      <AppHeader 
        isAppHeaderVisible={isAppHeaderVisible} 
        handleToggle={handleToggle} 
      />
      <Switch>
        <Route exact path='/'>
          <DndProvider backend={HTML5Backend}>
            <Main 
              isBurgerIngredientsVisible={isBurgerIngredientsVisible} 
              isBurgerConstructorVisible={isBurgerConstructorVisible} 
              handleToggle={handleToggle} 
              handleModalOpen={handleModalOpen} 
              setTitle={setTitle} 
              setContent={setContent} 
            />
          </DndProvider>
          <TotalPrice 
            isBurgerConstructorVisible={isBurgerConstructorVisible} 
            handleToggle={handleToggle} 
            handleModalOpen={handleModalOpen} 
            setTitle={setTitle} 
            setContent={setContent} 
          />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPassword />
        </Route>
        <Route path='/reset-password'>
          <ResetPassword />
        </Route>
        <Route path='/ingredients/:id'>
          <Ingredients />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>     
      <Modal 
        isModalVisible={isModalVisible} 
        handleModalClose={handleModalClose} 
        title={title}>
        {content 
        ? 
          <IngredientDetails card={selectedCard} /> 
        : 
          <OrderDetails sum={sum} orderNumber={orderNumber} />
        }
      </Modal>
    </Router>
  );
}

export default App;
