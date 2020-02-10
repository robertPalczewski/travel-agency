import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';

const OrderOptionText = ({currentValue, id, setOrderOption}) => (
  <div className={styles.number}>
    
    <input
      type='text'
      className={styles.pointer}
      value={currentValue}
      placeholder={id == 'name' ? 'your name' : 'contact'}
      onChange={event => setOrderOption(event.currentTarget.value)}
    />
  </div>
);

OrderOptionText.propTypes = {
  currentValue: PropTypes.string,
  setOrderOption: PropTypes.func,
  id: PropTypes.string,
};

export default OrderOptionText;