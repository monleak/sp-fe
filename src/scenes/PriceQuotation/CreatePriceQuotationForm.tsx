import { Box } from "@mui/material";
import Header from "../../components/Header";
import PriceQuotationForm, {
  PriceQuotationFormT,
} from "../../components/PriceQuotation/PriceQuotationForm";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiImportProductT,
  SubProductInfoT,
  createNewPriceQuotation,
  getImportAcceptedList,
  getSubProductList,
  getSupplierList,
} from "../../api";
import React from "react";
import { transformJoinSubProductList } from "../../api/transform";
import { useParams } from "react-router-dom";

import usePreserveQueryNavigate from "../../hooks/usePreserveQueryNavigate";

/*
 * @brief Form tạo báo giá mới
 *
 * Created on Thu Dec 29 2022
 * Copyright (c) 2022 HaVT
 */
const initialValues: PriceQuotationFormT = {
  import_id: 0,
  supplier_id: 0,
  product_id: 0,
  subproduct_id: 0,
  unit_price: 0,
  note: "",
};

const CreatePriceQuotation = () => {
  const navigate = usePreserveQueryNavigate();
  // get param
  const { importRequestId } = useParams();
  // set default improt request id if exists in route param
  if (!importRequestId) {
    throw new Error("require param: importRequestId");
  }
  let import_id = Number.parseInt(importRequestId);
  initialValues.import_id = import_id;

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
            ? transformJoinSubProductList<any>(list, productList)
            : list;
        },
        [productList]
      ),
    });
  console.log(importRequestList);

  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: createNewPriceQuotation,
    onSuccess: () => {
      queryClient.invalidateQueries(["price-quotation-list", import_id]);
    },
  });

  // form
  const handleFormSubmit = React.useCallback(
    (values: PriceQuotationFormT) => {
      mutate({
        import_id: values.import_id,
        product_id: values.product_id,
        subproduct_id: values.subproduct_id,
        supplier_id: values.supplier_id,
        note: values.note,
        unit_price: values.unit_price,
      });
      // console.log(values);
      navigate(-1); // go back
    },
    [mutate, navigate]
  );

  // jsx
  return (
    <Box mt="20px" width="650px" margin="100px auto">
      <Header
        title="Thêm báo giá"
        subtitle="Thêm 1 báo giá mới cho yêu cầu nhập hàng đã được chấp nhận"
      />
      {/*  */}
      <PriceQuotationForm
        handleSubmit={handleFormSubmit}
        initialValues={initialValues}
        supplierList={supplierList}
        isSupplierListSuccess={isSupplierListSuccess}
        importRequestList={importRequestList}
        isImportReqListSuccess={isImportReqListSuccess}
        submitBtnText={"Tạo báo giá mới"}
      />
      {/*  */}
    </Box>
  );
};

export default CreatePriceQuotation;
