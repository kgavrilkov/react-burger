/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './modal.module.css';
import { modalProperties } from '../../utils/types.js';

function Modal({ isModalVisible, handleModalClose, content, selectedCard, sum }) {
  const mobile = useMediaQuery({ query: `(max-width: 580px)` });
  const mobileS = useMediaQuery({ query: `(max-width: 480px)` });

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      handleModalClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  if (!isModalVisible) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.container}>
        {content 
        ?
          <>
            <header className={styles.header}>
              {mobile
              ?
                <>
                  {mobileS
                  ?
                    <p className="text text_type_main-small">Детали ингредиента</p>
                  :
                    <p className="text text_type_main-medium">Детали ингредиента</p>  
                  }
                </>  
              :
                <p className="text text_type_main-large">Детали ингредиента</p>
              }
              <button className={styles.button} onClick={handleModalClose}>
                <CloseIcon type="primary" />
              </button>
            </header>
            <IngredientDetails card={selectedCard} />
          </>
        :
          <>
            <header className={styles.heading}>
              <button className={styles.key} onClick={handleModalClose}>
                <CloseIcon type="primary" />
              </button>
            </header>
            <OrderDetails sum={sum} />
          </>
        }
      </div>
      <ModalOverlay handleModalClose={handleModalClose} />
    </div>,
    document.body
  );
}

Modal.propTypes = modalProperties.isRequired

export default Modal;