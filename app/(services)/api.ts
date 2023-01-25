import axios from "axios";
import { Products, ProductsDetail } from "../(types)/types.d";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getAllProduct = async (skip: number, limit: number) => {
  try {
    const res = await api.get("/products", {
      params: {
        limit: limit,
        skip: skip,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const getAllProductBySearch = async (
  search: string,
  skip: number,
  limit: number
) => {
  try {
    console.log(search);

    const res = await api.get("/products/search", {
      params: {
        q: search,
        skip: skip,
        limit: limit,
      },
    });

    return res;
  } catch (err) {
    throw err;
  }
};

export const getProductById = async (id_product: number) => {
  try {
    const res = await api.get(`/products/${id_product}`, {});

    return res;
  } catch (err) {
    throw err;
  }
};

export const getAllUser = async (skip: number, limit: number) => {
  try {
    const res = await api.get("/users", {
      params: {
        limit: limit,
        skip: skip,
      },
    });

    return res;
  } catch (err) {
    throw err;
  }
};

export const getAllUserBySearch = async (
  search: string,
  skip: number,
  limit: number
) => {
  try {
    console.log(search);

    const res = await api.get("/users/search", {
      params: {
        q: search,
        limit: limit,
        skip: skip,
      },
    });

    return res;
  } catch (err) {
    throw err;
  }
};

export const getDetailCartByUser = async (id_user: string) => {
  try {
    console.log(id_user);

    const res = await api.get(`/users/${id_user}/carts`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getDetailUser = async (id_user: string) => {
  try {
    console.log(id_user);

    const res = await api.get(`/users/${id_user}`);

    return res;
  } catch (err) {
    throw err;
  }
};
