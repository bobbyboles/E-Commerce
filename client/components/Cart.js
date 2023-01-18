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
import { checkoutCartSlice } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { editSingleUser } from "../slices/singleUserSlice";
import { addUserAsync } from "../slices/allUsersSlice";
import { editSingleProduct } from "../slices/singleProductSlice";

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectGetCart);
    const userId = useSelector((state) => state.auth.me.id);
    const isLoggedIn = useSelector((state) => !!state.auth.me.id);
    const singleUser = useSelector(selectSingleUser);
    const localCartStorage = localStorage.getItem("cart");
    const [username, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const nav = useNavigate();

    if (localCartStorage) {
        var localCart = JSON.parse(localCartStorage);
    }

    const cartTotal = cart.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
    }, 0);

    useEffect(() => {
        if (userId) dispatch(getSingleUser(userId));
        if (userId) dispatch(getMyCart(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (isLoggedIn) {
            setUserName(singleUser.username);
            setFirstName(singleUser.firstName);
            setLastName(singleUser.lastName);
            setEmail(singleUser.email);
            setAddress(singleUser.address);
            setPhone(singleUser.phone);
        }
    }, [
        singleUser.username,
        singleUser.firstName,
        singleUser.lastName,
        singleUser.email,
        singleUser.address,
        singleUser.phone,
    ]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (isLoggedIn) {
            dispatch(
                editSingleUser({
                    id: userId,
                    username,
                    firstName,
                    lastName,
                    email,
                    address,
                    phone,
                })
            );
        } else {
            dispatch(
                addUserAsync({
                    username,
                    password: "password",
                    firstName,
                    lastName,
                    email,
                    address,
                    phone,
                })
            );
        }
    };

    const handleIncreaseQuantity = (_dbCart, product) => {
        dispatch(addToQuantity(product));
        if (_dbCart) {
            const newLocalCart = _dbCart.map((item) => {
                if (item.id == product.id) {
                    item.quantity++;
                }
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(newLocalCart));
        }
        if (isLoggedIn) {
            let id = product.cartId;
            let productId = product.id;
            let quantity = product.quantity + 1;
            dispatch(editProductInDBCart({ id, productId, quantity }));
        }
    };

    const handleDecreaseQuantity = (_dbCart, product) => {
        dispatch(removeToQuantity(product));
        if (localCart) {
            const newLocalCart = localCart.map((item) => {
                if (item.id == product.id && item.quantity > 0) {
                    item.quantity--;
                }
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(newLocalCart));
        }
        if (isLoggedIn) {
            let id = product.cartId;
            let productId = product.id;
            let quantity = product.quantity - 1;
            if (quantity > 0) {
                dispatch(
                    editProductInDBCart({ id, userId, productId, quantity })
                );
            }
        }
    };

    const handleDelete = (_dbCart, product) => {
        dispatch(removeFromCart(product.id));
        if (localCart) {
            const newLocalCart = localCart.filter((item) => {
                if (item.id !== product.id) return true;
            });
            localStorage.setItem("cart", JSON.stringify(newLocalCart));
        }
        if (isLoggedIn) {
            let id = product.cartId;
            dispatch(deleteDBCart({ id }));
        }
    };

    const handleCheckout = (cart, userId) => {
        localStorage.setItem("cart", "[]");
        dispatch(checkoutCartSlice());
        if (isLoggedIn) {
            let completed = true;
            cart.map((item) => {
                let id = item.cartId;
                let productId = item.id;
                let quantity = item.quantity;
                dispatch(
                    checkoutCart({ id, userId, productId, quantity, completed })
                );
                let stockQuantity = item.stockQuantity - quantity
                dispatch(editSingleProduct({id:item.id, stockQuantity }))
            });
        }else{
            cart.map((item)=>{
                let stockQuantity = item.stockQuantity - item.quantity
                dispatch(editSingleProduct({id:item.id, stockQuantity }))

            })
        }
        nav("/");
    };

    return (
        <div id="cart_container">
            <div id="product_container">
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
                                          handleDecreaseQuantity(
                                              localCart,
                                              product
                                          )
                                      }
                                  >
                                      Decrease Quantity
                                  </button>
                                  <h3>Quantity:{product.quantity}</h3>
                                  <button
                                      onClick={() =>
                                          handleIncreaseQuantity(
                                              localCart,
                                              product
                                          )
                                      }
                                  >
                                      Increase Quantity
                                  </button>
                                  <h3>
                                      Total:{product.price * product.quantity}
                                  </h3>
                                  <button
                                      onClick={() =>
                                          handleDelete(localCart, product)
                                      }
                                  >
                                      REMOVE{" "}
                                  </button>
                              </div>
                          );
                      })
                    : "There is nothing in your cart!"}
                <button onClick={() => handleCheckout(cart, userId)}>
                    Checkout
                </button>
            </div>
            <div>{cartTotal}</div>
            <form id="edit-user-form" onSubmit={handleSubmit}>
                <h3>Shipping Information</h3>

                <label htmlFor="username">User Name:</label>
                <input
                    name="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />

                <label htmlFor="firstName">First Name:</label>
                <input
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="email">Email Address:</label>
                <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="address">Address:</label>
                <input
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label htmlFor="phone">Phone Number:</label>
                <input
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button type="submit">Update Information</button>
            </form>
        </div>
    );
};

export default Cart;
