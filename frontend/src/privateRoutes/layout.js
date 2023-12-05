import { Link, Outlet, useParams } from "react-router-dom";
import { Layout } from "../components";

export const PrivateLayout = () => {
  const {shopName} = useParams();

  const navLinksList = {
    dashboard: 'Dashboard',
    addDish: 'Add Dish',
    orders: 'Orders',
    nest: {
      deleteDish: 'Delete Dish',
      udpateDish: 'Update Dish',
    }
  }

  return (
    <Layout navigationLink={navLinksList}>
      <Outlet />
    </Layout>
  );
};