/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from '../services/hooks';
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
import { getItems } from '../services/actions/burger-ingredients';
import { resetItemToViewAction } from '../services/actions/item-to-view';
import { resetOrderAction } from '../services/actions/order';
import { resetOrderToViewAction } from '../services/actions/order-to-view';
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
  const [number, setNumber] = useState<number>();

  const tablet: boolean = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobile: boolean = useMediaQuery({ query: `(max-width: 600px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 480px)` });

  const selectedCard = useSelector((store) => store.itemToView.ingredient);
  const orderNumber = useSelector((store) => store.order.number);
  const selectedOrder = useSelector((store) => store.orderToView.order);
  
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
    localStorage.removeItem('card');
    localStorage.removeItem('number');
    setNumber(undefined);
    setIsModalVisible(false);
    dispatch(resetItemToViewAction());
    dispatch(resetOrderAction());
    dispatch(resetOrderToViewAction());
    history.goBack();
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
              handleModalOpen={handleModalOpen} 
            />
          </DndProvider>
          <TotalPrice 
            isBurgerConstructorVisible={isBurgerConstructorVisible} 
            handleToggle={handleConstructorToggle} 
            handleModalOpen={handleModalOpen}
            setNumber={setNumber}
          />
        </MainRoute>
        <PublicRoute path='/register' component={Register} />
        <Route path='/login'><Login /></Route>
        <PublicRoute path='/forgot-password' component={ForgotPassword} />
        <PublicRoute path='/reset-password' component={ResetPassword} />
        <ProtectedRoute exact path='/profile' component={Profile} /> 
        <ProtectedRoute exact path='/profile/orders' component={() => <Order handleModalOpen={handleModalOpen} />} />
        <ProtectedRoute path='/profile/orders/:orderId' component={HistoryOrder} />
        <Route path='/ingredients/:ingredientId'><Ingredient /></Route>
        <FeedRoute exact path='/feed'>
          <Feed
            isOrdersVisible={isOrdersVisible}
            isStatsVisible={isStatsVisible}
            handleOrdersToggle={handleOrdersToggle}
            handleStatsToggle={handleStatsToggle}  
            handleModalOpen={handleModalOpen}
          />
        </FeedRoute>
        <FeedRoute path='/feed/:feedId'><OrderFeed /></FeedRoute>
        <Route><NotFound /></Route>
      </Switch>
      {background && (
        <Route
          path='/ingredients/:ingredientId'
          children={
            <Modal 
              isModalVisible={isModalVisible} 
              handleModalClose={handleModalClose} 
              title={mobileS ? '' : 'Детали ингредиента'}>
                <IngredientDetails card={selectedCard!} />
            </Modal>
          } 
        />
      )}
      {background && (
        <Route
          path='/profile/orders'
          children={
            <Modal 
              isModalVisible={isModalVisible}
              handleModalClose={handleModalClose} 
              title={mobileS ? 'Заказ оформлен' : ''}>
                <OrderDetails sum={sum} orderNumber={orderNumber!} number={number!} />
            </Modal>
          } 
        />
        )}
      {background && (
        <Route
          //path='/feed/:feedId'
          path='/feed/:orderNumber'
          children={
            <Modal
              //isModalVisible={isModalVisible}
              handleModalClose={handleModalClose} 
              title={mobileS ? 'Детали заказа' : ''}>
                <FeedOrderDetails card={selectedOrder!} />
            </Modal>
          } 
        />
      )}
      {background && (
        <Route
          //path='/profile/orders/:orderId'
          path='/profile/orders/:orderNumber'
          children={
            <Modal
              //isModalVisible={isModalVisible}
              handleModalClose={handleModalClose} 
              title={mobileS ? 'Детали заказа' : ''}>
                <FeedOrderDetails card={selectedOrder!} />
            </Modal>
          } 
        />
        )}
    </>
  );
}

export default App;