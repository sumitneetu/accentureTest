import React from 'react'
import { Carousel } from 'react-responsive-carousel'

export const Banner = () => (
  <Carousel autoPlay showThumbs={false}>
    <div>
      <img alt="" src="banner/banner1.jpg" />
    </div>
    <div>
      <img alt="" src="banner/banner2.webp" />
    </div>
    <div>
      <img alt="" src="banner/banner3.webp" />
    </div>
    <div>
      <img alt="" src="banner/banner4.webp" />
    </div>
    <div>
      <img alt="" src="banner/banner5.webp" />
    </div>
  </Carousel>
)

export default Banner
