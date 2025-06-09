import React from "react";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition cursor-pointer"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-xl" />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-primary text-md font-bold">{price}</p>
    </div>
  );
};
