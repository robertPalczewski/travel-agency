import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import Icon from '../../common/Icon/Icon';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionIcons = ({values, setOptionValue, currentValue, required}) => {
  console.log('values: ', values, 'setOptionValue: ', setOptionValue, 'currentValue: ', currentValue, 'required: ', required);
  
  return (
    <div className={styles.component}>
      {!required ? (
        <div className={styles.icon} onClick={() => setOptionValue('')}>
          <Icon name={'times-circle'}/>
          {'none'}
        </div>
      ) : null}
      {values.map(value => {
        let iconClasses = styles.icon;
        if (value.id === currentValue) {
          iconClasses = iconClasses + ' ' + styles.iconActive;
        }
        return (
          <div className={iconClasses} key={value.id} onClick={() => setOptionValue(value.id)}>
            <Icon name={value.icon}/>
            {value.name}
            {formatPrice(value.price)}
          </div>
        );
      })}
    </div>
  );
};

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
  required: PropTypes.bool,
};

export default OrderOptionIcons;