/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { TModal } from '../../utils/types';

const Modal: FC<TModal> = ({ isModalVisible, handleModalClose, title, children }) => {
  const mobile: boolean = useMediaQuery({ query: `(max-width: 580px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 480px)` });
  const modalRoot = document.getElementById("modals")!;

  const handleEscClose = (evt: { key: string; }) => {
    if (evt.key === 'Escape') {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  if (!isModalVisible) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={mobile ? mobileS ? "text text_type_main-default" : "text text_type_main-medium" : "text text_type_main-large"}>{title}</p>
            <button className={title ? styles.button : styles.key} onClick={handleModalClose}>
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