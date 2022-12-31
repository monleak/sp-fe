import axios from "axios";
import { BASE_URL } from "./constants";
import { ApiImportProductT, ApiSupplierT } from "./types";

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

// API CALL - STEP 1: định nghia queryFn: hàm gọi api và trả về dữ liệu
export const getSupplierList = async (): Promise<ApiSupplierT[]> => {
  // gọi api bằng axios, và trả về nội dung nếu có
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

/**
 * Create new price quotation
 */
// export const createPriceQuotation

/**
 * get one import record
 */
export const getImportProductItem = async (
  id: number | string
): Promise<ApiImportProductT> => {
  const { data } = await axios.get(`${BASE_URL}/import/${id}`);
  return data?.data;
};

/**
 * get price quotation list of import request
 */
export const getPriceQuotationListOfImportRequest = async (
  importRequestId: string | number
) => {
  const { data } = await axios.get(
    `${BASE_URL}/price-quotation?import_id=${importRequestId}`
  );
  return data?.data;
};
