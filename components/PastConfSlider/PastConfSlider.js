import React, { useState } from 'react';
import './PastConfSlider.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

function PastConfSlider() {
    const [checked, setChecked] = React.useState("1");
    const handleClick = (value) => {
        setChecked(value);
    }
    const images = [
        { url: "/Images/pastconf/2019_ted.jpg" },
        { url: "/Images/pastconf/2020_ted.jpg" },
        { url: "/Images/pastconf/2021_ted.jpg" },
        { url: "/Images/pastconf/2022_ted.jpg" },
        { url: "/Images/pastconf/2018_ted.jpg" },
    ];
    return (
        <div className='Main--carousel'>
            <Carousel>
                {images.map((item, index) => {
                    return (
                        <div key={index}>
                            <Image
                                src={item.url}
                                alt={`Slide ${index + 1}`}
                                width={800} // Replace with actual width
                                height={600} // Replace with actual height
                                priority={index === 0} // Prioritize first image
                            />
                        </div>
                    );
                })}
            </Carousel>
        </div>
    )
}

{/* <section id="slider">
            <input className='radio_pastConf' value="1" type="radio" name="slider" id="s1" defaultChecked={checked === "1"} onClick={() => handleClick("1")} />
            <input className='radio_pastConf' value="2" type="radio" name="slider" id="s2" defaultChecked={checked === "2"} onClick={() => handleClick("2")} />
            <input className='radio_pastConf' value="3" type="radio" name="slider" id="s3" defaultChecked={checked === "3"} onClick={() => handleClick("3")} />
            <input className='radio_pastConf' value="4" type="radio" name="slider" id="s4" defaultChecked={checked === "4"} onClick={() => handleClick("4")} />
            <input className='radio_pastConf' value="5" type="radio" name="slider" id="s5" defaultChecked={checked === "5"} onClick={() => handleClick("5")} />

            <label for="s1" id="slide1"><img src={ted1.src} alt="" /></label>
            <label for="s2" id="slide2"><img src={ted2.src} alt="" /></label>
            <label for="s3" id="slide3"><img src={ted3.src} alt="" /></label>
            <label for="s4" id="slide4"><img src={ted4.src} alt="" /></label>
            <label for="s5" id="slide5"><img src={ted5.src} alt="" /></label>
        </section> */}

export default PastConfSlider;