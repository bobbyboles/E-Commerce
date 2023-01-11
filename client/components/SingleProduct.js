import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSingleProduct, getSingleProduct } from "../slices/singleProductSlice";

const SingleProduct = () => {
    const {productId} = useParams()
    const dispatch = useDispatch()

    const singleProduct = useSelector(selectSingleProduct)

    const {id, productName, category, stockQuantity, description, price, imageUrl} = singleProduct

    useEffect(() => {
        dispatch(getSingleProduct(productId))
    }, [dispatch])

    if (!id){
        return <p>NO PRODUCTS FOUND</p>
    }

    return(
        <div id='single-product'>
            <div id='single-product-info'>
                <img src={`/${imageUrl}`} />
                <h1>{productName}</h1>
                <h3>Price: {price}</h3>
                <h3>Category: {category}</h3>
                <p>Details: {description}</p>
                <button>Add to Cart</button>
            </div>
        </div>
    )
}

export default SingleProduct