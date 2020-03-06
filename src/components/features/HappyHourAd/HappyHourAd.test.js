import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  promoDescription: '.promoDescription',
};

const mockProps = {
  titleText: 'lorem ipsum ttile',
  promoDescTxt: 'lorem ipsum desc',
};

describe('Component HappyHourAd', () => {
  it('should render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });
  
  it('should render heading and description', () => {
    const component = shallow(<HappyHourAd {...mockProps} />);
    
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });
  
  it('should render title text', () => {
    const component = shallow(<HappyHourAd {...mockProps} />);
    
    expect(component.find(select.title).text()).toEqual(mockProps.titleText);
  });
});

const trueDate = Date;

const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length) {
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};

const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
    
    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
    
    global.Date = trueDate;
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});

const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
  
    const component = shallow(<HappyHourAd {...mockProps} />);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());
  
    jest.advanceTimersByTime(delaySeconds * 1000);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
  
    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});

const showDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct text at ${time}`, () => {
    global.Date = mockDate(`2019-05-15T${time}.135Z`);
    
    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
    
    global.Date = trueDate;
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  showDescriptionAtTime('12:57:58', mockProps.promoDescTxt);
  showDescriptionAtTime('12:59:59', mockProps.promoDescTxt);
  showDescriptionAtTime('12:00:00', mockProps.promoDescTxt);
});

const checkDescriptionByTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2019-05-15T${time}.135Z`);
    
    const component = shallow(<HappyHourAd {...mockProps} />);
    const newTime = new Date();
    
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());
    jest.advanceTimersByTime(delaySeconds * 1000);
    
    const renderedTime = component.find(select.promoDescription).text();
    
    expect(renderedTime).toEqual(expectedDescription);
    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with changing mockedDate and delay Seconds', () => {
  checkDescriptionByTime('11:57:58', 130, mockProps.promoDescTxt);
  checkDescriptionByTime('11:59:58', 5, mockProps.promoDescTxt);
});