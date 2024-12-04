'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const Carousel = ({ carouselItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCurrentIndex((prevState) => {
        return prevState === carouselItems.length - 1 ? 0 : prevState + 1;
      });
    }, 3000);
  }, []);

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handleClickBack = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1;
    });
  };
  return (
    <div className='flex justify-center flex-col'>
      <div className='h-[500px] w-[500px] mx-auto'>
        <Image
          key={carouselItems[currentIndex].src}
          height={500}
          width={500}
          src={carouselItems[currentIndex].src}
          alt={carouselItems[currentIndex].src}
        />
      </div>

      <div className='flex justify-around items-center'>
        <Button onClick={handleClickBack}>Prev</Button>
        <Button onClick={handleClickNext}>Next</Button>
      </div>
    </div>
  );
};

export default Carousel;
