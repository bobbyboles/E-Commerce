import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSingleProduct,
    getSingleProduct,
} from "../slices/singleProductSlice";
import { addToCart } from "../slices/cartSlice";
import {
    addProductToCart,
    editProductInCart,
} from "../slices/singleCartDatabaseSlice";
import { getSingleUser } from "../slices/singleUserSlice";
import { selectSingleUser } from "../slices/singleUserSlice";
import { getMyCart } from "../slices/singleCartDatabaseSlice";
import { selectSingleCartDatabase } from "../slices/singleCartDatabaseSlice";
import  EditProductForm from './EditProductForm'

const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1);

    const { productId } = useParams();
    const dispatch = useDispatch();

    const singleProduct = useSelector(selectSingleProduct);
    const isLoggedIn = useSelector((state) => !!state.auth.me.id);
    const userId = useSelector((state) => state.auth.me.id);
    const userCart = useSelector(selectSingleCartDatabase);

    const singleUser = useSelector(selectSingleUser);
    console.log('Single User Data', singleUser)

    const {
        productName,
        category,
        stockQuantity,
        description,
        price,
        imageUrl,
    } = singleProduct;

    useEffect(() => {
        dispatch(getSingleProduct(productId));
        if(userId)dispatch(getMyCart(userId));
    }, [dispatch, userId]);

    if (!productName) {
        return <p>NO PRODUCTS FOUND</p>;
    }

    const increase = () => {
        setQuantity((count) => count + 1);
    };

    const decrease = () => {
        if (quantity > 0) {
            setQuantity((count) => count - 1);
        }
    };


    const isAlreadyInCart = (cart, _productId) =>{
        for(const item of cart){
            if(item.id == _productId )return [item.id, item.quantity] 
             else return false
        }
    }

    const handleAddToCart = (quantity, userId, productId, userCart) => {
        if (isLoggedIn && userId && isAlreadyInCart(userCart, productId) ) {
            const [id, cartQuantity] = isAlreadyInCart(userCart, productId);
            quantity+= cartQuantity
            dispatch(editProductInCart({id, userId, productId, quantity}));
            quantity-= cartQuantity;
            const newProduct = JSON.parse(JSON.stringify(singleProduct))
            newProduct['count'] = quantity
            dispatch(addToCart(newProduct))
        } else if(isLoggedIn && userId ) {
            dispatch(addProductToCart({userId, productId, quantity}));
            const newProduct = JSON.parse(JSON.stringify(singleProduct))
            newProduct['count'] = quantity
            dispatch(addToCart(newProduct))
        } else{
            const newProduct = JSON.parse(JSON.stringify(singleProduct))
            newProduct['count'] = quantity
            dispatch(addToCart(newProduct))

        }
    };

    return (
        <div id="single-product">
            <div id="single-product-info"> 
                <img src={`/${imageUrl}`} />
                
                {singleUser.isAdmin ? <EditProductForm /> :
                <>
                <h1>{productName}</h1>
                <h3>Price: {price}</h3>
                <h3>Category: {category}</h3>
                <p>Details: {description}</p>
                {stockQuantity > 0 ? (
                    <button
                        onClick={() =>
                            handleAddToCart(
                                quantity,
                                userId,
                                productId,
                                userCart
                            )
                        }
                    >
                        Add to Cart
                    </button>
                ) : (
                    <div>OUT OF STOCK</div>
                )}

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
            </> } 
            </div>
        </div>
    );
};

export default SingleProduct;
