"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAllProduct, getAllProductBySearch } from "../(services)/api";
import { Products } from "../(types)/types.d";

function Products() {
  const [productsList, setProductsList] = useState<Products[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataLength, setDataLength] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState("");
  const pageNumbers = [];

  // Get current data
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  // const currentData = productsList.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  for (let i = 1; i <= Math.ceil(dataLength / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const data_params = params.get("search");
    console.log(data_params, "data-params");

    if (data_params) {
      console.log("masuk sini");

      setSearchInput(data_params);
      getListProductSearch(data_params);
    } else {
      getListProduct();
    }
  }, [currentPage]);

  async function getListProduct() {
    const data = await getAllProduct(indexOfFirstData, dataPerPage);
    console.log(data, "anwodonw");

    setProductsList(data.data.products);
    setDataLength(data.data.total);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set("search", searchInput);
      router.replace(`${pathname}?${params}`);
    } else {
      params.delete("search");
      router.replace(`${pathname}?${params}`);
    }

    getListProductSearch(searchInput);
  }

  async function getListProductSearch(search: string) {
    const data_search = await getAllProductBySearch(
      search,
      indexOfFirstData,
      dataPerPage
    );
    console.log(data_search, "anwodonw");

    setProductsList(data_search.data.products);
    setDataLength(data_search.data.total);
  }

  return (
    <div className="overflow-x-auto">
      <form onSubmit={handleSubmit} className="mb-3 text-right">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border border-[#1E1E1E]"
        />
        <button
          type="submit"
          className="bg-[#1E1E1E] rounded-r-md text-white px-3 py-[2px]"
        >
          <span>Search</span>
        </button>
      </form>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Brand</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">category</th>
          </tr>
        </thead>
        <tbody>
          {productsList &&
            productsList.map((item) => (
              <tr key={item.id} className="text-gray-700">
                <td className="border px-4 py-2">{item.title}</td>
                <td className="border px-4 py-2">{item.brand}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.stock}</td>
                <td className="border px-4 py-2">{item.category}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="text-right mt-5">
        <div className="inline-block">
          <button
            className="bg-gray-300 px-2 py-1 mx-1 rounded-lg hover:bg-gray-400"
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-2 py-1">
            Page {currentPage}/{Math.ceil(dataLength / dataPerPage)}
          </span>
          <button
            className="bg-gray-300 px-2 py-1 mx-1 rounded-lg hover:bg-gray-400"
            onClick={() =>
              currentPage < Math.ceil(dataLength / dataPerPage) &&
              paginate(currentPage + 1)
            }
            disabled={currentPage === Math.ceil(dataLength / dataPerPage)}
          >
            Next
          </button>
        </div>
      </div>
      {/* <div className="text-center">
        <div className="inline-block">
          <nav>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    number === currentPage
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <a onClick={() => paginate(number)} className="px-3 py-2">
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div> */}
    </div>
  );
}

export default Products;
