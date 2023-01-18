import React from 'react'
import { Link } from 'react-router-dom'
import { fetchProductsAsync, sortByCategory } from '../slices/allProductsSlice'
import { useDispatch } from 'react-redux'
import { findLastIndex } from 'lodash';


function SideNav() {
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        console.log(e)
       await dispatch(fetchProductsAsync())
       await dispatch(sortByCategory(e.target.value))
    };
    const sideNavStyle = {
      display: 'flex',
      border: '2px solid lightBlue',
      width: '188vh',
      padding: '12px',
      margin: '8px',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      color: 'pink',
      fontSize: '20px'
    };
    const all = {
      width: '8vw',
      height: '2vw',
      backgroundColor: '#ffd9b3'
    };
    const xbox = {
      width: '8vw',
      height: '2vw',
      backgroundColor: 'black',
      color: '#00cc66'
    };
    const wii = {
      width: '8vw',
      height: '2vw',
      backgroundColor: 'white',
      color: 'blue'
    };
    const ps3 = {
      width: '8vw',
      height: '2vw',
      backgroundColor: 'black',
      color: 'white'
    };
    const ps2 = {
      width: '8vw',
      height: '2vw',
      backgroundColor: 'black',
      color: '#66ccff'
    };
    const ps = {
      width: '8vw',
      height: '2vw',
      backgroundColor: 'black',
      color: 'red'
    };
    const n64 = {
      width: '8vw',
      height: '2vw',
      backgroundColor: '#66ff99',
      color: 'blue'
    };
    const snes = {
      width: '8vw',
      height: '2vw',
      backgroundColor: 'white',
      color: 'red'
    };
    const nes = {
      width: '8vw',
      height: '2vw',
      backgroundColor: 'black',
      color: 'red'
    };
  return (
    <>
        <div className='sideNav' style={sideNavStyle}>Filter via your favorite consoles!
          <button value='all' onClick={() => dispatch(fetchProductsAsync())} style={all}>All Products</button> 
          <button value='xbox' onClick={handleSubmit} style={xbox}>XBOX</button> 
          <button value='wii' onClick={handleSubmit} style={wii}>Wii</button> 
          <button value='ps3' onClick={handleSubmit} style={ps3}>Playstation 3</button> 
          <button value='Playstation 2' onClick={handleSubmit} style={ps2}>Playstation 2</button> 
          <button value='Playstation' onClick={handleSubmit} style={ps}>Playstation</button> 
          <button value='Nintendo 64' onClick={handleSubmit} style={n64}>N64</button> 
          <button value='snes' onClick={handleSubmit} style={snes}>SNES</button> 
          <button value='NES' onClick={handleSubmit} style={nes}>NES</button> 
        </div>
    </>
  )
}

export default SideNav