import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsAsync, selectProducts } from '../slices/allProductsSlice';

const Home = () => {

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProductsAsync())
}, [dispatch]);

  // const [product, setProduct] = useState(['a-z']);

  // const sortProducts = (selectEvent) => {
  //   const options = {
  //     "a-z": [...product].sort((a, b) => (a < b ? -1 : 1)),
  //     "z-a": [...product].sort((a, b) => (a < b ? 1 : -1))
  //   };

  //   setProduct(options[selectEvent.target.value]);
  // };

  return (
    <div>

      <div id='AllProductFilters'>

      </div>

      <div id='AllProductSorting'>
        <label>Sort by</label>
                                  {/* onChange={sortProducts} */}
            <select className="sortBy"                         >
              <option value="titleaz">Title A-Z</option>
              <option value="titleza">Title Z-A</option>
              <option value="pricelh">Price H-L</option>
              <option value="pricehl">Price L-H</option>
            </select>
      </div>

      <div id='products'>
        {products && products.length ? products.map((product) => {
          return(
            <div className='product' key={product.id}>
              <Link to={`/products/${product.id}`} key={`All Products: ${product.id}`}>
                <h2>{product.productName}</h2>
                <h3>{product.price}</h3>
              </Link>
            </div>
          )
        }) : null}
      </div>

    </div>
  );
};

export default Home;
