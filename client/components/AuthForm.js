import React from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/store";
import { useNavigate } from "react-router-dom";
import  AddUserForm from './AddUserForm'

const AuthForm = ({ name, displayName }) => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const formName = evt.target.name;
        const username = evt.target.username.value;
        const password = evt.target.password.value;
        dispatch(authenticate({ username, password, method: formName }));
        nav("/");
    };

    return (
        <div>
            <form id="loginForm" onSubmit={handleSubmit} name={name}>
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
