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

/////////////////////////////////////////////////// BEGIN CSS ///////////////////////////////////////////////////

    const simpleStyle = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 20,
        height: '100%',
    };
    const homeStyle = {
        position: 'relative',
        top: '20px',
        margin: '30px'
    };
    const filterStyle = {
       display: 'flex',
       width: '170vh',
       justifyContent: 'space-evenly',
       alignItems: 'center',
       border: '2px solid lightBlue',
       margin: '50px',
       backgroundColor: 'rgba(0, 0, 0, 0.7)',
    };
    const searchStyle = {
        position: 'relative',
        margin: '20px',
        color: '#ff33cc',
        alignItems: 'center'
    };
    const sortStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        margin: '20px',
        color: '#ff33cc',
        border: '1px solid lightBlue',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px'
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
    const productNameStyle = {
        display: 'flex',
        border: '1px solid red',
        backgroundColor: '#ffd9b3',
        height: '60px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Press Start 2P, serif',
        fontSize: '17px'
    };
    const productPriceStyle = {
        display: 'flex',
        border: '1px solid red',
        backgroundColor: '#99ccff',
        height: '28px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px'
    };

/////////////////////////////////////////////////// END CSS ///////////////////////////////////////////////////

    return (
        <div id="homePage" style={homeStyle}>
            <div id='filterBars' style={filterStyle}>
                <div id="searchBar" style={searchStyle}>Search for a specific game!
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
                </div>
            </div>
            <SideNav />

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
