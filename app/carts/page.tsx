"use client";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  getAllProduct,
  getAllProductBySearch,
  getAllUser,
  getAllUserBySearch,
} from "../(services)/api";
import { Products } from "../(types)/types.d";

function Carts() {
  const [usersList, setUsersList] = useState<any[]>();

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

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  for (let i = 1; i <= Math.ceil(dataLength / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const data_params = params.get("searchUser");
    console.log(data_params, "data-params");

    if (data_params) {
      console.log("masuk sini");

      setSearchInput(data_params);
      getListUserSearch(data_params);
    } else {
      getListUser();
    }
  }, [currentPage]);

  async function getListUser() {
    const data = await getAllUser(indexOfFirstData, dataPerPage);
    console.log(data, "anwodonw");

    setUsersList(data.data.users);
    setDataLength(data.data.total);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set("searchUser", searchInput);
      router.replace(`${pathname}?${params}`);
    } else {
      params.delete("searchUser");
      router.replace(`${pathname}?${params}`);
    }

    getListUserSearch(searchInput);
  }

  async function getListUserSearch(search: string) {
    const data_search = await getAllUserBySearch(
      search,
      indexOfFirstData,
      dataPerPage
    );
    console.log(data_search, "anwodonw");

    setUsersList(data_search.data.users);
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
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList &&
            usersList.map((user) => (
              <tr key={user.id} className="text-gray-700">
                <td className="border px-4 py-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">
                  {user.address.address}
                  {", "}
                  {user.address.city}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href={`/carts/${user.id}`}
                    className="bg-yellow-500 text-black px-3 py-2 rounded-lg"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </td>
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
    </div>
  );
}

export default Carts;
