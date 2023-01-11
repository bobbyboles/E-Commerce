import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/store";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"

const Navbar = () => {
    const username = useSelector((state) => state.auth.me.username);
    const isLoggedIn = useSelector((state) => !!state.auth.me.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutAndRedirectHome = () => {
        dispatch(logout());
        navigate("/");
    };
    const basicNavStyle = {
        display: 'flex',
        flexdirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:60,
        margin: 10 
    } 

    return (
        <div>
            <nav>
                <div style={basicNavStyle}>
                    <Link to="/home">
                        <img src="retrogaming.png" style={{height: 50, width: 100}} />
                    </Link>
                    <Link to="/home">Shop</Link>
                    <Link to='/aboutUs'>About Us</Link>
                    <Link to={isLoggedIn ? '/account' : '/login'}>My Account</Link>
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
                    <Badge color='secondary' overlap="rectangular" badgeContent={1}><ShoppingCartIcon/></Badge>
                </div>
            </nav>
            <hr />
        </div>
    );
};

export default Navbar;
