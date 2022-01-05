import React from "react";
import styles from './modal-overlay.module.css';
import { overlayProperties } from '../../utils/types.js';

function ModalOverlay({ handleModalClose }) {
  return(
    <div className={styles.overlay} onClick={handleModalClose}></div>
  );
}

ModalOverlay.propTypes = overlayProperties.isRequired

export default ModalOverlay;