export interface IRole {
  key?: React.Key;
  id: number;
  name: string;
  description: string;
}

export interface IRoleLable {
  coordinator?: string;
  stocker?: string;
  admin?: string;
  warehouse?: string;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IInventory {
  STT?: any;
  key?: number | string;
  id?: number;
  code: string;
  name: string;
  address: string;
  createAt?: any;
  updateAt?: any;
  isDelete?: boolean;
  size?: boolean;
}

export interface IInventoryDto {
  key?: number | string;
  id?: number;
  code: string;
  name: string;
  address: string;
  size: number;
  createAt?: any;
  updateAt?: any;
  isDelete?: boolean;
}

export interface IProductVariantDto {
  id: number;
  code: string;
  productId?: number;
  name: string;
  image: string;
  importPrice: number;
  quantity: number;
  salePrice?: number;
  wholesalePrice?: number;
  createAt: string;
}

export interface IResultId {
  idInventory: any;
  idProductVariant: any;
}

export interface IMinQuantityRequest {
  inventoryId: number;
  productVariantId: number;
  minQuantity: number;
}
