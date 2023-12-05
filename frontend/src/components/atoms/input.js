import './input.css';

export const Input = ({label, required=false, requiredMessage='', inputProps = {}}) => {  
  return (
    <div className='input_div'>
      <label>{label}{required && <span className='required_input'>*</span>}</label>
      <input {...inputProps} />
      {requiredMessage && <span>{requiredMessage}</span>}
    </div>
)};