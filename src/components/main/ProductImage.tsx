const ProductImage = ({ img }: { img: string }) => {
  return (
    <div>
      <img
        className="border border-gray-400 rounded bg-card-theme"
        src={img}
        alt="product image"
        width="600px"
        height="600px"
      />
    </div>
  );
};

export default ProductImage;
