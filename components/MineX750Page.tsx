import React from 'react';
import MineXProductPage from './MineXProductPage';
import { MINEX_PRODUCTS } from '../data/minexProducts';

const MineX750Page: React.FC = () => {
  return <MineXProductPage product={MINEX_PRODUCTS['750']} />;
};

export default MineX750Page;
