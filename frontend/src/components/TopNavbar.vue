<script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { restaurantStore } from '../stores/restaurantData';

  const windowWidth = ref(window.innerWidth);
  const topNavToggleBtn = ref(false);
  const topNavbarClass = ref({
    ul: 'menu_ul_close',
    li: 'menu_li_close',
  });
  const router = useRouter();
  const store = restaurantStore();

  const  menuList = computed(() => {
    return Object.keys(store.restaurantData).length ? store.restaurantData?.menu.map(el => el.category) : [];
  });

  onMounted(() => window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
    
    if(windowWidth.value <= 425){
      topNavToggleBtn.value = false;
      topNavbarClass.value = {
        ul: 'menu_ul',
        li: 'menu_li',
      };
    }
  }));

  onUnmounted(() => window.removeEventListener('resize', () => windowWidth.value = window.innerWidth));

  const onToggleTopNavbar = () => {
    topNavToggleBtn.value = !topNavToggleBtn.value;

    if(topNavToggleBtn.value){
      topNavbarClass.value = {
        ul: 'menu_ul',
        li: 'menu_li',
      };
    }
    else{
      topNavbarClass.value = {
        ul: 'menu_ul_close',
        li: 'menu_li_close',
      };
    }
  }

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

    const onToggleCart = () => {
      store.cartToggle = true;
    }

  const restaurantMenuDetail = (category) => {
    store.setMenuDishDetail(store.restaurantData.menu.filter(el => el.category === category));
    router.push(`/menu/${category}`);
  };
</script>

<template>
  <div id='top_navbar'>
    <ul :class='topNavbarClass.ul' v-if='menuList.length'>
      <li :class='topNavbarClass.li' v-for='item in menuList' :key='item' @click='restaurantMenuDetail(item)'>
        {{item}}
        <!-- <RouterLink :to="'/menu/'+item">{{item}}</RouterLink> -->
      </li>
    </ul>
    <ul :class='topNavbarClass.ul' v-else>
      <li :class='topNavbarClass.li'>Select Restaurant from Left Menu</li>
    </ul>
    <div class='top_navbar_btn_container'>
      <button class='btn' @click='onToggleNavbar' v-if='windowWidth <= 768'>
        <img src='/arrow_icon_left.png' height='20' width='20'/>
        <!-- Restaurants List -->
      </button>
      <button @click='onToggleTopNavbar' v-if='windowWidth <= 425' style='border: 0px; background: transparent'>
        <img src='/arrow_down.png' width='20' height='20' />
      </button>
      <button class='btn' @click='onToggleCart'>
        <img src='/arrow_icon_right.png' height='20' width='20'/>
      </button>
    </div>
  </div>
</template>

<style scoped>
  @media (min-width: 30px) and (max-width: 425px){
    #top_navbar{
      min-height: 60px;
      max-height: auto;
      width: 100%;
      background: #fff;
      /* background: #313131; */
      padding: 10px;
      /* color: #fff; */
      border-bottom: 1px solid rgba(0, 0, 0, 0.24);
    }
    .top_navbar_btn_container{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .btn{
      background: red;
      color: #fff;
      border-radius: 5px;
      border: 0px;
      padding: 5px 10px;
      font-size: 10px;
    }
    .menu_ul{
      margin-bottom: 20px;
      transition: margin-bottom 0.5s;
    }
    .menu_li{
      list-style-type: none;
      padding: 10px 0px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.24);
      transition: font-size 0.5s padding 0.5s;
    }
    .menu_ul_close{
      margin-bottom: 0px;
      transition: margin-bottom 0.5s;
    }
    .menu_li_close{
      font-size: 0px;
      height: 0px;
      transition: font-size 0.5s height 0.5s;
    }
  }
  @media (min-width: 426px) and (max-width: 2560px){
    #top_navbar{
      min-height: 60px;
      max-height: auto;
      width: 100%;
      background: #313131;
      padding: 10px;
      color: #fff;
    }
    .top_navbar_btn_container{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .btn{
      background: red;
      color: #fff;
      border-radius: 5px;
      border: 0px;
      padding: 5px 10px;
      font-size: 10px;
    }
    .menu_ul{
      margin-bottom: 20px;
    }
    .menu_li{
      list-style-type: none;
      display: inline;
      padding: 10px 0px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.24);
    }
  }
</style>
