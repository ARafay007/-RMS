import { defineStore } from 'pinia';
import axios from 'axios';

export const restaurantStore = defineStore('restaurant', {
  state: () => {
    return {
      toggleNavbar: false,
      cartToggle: false,
      navbarClasses: {
        navbarContainer: 'navbar_container_close',
        navbar: 'navbar_close'
      },
      restaurantNameList: [],
      restaurantData: {},
      menuDishDetail: {},
      cart: [],
      isLoading: false,
    }
  },
  actions: {
    async getRestaurantList(){
      const {data: {data}} = await  axios.get(`${import.meta.env.VITE_API_OWNER}/restaurantList`);
      this.restaurantNameList = data;
    },
    async getRestaurantData(id){
      const {data: {data}} = await axios.get(`${import.meta.env.VITE_API_OWNER}/restaurantData/${id}`);
      this.restaurantData = data[0];
    },
    setMenuDishDetail(menuData){
      this.menuDishDetail = {
        category: menuData[0].category,
        items: menuData[0].items,
        isActive: menuData[0].isActive
      };
    },
    setItemsInCart(dish){
      this.cart.push(dish);
    },
    removeCartItem(cartItemArray){
      this.cart = cartItemArray;
    },
    async adminLogin(email, password){
      this.isLoading = true;
      try{
        const { data: { data } } = await axios.post(`${import.meta.env.VITE_API_OWNER}/login`, { email, password });
        console.log(data);
      }
      catch(error){
        this.isLoading = false;
      }
      finally{
        this.isLoading = false;
      }
    },
    setLoading(loading){
      this.isLoading = loading;
    }
  }
})