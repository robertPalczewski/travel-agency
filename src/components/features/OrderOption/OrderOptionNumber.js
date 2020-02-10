import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionNumber = ({currentValue, limits, setOptionValue, price}) => {
  console.log('OrderOptionNumber - ', 'setOptionValue: ', setOptionValue, 'currentValue: ', currentValue);
  return (
    <div className={styles.number}>
      <input type='number' className={styles.inputSmall} value={currentValue} min={limits.min} max={limits.max} onChange={event => setOptionValue(event.currentTarget.value)} />
      ({formatPrice(price)})
    </div>
  );
};
    
OrderOptionNumber.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.number,
  limits: PropTypes.object,
  price: PropTypes.string,
};

export default OrderOptionNumber;