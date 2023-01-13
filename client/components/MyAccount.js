import React, { useEffect } from "react";
import { me } from '../store/store';
import { useSelector, useDispatch } from "react-redux";
import { getSingleUser, selectSingleUser } from "../slices/singleUserSlice";
import EditUserInfoForm from "./EditUserInfoForm";
import AddProductForm from "./AddProductForm";
import AddUserForm from "./AddUserForm";

const MyAccount = () => {
    const userId = useSelector((state) => state.auth.me.id);
    console.log('My Id is', userId)

    const dispatch = useDispatch();

    const singleUser = useSelector(selectSingleUser);

    useEffect(() => {
        dispatch(getSingleUser(userId));
    }, [dispatch, userId]);
    
    return(
      <div id='myAccount'>
        <h1>My Account</h1>
        <h4>User Options: </h4>
        <div><EditUserInfoForm /></div>
        <h4>Order History:</h4>

        {(singleUser.isAdmin ? 
          <>
            <h4>Admin Options:</h4>
            <div><AddProductForm /></div>
            <div><AddUserForm /></div>
          </>  
        : null)}
        
      </div>
    )
}
 
export default MyAccount
