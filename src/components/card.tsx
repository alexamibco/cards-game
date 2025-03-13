import { useState } from "react";

interface CardProps {
  image: string;
}

export const Card: React.FC<CardProps> = ({ image }) => {
  const [flipped, setFlipped] = useState(false);
  const [moved, setMoved] = useState(false);
  const handleClick = () => {
    setFlipped(!flipped);
    setMoved(true);
  };

  return (
    <div
      className={`relative ml-[25vw] w-70 h-98 bg-white border-2 rounded-lg transition-all duration-500 ${
        moved ? "ml-[calc(100vw-45vw)]" : ""
      }`}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div
          className={`absolute w-full h-full bg-white rounded-lg backface-hidden ${
            flipped ? "hidden" : ""
          }`}
        >
          <img
            src="https://res.cloudinary.com/dutgqbk6b/image/upload/v1741903201/9_spcm0q.png"
            alt="card back"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div
          className={`absolute w-full h-full bg-gray-300 rounded-lg backface-hidden ${
            !flipped ? "hidden" : ""
          }`}
        >
          <img
            src={image}
            alt="card front"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
