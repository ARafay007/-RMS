import {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../atoms';
import { randomKey } from '../../utils/utilFunction';
import './layout.css';

export const Layout = ({children, navigationLink}) => {
  const [toggleNav, setToggleNav] = useState(false);
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleNavState = () => setToggleNav(!toggleNav);
  const toggleDropdown = () => setDropdownToggle(!dropdownToggle);

  useEffect(() => {
    const handleWindowSize = ()  =>{
      setWindowWidth(window.innerWidth);
    }
    
    window.addEventListener('resize', handleWindowSize);
    
    return () => {
      window.removeEventListener('resize', handleWindowSize);
    };
  }, []);
  
  if(windowWidth > 769 && !toggleNav) {
    setToggleNav(true);
  }

  const renderNestLi = (listItems) => {
    return listItems.map(el => (
      <li className='dropdown_li' key={randomKey()}><Link to='' className='nav_link'>{el}</Link></li>
    ));
  }

  const renderLI = () => {
    const listItems = Object.keys(navigationLink).map(el => {
        if(typeof navigationLink[el] === 'object'){
          return (
            <li className='nav_li dropdown' key={randomKey()}>
              <Button 
                text={<span>Nav 4 {toggleNav && <img src='/caret-down.png' className='icon_size' alt='caret dropdown' />}</span>} 
                buttonProps={{
                  className: 'dropdown_btn',
                  onClick: toggleDropdown,
                }}
              />
              <ul className={dropdownToggle ? 'dropdown_ul' : 'dropdown_close'}>
                {
                  renderNestLi(Object.values(navigationLink[el]))
                }
              </ul>
            </li>
          );
        } 
        else return <li className='nav_li' key={randomKey()}><Link to={el} className='nav_link'>{navigationLink[el]}</Link></li>
      }
    );
    return listItems;
  };

  return (
    <div className='layout_container'>
      <nav className={toggleNav ? 'nav_open' : 'nav_close'}>
        <div className='show_nav_close_btn'>
          <Button 
            text='X' 
            buttonProps={{
              onClick: toggleNavState,
            }} 
          />
        </div>
        <ul>
          {renderLI()}
        </ul>
      </nav>
      <div className='children-container'>
        {
          windowWidth < 769 &&
          <Button 
          text={<img src='/open_arrow.png' className='icon_size' alt='open div' />} 
          buttonProps={{
            onClick: toggleNavState
          }} />
        }
        {children}
      </div>
    </div>
  );
}