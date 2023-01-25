"use client";
import React, { useEffect, useState } from "react";
import {
  getDetailCartByUser,
  getDetailUser,
  getProductById,
} from "../../(services)/api";
import { Products, UserDetail } from "../../(types)/types.d";

type PageProps = {
  params: {
    index: string;
  };
};
function CartsDetail({ params: { index } }: PageProps) {
  const [cartDetailList, setCartDetailList] = useState<any[]>();
  const [userCart, setUserCart] = useState<UserDetail>();
  const [isBuy, setIsBuy] = useState(true);

  useEffect(() => {
    GetDetailCart();
  }, []);

  async function GetDetailCart() {
    const data_detail = await getDetailCartByUser(index);
    const data_user = await getDetailUser(index);

    console.log(data_detail, "data detail");
    console.log(data_user, "data user");
    const temp_user = {
      name: data_user.data.firstName + " " + data_user.data.lastName,
      phone: data_user.data.phone,
      total_item:
        data_detail.data.carts.length > 0
          ? data_detail.data.carts[0].totalProducts
          : 0,
      total_amount:
        data_detail.data.carts.length > 0
          ? data_detail.data.carts[0].totalQuantity
          : 0,
    };

    setUserCart(temp_user);

    if (data_detail.data.carts.length > 0) {
      const temp_cart = data_detail.data.carts[0]?.products;

      Promise.all(
        temp_cart?.map(async (data: any) => {
          const detail_product = await getProductById(data.id);

          // console.log(detail_product);
          const temp_data = {
            brand: detail_product.data.brand,
            title: detail_product.data.title,
            price: detail_product.data.price,
            stock: detail_product.data.stock,
            category: detail_product.data.category,
            amount: data.quantity,
          };

          console.log(temp_data);

          return temp_data;
        })
      ).then((res: any) => {
        console.log(res, "check res");

        setCartDetailList(res);
      });
    } else {
      setIsBuy(false);
    }
  }
  console.log(cartDetailList);

  return (
    <div>
      <p className="text-xl font-bold">Card Detail {index}</p>
      <div className="mt-10">
        <p className="text-lg font-medium">Detail</p>
        <div className="w-full border border-[#1e1e1e] px-5 py-5 mb-10">
          <div className="flex justify-between mb-3 max-[426px]:block">
            <p className="max-[426px]:mb-3">User: {userCart?.name}</p>
            <p># of Items: {userCart?.total_item}</p>
          </div>
          <div className="flex justify-between max-[426px]:block">
            <p className="max-[426px]:mb-3">Phone: {userCart?.phone}</p>
            <p>Total Amount: {userCart?.total_amount}</p>
          </div>
        </div>
        <p className="text-lg font-medium">Product</p>
        {isBuy ? (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">category</th>
              </tr>
            </thead>
            <tbody>
              {cartDetailList &&
                cartDetailList.map((item, idx) => (
                  <tr key={idx} className="text-gray-700">
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2">{item.brand}</td>
                    <td className="border px-4 py-2">{item.price}</td>
                    <td className="border px-4 py-2">{item.stock}</td>
                    <td className="border px-4 py-2">{item.amount}</td>
                    <td className="border px-4 py-2">{item.category}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="center w-full">
            <p>Data Not Found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartsDetail;
