import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';
import {setOrderOption} from '../../../redux/orderRedux';
import Button from '../../common/Button/Button';
import settings from '../../../data/settings';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';

const sendOrder = (options, tripCost, tripCountry, tripName) => {
  console.log('options, tripCost', options, tripCost, tripName, tripCountry);
  
  const totalCost = formatPrice(calculateTotal(tripCost, options));
  
  const payload = {
    ...options,
    totalCost,
    tripCountry,
    tripName,
  };
  
  const url = settings.db.url + '/' + settings.db.endpoint.orders;
  
  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  
  fetch(url, fetchOptions)
    .then(function (response) {
      return response.json();
    }).then(function (parsedResponse) {
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = (props) => (
  <Row>
    {pricing.map(option => (
      <Col md={4} key={option.id}>
        <OrderOption {...option} setOrderOption={setOrderOption} currentValue={props.options[option.id]}/>
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={props.tripCost} options={props.options}/>
    </Col>
    <Button
      disabled={props.options.name == '' || props.options.contact == ''}
      onClick={() => sendOrder(props.options, props.tripCost, props.tripCountry, props.tripName)}>
      Order now!
    </Button>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  tripName: PropTypes.string,
  tripCountry: PropTypes.object,
};

export default OrderForm;