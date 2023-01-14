import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSingleProduct, editSingleProduct } from "../slices/singleProductSlice";

const EditProductForm = () => {
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const singleProduct = useSelector(selectSingleProduct);
    console.log('single Product info:', singleProduct)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
            setProductName(singleProduct.productName)
            setCategory(singleProduct.category)
            setStockQuantity(singleProduct.stockQuantity)
            setDescription(singleProduct.description)
            setPrice(singleProduct.price)
            setImageUrl(singleProduct.imageUrl)

        }, [
            singleProduct.productName,
            singleProduct.category,
            singleProduct.stockQuantity,
            singleProduct.description,
            singleProduct.price,
            singleProduct.imageUrl
        ])

    const id = singleProduct.id

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(editSingleProduct({id, productName, category, stockQuantity, description, price, imageUrl}))
        navigate('/')
        };

    return (
        <>
            <form id="edit-product-form" onSubmit={handleSubmit}>
            <h3>View/Edit Product Information: </h3>

                <label htmlFor="productName">Product Name:</label>
                <input
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                />

                <label htmlFor="category">Category:</label>
                <input
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                />

                <label htmlFor="stockQuantity">Stock Quantity:</label>
                <input
                name="stockQuantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                />

                <label htmlFor="description">Description:</label>
                <input
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <label htmlFor="price">Price:</label>
                <input
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />

                <label htmlFor="imageUrl">Image URL:</label>
                <input
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                />

                <button type="submit">Update Information</button>
            </form>
        </>
    )
}

export default EditProductForm