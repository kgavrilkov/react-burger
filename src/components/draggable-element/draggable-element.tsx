import React, { FC, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './draggable-element.module.css';
import { TDraggable } from '../../utils/types';

const DraggableElement: FC<TDraggable> = ({ card, index, id, handleDeleteClick, moveCard }) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: TDraggable, monitor) {
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
      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
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
    <li className={styles.item} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <div className={styles.wrapper}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={card.name}
        price={card.price}
        thumbnail={card.image}
        handleClose={() => handleDeleteClick(card)}
      />
    </li>
  );
}

export default DraggableElement;