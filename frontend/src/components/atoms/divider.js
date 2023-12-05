import './divider.css';

export const Divider = ({text='', textPosition='left'}) => {
  const position = {left: 'left', center: 'center', right: 'right'};
  return <div className={position[textPosition] || position.left}>{text}</div>
}