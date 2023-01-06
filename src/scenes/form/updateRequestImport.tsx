import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiImportProductT,
  ApiPriceQuotationT,
  SubProductInfoT,
  getImportAcceptedList,
  getSubProductList,
  getImportRequestList,
  getSupplierList,
  updatePriceQuotation,
} from "../../api";
import React from "react";
import { transformJoinSubProductList } from "../../api/transform";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PriceQuotationForm, {
  PriceQuotationFormT,
} from "../../components/priceQuotation/PriceQuotationForm";

/*
 * @brief Form cập nhật báo giá
 *
 * Created on Thu Dec 29 2022
 * Copyright (c) 2022 HaVT
 */
export type ImportProductFormT = {
    supplier_id: number;
    product_id: number;
    subproduct_id: number;
    quantity: number;
    total_cost: number;
    note: string;
  };

const UpdateRequestImportForm = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const param = location.state as ApiImportProductT;

  // api get
  const { data: importRequestList, isSuccess: isImportReqListSuccess } = useQuery(
    ["import-request"],
    getImportRequestList
    );

  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: updatePriceQuotation,
    onSuccess: () => {
      queryClient.invalidateQueries(["price-quotation-list"]);
    },
  });

  // form
  const handleFormSubmit = (values: ImportProductFormT) => {
    // console.log(values);
    if (param.id) {
      mutate({
        id: param.id,
        pq: {
          // ...param,
          ...values,
        },
      });
    }
    navigate(-1); // go back
  };

  // jsx
  return (
    <Box mt="20px" width="650px" margin="100px auto">
      <Header title="Cập nhật báo giá" subtitle="Cập nhật thông tin báo giá" />
      {/*  */}
      <PriceQuotationForm
        handleSubmit={handleFormSubmit}
        importRequestList={importRequestList}
        initialValues={{
          note: param.note || "",
          product_id: param.product_id || 0,
          supplier_id: param.supplier_id || 0,
          subproduct_id: param.subproduct_id || 0,
          total_cost: param.total_cost || 0,
        }}
        supplierList={supplierList}
        isImportReqListSuccess={isImportReqListSuccess}
        isSupplierListSuccess={isSupplierListSuccess}
        submitBtnText={"Cập nhật"}
      />
      {/*  */}
    </Box>
  );
};

export default UpdateRequestImportForm;
