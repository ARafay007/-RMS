'use client';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname, useParams } from "next/navigation";
import Image from "next/image";
import { getRestaurants, getRestaurantMenu } from '@/redux/actions/client';
import { Spinner } from '../components/spinner';
import styles from './clientLayout.module.css';
import { Cart } from "./cart";

export const ClientLayout = ({ children }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const param = useParams();
  const router = useRouter();
  const [widthAndHeight, setWidthAndHeight] = useState({ width: 0, height: 0 });
  const [restaurantList, setRestaurantList] = useState([]);
  const [isSidebarCollapse, setIsSidebarCollapse] = useState(false);
  const status = useSelector(state => state.clientState.status);
  const menuCategories = useSelector(state => state.clientState.restaurantMenu);

  useEffect(() => {
    setWidthAndHeight({
      width: window.outerWidth,
      height: window.outerHeight
    });

    getList();
  }, [param.location]);

  const getList = async () => {
    const list = pathname !== '/' && await getRestaurants(dispatch, param.location);
    setRestaurantList(list);

    if(param.restaurant){
      const {_id, restaurantName} = list.find(el => el.restaurantName === param.restaurant);
      getRestaurantMenu(dispatch, _id);
      router.replace(`/city/${param.location}/place/${restaurantName}`, undefined);
    }
  }

  const renderRestaurantList = () => {
    return restaurantList.length > 0 && restaurantList?.map(el => (
      <li
        className={!isSidebarCollapse ? styles.sidebar_restaurant_listItems : styles.sidebar_restaurant_listItems_collapse}
        onClick={() => getRestaurantDetails(el._id, el.restaurantName)}
        key={el.restaurantName}
      >
        {el.restaurantName}
      </li>
    ));
  };

  const getRestaurantDetails = async (id, restaurantName) => {
    getRestaurantMenu(dispatch, id);
    router.replace(`/city/${param.location}/place/${restaurantName}`, undefined);
  };

  const renderCategories = () => {
    return menuCategories?.menu?.length && (
      !menuCategories.menu.length ? <></> :
        menuCategories.menu.map(el => (
          <li className={styles.nav_li} onClick={() => onSelectCategory(el.category)} key={el.category}>{el.category}</li>
        ))
    );
  };

  const onSelectCategory = (category) => router.replace(`/city/${param.location}/place/${param.restaurant}/category/${category}`);

  if (pathname === '/') {
    return (
      <body className="body">
        <div className="mainBodyDiv">
          <nav>
            <h1>Food Well</h1>
          </nav>
          {children}
          <footer>
            <h3>Create your shop and start your business in few steps</h3>
          </footer>
        </div>
      </body>
    );
  }

  return (
    <body>
      <div style={{ width: widthAndHeight.width, height: widthAndHeight.height }} className={!isSidebarCollapse ? styles.main_body_div : styles.main_body_div_sidebar_collapse}>
        <div style={{ height: widthAndHeight.height }} className={!isSidebarCollapse ? styles.sidebar : styles.sidebar_collapse}>
          <h2 className={styles.sidebar_heading}>Restaurants</h2>
          <ul>
            {renderRestaurantList()}
          </ul>
        </div>
        <main className={styles.main_content}>
          <span className={styles.collapse_btn}>
            <Image
              src={!isSidebarCollapse ? '/left_arrow_icon.png' : '/right_arrow_icon.png'}
              width={50}
              height={50}
              alt="Picture of the author"
              onClick={() => setIsSidebarCollapse(!isSidebarCollapse)}
            />
          </span>
          <nav className={styles.nav}>
            <ul className={styles.nav_ul}>
              {renderCategories()}
            </ul>
          </nav>
          {children}
        </main>
        <Cart widthAndHeight={widthAndHeight}/>
        {status === 'loading' && <Spinner />}
      </div>
    </body>
  );
};