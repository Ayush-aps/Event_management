import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index_r.css";

const Card = ({ name, description, image, link }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

 // Animation animate-fadeInUp on scroll . Also IntersectionObserver API is used to trigger the animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.2 && !cardRef.current?.classList.contains("animate-fadeInUp")) {
          cardRef.current?.classList.add("animate-fadeInUp");
        } else if (entry.intersectionRatio === 0) {
          cardRef.current?.classList.remove("animate-fadeInUp");
        }
      });
    }, {
      threshold: [0, 0.2, 1],
    });
  
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div className="relative" ref={cardRef}>
      <div
        className="relative h-60 p-6 sm:h-96 mx-16 my-12 rounded-3xl bg-purple-900 shadow-lg group cursor-pointer 
                   transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
        onClick={handleClick}
      >
        <div
          className="absolute inset-0 bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl
                     group-hover:bg-opacity-30 transition duration-300 flex flex-col justify-end"
        >
          <div className="relative z-10 text-center p-4">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-300 mt-2">{description}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Card;