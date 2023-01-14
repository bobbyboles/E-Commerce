import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGetCart, deleteCart, removeFromCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";


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

    const deleteButton = (id) => {
        dispatch(removeFromCart(id))
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
                    ? uniqueArray.map((product) => {
                          return (
                              <div className="cart" key={product.id}>
                                <h2 id = "product" key={product.id}>
                                    <Link
                                        to={`/products/${product.id}`}
                                        key={`All Products: ${product.id}`}
                                    >{product.productName}
                                    </Link>
                                </h2>
                                <h3>Price: {(product.price*product.count).toFixed(2)}</h3>
                                <h4>Quantity: {product.count}</h4>
                                <button onClick = {() => deleteButton(product.id)} > REMOVE </button>
                              </div>
                          );
                      })
                    : 'There is nothing in your cart!'}
                <button>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
