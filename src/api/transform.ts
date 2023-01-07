/**
 * Transform response data
 */
import { SubProductIdentifierT, SubProductInfoT } from "./mockApi";

export const prodCmpKeys: (keyof SubProductIdentifierT)[] = [
  "product_id",
  "subproduct_id",
];

/**
 * transformJoinSubProductList
 * Vì api sản phẩm lấy từ bên ngoài nên phải tự join tren client
 * @param data Mảng dữ liệu có chưa product_id và subproduct_id
 * @param subproductList Mảng các sản phẩm có chứa product_id và subproduct_id
 * @returns Join 2 mảng trên
 */
export const transformJoinSubProductList = <T extends SubProductIdentifierT>(
  data: T[],
  subproductList: SubProductInfoT[]
): (T & Partial<SubProductInfoT>)[] => {
  return data.map((item) => {
    return transformFindAndAddAttrFromSubProductList(item, subproductList);
    // const subProdI = subproductList?.find(
    //   (v) =>
    //     v.subproduct_id === item.subproduct_id &&
    //     v.product_id === item.product_id
    // );
    // return {
    //   ...item,
    //   ...subProdI,
    // };
  });
};

export const transformFindAndAddAttrFromSubProductList = <
  T extends SubProductIdentifierT
>(
  destItem: T,
  subproductList: SubProductInfoT[]
) => {
  return transformFindAndAddAttrFromArr(destItem, subproductList, prodCmpKeys);
};

/**
 * Search and add attr of 1 item of src to destItem
 * @param destItem
 * @param src
 * @param cmpAttrs
 * @returns
 */
export const transformFindAndAddAttrFromArr = <
  C extends {},
  D extends C,
  S extends C
>(
  destItem: D,
  src: S[],
  cmpAttrs: (keyof C)[]
): D & Partial<S> => {
  const srcItem = src.find((item) => {
    return cmpAttrs.reduce(
      (ret, i) => ret && (destItem as C)[i] === item[i],
      true
    );
  });

  return {
    ...destItem,
    ...srcItem,
  };
};
