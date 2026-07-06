
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [autoplayTime, setAutoplayTime] = useState<number>(0);

  const onAutoplayTimeLeft = (s: any, time: any) => {
    setAutoplayTime(Math.ceil(time / 1000));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoplayTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const slidesData = [
    {
      backgroundImage: "https://i.ibb.co/Y29WPDw/Sajek-Valley-20161205.jpg",
      title: "Your Gateway to Extraordinary Travel",
      description:
        "Welcome to Your Gateway to Extraordinary Travel, where every journey is a carefully curated experience crafted just for you. Embark on a seamless adventure as our expert tour guides lead you through captivating destinations, unveiling hidden gems and cultural treasures.",
      buttonText: "Continue Reading",
    },
    {
      backgroundImage:
        "https://i.ibb.co/Zm6FDLD/top-ten-tourist-places-to-visit-in-bangladesh-1.webp",
      title: "Your Gateway to Extraordinary Travel",
      description:
        "Welcome to Your Gateway to Extraordinary Travel, where every journey is a carefully curated experience crafted just for you. Embark on a seamless adventure as our expert tour guides lead you through captivating destinations, unveiling hidden gems and cultural treasures.",
      buttonText: "Continue Reading",
    },
    {
      backgroundImage: "https://i.ibb.co/Sn33hpM/Kuakata-beach.jpg",
      title: "Your Gateway to Extraordinary Travel",
      description:
        "Welcome to Your Gateway to Extraordinary Travel, where every journey is a carefully curated experience crafted just for you. Embark on a seamless adventure as our expert tour guides lead you through captivating destinations, unveiling hidden gems and cultural treasures.",
      buttonText: "Continue Reading",
    },
  ];
  return (
    <div className="relative">
      Hero Section
    </div>
  );
};
