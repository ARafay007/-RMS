import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../components';
import './login.css';

export const Login = () => {
  const navigate = useNavigate();

  const onLogin = (event) => {
    event.preventDefault();
    navigate('/shop/MyShop');
  };

  return (
    <div className='login_container'>
      <form onSubmit={onLogin}>
        <div className='login_div'>
          <h2>Login</h2>
          <Input label='Username' />
          <Input label='Password' inputProps={{type: 'password'}} />
          <Button 
            text='Login' 
            buttonProps={{
              style: {width: '300px', margin: '10px 0'},
              type: 'submit',  
            }} />
          <Link to='/signUp' className='signUp'>Click here to create E-Shop</Link>
        </div>
      </form>
    </div>
  );
};