import React from "react";
import { me } from '../store/store';
import { useSelector } from "react-redux";

const MyAccount = () => {
  const userId = useSelector((state) => state.auth.me.id);
    console.log('My Id is', userId)
    return(
        <h1>My Account</h1>
    )
}
 
export default MyAccount
