'use client';
import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { getRestaurants } from '@/redux/actions/client';

const List = ({params}) => {
  const menuCategories = useSelector(state => state.clientState.restaurantMenu);

  useEffect(() => {
    if(params.slug > 1 && menuCategories.menu){
      const category = params.slug[1].split('%20').join(' ');
      const items = menuCategories.menu.find(el => el.category === category);
      // console.log(items);
    }
  }, []);
  // console.log(params.slug, menuCategories.menu);
  if(params.slug == 1 && !menuCategories.menu) return <></>;

  return(
    <>
      <div>This is city.</div>
    </>
  );
};  

export default List;