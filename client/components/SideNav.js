import React from 'react'
import { Link } from 'react-router-dom'
import { fetchProductsAsync, sortByCategory } from '../slices/allProductsSlice'
import { useDispatch } from 'react-redux'


function SideNav() {
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        console.log(e)
       await dispatch(fetchProductsAsync())
       await dispatch(sortByCategory(e.target.value))
    }
  return (
    <>
        <div className='sideNav'>
          <button value='all' onClick={() => dispatch(fetchProductsAsync())}>All Products</button> 
          <button value='xbox' onClick={handleSubmit}>XBOX</button> 
          <button value='wii' onClick={handleSubmit}>Wii</button> 
          <button value='ps3' onClick={handleSubmit}>PS3</button> 
          <button value='Playstation 2' onClick={handleSubmit}>PS2</button> 
          <button value='Playstation' onClick={handleSubmit}>Playstation</button> 
          <button value='Nintendo 64' onClick={handleSubmit}>N64</button> 
          <button value='snes' onClick={handleSubmit}>SNES</button> 
          <button value='NES' onClick={handleSubmit}>NES</button> 
        </div>
    </>
  )
}

export default SideNav