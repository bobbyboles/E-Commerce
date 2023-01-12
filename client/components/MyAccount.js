import React, { useEffect } from "react";
import { me } from '../store/store';
import { useSelector, useDispatch } from "react-redux";
import { getSingleUser } from "../slices/singleUserSlice";
import EditUserInfoForm from "./EditUserInfoForm";

const MyAccount = () => {
    const userId = useSelector((state) => state.auth.me.id);
    console.log('My Id is', userId)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleUser(userId));
    }, [dispatch, userId]);
    
    return(
      <>
        <h1>My Account</h1>
        <h3>Please select one of the following options: </h3>
        <h4>View/Edit Account Information</h4>
        <span><EditUserInfoForm /></span>
        <p>Order History</p>
        <p>Admin</p>
        
      </>
    )
}
 
export default MyAccount
