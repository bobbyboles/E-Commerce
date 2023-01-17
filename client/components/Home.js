import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    fetchProductsAsync,
    selectProducts,
    deleteProductAsync,
} from "../slices/allProductsSlice";
import {
    sortAZ,
    sortZA,
    sortByPriceHighLow,
    sortByPriceLowHigh,
} from "../slices/allProductsSlice";
import { getSingleUser } from "../slices/singleUserSlice";
import { selectSingleUser } from "../slices/singleUserSlice";
import { addToCart } from "../slices/cartSlice";
import { selectGetCart } from "../slices/cartSlice";
import SideNav from "./SideNav";
import { sortBySearch } from "../slices/allProductsSlice";
import { getMyHomeCart } from "../slices/cartSlice";
import { addProductToDBCart } from "../slices/cartSlice";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const userId = useSelector((state) => state.auth.me.id);
    const user = useSelector(selectSingleUser);
    const isLoggedIn = useSelector((state) => !!state.auth.me.id);
    const cartState = useSelector(selectGetCart);

    useEffect(() => {
        dispatch(fetchProductsAsync());
        if (userId) dispatch(getSingleUser(userId));
        if (userId) dispatch(getMyHomeCart(userId));
        if (userId) handleLoginWithItems(userId);
    }, [dispatch, userId]);

    const handleSort = ({ target: { value } }) => {
        if (value == "titleaz") dispatch(sortAZ());
        if (value == "titleza") dispatch(sortZA());
        if (value == "pricehl") dispatch(sortByPriceHighLow());
        if (value == "pricelh") dispatch(sortByPriceLowHigh());
    };

    const handleSearch = async ({ target: { value } }) => {
        await dispatch(fetchProductsAsync());
        await dispatch(sortBySearch(value.toLowerCase()));
    };
    const handleLoginWithItems = (userId) => {
        const previousCart = localStorage.getItem("cart");
        if (previousCart) {
            const previousCartStringed = JSON.parse(previousCart);
            previousCartStringed.map(async (item) => {
                console.log("THIS IS AN ITEM IN THE CHECK", item);
                const quantity = item.quantity;
                const productId = item.id;
                await dispatch(
                    addProductToDBCart({ quantity, userId, productId })
                );
            });
            localStorage.setItem("cart", []);
        }
    };

    const simpleStyle = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 35,
    };
    const imgStyle = {
        height: 150,
    };

    return (
        <div>
            <div id="searchBar">
                <input onChange={handleSearch}></input>
            </div>
            <div id="AllProductSorting">
                <label>Sort by</label>
                <select className="sortBy" onChange={handleSort}>
                    <option value="select">-Select-</option>
                    <option value="titleaz">Title A-Z</option>
                    <option value="titleza">Title Z-A</option>
                    <option value="pricehl">Price H-L</option>
                    <option value="pricelh">Price L-H</option>
                </select>
                <SideNav />
            </div>

            <div id="products" style={simpleStyle}>
                {products && products.length
                    ? products.map((product) => {
                          return (
                              <div className="product" key={product.id}>
                                  <img
                                      src={product.imageUrl}
                                      style={imgStyle}
                                  ></img>
                                  <Link
                                      to={`/products/${product.id}`}
                                      key={`All Products: ${product.id}`}
                                  >
                                      <h2>{product.productName}</h2>
                                      <h3>{product.price}</h3>
                                  </Link>
                                  {user.isAdmin && (
                                      <button
                                          onClick={() => {
                                              dispatch(
                                                  deleteProductAsync(product.id)
                                              );
                                          }}
                                      >
                                          Delete
                                      </button>
                                  )}
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Home;
