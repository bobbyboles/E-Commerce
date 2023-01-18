import React from "react";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import AuthForm from "./AuthForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { me } from "../store/store";
import MyAccount from "./MyAccount";
import AboutUs from "./AboutUs";
import { useState } from "react";
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";
import EditUserForm from "./EditUserInfoForm";


const App = () => {
    const dispatch = useDispatch();
    const [loginToAccount, setLoginToAccount] = useState(false);

    useEffect(() => {
        dispatch(me());
    }, []);

    return (
        <>
            <div>
                <Navbar />
            </div>
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route to="/home" element={<Home />} />
                <Route
                    path="/login"
                    element={
                        <AuthForm
                            name="login"
                            displayName="Login"
                            loginToAccount={loginToAccount}
                            setLoginToAccount={setLoginToAccount}
                        />
                    }
                />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/account" element={<MyAccount />} />
                <Route path='/products/:productId' element={<SingleProduct/>} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </>
    );
};

export default App;
