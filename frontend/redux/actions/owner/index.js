// import { useDispatch } from "react-redux";
import { setStatus, setUserDetails, updateMenu } from "@/redux/states/loggedInUser";
import { ownerRoutes, API_status } from "@/constants";

export const fetchOwnerDetail = async (dispatch) => {
  dispatch(setStatus(API_status.LOADING));

  const token = JSON.parse(localStorage.getItem('token'));
  const ownerId = JSON.parse(localStorage.getItem('user')).id;

  const res = await fetch(`${ownerRoutes}/getLoggedInUserData/${ownerId}`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${token}`
    }
  });

  if(res.status === 400){
    dispatch(setStatus(API_status.REJECTED));
    return;
  }

  const {data} = await res.json();
  dispatch(setUserDetails({data, status: API_status.SUCCEEDED}));
};

export const addNewItem = async (dispatch, apiRoute, body) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const ownerId = JSON.parse(localStorage.getItem('user')).id;

  const resp = await fetch(`${ownerRoutes}/${apiRoute}/${ownerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'Application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  });

  if(resp.status >= 400){
    dispatch(setStatus(API_status.REJECTED));
    return false;
  }

  const {data} = await resp.json();
  dispatch(updateMenu({data: data.menu, status: API_status.SUCCEEDED}));
  return true;
};

export const deleteItem = async (dispatch, body) => {
  dispatch(setStatus(API_status.LOADING));

  const token = JSON.parse(localStorage.getItem('token'));
  const ownerId = JSON.parse(localStorage.getItem('user')).id;

  const resp = await fetch(`${ownerRoutes}/updateMenu/${ownerId}`, {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  if(resp.status >= 400){
    dispatch(setStatus(API_status.REJECTED));
    return;
  }

  const {data} = await resp.json();
  dispatch(updateMenu({data, status: API_status.SUCCEEDED}));
};

export const editItem = async (dispatch, body) => {
  const {id} = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('token'));  

  const resp = await fetch(`${ownerRoutes}/updateMenu/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'Application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  if(resp.status >= 400){
    dispatch(setStatus(API_status.REJECTED));
    return;
  }

  const {data} = await resp.json();
  dispatch(updateMenu({data, status: API_status.SUCCEEDED}));
};