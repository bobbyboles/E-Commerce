import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../slices/allProductsSlice";

const AddProductForm = () => {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault()
        let addProduct = {
            productName: productName,
            category: category,
            stockQuantity: stockQuantity,
            price: price,
            description: description,
            imageUrl: imageUrl
        }
        dispatch(addProductAsync(addProduct))
        navigate('/')
      }

    return(
        <div>
            <form id="add-product-form" onSubmit={handleSubmit}>
            <h3>Add New Product: </h3>

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

                <label htmlFor="stockQuantity">Quantity:</label>
                <input
                name="stockQuantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                />

                <label htmlFor="price">Price:</label>
                <input
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />

                <label htmlFor="description">Description:</label>
                <input
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <label htmlFor="imageUrl">Image Url:</label>
                <input
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                />

                <button type="submit">Add New Product</button>
            </form>
      </div>
    )
}

export default AddProductForm