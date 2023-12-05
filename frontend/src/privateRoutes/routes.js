import { Routes, Route } from 'react-router-dom';
import {Login, Dashboard, Layout, AddDish} from './';

export const PrivateRoutes = () => (
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='shop/:shopName' element={<Layout />}>
      <Route index path='dashboard' element={<Dashboard />} />
      <Route index path='addDish' element={<AddDish />} />
    </Route>
  </Routes>
);