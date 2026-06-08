import { useEffect, useState } from 'react';
import Image from 'next/image';
import './AboutUs.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function AboutUs() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array as we only want to set up the listener once
  const images = [
    { url: "/Images/Assets/792A2473.JPG" },
    { url: "/Images/Assets/IMG_0743.JPG" },
    { url: "/Images/Assets/DSC_0128.jpg" },
    { url: "/Images/Assets/DSC_0210.jpg" },
    { url: "/Images/Assets/IMG_0930.JPG" },
    { url: "/Images/Assets/IMG_0879.JPG" },
    { url: "/Images/Assets/792A2544.JPG" },
  ];
  return (
    <div className='AboutUs'>
      <div className='AboutUs__heading'>
        ABOUT US
      </div>
      <div className='AboutUs__content'>
        <div className='AboutUs__content--text'>
          <p>
            Join us at TEDxShivNadarUniversity as we explore Mosaic — a celebration of the ideas, experiences, people, and moments that shape who we are.
          </p>
          <p>
            Like the pieces of a mosaic, the journeys that define us are built from countless experiences. Individually, these pieces may seem unrelated, but together they create something far greater than the sum of their parts.
          </p>
          <p>
            Through inspiring talks and meaningful conversations, we bring together thinkers, creators, innovators, and changemakers from diverse fields, each sharing a unique part of their story and the lessons they&apos;ve learned along the way.
          </p>
          <p>
            At TEDxShivNadarUniversity, we believe that Ideas Change Everything. Mosaic is an invitation to discover connections, celebrate individuality, and explore how different pieces can come together to create something meaningful. Because every piece has a place, and every story contributes to a larger picture.
          </p>
        </div>
        <div className='AboutUs__content--carousel'>
          <Carousel>
            {images.map((item, index) => (
              <div key={index}>
                <Image
                  src={item.url}
                  alt={`TEDx event image ${index + 1}`}
                  width={800}
                  height={600}
                  className="AboutUs__content--carousel__image"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default AboutUs;
