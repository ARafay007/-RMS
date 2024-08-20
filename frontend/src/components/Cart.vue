<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { restaurantStore } from '../stores/restaurantData';
  import { AdvancedImage } from '@cloudinary/vue';
  import { Cloudinary } from '@cloudinary/url-gen';

  const store = restaurantStore();
  const router = useRouter();

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'doqn4ut3j',
    },
  });

  const onToggleCart = () => {
    store.cartToggle = false;
  }

  const removeItemFromCart = (itemName) => {
    store.removeCartItem(store.cart.filter(item => item.item !== itemName));
  }

  const changeItemQty = (itemName, itemIndex, operation) => {
    if(operation === '+') store.cart[itemIndex].qty++;
    else{
      store.cart[itemIndex].qty > 1 && store.cart[itemIndex].qty--;      
    }
  }

  const checkout = () => {
    router.push('/checkout');
    store.cartToggle = false;
  }
</script>

<template>
  <div :class="store.cartToggle ? 'cart' : 'cart_close'">
    <div class="cart_heading">
      <button class="btn_close" @click="onToggleCart">X</button>
      <h1 style="text-align: center; width: 100%">Cart</h1>
    </div>
    <div class="cart_item_container">
      <div 
        v-for="(item, index) in store.cart" 
        :key="item" 
        class="cart_item"
      >
        <div class="cart_img_div">
          <AdvancedImage :cldImg="cld.image(item.img)" style="width: 100%; height: 100%" />
        </div>
        <div class="cart_item_detail">
          <div class="cart_item_name_and_price">
            <span>{{item.item}}</span> |
            Rs.<span>{{item.price}}</span>
          </div>
          <div class="qty_btn_container">
            <button @click="changeItemQty(item.item, index, '+')" class="qty_btn">+</button>
            <span>{{item.qty}}</span>
            <button @click="changeItemQty(item.item, index, '-')" class="qty_btn">-</button>
          </div>
        </div>
        <div class="remove_btn" @click="removeItemFromCart(item.item)">
          <img src="/bin.png" alt="remove button" width="30" height="30" />
        </div>
      </div>
    </div>
    <button class="checkout_btn" @click="checkout">Proceed To Checkout</button>
  </div>
</template>

<style>
  @media (min-width: 30px) and (max-width: 425px){
    .cart{
      height: 100dvh;
      width: 90%;
      background: rgb(37, 37, 37);
      color: white;
      position: fixed;
      top:0px;
      right: 0px;
      display:flex;
      flex-direction: column;
      border-radius: 8px 0px 0px 8px;
      transition: width 0.5s;
    }
  }
  @media (min-width: 426px) and (max-width: 2560px){

  }
  .cart_close{
    height: 90dvh;
    width: 0;
    font-size: 0px;
    background: rgb(37, 37, 37);
    position: fixed;
    top: 0px;
    right: 0px;
    transition: width 0.5s;
  }
  .btn_close{
    border: 0px;
    font-size: 18px;
    font-weight: 900;
    border-radius: 5px;
    padding: 10px;
    background:#fff ;
    margin: 5px;
  }
  .cart_heading{
    display: flex;
  }
  .cart_item_container{
    display:flex;
    flex-direction: column;
    overflow-y: auto;
    height: 90%;
    width: 100%;
    margin: auto;
  }
  .cart_item{
    display: flex;
    background: orange;
    border-radius: 7px;
    padding: 5px;
    min-height: 70px;
    margin: 3px;
  }
  .cart_img_div{
    height: 100%;
    width: 20%;
    background: yellow;
    margin-right: 10px;
  }
  .cart_item_detail{
    height: 100%;
    width: 70%;
  }
  .qty_btn_container{
    width: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
  }
  .qty_btn{
    border: 0px;
    font-size: 18px;
    font-weight: 900;
    border-radius: 5px;
    background: red;
    color: white;
    padding: 5px 10px;
    margin: 5px 10px 0px 10px;
  }
  .remove_btn{
    height: 100%;
    width: 10%;
    display: flex;
    align-items: center;
    justify-items: center;
  }
  .checkout_btn{
    background: goldenrod;
    font-size: 18px;
    padding: 5px;
    border: 0px;
    border-radius: 0px 0px 0px 8px;
  }
</style>