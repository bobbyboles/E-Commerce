import React from 'react'
import { fetchProductsAsync, sortByCategory } from '../slices/allProductsSlice'
import { useDispatch } from 'react-redux'


function SideNav() {
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
       await dispatch(fetchProductsAsync())
       await dispatch(sortByCategory(e.target.value))
    };
    const sideNavStyle = {
      display: 'flex',
      flexDirection: 'column',
      left: '0',
      border: '2px solid lightBlue',
      borderRadius: '5px',
      height: '80vh',
      width: '10vw',
      padding: '.2em 1em 1em 1em',
      marginTop: '2.9vh',
      zIndex: '1',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'pink',
      fontSize: '1.5em',
      lineHeight: '1.5em',
      textAlign: 'center',
      position: 'fixed',
    };
    const all = {
      width: '8vw',
      height: '3vw',
      fontFamily: 'Press Start 2P',
      fontSize: '1em',
      borderRadius: '5px',
      backgroundColor: '#ffd9b3'
    };
    const xbox = {
      width: '8vw',
      height: '3vw',
      fontSize: '1em',
      borderRadius: '5px',
      backgroundColor: 'black',
      color: '#00cc66'
    };
    const wii = {
      width: '8vw',
      height: '3vw',
      fontSize: '1em',
      borderRadius: '5px',
      backgroundColor: 'white',

      color: 'blue'
    };
    const ps3 = {
      width: '8vw',
      height: '3vw',
      fontSize: '1em',
      borderRadius: '5px',
      backgroundColor: 'black',
      color: 'white'
    };
    const ps2 = {
      width: '8vw',
      height: '3vw',
      fontSize: '1em',
      borderRadius: '5px',
      backgroundColor: 'black',
      color: '#66ccff'
    };
    const ps = {
      width: '8vw',
      height: '3vw',
      fontSize: '1em',
      borderRadius: '5px',
      backgroundColor: 'black',
      color: 'red'
    };
    const n64 = {
      width: '8vw',
      height: '3vw',
      fontSize: '1em',
      borderRadius: '5px',
      backgroundColor: '#66ff99',
      color: 'blue'
    };
    const snes = {
      width: '8vw',
      height: '3vw',
      fontSize: '1em',
      borderRadius: '5px',
      backgroundColor: 'white',
      color: 'red'
    };
    const nes = {
      width: '8vw',
      height: '3vw',
      fontSize: '1em',
      borderRadius: '5px',
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
