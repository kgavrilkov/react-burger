/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from '../services/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useHistory, useLocation, Switch, Route } from 'react-router-dom';
import AppHeader from './app-header/app-header';
import Main from './main/main';
import Modal from './modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import OrderDetails from './order-details/order-details';
import TotalPrice from './total-price/total-price';
import { getItems } from '../services/actions/burger-ingredients';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import ForgotPassword from '../pages/forgot-password/forgot-password';
import ResetPassword from '../pages/reset-password/reset-password';
import Profile from '../pages/profile/profile';
import Ingredient from '../pages/ingredient/ingredient';
import Order from '../pages/order/order';
import Feed from '../pages/feed/feed';
import OrderFeed from '../pages/order-feed/order-feed';
import HistoryOrder from '../pages/history-order/history-order';
import FeedOrderDetails from '../pages/feed/feed-order-details/feed-order-details';
import NotFound from '../pages/not-found/not-found';
import ProtectedRoute from './protected-route/protected-route';
import PublicRoute from './public-route/public-route';
import MainRoute from './main-route/main-route';
import FeedRoute from './feed-route/feed-route';
import { TLocationParams }  from '../utils/types';

const App: FC = () => {
  const [isBurgerIngredientsVisible, setIsBurgerIngredientsVisible] = useState<boolean>(true);
  const [isBurgerConstructorVisible, setIsBurgerConstructorVisible] = useState<boolean>(true);
  const [isAppHeaderVisible, setIsAppHeaderVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isOrdersVisible, setIsOrdersVisible] = useState<boolean>(true);
  const [isStatsVisible, setIsStatsVisible] = useState<boolean>(true);

  const tablet: boolean = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobile: boolean = useMediaQuery({ query: `(max-width: 600px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 480px)` });
  
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation() as unknown as TLocationParams;

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(() => {
    if (tablet) {
      setIsBurgerIngredientsVisible(true);
      setIsBurgerConstructorVisible(false);
    } else {
      setIsBurgerIngredientsVisible(true);
      setIsBurgerConstructorVisible(true);
    }
  }, [tablet]);
  
  const handleAppHeaderVisible = () => {
    setIsAppHeaderVisible(true);
  };

  const handleAppHeaderInvisible = () => {
    setIsAppHeaderVisible(false);
  };

  const handleConstructorToggle = () => {
    if (tablet) {
      setIsBurgerIngredientsVisible(false);
      setIsBurgerConstructorVisible(true);
    }
    if (mobile) {
      handleAppHeaderVisible();
    }
  };

  const handleIngredientsToggle = () => {
    if (tablet) {
      setIsBurgerIngredientsVisible(true);
      setIsBurgerConstructorVisible(false);
    }
    if (mobile) {
      handleAppHeaderInvisible();
    }
  };

  useEffect(() => {
    if (tablet) {
      setIsOrdersVisible(true);
      setIsStatsVisible(false);
    } else {
      setIsOrdersVisible(true);
      setIsStatsVisible(true);
    }
  }, [tablet]);

  const handleOrdersToggle = () => {
    if (tablet) {
      setIsOrdersVisible(true);
      setIsStatsVisible(false);
    }
  };

  const handleStatsToggle = () => {
    if (tablet) {
      setIsStatsVisible(true);
      setIsOrdersVisible(false);
    }
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    if (background) {
      history.goBack();
    }
  };

  return (
    <>
      <AppHeader 
        isAppHeaderVisible={isAppHeaderVisible} 
        handleToggle={handleIngredientsToggle} 
      />
      <Switch location={ background || location }>
        <MainRoute exact path='/'>
          <DndProvider backend={HTML5Backend}>
            <Main 
              isBurgerIngredientsVisible={isBurgerIngredientsVisible} 
              isBurgerConstructorVisible={isBurgerConstructorVisible} 
              handleToggle={handleIngredientsToggle} 
            />
          </DndProvider>
          <TotalPrice 
            isBurgerConstructorVisible={isBurgerConstructorVisible} 
            handleToggle={handleConstructorToggle} 
            handleModalOpen={handleModalOpen}
          />
        </MainRoute>
        <PublicRoute path='/register' component={Register} />
        <Route path='/login'><Login /></Route>
        <PublicRoute path='/forgot-password' component={ForgotPassword} />
        <PublicRoute path='/reset-password' component={ResetPassword} />
        <ProtectedRoute exact path='/profile' component={Profile} /> 
        <ProtectedRoute exact path='/profile/orders' component={() => <Order />} />
        <ProtectedRoute path='/profile/orders/:orderNumber' component={HistoryOrder} />
        <Route path='/ingredients/:ingredientId'><Ingredient /></Route>
        <FeedRoute exact path='/feed'>
          <Feed
            isOrdersVisible={isOrdersVisible}
            isStatsVisible={isStatsVisible}
            handleOrdersToggle={handleOrdersToggle}
            handleStatsToggle={handleStatsToggle}  
          />
        </FeedRoute>
        <FeedRoute path='/feed/:orderNumber'><OrderFeed /></FeedRoute>
        <Route><NotFound /></Route>
      </Switch>
      {background && (
        <Route
          path='/ingredients/:ingredientId'
          children={
            <Modal 
              handleModalClose={handleModalClose} 
              title={mobileS ? '' : 'Детали ингредиента'}>
                <IngredientDetails />
            </Modal>
          } 
        />
      )}
      {isModalVisible && (
        <Route
          children={
            <Modal 
              handleModalClose={handleModalClose} 
              title={mobileS ? 'Заказ оформлен' : ''}>
                <OrderDetails />
            </Modal>
          } 
        />
        )}
      {background && (
        <Route
          path='/feed/:orderNumber'
          children={
            <Modal
              handleModalClose={handleModalClose} 
              title={mobileS ? 'Детали заказа' : ''}>
                <FeedOrderDetails />
            </Modal>
          } 
        />
      )}
      {background && (
        <Route
          path='/profile/orders/:orderNumber'
          children={
            <Modal
              handleModalClose={handleModalClose} 
              title={mobileS ? 'Детали заказа' : ''}>
                <FeedOrderDetails />
            </Modal>
          } 
        />
        )}
    </>
  );
}

export default App;