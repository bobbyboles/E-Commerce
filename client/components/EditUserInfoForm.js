import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSingleUser, editSingleUser } from "../slices/singleUserSlice";

const EditUserForm = () => {
    // const [username, setUserName] = useState("");
    // const [password, setPassword] = useState("");
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [address, setAddress] = useState("");
    // const [phone, setPhone] = useState("");

    const singleUser = useSelector(selectSingleUser);
    const {username, password, firstName, lastName, email, address, phone} = singleUser
    console.log('single User info:', singleUser)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const updatedSingleUser = {username, password, firstName, lastName, email, address, phone}
        dispatch(editSingleUser(updatedSingleUser))
        navigate('/')
      };

    // useEffect(() => {
    //     dispatch((res => {
    //         const {username, password, firstName, lastName, email, address, phone} = res.payload
    //         setUserName(username)
    //         setPassword(password)
    //         setFirstName(firstName)
    //         setLastName(lastName)
    //         setEmail(email)
    //         setAddress(address)
    //         setPhone(phone)

    //     }))
    // }, [])

    return (
        <>
            <form id="edit-user-form" onSubmit={handleSubmit}>
                <label htmlFor="username">User Name:</label>
                <input
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                name="password"
                value={''}
                onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="firstName">First Name:</label>
                <input
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="email">Email Address:</label>
                <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="address">Address:</label>
                <input
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />

                <label htmlFor="phone">Phone Number:</label>
                <input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                />

                <button type="submit">Update Information</button>
            </form>
        </>
    )
}

export default EditUserForm