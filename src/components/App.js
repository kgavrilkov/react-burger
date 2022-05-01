/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import AppHeader from './app-header/app-header.js';
import Main from './main/main.js';
import Modal from './modal/modal.js';
import IngredientDetails from './ingredient-details/ingredient-details.js';
import OrderDetails from './order-details/order-details.js';
import sum from '../utils/total.js';
import TotalPrice from './total-price/total-price.js';
import { RESET_ITEM_TO_VIEW } from '../services/actions/item-to-view.js';
import { RESET_ORDER } from '../services/actions/order.js';
import Login from '../pages/login/login.js';
import Register from '../pages/register/register.js';
import ForgotPassword from '../pages/forgot-password/forgot-password.js';
import ResetPassword from '../pages/reset-password/reset-password.js';
import Profile from '../pages/profile/profile.js';
import Ingredient from '../pages/ingredient/ingredient.js';
import Order from '../pages/order/order.js';
import NotFound from '../pages/not-found/not-found.js';
import ProtectedRoute from './protected-route/protected-route.js';
import PublicRoute from './public-route/public-route.js';

function App() {
  const [isBurgerIngredientsVisible, setIsBurgerIngredientsVisible] = React.useState(true);
  const [isBurgerConstructorVisible, setIsBurgerConstructorVisible] = React.useState(true);
  const [isAppHeaderVisible, setIsAppHeaderVisible] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const tablet = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });

  const selectedCard = useSelector(store => store.itemToView.ingredient);
  const orderNumber = useSelector(store => store.order.number);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const background = location.state && location.state.background;

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
    localStorage.removeItem('card');
    setIsModalVisible(false);
    dispatch({
      type: RESET_ITEM_TO_VIEW
    });
    dispatch({
      type: RESET_ORDER
    });
    history.goBack();
  };

  return (
    <>
      <AppHeader 
        isAppHeaderVisible={isAppHeaderVisible} 
        handleToggle={handleToggle} 
      />
      <Switch location={ background || location }>
        <Route exact path='/'>
          <DndProvider backend={HTML5Backend}>
            <Main 
              isBurgerIngredientsVisible={isBurgerIngredientsVisible} 
              isBurgerConstructorVisible={isBurgerConstructorVisible} 
              handleToggle={handleToggle} 
              handleModalOpen={handleModalOpen} 
            />
          </DndProvider>
          <TotalPrice 
            isBurgerConstructorVisible={isBurgerConstructorVisible} 
            handleToggle={handleToggle} 
            handleModalOpen={handleModalOpen} 
          />
        </Route>
        <PublicRoute path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <PublicRoute path='/forgot-password' component={ForgotPassword} />
        <PublicRoute path='/reset-password' component={ResetPassword} />
        <ProtectedRoute exact path='/profile' component={Profile} />
        <ProtectedRoute path='/profile/orders' component={Order} />
        <ProtectedRoute path='/profile/orders/:orderNumber' />
        <Route path='/ingredients/:ingredientId' component={Ingredient} />
        <Route component={NotFound} />
      </Switch>     
      {background && (
        <Route
          path='/ingredients/:ingredientId'
          children={
            <Modal 
              isModalVisible={isModalVisible} 
              handleModalClose={handleModalClose} 
              title='Детали ингредиента'>
                <IngredientDetails card={selectedCard} />
            </Modal>
          } 
        />
      )}
      {background && (
        <Route
          path='/profile/orders/:orderNumber'
          children={
            <Modal 
              isModalVisible={isModalVisible} 
              handleModalClose={handleModalClose}>
                <OrderDetails sum={sum} orderNumber={orderNumber} />
            </Modal>
          } 
        />
      )}
    </>
  );
}

export default App;
