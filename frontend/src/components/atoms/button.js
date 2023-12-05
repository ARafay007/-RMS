import './button.css';

export const Button = ({text, buttonProps = {}}) => {
  const {className, ...rest} = buttonProps;
  return <button className={`btn ${className}`} {...rest}>{text}</button>
};