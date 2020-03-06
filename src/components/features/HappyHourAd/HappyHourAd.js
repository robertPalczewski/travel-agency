import React from 'react';
import PropTypes from 'prop-types';
import styles from './HappyHourAd.scss';


class HappyHourAd extends React.Component {
  constructor(){
    super();
    
    setInterval(() => {
      this.forceUpdate();
    }, 1000);
    
  }
  
  getCountdownTime(){
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));
    
    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }
    
    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }
  
  render() {

    const {titleText, promoDescTxt} = this.props;
    const countTime = this.getCountdownTime();
    
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{titleText}</h3>
        {countTime > 82800 ? (
          <div className={styles.promoDescription}>{promoDescTxt}</div>) : (
          <div className={styles.promoDescription}>{this.getCountdownTime()}</div>
        )}
      </div>
    );
  }
}

HappyHourAd.propTypes = {
  titleText: PropTypes.string,
  promoDescTxt: PropTypes.string,
};

export default HappyHourAd;