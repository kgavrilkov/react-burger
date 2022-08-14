import React, { useMemo, useCallback, FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from '../../services/hooks';
import { useDrop } from 'react-dnd';
import { DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ListElement from '../list-element/list-element';
import Card from '../card/card';
import DraggableElement from '../draggable-element/draggable-element';
import { addIngredientAction, deleteIngredientAction, reorderIngredientsAction } from '../../services/actions/constructor-ingredients';
import styles from './burger-constructor.module.css';
import { TBurgerConstructor, TIngredientToDelete } from '../../utils/types';

const BurgerConstructor: FC<TBurgerConstructor> = ({ isBurgerIngredientsVisible, handleToggle }) => {
  const mobile: boolean = useMediaQuery({ query: `(max-width: 600px)` });

  const { constructorIngredients } = useSelector((store) => store.constructorIngredients);
  const dispatch = useDispatch();

  const buns = useMemo(() => 
    constructorIngredients.find(((card) => card.type === 'bun')) 
  , [constructorIngredients]);
  const notBuns = useMemo(() => 
    constructorIngredients.filter(((card) => card.type !== 'bun')) 
  , [constructorIngredients]);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredientToDelete) {
      dispatch(addIngredientAction({...item, key: uuidv4()}));
    }
  });

  const handleDeleteClick = (item: TIngredientToDelete) => {
    dispatch(deleteIngredientAction(item.key));
  };

  const moveCard = useCallback((hoverIndex, dragIndex) => {
    const newCards = [...notBuns];
    newCards.splice(hoverIndex, 0, newCards.splice(dragIndex, 1)[0]);
    dispatch(reorderIngredientsAction(newCards));
  }, [dispatch, notBuns]);

  const onClick = () => {
    handleToggle();
    localStorage.removeItem('BurgerConstructor');
  };
  
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
                  onClick={function (): void {
                    throw new Error('Function not implemented.');
                  } }              
                />
              </li>
            }
            {notBuns.map((card: TIngredientToDelete, index: number) => {return(
              <ListElement 
                key={card.key} 
                card={card} 
                isBurgerIngredientsVisible={isBurgerIngredientsVisible} 
                index={index} 
                id={card.key} 
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
                  onClick={function (): void {
                    throw new Error('Function not implemented.');
                  } }                
                />
              </li>
            }
          </ul>
        </>
      :
        <> 
          <h1 className={styles.heading}>
            <p className="text text_type_main-large">Заказ</p>
            <Button type="primary" size="medium" onClick={onClick}>Назад</Button>
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
                  notBuns.map((card: TIngredientToDelete, index: number) => {return(
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

export default BurgerConstructor;