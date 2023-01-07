import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiImportProductT,
  ApiPriceQuotationT,
  SubProductInfoT,
  getImportAcceptedList,
  getSubProductList,
  getSupplierList,
  updatePriceQuotation,
  getInfoProductList,
  updateImportHistory,
} from "../../api";
import React from "react";
import { transformJoinSubProductList } from "../../api/transform";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PriceQuotationForm, {
  PriceQuotationFormT,
} from "../../components/priceQuotation/PriceQuotationForm";

import ImportProductsForm from "../form/ImportProductForm";
import ImportProductForm_hieutt from "./ImportProductForm_hieutt";
import { ImportProductFormT } from "./ImportProductForm_hieutt";
/*
 * @brief Form cập nhật báo giá
 *
 * Created on Thu Dec 29 2022
 * Copyright (c) 2022 HaVT
 */

const EditImportProductsForm = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const param = location.state as ApiImportProductT;

  // api get
  const { data: infoProductList, isSuccess: isinfoProductListSuccess } = useQuery(
    ["infoProduct-list"],
    getInfoProductList
  );

  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: updateImportHistory,
    onSuccess: () => {
      queryClient.invalidateQueries(["import-request"]);
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
      <Header title="UPDATE" subtitle="Cập nhật thông tin yêu cầu nhập hàng" />
      {/*  */}
      <ImportProductForm_hieutt
        handleSubmit={handleFormSubmit}
        infoProductList = {infoProductList}
        isInfoProductListSuccess = {isinfoProductListSuccess}
        initialValues={{
          note: param.note || "",
          product_id: param.product_id || 0,
          subproduct_id: param.subproduct_id || 0,
          quantity: param.quantity || 0,
        }}
        submitBtnText={"Cập nhật"}
      />
      {/*  */}
    </Box>
  );
};

export default EditImportProductsForm;
