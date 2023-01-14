import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSingleProduct,
    getSingleProduct,
} from "../slices/singleProductSlice";
import { addToCart } from "../slices/cartSlice";
import { selectGetCart } from "../slices/cartSlice";
import { addProductToCart } from "../slices/singleCartDatabaseSlice";

const SingleProduct = () => {
    //this useState is ONLY for quantity quantity
    const [quantity, setQuantity] = useState(1);

    const { productId } = useParams();
    const dispatch = useDispatch();

    const singleProduct = useSelector(selectSingleProduct);
    const isLoggedIn = useSelector((state) => !!state.auth.me.id);
    const userId = useSelector((state) => state.auth.me.id);
    const cartState = useSelector(selectGetCart)

    const {
        id,
        productName,
        category,
        stockQuantity,
        description,
        price,
        imageUrl,
    } = singleProduct;

    useEffect(() => {
        dispatch(getSingleProduct(productId));
    }, [dispatch]);

    if (!id) {
        return <p>NO PRODUCTS FOUND</p>;
    }

    //Quantity Counter Logic
    const increase = () => {
        setQuantity((count) => count + 1);
    };

    const decrease = () => {
        if (quantity > 0) {
            setQuantity((count) => count - 1);
        }
    };
 

    const handleAddToCart = (quantity, userId, productId) => {
        if (isLoggedIn && userId) {
            dispatch(addProductToCart({ quantity, userId, productId }));
            [...Array(quantity)].forEach(() =>
               dispatch(addToCart(singleProduct))
            );
        } else {
            [...Array(quantity)].forEach(() =>
                dispatch(addToCart(singleProduct))
            );
            console.log(cartState)
        }
    };

    return (
        <div id="single-product">
            <div id="single-product-info">
                <img src={`${imageUrl}`} /> 
                <h1>{productName}</h1>
                <h3>Price: {price}</h3>
                <h3>Category: {category}</h3>
                <p>Details: {description}</p>
                <button
                    onClick={()=> handleAddToCart(quantity, userId, productId)
                    }
                >
                    Add to Cart
                </button>

                <div className="quantityCounter">
                    <h3>Quantity:</h3>
                    <div className="btn-container">
                        <button className="control__btn" onClick={decrease}>
                            -
                        </button>
                        <span className="quantityOutput"> {quantity} </span>
                        <button className="control__btn" onClick={increase}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
