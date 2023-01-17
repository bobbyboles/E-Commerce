import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../store/store";
import { useNavigate } from "react-router-dom";
import  AddUserForm from './AddUserForm'
import { selectGetCart } from "../slices/cartSlice";
import { addProductToCart } from "../slices/cartDatabaseSlice";
/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const cart  = useSelector(selectGetCart)
    const userId = useSelector((state) => state.auth.me.id);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const formName = evt.target.name;
        const username = evt.target.username.value;
        const password = evt.target.password.value;
        dispatch(authenticate({ username, password, method: formName }));
        if(cart.length){
            cart.map(async(item)=>{
                console.log("THIS IS AN ITEM IN THE CHECK", item)
                const quantity = item.quantity
                const productId = item.productId
                await dispatch(addProductToCart(quantity, userId, productId )) 
            })
        }
        // nav("/");
    };

    return (
        <div>
            <form onSubmit={handleSubmit} name={name}>
                <div>
                    <label htmlFor="username">
                        <small>Username</small>
                    </label>
                    <input name="username" type="text" />
                </div>
                <div>
                    <label htmlFor="password">
                        <small>Password</small>
                    </label>
                    <input name="password" type="password" />
                </div>
                <div>
                    <button type="submit">{displayName}</button>
                </div>
            </form>
            <div><AddUserForm /></div>
        </div>
    );
};

export default AuthForm;
