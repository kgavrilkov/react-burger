/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { TModal } from '../../utils/types';

const Modal: FC<TModal> = ({ handleModalClose, title, children }) => {
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 480px)` });
  
  const modalRoot = document.getElementById("modals")!;

  useEffect(() => {
    const handleEscClose = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleModalClose();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={mobileS ? styles.title : "text text_type_main-large"} data-cy="title">{title}</p>
            <button className={title ? styles.button : styles.key} onClick={handleModalClose} data-cy="button">
              <CloseIcon type="primary" />
            </button>
          </header>
          {children} 
        </div>
      </div>
      <ModalOverlay handleModalClose={handleModalClose} />
    </>,
    modalRoot
  );
}

export default Modal;