/**
 * Kiểu trả về chung của api
 */

export type PaginateT = {
  count: number;
  filter: {
    [key: string]: string;
  };
};

export type ApiResponseT<T> = {
  message?: string;
  data: T;
};

export type ApiGetAllResponseT<T> = ApiResponseT<T> & PaginateT;

/**
 * Kiểu trả về trong response.data
 */
export type ApiSupplierT = {
  id: number;
  address: string;
  email: string;
  name: string;
  note: string;
  phone: string;
  createdAt: string;
  created_by: string | null;
  updatedAt: string;
  updated_by: string | null;
};

export type ApiImportProductT = {
  id: number;
  supplier_id: number;
  product_id: number;
  subproduct_id: number;
  quantity: number;
  total_cost: number;
  status: string;
  note: string;
  created_by: string;
  updated_by: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiPriceQuotationT = {
  id?: number;
  import_id?: number;
  supplier_id?: number;
  product_id?: number;
  subproduct_id?: number;
  unit_price?: number;
  note?: string;
  created_by?: string;
  updated_by?: string;
  createdAt?: string;
  updatedAt?: string;
};
