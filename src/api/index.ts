import axios from "axios";

export const BASE_URL = "https://sp-17-production.fly.dev/api/v1";

/**
 * Kiểu trả về chung
 */

type PaginateT = {
  count: number;
  filter: {
    [key: string]: string;
  };
};

type ApiResponseT<T> = {
  message?: string;
  data: T;
};

type ApiGetAllResponseT<T> = ApiResponseT<T> & PaginateT;

/**
 * Kiểu trả về trong response.data
 */
type ApiSupplierT = {
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

type ApiImportProductT = {
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

/**
 * Call api and get data.data
 */
const apiGetDataField = async (url: string) => {
  const { data, status } = await axios.get(url);
  if (status >= 400) {
    throw Error(data);
  }
  return data?.data;
};

export const getSupplierList = async (): Promise<ApiSupplierT[]> => {
  return await apiGetDataField(`${BASE_URL}/supplier`);
};

/**
 * Quy trình nhập hàng:
 * 1. Form tạo yêu cầu nhập hàng: Lưu vào bảng import với status=REQUEST
 * 2. Danh sách ycnh: Chọn ACCEPT hoạch REJECT -> gán vào status
 * 3. Form tạo báo giá (create price quotation): Với các ycnh đã ACCEPT, có thể thêm các báo giá của supplier khác nhau.
 * 4. Danh sách báo giá: Chọn báo giá phù hợp cho ycnh status=WAIT
 * 5. Danh sách ycnh status=WAIT: Nếu nhập thành công: status=SUCCESS, thất bại: status=FAILED
 */
export const getImportList = async (): Promise<ApiImportProductT[]> => {
  return await apiGetDataField(`${BASE_URL}/import`);
};

/**
 * Lấy danh sách đơn nhập hàng đang ở trạng thái ACCEPT
 * - lấy để thêm báo giá
 */
export const getImportRequestList = async (): Promise<ApiImportProductT[]> => {
  return await apiGetDataField(`${BASE_URL}/import?status=REQUEST`);
};
