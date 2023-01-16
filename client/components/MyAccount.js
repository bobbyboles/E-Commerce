import React, { useEffect } from "react";
import { me } from '../store/store';
import { useSelector, useDispatch } from "react-redux";
import { getSingleUser, selectSingleUser } from "../slices/singleUserSlice";
import EditUserInfoForm from "./EditUserInfoForm";
import { getAllUsers } from "../slices/allUsersSlice";
import { selectUsers } from "../slices/allUsersSlice";
import AddProductForm from "./AddProductForm";
import AddUserForm from "./AddUserForm";
import AdminViewUsers from "./AdminViewUsers";
import { getMyOrders } from "../slices/orderHistorySlice";
import { selectOrderHistory } from "../slices/orderHistorySlice";

const MyAccount = () => {
    const userId = useSelector((state) => state.auth.me.id);
    //const user = useSelector(getSingleUser)

    const dispatch = useDispatch();
    const users = useSelector(selectUsers)
    const orderHistory = useSelector(selectOrderHistory)

    const singleUser = useSelector(selectSingleUser);

    useEffect(() => {
        if(userId)dispatch(getMyOrders(userId))
        dispatch(getAllUsers())
    }, [dispatch, userId]);

    console.log(orderHistory)
    
    return(
      <div id='myAccount'>
        <h1>My Account</h1>
        <h4>User Options: </h4>
        <div><EditUserInfoForm /></div>
        <h4>Order History:</h4>

        {(singleUser.isAdmin ? 
          <>
            <h4>Admin Dashboard:</h4>
            <div><AddProductForm /></div>
            <div><AdminViewUsers /></div>
          </>  
        : null)}
        
      </div>
    )
}
 
export default MyAccount
