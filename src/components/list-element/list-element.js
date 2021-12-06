import React from "react";
import { DeleteIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './list-element.module.css';

function ListElement({ children }) {
  const [isPressedItem, setIsPressedItem]=React.useState(false);
  const [isListElementVisible, setIsListElementVisible]=React.useState(true);

  const handleClick = () => {
    setIsPressedItem(!isPressedItem);
  };

  const handleChange = () => {
    setIsListElementVisible(false);
  };
   
  return(
    <>
      {isListElementVisible && 
        <li className={isPressedItem ? styles.element : styles.item} onClick={handleClick}>
          {children}
          <button className={styles.button} onClick={handleChange}>
            <DeleteIcon type="primary" />
          </button>
        </li>
      }
    </>
  );
}

export default ListElement;