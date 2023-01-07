import React from "react";
import {
  getImportProductItem,
  getPriceQuotationListOfImportRequest,
  getSubProductList,
} from "../api";
import { useQuery } from "@tanstack/react-query";
import { transformFindAndAddAttrFromSubProductList } from "../api/transform";

/**
 * Gọi api để lấy các thông tin cần thiết
 * về chi tiết của yêu cầu nhập hàng và danh sách báo giá
 */
const useApiPQListOfImpReq = (importId: number) => {
  // Láy danh sách sản phẩm
  const { data: productList } = useQuery(
    ["sub-product-list"],
    getSubProductList
  );

  // Lấy 1 yêu cầu nhập hàng với importId
  const { data: importRequest, isSuccess: isImpFetchSuccess } = useQuery(
    ["import-request-item", importId],
    React.useCallback(() => getImportProductItem(importId), [importId]),
    {
      select: (data) =>
        transformFindAndAddAttrFromSubProductList(data, productList || []),
    }
  );

  // Lấy danh sách báo giá của yêu cầu nhập hàng có importId
  const { data: priceQuotationList, isLoading: isPriceQuotaionListLoading } =
    useQuery(
      ["price-quotation-list", importId],
      () => {
        return getPriceQuotationListOfImportRequest(importId);
      },
      {
        select: (data) => {
          return data.map((item) => {
            return {
              ...item,
              key: item.id,
              // product: ,
              // FIXME: Hard code
              supplier: (item as any)?.SupplierModel?.name as string,
              selectedId: (item as any)?.ImportProductModel
                .price_quotation_id as number,
            };
          });
        },
      }
    );

  return {
    productList,
    importRequest,
    priceQuotationList,
    isImpFetchSuccess,
    isPriceQuotaionListLoading,
  };
};

export default useApiPQListOfImpReq;
