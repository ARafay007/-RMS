<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { RouterView } from 'vue-router';
  import { restaurantStore } from '../stores/restaurantData';
  import { TopNavbar, SideNavbar, Cart } from './';

  const windowHeight = ref(window.innerHeight);
  const store = restaurantStore();

  onMounted(() => {
    window.addEventListener('resize', () => windowHeight.value = window.innerHeight);
    store.getRestaurantList();
  });
</script>

<template>
  <div id='layout'>
    <SideNavbar heading='RESTAURANT LIST' :list='store.restaurantNameList' />
    <div id='right_container'>
      <TopNavbar />
      <Cart />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
  /* FOR SMALL TO LARGE MOBILE */
  /* @media only screen and (max-width: 425px){ */
  @media (min-width: 30px) and (max-width: 435px){
    #layout{
      display: flex;
      height: 100%;
      width: 100%;
    }
    #right_container{
      height: 100%;
      width: 100%;
    }
  }

  /* FOR TABLET */
  /* @media only screen and (min-width: 426px){ */
  @media (min-width: 436px) and (max-width: 768px){
    #layout{
      display: flex;
      height: 100%;
      width: 100%;
    }
    #right_container{
      height: 100%;
      width: 120%;
    }
  }
  /* FOR LAPTOP */
  /* @media only screen and (min-width: 769px){ */
  @media (min-width: 769px) and (max-width: 1024px){
    #layout{
      display: flex;
      height: 100%;
      width: 100%;
    }
    #right_container{
      height: 100%;
      width: 82%;
    }
  }

  /* FOR LARGE LAPTOP */
  /* @media only screen and (min-width: 1025px){ */
  @media (min-width: 1025px) and (max-width: 1440px){
    #layout{
      display: flex;
      height: 100%;
      width: 100%;
    }
    #right_container{
      height: 100%;
      width: 82%;
    }
  }

  /* FOR 4K */
  /* @media only screen and (min-width: 1441px){ */
  @media (min-width: 1441px){
    #layout{
      display: flex; 
      height: 100%;
      width: 100%;
    }
    #right_container{
      height: 100%;
      width: 82%;
    }
  }

</style>