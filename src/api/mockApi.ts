/**
 * Fake api data response
 */

/**
 * Response type api from group product SP_06
 *
 * Created: 29/12/2022
 * More info:
 *  https://docs.google.com/spreadsheets/d/1Z9Z5VmUcC39Azya5PNlgdXaokzKLlJepcmOL99qToHE/edit#gid=1384034171
 */

export type SubProductIdentifierT = {
  product_id: number;
  subproduct_id: number;
};

/**
 * SubProductT nằm trong ProductT
 */
export type SubProductT = {
  subproduct_id: number;
  color: string;
  size: string;
  image_url: string;
};

/**
 * Thông tin đầy đủ về cả subproduct và product
 */
export type SubProductInfoT = SubProductT & {
  product_id: number;
  name: string;
  category: string;
  price: number;
};

/**
 * Thông tin về Product
 */
export type ProductT = {
  product_id: number;
  name: string;
  description: string;
  subproduct: SubProductT[];
  category: string;
  price: number;
};

const fakeProductList: ProductT[] = [
  {
    product_id: 1,
    name: "Sơ mi",
    description: "No",
    subproduct: [
      {
        subproduct_id: 1,
        color: "Trắng",
        size: "L",
        image_url: "",
      },
      {
        subproduct_id: 2,
        color: "Trắng",
        size: "XL",
        image_url: "",
      },
      {
        subproduct_id: 3,
        color: "Đen",
        size: "L",
        image_url: "",
      },
    ],
    category: "sơ mi",
    price: 120000,
  },
];

// utils
const getSubProductListFromProductList = (
  productList: ProductT[]
): SubProductInfoT[] => {
  const subProductList: SubProductInfoT[] = [];
  productList.forEach((product) => {
    product.subproduct.forEach((subprod) => {
      subProductList.push({
        ...subprod,
        product_id: product.product_id,
        name: product.name,
        price: product.price,
        category: product.category,
      });
    });
  });
  return subProductList;
};

// Goi api
export const getProductList = async (): Promise<ProductT[]> => {
  return fakeProductList;
};

export const getSubProductList = async (): Promise<SubProductInfoT[]> => {
  return getSubProductListFromProductList(fakeProductList);
};
