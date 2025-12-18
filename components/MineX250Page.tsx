import React from 'react';
import MineXProductPage from './MineXProductPage';
import { MINEX_PRODUCTS } from '../data/minexProducts';

const MineX250Page: React.FC = () => {
  return <MineXProductPage product={MINEX_PRODUCTS['250']} />;
};

export default MineX250Page;
