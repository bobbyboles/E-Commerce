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

const Navbar = () => {
    const cartNum = useSelector(selectGetCart);
    const username = useSelector((state) => state.auth.me.username);
    const userId = useSelector((state)=> state.auth.me.id)
    const user = useSelector(selectSingleUser)
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
        if(userId)dispatch(getSingleUser(userId));
    }, [dispatch, userId]);

    console.log(isLoggedIn, user, cartNum)
    if (isLoggedIn && user.products && cartNum.length < 1) {
        user.products.map((product) => {
            [...Array(product.cart.quantity)].forEach(() => {
                dispatch(addToCart(product));
            });
        });
    }

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
                            badgeContent={cartNum.length}
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
