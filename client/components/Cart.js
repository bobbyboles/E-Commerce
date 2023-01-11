import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleProduct from "./SingleProduct";
import { getCart, selectGetCart } from '../slices/cartSlice';
import { useEffect } from "react";


export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectGetCart);
    console.log(cart);
  
//     useEffect(() => {
//       dispatch(getCart())
//   }, [dispatch]);

        return(
            <div id="cart_container">
                <div id="product_container">
                    {/* <article>Product info</article>
                    <article>Product name</article>
                    <article>Product price</article>
                    <article>Product description</article>
                    <img />
                    <button> + </button><button> - </button> */}
                    {cart && cart.length ? cart.map((product) => {
          return(
            <div className='cart' key={product.id}>
                <h2>{product.productName}</h2>
                <h3>{product.price}</h3>
            </div>
          )
        }) : null}
                </div>
            
            </div>
        )    
}

export default Cart;