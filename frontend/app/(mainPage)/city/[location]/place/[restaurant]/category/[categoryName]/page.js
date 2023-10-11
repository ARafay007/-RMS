'use client';
import { useSelector } from "react-redux";
import { CldImage } from 'next-cloudinary';
import { useRouter } from "next/navigation";
import style from './page.module.css';

const Category = ({params}) => {
  const router = useRouter();
  const dishes = useSelector(state => state.clientState.restaurantMenu);
  const {categoryName} = params;
  
  const renderDishes = () => {
    const items = dishes?.menu?.find(el => el.category === categoryName.split('%20').join(' '));

    return items?.items.map(el => 
      <div key={el.item} className={style.dishes_card}>
        <div className={style.img_div}>
          <CldImage src={el.img} width="350" height="336" crop="fill" className={style.item_img} alt={el.item} />
        </div>
        <p className={style.item_name} style={{textAlign: 'center'}}>{el.item}</p>
        <p className={style.item_price} style={{textAlign: 'center'}}>Rs.{el.price}</p>
        <button className={`${style.add_to_cart_btn} ${style.btn}`} onClick={() => router.push('/details')}>Details</button>
      </div>
    )
  };
  
  return (
    <div className={style.dishes_main_container}>
      {renderDishes()}
    </div>
  );
};

export default Category;