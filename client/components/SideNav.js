import React from 'react'
import { fetchProductsAsync, sortByCategory } from '../slices/allProductsSlice'
import { useDispatch } from 'react-redux'


function SideNav() {
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
       await dispatch(fetchProductsAsync())
       await dispatch(sortByCategory(e.target.value))
    };
  return (
    <>
        <div> 
          <button value='all' onClick={() => dispatch(fetchProductsAsync())} >All Products</button> 
          <button value='xbox' onClick={handleSubmit} >XBOX</button> 
          <button value='wii' onClick={handleSubmit} >Wii</button> 
          <button value='ps3' onClick={handleSubmit} >Playstation 3</button> 
          <button value='Playstation 2' onClick={handleSubmit} >Playstation 2</button> 
          <button value='Playstation' onClick={handleSubmit} >Playstation</button> 
          <button value='Nintendo 64' onClick={handleSubmit} >N64</button> 
          <button value='snes' onClick={handleSubmit} >SNES</button> 
          <button value='NES' onClick={handleSubmit} >NES</button> 
        </div>
    </>
  )
}

export default SideNav
