import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectGetCart,
    deleteCart,
    removeFromCart,
    resetState,
    editProductInDBCart,
} from "../slices/cartSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { addToQuantity, removeToQuantity } from "../slices/cartSlice";
import { getSingleUser } from "../slices/singleUserSlice";
import { selectSingleUser } from "../slices/singleUserSlice";
import { deleteDBCart } from "../slices/cartSlice";
import { getMyCart } from "../slices/cartSlice";
import { checkoutCart } from "../slices/cartSlice";

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectGetCart);
    const userId = useSelector((state) => state.auth.me.id);
    const isLoggedIn = useSelector((state) => !!state.auth.me.id);
    const user = useSelector(selectSingleUser);

    const deleteButton = (id) => {
        dispatch(removeFromCart(id));
    };

    const cartTotal = cart.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
    }, 0);

    useEffect(() => {
        if (userId) dispatch(getSingleUser(userId));
        if (userId) dispatch(getMyCart(userId));
    }, [dispatch, userId]);

    // const getCartId = (_dbCart, _productId) => {
    //     for (const item of _dbCart) {
    //         console.log("THIS IS THE ITEMS", item);
    //         if (item.productId == _productId) {
    //             console.log(
    //                 "This is the cart ID",
    //                 item.id,
    //                 "this is the cart quantity",
    //                 item.quantity
    //             );
    //             return { id: item.id, cartQuantity: item.quantity };
    //         }
    //     }
    //     return false;
    // };

    const handleIncreaseQuantity = (_dbCart, product) => {
        dispatch(addToQuantity(product));
        if (isLoggedIn) {
            let id = product.cartId;
            let productId = product.id;
            let quantity = product.quantity + 1;
            dispatch(editProductInDBCart({ id,  productId, quantity }));
        }
    };
    const handleDecreaseQuantity = (_dbCart, product) => {
        dispatch(removeToQuantity(product));
        if (isLoggedIn) {
            let id = product.cartId;
            let productId = product.id;
            let quantity = product.quantity - 1;
            dispatch(editProductInDBCart({ id, userId, productId, quantity }));
        }
    };
    const handleDelete = (_dbCart, product) => {
        dispatch(removeFromCart(product.id));
        if (isLoggedIn) {
            let id = product.cartId;
            dispatch(deleteDBCart({ id }));
        }
    };

    const handleCheckout = (cart, userId) => {
        let completed = true;
        cart.map((item) => {
            let id = item.cartId 
            let productId = item.id
            let quantity = item.quantity
            console.log("THIS IS THE VALUES OF CHECKOUTCART PARAMS", id, userId, productId, quantity, completed)
            dispatch(checkoutCart({id, userId,productId, quantity,  completed}));
        });
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
                                          handleDecreaseQuantity(cart, product)
                                      }
                                  >
                                      Decrease Quantity
                                  </button>
                                  <h3>Quantity:{product.quantity}</h3>
                                  <button
                                      onClick={() =>
                                          handleIncreaseQuantity(cart, product)
                                      }
                                  >
                                      Increase Quantity
                                  </button>
                                  <h3>
                                      Total:{product.price * product.quantity}
                                  </h3>
                                  <button
                                      onClick={() =>
                                          handleDelete(cart, product)
                                      }
                                  >
                                      REMOVE{" "}
                                  </button>
                              </div>
                          );
                      })
                    : "There is nothing in your cart!"}
                <button onClick={()=> handleCheckout(cart, userId)}>Checkout</button>
            </div>
            <div>{cartTotal}</div>
        </div>
    );
};

export default Cart;
