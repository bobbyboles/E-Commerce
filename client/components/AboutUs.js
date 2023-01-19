import React from "react";


const AboutUs = () => {
    const aboutStyle = {
        top: '1000px'
    }
    return(
        <div id="about" style={aboutStyle}>
            <h1>Bunch of Cool Dudes</h1>
            <h3>Armand Arslanian</h3>
            <article>"Sic Parvis Magna" -Mantra of Sir Francis Drake, Uncharted Series </article>
            <br/>
            <h3>Robert Boles</h3>
            <article>"LEEERRRROOOOYYYYYYYYYY JEENNNKINS" -Human Paladin Leeroy Jenkins, World of Warcraft </article>
            <br/>
            <h3>David Zheng</h3>
            <article>"Sir, request permission to leave the station. (Lord Hood: For what purpose?) To give the covenant back their bomb" -John 117 Master Chief, Halo Series </article>
            <br/>
            <h3>Joseph Mealor</h3>
            <article>???</article>
            <br/>
        </div>
    )
}
 
export default AboutUs
