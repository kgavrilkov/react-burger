import React, { FC } from "react";
import styles from './modal-overlay.module.css';
import { TModalOverlay } from '../../utils/types';

const ModalOverlay: FC<TModalOverlay> = ({ handleModalClose }) => {
  return(
    <div className={styles.overlay} onClick={handleModalClose}></div>
  );
}

export default ModalOverlay;