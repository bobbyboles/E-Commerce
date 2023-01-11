import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSingleProduct, getSingleProduct } from "../slices/singleProductSlice";

const SingleProduct = () => {
    //this useState is ONLY for quantity counter
    const [counter, setCounter] = useState(0);

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

    //Quantity Counter Logic
    const increase = () => {
        setCounter(count => count + 1);
    };
 
    const decrease = () => {
        if (counter > 0) {
          setCounter(count => count - 1);
        }
    };

    return(
        <div id='single-product'>
            <div id='single-product-info'>
                <img src={`/${imageUrl}`} />
                <h1>{productName}</h1>
                <h3>Price: {price}</h3>
                <h3>Category: {category}</h3>
                <p>Details: {description}</p>
                <button>Add to Cart</button>
                
                <div className="quantityCounter">
                    <h3>Quantity:</h3>
                    <span className="quantityOutput">{counter}</span>
                    <div className="btn-container">
                        <button className="control__btn" onClick={increase}>+</button>
                        <button className="control__btn" onClick={decrease}>-</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SingleProduct