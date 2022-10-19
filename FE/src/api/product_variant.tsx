import axios from "axios";

export const getProducts = async () => {
  return (await axios.get(`http://localhost:8080/api/product-variants/search`))
    .data;
};
export const findProductById = async (id: number) => {
  return (await axios.get(`http://localhost:8080/api/product-variants/${id}`))
    .data;
};
