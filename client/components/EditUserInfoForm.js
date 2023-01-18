import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSingleUser, editSingleUser } from "../slices/singleUserSlice";

const EditUserForm = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("********");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const singleUser = useSelector(selectSingleUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
            setUserName(singleUser.username)
            setFirstName(singleUser.firstName)
            setLastName(singleUser.lastName)
            setEmail(singleUser.email)
            setAddress(singleUser.address)
            setPhone(singleUser.phone)

        }, [
            singleUser.username,
            singleUser.password,
            singleUser.firstName,
            singleUser.lastName,
            singleUser.email,
            singleUser.address,
            singleUser.phone
        ])

    const id = singleUser.id

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(editSingleUser({id, username, password, firstName, lastName, email, address, phone}))
        navigate('/account')
        };

    return (
        <>
            <form id="edit-user-form" onSubmit={handleSubmit}>
            <h3>View/Edit Account Information: </h3>

                <label htmlFor="username">User Name:</label>
                <input
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                name="password"
                value={password}
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
