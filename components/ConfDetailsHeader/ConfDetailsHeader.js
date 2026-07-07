import ConfDetailsSlider from '../ConfDetailsSlider/ConfDetailsSlider';
import './ConfDetailsHeader.scss'
import Link from "next/link";
import React, { useState } from 'react';

function ConfHeader({title,year,desc, images, url}) {
    const [text, setText] = useState('Watch AfterMovie');

    const handleAftermovieClick = (e) => {
        if (url === '#') {
            e.preventDefault();
            setText('Coming soon...');
            setTimeout(() => {
                setText('Watch AfterMovie');
            }, 2000);
        }
    };

    return (
        <div className='ConfHeader'>
            <div className='ConfHeader__heading'>
                <p><span>{title}</span><br /> {year}</p>
            </div>
            <div className='ConfHeader__details'>
                <div className='ConfHeader__details--slider'>
                    <ConfDetailsSlider images={images} />
                </div>
                {/* <img className='ConfHeader__details--divider' src='/Images/divider.svg' /> */}
                <div className='ConfHeader__details--content'>
                    <p className='ConfHeader__details--content__title'>{title}</p>
                    <p className='ConfHeader__details--content__desc'>
                        {desc}
                    </p>
                    {url && (
                        <p className='ConfHeader__details--content__aftermovie'>
                            <Link style={{ color: "white" }} href={`${url}`} onClick={handleAftermovieClick}>
                                {text}
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ConfHeader;