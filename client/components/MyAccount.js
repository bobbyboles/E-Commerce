import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  selectSingleUser } from "../slices/singleUserSlice";
import EditUserInfoForm from "./EditUserInfoForm";
import { getAllUsers } from "../slices/allUsersSlice";
import AddProductForm from "./AddProductForm";
import AdminViewUsers from "./AdminViewUsers";
import { getMyOrders } from "../slices/orderHistorySlice";
import OrderHistory from "./OrderHistory";
import { useState } from "react";

const MyAccount = () => {
    const userId = useSelector((state) => state.auth.me.id);
    const dispatch = useDispatch();
    const singleUser = useSelector(selectSingleUser);

    const [edit, setEdit] = useState(true);
    const [orderHistory, setOrderHistory] = useState(false);
    const [adminProduct, setAdminProduct] = useState(false);
    const [adminViewUsers, setAdminViewUsers] = useState(false);

    useEffect(() => {
        if (userId) dispatch(getMyOrders(userId));
        dispatch(getAllUsers());
    }, [dispatch, userId]);

    return (
        <div id="myAccount">
            <h1>My Account</h1>
            <span>
            <h4>User Options: </h4>
            <button
                onClick={() => {
                    setEdit(true);
                    setOrderHistory(false);
                    setAdminProduct(false);
                    setAdminViewUsers(false);
                }}
            >
                Edit Account Info
            </button>
            <button
                onClick={() => {
                    setOrderHistory(true);
                    setEdit(false);
                    setAdminProduct(false);
                    setAdminViewUsers(false);
                }}
            >
                Order History
            </button>
            </span>
            {singleUser.isAdmin ? (
                <>
                    <button
                        onClick={() => {
                            setOrderHistory(false);
                            setEdit(false);
                            setAdminProduct(true);
                            setAdminViewUsers(false);
                        }}
                    >
                        Add Product
                    </button>
                    <button
                        onClick={() => {
                            setOrderHistory(false);
                            setEdit(false);
                            setAdminProduct(false);
                            setAdminViewUsers(true);
                        }}
                    >
                        View / Delete Users
                    </button>
                </>
            ) : null}
            {edit ? (
                <div>
                    <EditUserInfoForm />
                </div>
            ) : (
                ""
            )}
            {orderHistory ? (
                <div>
                    <OrderHistory />
                </div>
            ) : (
                ""
            )}
            {adminViewUsers ? (
                <div>
                    <AdminViewUsers />{" "}
                </div>
            ) : (
                ""
            )}
            {adminProduct ? (
                <div>
                    <AddProductForm />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default MyAccount;
