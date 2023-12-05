import { useState, useEffect } from 'react';
import './col.css';

export const Col = ({children, span=3, offset=0, styleProps = {}}) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowSize = () => {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowSize);
    
    return () => {
      window.removeEventListener('resize', handleWindowSize);
    };
  }, []);

  if(width <= 435){
    
    return(
      <div className='col' style={{width:`calc(${span}*(100%/12))`, paddingLeft: `calc(${offset}*(100%/12))`, ...styleProps}}>{children}</div>
    );
  }

  return(
    <div className='col' style={{width:`calc(${span}*(100%/12))`, paddingLeft: `calc(${offset}*(100%/12))`, ...styleProps}}>{children}</div>
  );
};