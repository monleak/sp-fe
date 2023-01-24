import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiImportProductT,
  SubProductInfoT,
  createNewPriceQuotation,
  createNewImportProduct,
  getInfoProductList,
  getImportAcceptedList,
  getSubProductList,
  getSupplierList,
} from "../../api";
import React from "react";
import { transformJoinSubProductList } from "../../api/transform";
import { useNavigate, useParams } from "react-router-dom";
import ImportProductForm_hieutt from "./ImportProductForm_hieutt";
import { ImportProductFormT } from "./ImportProductForm_hieutt";

const initialValues: ImportProductFormT = {
    product_id: 0,
    subproduct_id: 0,
    quantity: 0,
    note: "",
};

const CreateImportProduct = () => {
  const navigate = useNavigate();

  // api get
  const { data: infoProductList, isSuccess: isinfoProductListSuccess } = useQuery(
    ["infoProduct-list"],
    getInfoProductList
  );

  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: createNewImportProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["import-request"]);
    },
  });

  // form
  const handleFormSubmit = React.useCallback(
    (values: ImportProductFormT) => {
      mutate({
        total_cost: 0,
        status: "REQUEST",
        product_id: values.product_id,
        subproduct_id: values.subproduct_id,
        note: values.note,
        quantity: values.quantity,
      });
      navigate(-1); // go back
    },
    [mutate, navigate]
  );

  // jsx
  return (
    <Box mt="20px" width="650px" margin="100px auto">
      <Header
        title="CREATE"
        subtitle="Yêu cầu nhập hàng"
      />
      {/*  */}
      <ImportProductForm_hieutt
        handleSubmit={handleFormSubmit}
        initialValues={initialValues}
        infoProductList = {infoProductList}
        isInfoProductListSuccess = {isinfoProductListSuccess}
        submitBtnText={"Tạo mới"}
      />
      {/*  */}
    </Box>
  );
};

export default CreateImportProduct;
