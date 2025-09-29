import React, { useState } from 'react';
import './ConfDetailsSlider.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

<Carousel
  swipeable={true}
  emulateTouch={true}
  useKeyboardArrows={true}
  showThumbs={false}
  axis="horizontal"
></Carousel>

      
function ConfDetailsSlider({images}) {
    const [checked, setChecked] = React.useState("1");
    const handleClick = (value) => {
        setChecked(value);
    }
    // const images = [
    //     { url: "/Images/2022/IMG_0743.JPG" },
    //     { url: "/Images/2022/IMG_0804.JPG" },
    //     { url: "/Images/2022/IMG_0667.JPG" },
    //     { url: "/Images/2022/IMG_0879.JPG" },
    // ];
    return (
        <div className='PastConf--carousel'>
            <Carousel swipeable={true} emulateTouch={true}>
                {images.map((item, index) => {
                    return (
                        <img key={index} src={item.url} />
                    )
                })}
            </Carousel>
        </div>
    )
}

export default ConfDetailsSlider;
