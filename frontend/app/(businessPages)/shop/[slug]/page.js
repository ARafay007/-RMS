'use client'
import { ownerRoutes } from "@/constants/API_Routes";

export default ({params}) => {
  const getMenuData = async () => {
    if(typeof window !== 'undefined'){
      const {id} = JSON.parse(localStorage.getItem('user'));
      const res = await fetch(`${ownerRoutes}/getMenu/${id}/${params.slug}`);
      const data = await res.json();
      console.log(data);
    }
  };

  getMenuData();
  return <>{params.slug}</>;
}