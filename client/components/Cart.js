import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleProduct from "./SingleProduct";
import { getCart, selectGetCart } from "../slices/cartSlice";
import { useEffect } from "react";

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectGetCart);

    const copyCart = JSON.parse(JSON.stringify(cart));
    const countCartItems = copyCart.reduce((acc, { productName }) => {
        if (acc[productName]) ++acc[productName];
        else acc[productName] = 1;
        return acc;
    }, {});

    const cartModified = copyCart.map((obj) => {
        obj["count"] = countCartItems[obj.productName];
        return obj;
    });

    const uniqueArray = cartModified.filter((value, index) => {
        const _value = JSON.stringify(value);
        return (
            index ===
            cartModified.findIndex((obj) => {
                return JSON.stringify(obj) === _value;
            })
        );
    });
    console.log(uniqueArray)

    return (
        <div id="cart_container">
            <div id="product_container">
                {/* <article>Product info</article>
                    <article>Product name</article>
                    <article>Product price</article>
                    <article>Product description</article>
                    <img />
                    <button> + </button><button> - </button> */}
                {cart && cart.length
                    ? uniqueArray.map((product) => {
                          return (
                              <div className="cart" key={product.id}>
                                  <h2>{product.productName}</h2>
                                  <h3>{product.price}</h3>
                                  <h4>{product.count}</h4>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Cart;
