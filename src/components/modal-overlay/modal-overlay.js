import React from "react";
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';
import { overlayProperties } from '../../utils/types.js';

function ModalOverlay({ handleModalClose }) {
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleModalClose}></div>,
    document.getElementById('root')
  );
}

ModalOverlay.propTypes = overlayProperties.isRequired

export default ModalOverlay;