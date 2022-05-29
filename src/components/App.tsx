/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useHistory, useLocation, Switch, Route } from 'react-router-dom';
import AppHeader from './app-header/app-header';
import Main from './main/main';
import Modal from './modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import OrderDetails from './order-details/order-details';
import sum from '../utils/total';
import TotalPrice from './total-price/total-price';
import { RESET_ITEM_TO_VIEW } from '../services/actions/item-to-view.js';
import { RESET_ORDER } from '../services/actions/order.js';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import ForgotPassword from '../pages/forgot-password/forgot-password';
import ResetPassword from '../pages/reset-password/reset-password';
import Profile from '../pages/profile/profile';
import Ingredient from '../pages/ingredient/ingredient';
import Order from '../pages/order/order';
import NotFound from '../pages/not-found/not-found';
import ProtectedRoute from './protected-route/protected-route';
import PublicRoute from './public-route/public-route';
import MainRoute from './main-route/main-route';
import { TLocationParams }  from '../utils/types';

const App: FC = () => {
  const [isBurgerIngredientsVisible, setIsBurgerIngredientsVisible] = useState<boolean>(true);
  const [isBurgerConstructorVisible, setIsBurgerConstructorVisible] = useState<boolean>(true);
  const [isAppHeaderVisible, setIsAppHeaderVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const tablet: boolean = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobile: boolean = useMediaQuery({ query: `(max-width: 600px)` });

  const selectedCard = useSelector((store: any) => store.itemToView.ingredient);
  const orderNumber = useSelector((store: any) => store.order.number);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation() as unknown as TLocationParams;

  const background = location.state && location.state.background;

  useEffect(() => {
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
        <MainRoute exact path='/'>
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
        </MainRoute>
        <PublicRoute path='/register' component={Register} />
        <Route path='/login'><Login /></Route>
        <PublicRoute path='/forgot-password' component={ForgotPassword} />
        <PublicRoute path='/reset-password' component={ResetPassword} />
        <ProtectedRoute exact path='/profile' component={Profile} />
        <ProtectedRoute path='/profile/orders' component={Order} />
        <ProtectedRoute path='/profile/orders/:orderNumber' component={Order}/>
        <Route path='/ingredients/:ingredientId'><Ingredient /></Route>
        <Route><NotFound /></Route>
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
              handleModalClose={handleModalClose} 
              title={''}>
                <OrderDetails sum={sum} orderNumber={orderNumber} />
            </Modal>
          } 
        />
      )}
    </>
  );
}

export default App;
