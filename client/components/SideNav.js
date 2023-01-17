import React from 'react'
import { Link } from 'react-router-dom'
import { fetchProductsAsync, sortByCategory } from '../slices/allProductsSlice'
import { useDispatch } from 'react-redux'

const handleSubmit = (e) => {
    console.log(e)
    dispatch(fetchProductsAsync())
    dispatch(sortByCategory())
}

function SideNav() {
    const dispatch = useDispatch();
  return (
    <>
        <div className='sideNav'>
          <button value='xbox' onClick={handleSubmit}>XBOX</button> 
          <button value='wii' onClick={() => dispatch(sortByCategory('wii'))}>Wii</button> 
          <button value='ps3' onClick={() => dispatch(sortByCategory('ps3'))}>PS3</button> 
          <button value='ps2' onClick={() => dispatch(sortByCategory('Playstation 2'))}>PS2</button> 
          <button value='playstation' onClick={() => dispatch(sortByCategory('Playstation'))}>Playstation</button> 
          <button value='n64' onClick={() => dispatch(sortByCategory('Nintendo 64'))}>N64</button> 
          <button value='snes' onClick={() => dispatch(sortByCategory('snes'))}>SNES</button> 
          <button value='nes' onClick={() => dispatch(sortByCategory('NES'))}>NES</button> 
        </div>
    </>
  )
}

export default SideNav