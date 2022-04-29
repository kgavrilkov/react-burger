import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import donePath from '../../images/done.gif';
import { orderProperties } from '../../utils/types.js';

function OrderDetails({ sum, orderNumber }) {
  const orderNumberRequest = useSelector(store => store.order.orderNumberRequest);
  
  const mobile = useMediaQuery({ query: `(max-width: 580px)` });
  const mobileS = useMediaQuery({ query: `(max-width: 330px)` });

  return(
    <>
      {orderNumberRequest 
      ? 
        <p className={mobile ? mobileS ? "text text_type_digits-small mt-8 mb-8" : "text text_type_digits-medium mt-2 mb-2" : "text text_type_digits-medium mt-4 mb-8"} style={mobileS ? { color: '#4C4CFF' } : { color: '#F2F2F3' }}>Загрузка ...</p> 
      : 
        <p className={mobile ? mobileS ? "text text_type_digits-medium mt-8 mb-8" : "text text_type_digits-medium mt-2 mb-2" : "text text_type_digits-large mt-4 mb-8"} style={mobileS ? { color: '#4C4CFF' } : { color: '#F2F2F3' }}>{orderNumber}</p>
      }
      <p className={mobile ? mobileS ? "text text_type_main-default mb-8" : "text text_type_main-default mb-4" : "text text_type_main-medium mb-15"}>{sum.subtitle}</p>
      <img src={donePath} style={mobile ? {width: 80, height: 80} : null} alt="" />
      <p className={mobile ? mobileS ? "text text_type_main-small mt-8 mb-8" : "text text_type_main-small mt-4 mb-2" : "text text_type_main-default mt-15 mb-2"}>{sum.message}</p>
      <p className={mobile ? "text text_type_main-small text_color_inactive mb-15" : "text text_type_main-default text_color_inactive mb-15"} style={{textAlign: 'center'}}>{sum.info}</p>
    </>
  );
}

OrderDetails.propTypes = orderProperties.isRequired

export default OrderDetails;