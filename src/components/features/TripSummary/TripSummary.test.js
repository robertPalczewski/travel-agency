import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('if image src and alt are correct', () => {
    const expectedSrc = 'lorem ipsum';
    const expectedAlt = 'lorem ipsum';
    const component = shallow(<TripSummary image={expectedSrc} name={expectedAlt} tags={[]} />);
  
    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });
  
  it('should generate correct link', () => {
    const expectedId = 'abc';
    const expectedLink = '/trip/'+expectedId;
    const component = shallow(<TripSummary id={expectedId} tags={[]}/>);
    
    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });
  it('should render correct name, cost and days', () => {
    const expectedName = 'lorem ipsum';
    const expectedCost = '12$';
    const expectedDays = 12;
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} tags={[]} />);
    
    expect(component.find('h3.title').text()).toEqual(expectedName);
    expect(component.find('.details').text()).toEqual(expectedDays + ' days' + 'from ' + expectedCost);
  });
  it('should render without crashing', () => {
    const component = shallow(<TripSummary tags={[]}/>);
    
    expect(component).toBeTruthy();
  });
  
  it('should render correct tags', () => {
    const expectedTags = ['aaa', 'bbb', 'ccc'];
    const component = shallow(<TripSummary tags={expectedTags}/>);
    
    for(let tag of expectedTags){
      expect(component.find('.tag').at(expectedTags.indexOf(tag)).text()).toEqual(tag);
    }
  });
  
  it('shouldnt render tag div when tag is undefined or empty array', () => {
    const component = shallow(<TripSummary />);
    
    const renderedTags = component.find('.tags');
    expect(renderedTags.exists()).toBeFalsy();
  });
});