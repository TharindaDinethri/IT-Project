import React from 'react'
import './Hero.css'
import heart_icon from '../Asset/heart_icon.png'
import arrow_icon from '../Asset/arrow.png'
import hero_image from '../Asset/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
     <div className="hero-left">
      <h2>#EATBETTER #FEELBETTER #LIVEBETTER</h2>
      <div>
        <div className="hero-heart-icon">
          <p><b>100%</b></p>
          <img src={heart_icon} alt="" />
          </div>
       <p><b>Natural</b></p> 
       <p><b>Organic Products</b></p>
       <p><b>With Best Quality</b></p>
      </div>
      
      <div className="hero-latest-btn">
      <div>View Products</div>
      <img src={arrow_icon} alt="" />
      </div>   
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />

      </div>
    </div>
  )
}

export default Hero