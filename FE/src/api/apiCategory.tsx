import axios from "axios";

const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};

export const getCategoriesByPage = async (page: number, limit: number) => {
  return (
    await axios.get(`http://localhost:8080/categories`, {
      params: {
        page,
        limit,
        sortBy: "id",
        sortDir: "desc"
      }, headers
    })
  ).data;
}

export const getCategories = async (valueInput = "") => {
  return await axios.get(`http://localhost:8080/api/categories/findall`, {
    params: {
      valueInput: valueInput,
    }, headers
  })
}

export const createCategory = async (category: object) => {
  return axios.post(`http://localhost:8080/api/categories/category`, category,{headers});
};

export const deleteListCategory = async (listId: React.Key[]) => {
  return axios.post("http://localhost:8080/api/categories/delete", listId,{headers});
};

export const updateCategory = async (category: object, idUpdate: number) => {
  return axios.put(
    `http://localhost:8080/api/categories/category/${idUpdate}`,
    category, {headers }
  );
};

export const deleteCategory = async (id: number) => {
  return axios.delete(`http://localhost:8080/api/categories/delete/${id}`,{headers});
};
