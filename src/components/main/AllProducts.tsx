import { useNavigate } from "react-router-dom";
import { ProductListingCard } from "../../hoc/HOCcards";
import { useProdductData } from "../../hook/useProdductData";
import type { Product } from "../../types/interfaces";
import { URL } from "../../utils/utils";
import Layout from "../layout/Layout";
import { useState } from "react";

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(10);
  const navigate = useNavigate();

  const itemsPerPage: number = 10;
  const totalPages: number = 19;

  const url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;

  const { productData } = useProdductData(url);

  const container = document.querySelector(".overflow-auto.h-screen");
  const clickHandler = (title: string, category: string) => {
    navigate(`/products/${category}/${title}`);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSkip(page * 10);

    container?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loader = () => {
    let timeoutId;

    timeoutId = setTimeout(() => {
      setSkip((prev) => prev + 10);
      console.log("skip", skip);
      container?.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  };

  const handleScroll = (event: any) => {
    console.log("getting scrolled");

    const scrollHeight = event.target.scrollHeight;
    const innerHeight = event.target.clientHeight;
    const scrollTop = event.target.scrollTop;

    if (scrollTop + innerHeight + 1 >= scrollHeight) {
      console.log(" hi hi");
      loader();
    }
  };

  return (
    <div onScroll={handleScroll} className=" overflow-auto  h-screen">
      <Layout url={URL}>
        <div>
          <ol className="grid grid-cols-1 sm: mx-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5  ">
            {productData?.length === 0
              ? `No products found `
              : productData?.map(
                  ({
                    title,
                    images,
                    category,
                    price,
                    id,
                    brand,
                    rating,
                    thumbnail,
                    discountPercentage,
                  }: Product) => (
                    <li key={id} onClick={() => clickHandler(title, category)}>
                      <ProductListingCard
                        title={title}
                        images={images}
                        category={category}
                        price={price}
                        brand={brand}
                        rating={rating}
                        thumbnail={thumbnail}
                        discountPercentage={discountPercentage}
                      />
                    </li>
                  )
                )}
          </ol>
        </div>

        {/* <div className=" border border-white">
          <div className="flex justify-center items-center space-x-2 my-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>

            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>

            <span className="ml-4 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div> */}
      </Layout>
    </div>
  );
};

export default AllProducts;
