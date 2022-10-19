import React from 'react';
import {ColumnProps} from "antd/es/table";
import {default as NumberFormat} from "react-number-format";
export interface ISupplier {
    key: React.Key;
    id:number,
    code: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    isDelete: boolean;
    accountId: string;
    updateAt: string;
    createdAt: string;
    statusTransaction: boolean;
}
export type TypeSupplier = {
    id: number,
    code: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    accountId: number;
}
export interface IProductVariant{
    id: number,
    code: string;
    name: string;
    quantity: number,
    importPrice: string
}
export interface IImportInvoice{
    code:string,
    supplierName:string,
    inventoryName:string,
    totalPrice:string,
    isDone:boolean,
    isPaid:boolean,
    isImport:boolean,
    isReturn:boolean,
    userName:string
}
export interface IDetailImportInvoice{
    anImport:{
        id:number,
        totalPrice: number,
        note:string,
        code:string,
        isDone:boolean,
        isPaid:boolean,
        isImport:boolean,
        isReturn:boolean,
        inventoryId:number
        deliveryDate:string,
        detailsImports:[{
            idDetailsImport:number,
            productVariant:{
                code:string,
                name:string,
                image:string,
                importPrice:number
            },
            quantity:number,
            totalPriceDetailImport:number
        }],
    }
    supplier:{
        code:string,
        name:string,
        email:string,
        address:string,
        statusTransaction:boolean
    },
    inventoryName:string
}

export interface IMyTableData {
    id: number
    code: string
    name: string;
    quantity: number;
    importPrice: number;
    totalPrice: number
}

export interface IImportReturnMyTableData {
    detailsImportId: number
    code: string
    name: string;
    inputQuantity:number
    quantity: number;
    importPrice: number;
    totalPrice: number
}

export interface IImportReturn {
    id:number,
    createDate:string,
    importId:number,
    detailsReturnImportResponseList:[
        {
            detailsImportId: number
            code: string
            name: string;
            inputQuantity:number
            quantity: number;
            importPrice: number;
            totalPrice: number;

        }
    ],
    totalPrice:number,
    fullName:string,
    phoneNumber:string
}

export interface IInventories {
    id: number,
    code: string,
    name: string,
    address: string,
    size:boolean
}
export interface IHistoryStatus {
    accountName: string,
    fullName:string,
    phoneNumber:string
    statusName: string,
    statusDesc: string,
    createdAt: string
}
export interface IImportInvoiceBySupplier{
    code:string,
    inventoryName:string,
    totalPrice:string,
    isDone:boolean,
    isPaid:boolean,
    isImport:boolean,
    isReturn:boolean,
    last:string,
    first:string
}