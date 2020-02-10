import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './OrderOption.scss';

const OrderOptionDate = ({setOrderOption, currentValue}) => (
  <div>
    <DatePicker className={styles.pointer} selected={currentValue} onChange={event => setOrderOption(event)}
    />
  </div>
);

OrderOptionDate.propTypes = {
  currentValue: PropTypes.string,
  setOrderOption: PropTypes.func,
};

export default OrderOptionDate;