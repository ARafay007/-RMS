import { useState } from 'react';
import styles from './cart.module.css';

export const Cart = ({widthAndHeight}) => {
  const [cartCollapse, setCartCollapse] = useState(false);

  const toggleCart = () => {
    setCartCollapse(!cartCollapse);
  };

  return(
    cartCollapse ? <button className={`${styles.open_cart_btn} ${styles.btn}`} onClick={toggleCart}>Open Cart</button> :
    <div className={cartCollapse ? styles.close_cart : styles.cart} style={{height: widthAndHeight.height}}>
      <button className={`${styles.btn} ${styles.close_cart_btn}`} onClick={toggleCart}>Close Cart</button>
      <div className={styles.cart_fields}>
        <div className={styles.inputs_div}>
          <label>Name</label>
          <input type='input' placeholder="Name" />
        </div>
        <div className={styles.inputs_div}>
          <label>Address</label>
          <input type='input' placeholder="Address" />
        </div>
        <div className={styles.inputs_div}>
          <label>Contact Number</label>
          <input type='input' placeholder="Contact Number" />
        </div>
      </div>
      <div className={styles.cart_items_catainer}>
        <div className={styles.cart_item}>
          <p>Spanish Churrasco Chicken Platter</p>
          <div>
            <button className={`${styles.btn} ${styles.cart_increment_btn}`}>+</button>
            10
            <button className={`${styles.btn} ${styles.cart_decrement_btn}`}>-</button>
          </div>
        </div>
        <div className={styles.cart_item}>
          <p>Sundried & Shitaki Mushroom Pasta</p>
          <div>
            <button className={`${styles.btn} ${styles.cart_increment_btn}`}>+</button>
            10
            <button className={`${styles.btn} ${styles.cart_decrement_btn}`}>-</button>
          </div>
        </div>
        <div className={styles.cart_item}>
          <p>Spanish Churrasco Chicken Platter</p>
          <div>
            <button className={`${styles.btn} ${styles.cart_increment_btn}`}>+</button>
            10
            <button className={`${styles.btn} ${styles.cart_decrement_btn}`}>-</button>
          </div>
        </div>
        <div className={styles.cart_item}>
          <button className={`${styles.btn} ${styles.buy_items_btn}`}>Buy Items</button>
        </div>
      </div>
    </div>
  );
};