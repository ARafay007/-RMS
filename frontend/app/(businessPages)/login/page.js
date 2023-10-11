'use client';
import { useRouter } from 'next/navigation'
import {  Form, Typography } from 'antd';
import {Btn} from '../../../components/button';
import {InputField} from '../../../components/input';
import styles from './page.module.css';
import { ownerRoutes } from '@/constants';

export default () => {
  const router = useRouter();
  const { Title } = Typography;

  const buttonProps = {
    children: 'Login', //this is text
    type:"primary",
    block: 'block',
    htmlType: "submit",
  };

  const inputFieldProps = [
    {
      formItemProps: {
        label: 'Email',
        name: 'email',
        rules: [{required: true, message: 'Email is required.'}]
      },
      inputProps: {
        placeholder:'Email'
      }
    },
    {
      formItemProps: {
        label: 'Password',
        name: 'password',
        rules: [{required: true, message: 'Password is required.'}]
      },
      inputProps: {
        placeholder:'Password',
        type: 'password'
      }
    },
  ];

  const onHandleSubmit = async (values) => {
    const resp = await fetch(`${ownerRoutes}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    });

    const data = await resp.json();

    const {name, role, restaurantName, _id} = data.user
    localStorage.setItem('token', JSON.stringify(data.token));
    localStorage.setItem('user', JSON.stringify({id: _id, name, role, restaurantName}));

    role === 'owner' && router.push('/shop/newOrders');
  };

  const onHandleSubmitFail = (error) => {
    console.log(error);
  }

  return(
    <div className={styles.loginStyling}>
      <div className={styles.formDiv}>
        <Title level={2}>Login</Title>
        <Form onFinish={onHandleSubmit} onFinishFailed={onHandleSubmitFail}>
          <InputField inputFieldProps={inputFieldProps}/>
          <Form.Item>
            <Btn buttonProps={buttonProps} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};