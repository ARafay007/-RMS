<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import { restaurantStore } from '../stores/restaurantData';

  const props = defineProps({
    heading: { type: String, default: 'RESTAURANT LIST' },
    list: Array,
  });

  const store = restaurantStore();
  const windowWidth = ref(window.innerWidth);

  const onWidthChange = () => {
    windowWidth.value = window.innerWidth;

    if(window.innerWidth > 768){
      store.toggleNavbar = true;
      store.navbarClasses = {
        navbarContainer: 'navbar_container',
        navbar: 'navbar'
      }
      console.log(store.navbarClasses);
    }
  };

  onMounted(() => {
    window.addEventListener('load', onWidthChange)
    window.addEventListener('resize', onWidthChange)
    store.getRestaurantList();
  });

  onUnmounted(() => window.removeEventListener('resize', onWidthChange));

  const onToggleNavbar = () => {
    store.toggleNavbar = !store.toggleNavbar;

    if(windowWidth.value > 768){
      store.navbarClasses = {
        navbarContainer: 'navbar_container',
        navbar: 'navbar'
      }
    }
    else{
      if(store.toggleNavbar){
        store.toggleNavbar = true;
        store.navbarClasses = {
          navbarContainer: 'navbar_container',        
          navbar: 'navbar'
        }
      }
      else{
        store.navbarClasses = {
          navbarContainer: 'navbar_container_close',
          navbar: 'navbar_close'
        }
      }
    }
  };

  const onSelectingRestaurant = (id) => {
    store.getRestaurantData(id);
    if(windowWidth.value < 768){
      store.toggleNavbar = false;
      store.navbarClasses = {
        navbarContainer: 'navbar_container_close',
        navbar: 'navbar_close'
      }
    }
  }
</script>

<template>
  <div :class='store.navbarClasses.navbarContainer'>
    <div :class='store.navbarClasses.navbar'>
      <div id='navbar_heading'>
        <span>{{heading}}</span>
        <button @click='onToggleNavbar' v-if='windowWidth <= 768'>
          <img src='/arrow_icon_left.png' alt="close list" width='20' height='20' />
        </button>
      </div>
      <ul id='navbar_ul'>
        <li v-for="item in list" :key="item._id" id='navbar_li' @click='onSelectingRestaurant(item._id)'>
          {{item.restaurantName}}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
/* @media only screen and (max-width: 435px){ */
@media (min-width: 30px) and (max-width: 768px){
  .navbar_container{
    height: 100vh;
    width: 100vw;
    background: rgba(17,17,17,0.9);
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
  }
  .navbar_container_close{
    height: 0px;
    width: 0px;
  }
  .navbar{
    height: 100dvh;
    width: 80vw;
    background: rgb(37,37,37);
    padding: 10px;
    color: #fff;
    transition: width 0.5s, font-size 0.4s, background-color 0.4s;
    z-index: 1;
  }
  .navbar_close{
    height: 100dvh;
    width: 0;
    font-size: 0px;
    z-index: 1;
    background-color: rgb(37,37,37);
    transition: width 0.5s, font-size 0.4s, background-color 0.4s;
  }
  #navbar_heading{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}

/* @media only screen and (min-width: 1441px){ */
/* @media (min-width: 769px) and (max-width: 2560px){ */
@media (min-width: 769px){
  .navbar_container{
    height: 100vh;
    width: 18vw;
    background: rgba(37,37,37,0.5);
  }
  .navbar{
    height: 100%;
    width: 100%;
    background: rgb(37,37,37);
    padding: 10px;
    color: #fff;
  }
}

#navbar_heading{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
#navbar_ul{
  height: 90%;
  /* background: red; */
  overflow-y: auto;
}
#navbar_li{
  list-style-type: none;
  padding: 12px 0px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.534);
}
</style>
