const ProductCard = ({ title, images, category, price }) => {
  return (
    <div>
      <li className="border border-gray-500 cursor-pointer">
        <img src={images[0]} alt="image" height="200px" width="200px" />
        <p className=" text-center">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>
        <p className=" text-center">Starting from ${price}</p>
      </li>
    </div>
  );
};

export default ProductCard;
