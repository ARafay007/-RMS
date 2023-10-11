'use client'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'
import {Layout} from 'antd';
import { SiderNav } from "@/components/sider";
import { setUserDetails } from '@/redux/states/loggedInUser';
import { fetchOwnerDetail } from "@/redux/actions/owner";

export const ShopLayout = ({children}) => {
  const dispatch = useDispatch();
  const {Content} = Layout;
  const router = useRouter();
  const [checkTokenExist, setCheckTokenExist] = useState(null); 
  const [checkUserExist, setCheckUserExit] = useState(null);
  const userDetails = useSelector(state => state.loggedInUser.value);
  const status = useSelector(state => state.loggedInUser.status);

  useEffect(() => {
    setCheckTokenExist(JSON.parse(localStorage.getItem('token')));
    setCheckUserExit(JSON.parse(localStorage.getItem('user')));
    fetchOwnerDetail(dispatch);
  }, []);

  const headerAccordingToUser = () => {
    if(Object.hasOwn(userDetails, '_id')){
      const categories = userDetails.menu.map((el, index) => {
        return  {
            key: String(index + 3), 
            label: el.category,
            onClick: () => {router.push(`/shop/${el.category}`)}
          }
        }
      );

      const menuItem = [
        ...categories,
        {
          key: String(9 + 1),
          label: `Analytics`,
        },
        {
          key: String(10 + 1),
          label: `New Orders`,
          onClick: () => {
            router.push('/shop/newOrders')
          }
        },
        {
          key: String(12 + 1),
          label: `Dispatched Orders`,
        },
        {
          key: String(13 + 1),
          label: `Staff`,
        },
        {
          key: String(15 + 1),
          label: `Add New Category`,
          onClick: () => {router.push('/shop/addNewCategory')}
        },
        {
          key: String(14 + 1),
          label: `Logout`,
          onClick: () => {
            localStorage.removeItem('token'); 
            localStorage.removeItem('user')
            dispatch(setUserDetails({}));
            router.push('/login');
          }
        }
      ]
      return (
        <SiderNav menuItem={menuItem} restaurantName={userDetails.restaurantName}/>
      );
    }
  }

  if(!checkTokenExist || !checkUserExist || status === 'rejected'){
    return(
      <h1>Unauthorized Access</h1>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {headerAccordingToUser()} 
      <Layout className="site-layout" style={{marginLeft: 200}}>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: 'offWhite' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};