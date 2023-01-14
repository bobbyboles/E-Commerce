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
import { selectSingleCartDatabase} from "../slices/singleCartDatabaseSlice";

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectGetCart);
    const dbCart = useSelector(selectSingleCartDatabase)
    const userId = useSelector((state) => state.auth.me.id);

    const deleteButton = (id) => {
        dispatch(removeFromCart(id));
    };

    useEffect(() => {
        if(userId)dispatch(getMyCart(userId));
    }, [dispatch, userId]);


    const cartTotal = cart.reduce((acc, item)=>{
        acc+= item.price * item.count
        return acc
    },0)

    
    const getCartId = (_dbCart, _productId) =>{
        for(const item of _dbCart){
            if(item.id == _productId )return [item.id, item.quantity] 
             else return false
        }
    }

    const handleIncreaseQuantity = (_cartId, product) =>{

    }
    const handleDecreaseQuantity = (_cartId, product) =>{

    }
    const handleDelete = (_cartId, product) =>{

    }

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
                                          dispatch(removeToQuantity(product))
                                      }
                                  >
                                      Decrease Quantity
                                  </button>
                                  <h3>Quantity:{product.count}</h3>
                                  <button
                                      onClick={() =>
                                          dispatch(addToQuantity(product))
                                      }
                                  >
                                      Increase Quantity
                                  </button>
                                  <h3>Total:{product.price * product.count}</h3>
                                  <button
                                      onClick={() => deleteButton(product.id)}
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
