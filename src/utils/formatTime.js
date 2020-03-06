export const formatTime = time => {
  
  if(time !== undefined && typeof(time) === 'number' && time >= 0) {
    
    return (String(Math.floor(time/3600)).padStart(2, '0') + ':' +
      String(Math.floor((time/60)%60)).padStart(2, '0') + ':' +
      String(Math.floor(time%60)).padStart(2, '0')
    );

  } else {
    return null;
  }
};