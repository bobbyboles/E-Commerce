import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectGetCart,
    deleteCart,
    removeFromCart,
    resetState,
} from "../slices/cartSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { addToQuantity, removeToQuantity } from "../slices/cartSlice";
import { getMyCart } from "../slices/singleCartDatabaseSlice";
import { selectSingleCartDatabase } from "../slices/singleCartDatabaseSlice";
import { editProductInCart } from "../slices/singleCartDatabaseSlice";
import { deleteDBCart } from "../slices/singleCartDatabaseSlice";
import { getSingleUser } from "../slices/singleUserSlice";
import { selectSingleUser } from "../slices/singleUserSlice";

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectGetCart);
    const dbCart = useSelector(selectSingleCartDatabase);
    const userId = useSelector((state) => state.auth.me.id);
    const isLoggedIn = useSelector((state) => !!state.auth.me.id);
    const user = useSelector(selectSingleUser)

    const deleteButton = (id) => {
        dispatch(removeFromCart(id));

    };

    useEffect(() => {
         if(userId)dispatch(getSingleUser(userId));

    }, [dispatch, userId,cart]);

    const cartTotal = cart.reduce((acc, item) => {
        acc += item.price * item.count;
        return acc;
    }, 0);

    const getCartId = (_dbCart, _productId) => {
        for (const item of _dbCart) {
            console.log("THIS IS THE ITEMS", item)
            if (item.productId == _productId) {
                console.log('This is the cart ID', item.id, 'this is the cart quantity', item.quantity)
                return {id: item.id, cartQuantity: item.quantity} 
            } 
        }
return false;
    };

    const handleIncreaseQuantity = (_dbCart, product) => {
        dispatch(addToQuantity(product));
        if (isLoggedIn) {
            const {id, cartQuantity} = getCartId(_dbCart, product.id);
            let quantity = cartQuantity + 1;
            let productId = product.id;
            console.log('this is the cart id', id)
            dispatch(editProductInCart({ id, userId, productId, quantity }));
        }
    };
    const handleDecreaseQuantity = (_dbCart, product) => {
        dispatch(removeToQuantity(product));
        if (isLoggedIn) {
            const {id, cartQuantity} = getCartId(_dbCart, product.id);
            let quantity = cartQuantity - 1;
            let productId = product.id;
            console.log('this is the cart id', id)
            dispatch(editProductInCart({ id, userId, productId, quantity }));

        }

    };
    const handleDelete = (_dbCart, product) => {
        dispatch(removeFromCart(product.id));
        if (isLoggedIn) {
            const {id} = getCartId(_dbCart, product.id);
            dispatch(deleteDBCart({id}));
        }

    };

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
                    ? cart.map((product) => {
                          return (
                              <div className="cart" key={product.id}>
                                  <h2 id="product">
                                      <Link
                                          to={`/products/${product.id}`}
                                          key={`All Products: ${product.id}`}
                                      >
                                          {product.productName}
                                      </Link>
                                  </h2>
                                  <h3>Price:{product.price}</h3>
                                  <button
                                      onClick={() =>
                                         handleDecreaseQuantity(dbCart, product) 
                                      }
                                  >
                                      Decrease Quantity
                                  </button>
                                  <h3>Quantity:{product.count}</h3>
                                  <button
                                      onClick={() =>
                                          handleIncreaseQuantity(
                                              dbCart,
                                              product
                                          )
                                      }
                                  >
                                      Increase Quantity
                                  </button>
                                  <h3>Total:{product.price * product.count}</h3>
                                  <button
                                      onClick={() => handleDelete(dbCart,product)}
                                  >
                                      REMOVE{" "}
                                  </button>
                              </div>
                          );
                      })
                    : "There is nothing in your cart!"}
                <button>Checkout</button>
            </div>
            <div>{cartTotal}</div>
        </div>
    );
};

export default Cart;
