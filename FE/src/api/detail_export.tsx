import axios from "axios";
import {
  productVariants,
  typeDetailExport,
} from "../components/type/data_type";

type value = {
  export: number;
  productVariant: productVariants;
  quantity: number;
  code: string;
};
const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};
export const creatDetailExport = async (item: value[]) => {
  return await axios.post(`http://localhost:8080/details/createAll`, item, {headers});
};
export const findDetailByExport = async (
  id?: number
): Promise<typeDetailExport[]> => {
  return (await axios.get(`http://localhost:8080/details/getByExport/${id}`, {headers}))
    .data;
};
export const getDetailExport = async () => {
  return (await axios.get(`http://localhost:8080/details`, {headers})).data;
};
export const deleteDetailExport = async (id?: number) => {
  return (await axios.delete(`http://localhost:8080/details/${id}`, {headers})).data;
};
export const deleteDetailByExport = async (id?: number) => {
  return (await axios.delete(`http://localhost:8080/details/getByExport/${id}`, {headers}))
    .data;
};
