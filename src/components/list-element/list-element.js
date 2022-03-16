import React from "react";
import { useDrop, useDrag } from 'react-dnd';
import { DragIcon, DeleteIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Card from "../card/card";
import styles from './list-element.module.css';
import { listProperties } from '../../utils/types.js';

function ListElement({ card, isBurgerIngredientsVisible, index, id,  handleDeleteClick, moveCard }) {
  const [isPressedItem, setIsPressedItem]=React.useState(false);

  const handleClick = () => {
    setIsPressedItem(!isPressedItem);
  };

  const ref = React.useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });

  const opacity = isDragging ? 0 : 1

  drag(drop(ref));
   
  return(
    <li className={isPressedItem ? styles.element : styles.item} ref={ref} style={{ opacity }} data-handler-id={handlerId} onClick={handleClick}>
      <div className={styles.wrapper}>
        <DragIcon type="primary" />
      </div>
      <Card
        card={card}
        isBurgerIngredientsVisible={isBurgerIngredientsVisible}
        text={card.name} 
      />
      <button className={styles.button} onClick={(e) => handleDeleteClick(card)}>
        <DeleteIcon type="primary" />
      </button>
    </li>
  );
}

ListElement.propTypes = listProperties.isRequired

export default ListElement;