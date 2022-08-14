/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import { useSelector } from '../../services/hooks';
import { useMediaQuery } from 'react-responsive';
import donePath from '../../images/done.gif';
import styles from './order-details.module.css';
import { TOrderDetails } from '../../utils/types';

const OrderDetails: FC<TOrderDetails> = ({ sum, orderNumber, number }) => {
  const orderNumberRequest = useSelector((store) => store.order.orderNumberRequest);

  const [visible, setVisible] = useState<boolean>();
  const [display, setDisplay] =useState<boolean>();
  
  const mobileL: boolean = useMediaQuery({ query: `(max-width: 580px)` });
  const mobile: boolean = useMediaQuery({ query: `(max-width: 480px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 330px)` });

  useEffect(() => {
  if (orderNumberRequest) {
    setVisible(true);
    setDisplay(false);
  }
  if (!orderNumberRequest) {
    setVisible(false);
    setDisplay(true);
  }
  }, []);
  
  return(
    <>
      {orderNumberRequest
      ? 
        <p className={mobileL ? mobile ? mobileS ? "text text_type_digits-small mt-8 mb-8" : "text text_type_digits-default mt-10 mb-10" : "text text_type_digits-medium mt-2 mb-2" : "text text_type_digits-medium mt-4 mb-8"} style={mobileS ? { color: '#4C4CFF' } : { color: '#F2F2F3' }}>Загрузка ...</p>
      : 
        <div className={visible ? styles.visible : styles.invisible}>
          <p className={mobileL ? mobile ? mobileS ? "text text_type_digits-medium mt-8 mb-8" : "text text_type_digits-medium mt-10 mb-10" : "text text_type_digits-medium mt-2 mb-2" : "text text_type_digits-large mt-4 mb-8"} style={mobileS ? { color: '#4C4CFF' } : { color: '#F2F2F3' }}>{orderNumber}</p>
        </div>
      }
      {!orderNumberRequest
      &&
        <div className={display ? styles.visible : styles.invisible}>
          <p className={mobileL ? mobile ? mobileS ? "text text_type_digits-medium mt-8 mb-8" : "text text_type_digits-medium mt-10 mb-10" : "text text_type_digits-medium mt-2 mb-2" : "text text_type_digits-large mt-4 mb-8"} style={mobileS ? { color: '#4C4CFF' } : { color: '#F2F2F3' }}>{number}</p>
        </div>
      }
      <p className={mobileL ? mobile ? mobileS ? "text text_type_main-default mb-8" : "text text_type_main-medium mb-25" : "text text_type_main-default mb-4" : "text text_type_main-medium mb-15"}>{sum.subtitle}</p>
      <img src={donePath} style={mobile ? {width: 80, height: 80} : undefined} alt="" />
      <p className={mobileL ? mobile ? mobileS ? "text text_type_main-small mt-8 mb-8" : "text text_type_main-default mt-25 mb-25" : "text text_type_main-small mt-4 mb-2" : "text text_type_main-default mt-15 mb-2"}>{sum.message}</p>
      <p className={mobile ? "text text_type_main-small text_color_inactive mb-15" : "text text_type_main-default text_color_inactive mb-15"} style={{textAlign: 'center'}}>{sum.info}</p>
    </>
  );
}

export default OrderDetails;