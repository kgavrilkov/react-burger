import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ListElement from '../list-element/list-element.js';
import Card from '../card/card.js';
import DraggableElement from '../draggable-element/draggable-element.js';
import { ADD_INGREDIENT, DELETE_INGREDIENT, REORDER_INGREDIENTS } from '../../services/actions/constructor-ingredients.js';
import styles from './burger-constructor.module.css';
import { constructorProperties } from '../../utils/types.js';

function BurgerConstructor({ isBurgerIngredientsVisible, handleToggle }) {
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });

  const { constructorIngredients } = useSelector(store => store.constructorIngredients);
  const dispatch = useDispatch();

  const buns = React.useMemo(() => 
    constructorIngredients.find((card => card.type === 'bun')) 
  , [constructorIngredients]);
  const notBuns = React.useMemo(() => 
    constructorIngredients.filter((card => card.type !== 'bun')) 
  , [constructorIngredients]);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        payload: {...item, key: uuidv4()}
      });
    }
  });

  const handleDeleteClick = (item) => {
    dispatch({
      type: DELETE_INGREDIENT,
      payload: item.key
    });  
  };

  const moveCard = React.useCallback((hoverIndex, dragIndex) => {
    const newCards = [...notBuns];
    newCards.splice(hoverIndex, 0, newCards.splice(dragIndex, 1)[0]);
    dispatch({
      type: REORDER_INGREDIENTS,
      payload: newCards
    });
  }, [dispatch, notBuns]);
  
  return(
    <section className={styles.burger} ref={dropRef} onDrop={(e) => {e.preventDefault();}}>
      {mobile 
      ?
        <>
          <ul className={styles.list}>
            {buns &&
              <li className={styles.item}>
                <div className={styles.wrapper}>
                  <DragIcon type="primary" />
                </div>
                <Card
                  card={buns}
                  isBurgerIngredientsVisible={isBurgerIngredientsVisible}
                  text={buns.name + ' (верх)'}
                />
              </li>
            }
            {notBuns.map((card, index) => {return(
              <ListElement 
                key={card.key} 
                card={card} 
                isBurgerIngredientsVisible={isBurgerIngredientsVisible} 
                index={index} 
                id={card.id} 
                handleDeleteClick={handleDeleteClick} 
                moveCard={moveCard}>
              </ListElement>)})  
            }
            {buns &&
              <li className={styles.item}>
                <div className={styles.wrapper}>
                  <DragIcon type="primary" />
                </div>
                <Card
                  card={buns}
                  isBurgerIngredientsVisible={isBurgerIngredientsVisible}
                  text={buns.name + ' (низ)'}  
                />
              </li>
            }
          </ul>
        </>
      :
        <> 
          <h1 className={styles.heading}>
            <p className="text text_type_main-large">Заказ</p>
            <Button type="primary" size="medium" onClick={handleToggle}>Назад</Button>
          </h1>
          <div className={styles.container}>
            <div className={styles.content}>
              {constructorIngredients.length > 0 
              ? 
                buns &&
                  <div className={styles.shell}>  
                    <ConstructorElement
                      type="top"
                      isLocked={true}
                      text={buns.name + ' (верх)'}
                      price={buns.price}
                      thumbnail={buns.image}
                    />
                  </div>
              : 
                <div className={styles.top}>Выберите булку</div>
              }
              <ul className={constructorIngredients.length > 5 ? styles.list : styles.enum}>
                {constructorIngredients.length > 0 
                ? 
                  notBuns.map((card, index) => {return(
                    <DraggableElement
                      key={card.key}
                      card={card}
                      index={index}
                      id={card.key}
                      handleDeleteClick={handleDeleteClick}
                      moveCard={moveCard}
                    />
                  )})
                :
                  <div className={styles.middle}>Выберите начинку</div>    
                }
              </ul>
              {constructorIngredients.length > 0 
              ? 
                buns &&
                  <div className={styles.shell}>
                    <ConstructorElement
                      type="bottom"
                      isLocked={true}
                      text={buns.name + ' (низ)'}
                      price={buns.price}
                      thumbnail={buns.image}
                    />
                  </div>
              :
                <div className={styles.bottom}>Выберите булку</div>    
              }
            </div>
          </div>
        </>
      }
    </section>
  );
}

BurgerConstructor.propTypes = constructorProperties.isRequired;

export default  BurgerConstructor;