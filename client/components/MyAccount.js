import React, { useEffect } from "react";
import { me } from '../store/store';
import { useSelector, useDispatch } from "react-redux";
import { getSingleUser } from "../slices/singleUserSlice";
import EditUserInfoForm from "./EditUserInfoForm";
import { getAllUsers } from "../slices/allUsersSlice";
import { selectUsers } from "../slices/allUsersSlice";

const MyAccount = () => {
    const userId = useSelector((state) => state.auth.me.id);
    const user = useSelector(getSingleUser)

    const dispatch = useDispatch();
    const users = useSelector(selectUsers)

    useEffect(() => {

        dispatch(getSingleUser(userId));
        dispatch(getAllUsers())
    }, [dispatch, userId]);

    console.log("This is the Users", users)
    
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
