import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/store";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { selectGetCart } from "../slices/cartSlice";
import { useEffect } from "react";
import { selectSingleUser, getSingleUser } from "../slices/singleUserSlice";
import { addToCart } from "../slices/cartSlice";
import { selectProducts } from "../slices/allProductsSlice";
import { selectSingleCartDatabase } from "../slices/singleCartDatabaseSlice";
import { getMyCart } from "../slices/singleCartDatabaseSlice";

const Navbar = () => {
    const cartNum = useSelector(selectGetCart);
    const allProducts = useSelector(selectProducts)
    const dbCart = useSelector(selectSingleCartDatabase)
    const username = useSelector((state) => state.auth.me.username);
    const userId = useSelector((state) => state.auth.me.id);
    const user = useSelector(selectSingleUser);
    const isLoggedIn = useSelector((state) => !!state.auth.me.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutAndRedirectHome = () => {
        dispatch(logout());
        navigate("/");
    };
    const basicNavStyle = {
        display: "flex",
        flexdirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
        margin: 10,
    };
    useEffect(() => {
        if (userId) dispatch(getSingleUser(userId));
        if(userId)dispatch(getMyCart(userId));
    }, [dispatch, userId]);

    if (isLoggedIn && user.products && cartNum.length < 1 && dbCart.length) {
        console.log('fired')
        user.products.map((product) => {
            const newProduct = JSON.parse(JSON.stringify(product));
            newProduct["count"] = product.cart.quantity;
            dispatch(addToCart(newProduct));
        });
    }

    const cartNumber =  cartNum.reduce((acc, item) => {
            acc += item.count;
            return acc;
        }, 0);
    
    return (
        <div>
            <nav>
                <div style={basicNavStyle}>
                    <Link to="/home">
                        <img
                            src="/logo/retrogaming.png"
                            style={{ height: 50, width: 100 }}
                        />
                    </Link>
                    <Link to="/home">Shop</Link>
                    <Link to="/aboutUs">About Us</Link>
                    <Link to={isLoggedIn ? "/account" : "/login"}>
                        My Account
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <div>Hello {username}</div>
                            <button
                                type="button"
                                onClick={logoutAndRedirectHome}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                    <Link to="/cart">
                        <Badge
                            color="secondary"
                            overlap="rectangular"
                            badgeContent={cartNumber}
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </Link>
                </div>
            </nav>
            <hr />
        </div>
    );
};

export default Navbar;
