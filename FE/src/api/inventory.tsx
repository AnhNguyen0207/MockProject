import axios from "axios";
import { IMinQuantityRequest, IResultId } from "../interface";
const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};

export const getAllInventory = async () => {
  return (await axios.get(`http://localhost:8080/inventories`, { headers }))
    .data;
};

export const getAllActiveInventory = async () => {
  return await axios.get(`http://localhost:8080/inventories/active`, {
    headers,
  });
};

export const getPagination = async (
  page: number,
  pageSize: number,
  name: any,
  value: any
) => {
  return (
    await axios.get(`http://localhost:8080/inventories/pagination`, {
      params: {
        pageNumber: page,
        pageSize,
        sortBy: "id",
        sortDir: "desc",
        name: name === "name" ? value : null,
        code: name === "code" ? value : null,
      },
      headers,
    })
  ).data;
};
export const findInventoryById = async (id?: number) => {
  return (
    await axios.get(`http://localhost:8080/inventories/${id}`, { headers })
  ).data;
};

export const createInventory = async (inventory: object) => {
  return (
    await axios.post(`http://localhost:8080/inventories`, inventory, {
      headers,
    })
  ).data;
};

export const updateInvetory = async (inventory: object, id: number) => {
  return (
    await axios.put(`http://localhost:8080/inventories/${id}`, inventory, {
      headers,
    })
  ).data;
};

export const deleteInvetory = async (id: number) => {
  return await axios.put(
    `http://localhost:8080/inventories/delete/${id}`,
    { title: "Sửa trạng thái" },
    {
      headers,
    }
  );
};

export const updateStatusInventory = async (id: number) => {
  return await axios.put(
    `http://localhost:8080/inventories/status/${id}`,
    { title: "Sửa tình trạng" },
    {
      headers,
    }
  );
};

export const getProductVariants = async (id?: number, name = "") => {
  return (
    await axios.get(`http://localhost:8080/inventories/productvariant/${id}`, {
      params: {
        name: name,
      },
      headers,
    })
  ).data;
};

export const deleteListProductVariant = async (resultId: IResultId) => {
  return await axios.post(
    `http://localhost:8080/inventories/delete`,
    resultId,
    { headers }
  );
};

export const findInventoryByQuantity = async (id?: number) => {
    return (
        await axios.get(`http://localhost:8080/inventories/quantity`, {
            params:{
                id:id
            },
            headers })
    );
};

export const updateMinQuantityStorage = async (
  request: IMinQuantityRequest
) => {
  return await axios.put(
    `http://localhost:8080/inventories/change/minquantity?inventoryId=${request.inventoryId * 1
    }&productVariantId=${request.productVariantId * 1}&minQuantity=${request.minQuantity * 1
    }`,{ title: "Sửa minquantity" },
    { headers }
  );
};
