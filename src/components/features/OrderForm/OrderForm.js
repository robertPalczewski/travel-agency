import React from 'react';
// import styles from './OrderForm.scss';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';
import {setOrderOption} from '../../../redux/orderRedux';

const OrderForm = props => (
  <Row>
    {pricing.map(option => (
      <Col md={4} key={option.id}>
        <OrderOption {...option} setOrderOption={setOrderOption} currentValue={props.options[option.id]}/>
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={props.tripCost} options={props.options}/>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderForm;