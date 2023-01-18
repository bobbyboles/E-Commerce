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


    const homePageStyle = {
        // backgroundImage: 'url(https://wallpapercave.com/wp/wp6297979.jpg)',
        // width: '100%',
        // backgroundRepeat: 'no repeat',
        // margin: '10px'
    };
    const simpleStyle = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 20,
        height: '100%',
    };
    const imgStyle = {
        display: 'flex',
        height:150,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '15px'
    };
    const productStyle = {
        display: 'flex',
        border: '2px solid purple',
        flexWrap: 'wrap',
        textAlign: 'center',
        width: '18%',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
    };
    const sortStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '22%'
    };
    const productNameStyle = {
        display: 'flex',
        border: '1px solid red',
        height: '60px',
        backgroundColor: '#ffd9b3',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Andale Mono, monospace'
    };
    const productPriceStyle = {
        border: '1px solid red',
        backgroundColor: '#99ccff',
        width: '100%',
    };


    return (
        <div id="homePage" style={homePageStyle}>
            <div id="searchBar">
                <input onChange={handleSearch}></input>
            </div>
            <div id="AllProductSorting" style={sortStyle}>
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
                              <div className="product" key={product.id} style={productStyle}>

                                  <Link
                                      to={`/products/${product.id}`}
                                      key={`All Products: ${product.id}`}
                                  >
                                      <img src={product.imageUrl} style={imgStyle}></img>
                                      <h2 id="productName" style={productNameStyle}>{product.productName}</h2>
                                      <h3 id="productPrice" style={productPriceStyle}>$ {product.price}</h3>
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
