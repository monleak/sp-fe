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
type UpdatePriceQuotationFormProps = {
  initialValues: PriceQuotationFormT;
  priceQutationId: number;
};

const UpdatePriceQuotationForm = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const param = location.state as ApiPriceQuotationT;

  // api get
  const { data: productList } = useQuery(
    ["sub-product-list"],
    getSubProductList
  );

  const { data: supplierList, isSuccess: isSupplierListSuccess } = useQuery(
    ["supplier-list"],
    getSupplierList
  );

  const { data: importRequestList, isSuccess: isImportReqListSuccess } =
    useQuery(["import-request"], getImportAcceptedList, {
      //NOTE: join import request list and product list
      select: React.useCallback(
        (
          list: ApiImportProductT[]
        ): (ApiImportProductT & Partial<SubProductInfoT>)[] => {
          return productList
            ? transformJoinSubProductList<ApiImportProductT>(list, productList)
            : list;
        },
        [productList]
      ),
    });

  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: updatePriceQuotation,
    onSuccess: () => {
      queryClient.invalidateQueries(["price-quotation-list"]);
    },
  });

  // form
  const handleFormSubmit = (values: PriceQuotationFormT) => {
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
          unit_price: param.unit_price || 0,
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

export default UpdatePriceQuotationForm;
