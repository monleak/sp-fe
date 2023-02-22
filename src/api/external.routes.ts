/**
 * External routes
 */
import axios from "axios";
import { WAREHOUSE_API_URL } from "./constants";
import { WareHouseImportItemT } from "./external.types";

// warehouse
export const importToWareHouse = (item: WareHouseImportItemT) => {
  return axios.post(`${WAREHOUSE_API_URL}/import`, {
    items: [item],
  });
};
