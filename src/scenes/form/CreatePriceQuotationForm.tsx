import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ApiImportProductT,
  SubProductInfoT,
  getImportRequestList,
  getSubProductList,
  getSupplierList,
} from "../../api";
import React from "react";
import { transformJoinSubProductList } from "../../api/transform";
import { useParams } from "react-router-dom";

/*
 * @brief Form tạo báo giá mới
 *
 * Created on Thu Dec 29 2022
 * Copyright (c) 2022 HaVT
 */
const CreatePriceQuotation = () => {
  // get param
  const { importRequestId } = useParams();
  // set default improt request id if exists in route param
  // TODO: CHANGE initialValues.productId -> initialValues.importRequestId
  if (importRequestId) {
    initialValues.productId = importRequestId;
  }

  // responsive
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // form
  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  // api get
  const { data: productList } = useQuery(
    ["sub-product-list"],
    getSubProductList
  );

  // API CALL - STEP 2: sử dụng hook useQuery
  // Có tool để xem quản lý api call
  // Có thể điều khiển cache api call
  const { data: supplierList, isSuccess: isSupplierListSuccess } = useQuery(
    // Đặt api key (key dùng để cache)
    ["supplier-list"],
    // queryFn
    getSupplierList
    // xử lý dữ liệu (optional)
  );

  const { data: importRequestList, isSuccess: isImportReqListSuccess } =
    useQuery(["import-request"], getImportRequestList, {
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

  // const {} = useMutation([""]);

  // jsx
  return (
    <Box mt="20px" width="650px" margin="100px auto">
      <Header
        title="Thêm báo giá"
        subtitle="Thêm 1 báo giá mới cho yêu cầu nhập hàng đã được chấp nhận"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            {/*  */}
            <Box
              display={"flex"}
              flex={1}
              justifyContent="center"
              alignItems={"center"}
              // flexDirection="column"
            >
              <FormControl fullWidth sx={{ minWidth: 240, mb: 3 }}>
                <InputLabel id="select-supplier">Chọn nhà cung cấp</InputLabel>
                <Select
                  labelId="select-supplier"
                  label="Chọn nhà cung cấp *"
                  name="supplierId"
                  value={values.supplierId}
                  onChange={handleChange}
                >
                  {isSupplierListSuccess ? (
                    // API CALL - STEP 3: Sử dụng response từ api như state bình thường
                    supplierList?.map((supplier) => {
                      return (
                        <MenuItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <LinearProgress
                      color="inherit"
                      style={{
                        margin: 12,
                      }}
                    />
                  )}
                </Select>
              </FormControl>
              <div style={{ width: 60 }}></div>
              {/*  */}
              <FormControl fullWidth sx={{ minWidth: 240, mb: 3 }}>
                <InputLabel id="select-import-request">
                  Chọn yêu cầu nhập hàng
                </InputLabel>
                <Select
                  labelId="select-import-request"
                  label="Chọn yêu cầu nhập hàng"
                  id="productId"
                  name="productId"
                  value={values.productId}
                  onChange={handleChange}
                >
                  {isImportReqListSuccess ? (
                    importRequestList?.map((req) => {
                      return (
                        <MenuItem key={req.id} value={req.id}>
                          <Typography>
                            {req.id}
                            {" - "}
                            {req.name}
                            {req.size && ` - ${req.size}`}
                            {req.color && ` - ${req.color}`}
                          </Typography>
                        </MenuItem>
                      );
                    })
                  ) : (
                    <LinearProgress
                      color="inherit"
                      style={{
                        margin: 12,
                      }}
                    />
                  )}
                </Select>
              </FormControl>
            </Box>
            {/*  */}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Đơn giá"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.unitPrice}
                name="unitPrice"
                error={!!touched.unitPrice && !!errors.unitPrice}
                helperText={touched.unitPrice && errors.unitPrice}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ghi chú"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.note}
                name="note"
                error={!!touched.note && !!errors.note}
                helperText={touched.note && errors.note}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Tạo báo giá mới
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  supplierId: yup.string().required("required"),
  productId: yup.string().required("required"),
  unitPrice: yup.number().min(0).required(""),
  note: yup.string().required("required"),
});

const initialValues = {
  supplierId: "",
  productId: "",
  unitPrice: 0,
  note: "",
};

export default CreatePriceQuotation;
