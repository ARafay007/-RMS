import { setStatus, setRestaurantMenu } from "../../states/clientStates";
import { restaurantList, getMenu, API_status } from "@/constants";

export const getRestaurants = async (dispatch, cityName) => {
  if(!cityName) return;

  dispatch(setStatus(API_status.LOADING));

  const resp = await fetch(`${restaurantList}/${cityName}`, {
    cache: 'no-store'
  });
  
  if(resp.status >= 400){
    dispatch(setStatus(API_status.REJECTED));
    return;
  }

  const {restaurantNameList} = await resp.json();

  //if restaurant list is empty then reset restaurant Menu
  !restaurantNameList.length && dispatch(setRestaurantMenu({status: API_status.SUCCEEDED, data: []}));

  dispatch(setStatus(API_status.SUCCEEDED));
  return restaurantNameList
};

export const getRestaurantMenu = async (dispatch, id) => {
  dispatch(setStatus(API_status.LOADING));

  const resp = await fetch(`${getMenu}/${id}`);

  if(resp.status >= 400){
    dispatch(setStatus(API_status.REJECTED));
    return;
  }

  const {data} = await resp.json();
  dispatch(setRestaurantMenu({status: API_status.SUCCEEDED, data}));
}