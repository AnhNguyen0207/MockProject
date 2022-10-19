export interface inventory {
  data: any;
  id?: number;
  code?: string;
  name?: string;
  address?: string;
  createAt?: string;
  updateAt?: null;
  isDelete?: boolean;
  size?:boolean;
}
// export interface receiveInventory {
//   id?: number;
//   code?: string;
//   name?: string;
//   address?: string;
//   createAt?: string;
//   updateAt?: null;
//   isDelete?: boolean;
// }
export interface exportValue {
  exportInventory?: inventory;
  receiveInventory?: inventory;
}
export interface DataType {
  getProductById?: any;
  id?: number;
  code?: string;
  name?: string;
  product?: {};
  stock?: number;
  quantity?: number;
}
export interface exportById {
  id?: number;
  receiveInventory?: inventory;
  status?: number;
  transportCompany?: number;
  account?: number;
  createAt?: string;
  updateAt?: string;
  exportInventory?: inventory;
}
export interface typeDetailExport {
  id?: number;
  export?: number;
  productVariant?: productVariants;
  quantity?: number;
  code?: string;
}

export interface productVariants {
  id?: number;
  code?: string;
  productId?: number;
  name?: string;
  image?: string;
  wholesalePrice?: number;
  salePrice?: number;
  importPric?: number;
  quantity?: number;
}
export interface exportStatus {
  id?: number;
  code?: string;
  export?: number;
  status?: number;
  accountCreate?: number;
  accountSend?: number;
  accountReceive?: number;
  accountCancel?: number;
  createAt?: string;
  dateSend?: string;
  dateReceive?: string;
  dateCancel?: string;
  dateUpdate?: string;
  statusCancel?: boolean;
  note?: string;
}
export interface listExport {
  id?: number;
  receiveInventory?: inventory;
  exportInventory?: inventory;
  detailsExports?: typeDetailExport[];
  exportsStatuses?: exportStatus[];
}
export interface paramExport {
  page?: number;
  perPage?: number;
  sort?: string;
  sortBy?: string;
  exportInventory?: number;
  receiveInventory?: number;
  code?: string;
  status?: number;
  cancel?: boolean;
}
