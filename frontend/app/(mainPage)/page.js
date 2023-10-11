// 'use client';
// import { useRouter } from 'next/navigation'
import Link from 'next/link';

import styles from './page.module.css';

export default () => {
  // const router = useRouter();

  const getRestaurantsList = (city) => {
    router.push(`city/${city}`);
  };

  const renderCitiesList = () => {
    const citiesArray = [];

    for(let i=1; i<9; i++){
      const randomKey = Math.random().toString(36).slice(2);

      citiesArray.push(i % 2 === 0 ? 
        // <div className={styles.cities} key={randomKey} onClick={() => getRestaurantsList('Karachi')}>
        <Link href={`city/Karachi`}>
          <div className={styles.cities} key={randomKey}>
            Karachi
          </div> 
        </Link>
        :
        <Link href={`city/Hyderabad`}>
          <div className={styles.cities} key={randomKey}>
            Hyderabad
          </div>
        </Link>
      );
    }

    return citiesArray;
  };

  return (
    <div className={styles.cityList}>
      {renderCitiesList()}
    </div>
  );
};