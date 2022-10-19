import { stringify } from "querystring";
import React from "react";
 const baseUrl = 'http://localhost:8080/api/'
export var token = localStorage.getItem('token')

 const getRequest = (body: object|Array<any>, method: string, token: string | null | undefined) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if(token)   myHeaders.append("Authorization",`Bearer ${token}`)

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: method,
    headers: myHeaders,
    body: raw
  };
  if (method.toUpperCase() === 'GET') {
    const { body, ...request } = { ...requestOptions }
    return request;
  }

  return requestOptions

}

const addProduct = (data: any) => {
  return fetch(baseUrl + "products", getRequest(data, 'post', token))
}

const getProducts = (data: any) => {
  return fetch(baseUrl+"products/filter", getRequest(data, 'post', token))
}

const countProductByFilter=(data:any)=>{

  return fetch(baseUrl+"products/count",getRequest(data, 'POST', token))
}
  const getProductById=(id:number)=>{

    return fetch(baseUrl+"products/"+id,getRequest({}, 'GET', token))
  
  
}
const deleteProductById=(id:number)=>{

  return fetch(baseUrl+"products/"+id,getRequest({}, 'Delete', token))


}
const deleteProductsById=(listId:Array<React.Key>)=>{
  return fetch(baseUrl+"products",getRequest(listId, 'Delete', token))


}
const deleteVariantById=(id:number)=>{

  return fetch(baseUrl+"products/variants/"+id,getRequest({}, 'Delete', token))


}
const deleteVariantsById=(listId:Array<React.Key>)=>{
  return fetch(baseUrl+"products/variants",getRequest(listId, 'Delete', token))


}
export const updateProduct=(productInfo:any)=>{
  return fetch(baseUrl+"products",getRequest(productInfo,'Put',token))
}



export { addProduct, getProducts,countProductByFilter ,getProductById ,deleteProductById,deleteVariantsById,deleteProductsById,getRequest,baseUrl}  