import React from 'react';
import MineXProductPage from './MineXProductPage';
import { MINEX_PRODUCTS } from '../data/minexProducts';

const MineX500Page: React.FC = () => {
  return <MineXProductPage product={MINEX_PRODUCTS['500']} />;
};

export default MineX500Page;
