import React from 'react';
import MineXProductPage from './MineXProductPage';
import { MINEX_PRODUCTS } from '../data/minexProducts';

const MineX50Page: React.FC = () => {
  return <MineXProductPage product={MINEX_PRODUCTS['50']} />;
};

export default MineX50Page;
