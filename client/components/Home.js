import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsAsync, selectProducts } from "../slices/allProductsSlice";
import {
    sortAZ,
    sortZA,
    sortByPriceHighLow,
    sortByPriceLowHigh,
} from "../slices/allProductsSlice";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    const handleSort = ({ target: { value } }) => {
        if (value == "titleaz") dispatch(sortAZ());
        if (value == "titleza") dispatch(sortZA());
        if (value == "pricehl") dispatch(sortByPriceHighLow());
        if (value == "pricelh") dispatch(sortByPriceLowHigh());
    };

    const simpleStyle = {
        display: "flex",
        flexDirection: "row",
        flexWrap: 'wrap',
    };

    return (
        <div>
            <div id="AllProductFilters"></div>

            <div id="AllProductSorting">
                <label>Sort by</label>
                <select className="sortBy" onChange={handleSort}>
                    <option value="select">-Select-</option>
                    <option value="titleaz">Title A-Z</option>
                    <option value="titleza">Title Z-A</option>
                    <option value="pricehl">Price H-L</option>
                    <option value="pricelh">Price L-H</option>
                </select>
            </div>

            <div id="products" style={simpleStyle}>
                {products && products.length
                    ? products.map((product) => {
                          return (
                              <div className="product" key={product.id}>
                                  <Link
                                      to={`/products/${product.id}`}
                                      key={`All Products: ${product.id}`}
                                  >
                                      <h2>{product.productName}</h2>
                                      <h3>{product.price}</h3>
                                  </Link>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Home;
