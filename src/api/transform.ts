/**
 * Transform response data
 */

import { SubProductIdentifierT, SubProductInfoT } from "./mockApi";

export const transformJoinSubProductList = <T extends SubProductIdentifierT>(
  data: T[],
  subproductList: SubProductInfoT[]
): (T & Partial<SubProductInfoT>)[] => {
  return data.map((item) => {
    const subProdI = subproductList?.find(
      (v) =>
        v.subproduct_id === item.subproduct_id &&
        v.product_id === item.product_id
    );
    return {
      ...item,
      ...subProdI,
    };
  });
};
