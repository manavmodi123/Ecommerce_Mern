import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import BreadCrums from '../Components/BreadCrums/BreadCrums';
import ProductCard from '../Components/ProductCard/ProductCard';
import Description from '../Components/Description/Description';
import Related from '../Components/Related/Related';

const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      <BreadCrums product = {product} />
      <ProductCard product = {product} />
      <Description />
      <Related />

    </div>
  )
}

export default Product