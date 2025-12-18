import React from 'react';
import MineXProductPage from './MineXProductPage';
import { MINEX_PRODUCTS } from '../data/minexProducts';

const MineX125Page: React.FC = () => {
  return <MineXProductPage product={MINEX_PRODUCTS['125']} />;
};

export default MineX125Page;
