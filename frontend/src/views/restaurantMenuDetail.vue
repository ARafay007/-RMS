<script setup>
  import { watch, ref } from 'vue';
  import { useRoute }  from 'vue-router';
  import { restaurantStore } from '../stores/restaurantData';
  import { AdvancedImage } from '@cloudinary/vue';
  import { Cloudinary } from '@cloudinary/url-gen';
  
  const store = restaurantStore();
  const route = useRoute();
  const category = ref(route.params.category);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'doqn4ut3j',
    },
  });

  watch(() => route.params.category, () => {
    category.value = route.params.category;
  });

  const addItemInCart = (dish) => {
    store.setItemsInCart({...dish, qty: 1});
  }
  
</script>

<template>
  <div>
    <h1>Menu Detail: {{category}}</h1>
    <div class="cards_holder">
      <div class="card" v-for="dish in  store.menuDishDetail.items" :key="dish">
        <div class="img_holder">
          <AdvancedImage :cldImg="cld.image(dish.img)" style="width: 100%; height: 100%" />
        </div>
        <div class="item_detail">
          <p><span class="item_detail_heading">Name:</span> <span>{{dish.item}}</span></p>
          <p><span class="item_detail_heading">Price:</span> <span>{{dish.price}}</span></p>
          <button class="add_to_cart_btn" @click="addItemInCart(dish)">Add To Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  @media (min-width: 30px) and (max-width: 425px){
    .card{
      width: 350px;
      height: 300px;
      margin: auto;
      margin-bottom: 30px;
      border: 1px solid rgb(231, 231, 231);
    }
  }
  @media (min-width: 426px) and (max-width: 2560px){
    .card{
      width: 350px;
      height: 300px;
      margin: auto;
      border: 1px solid rgb(231, 231, 231);
    }
  }
  .cards_holder{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  .img_holder{
    width: 100%;
    height: 60%;
  }
  .item_detail{
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .item_detail_heading{
    display: inline-block;
    font-weight: 700;
    margin: 5px 0px 5px 5px;
  }
  .add_to_cart_btn{
    border: 0px;
    width: 100%;
    font-size: 16px;
    padding: 5px;
    margin-top: 10px;
    background: rgb(231, 231, 231);
  }
</style>