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
  import { ApiImportProductT, ApiSupplierT, SubProductInfoT } from "../../api";
  
  // form attributes
  export type PriceQuotationFormT = {
    supplier_id: number;
    product_id: number;
    unit_price: number;
    note: string;
  };
  
  // validate form
  const checkoutSchema = yup.object().shape({
    supplier_id: yup.number().min(0).required("required"),
    product_id: yup.number().min(0).required("required"),
    unit_price: yup.number().min(0).required(""),
    note: yup.string().required("required"),
  });
  
  // props
  type Props = {
    initialValues: PriceQuotationFormT;
    handleSubmit: (value: PriceQuotationFormT) => any;
    isSupplierListSuccess?: boolean;
    importRequestList?: (ApiImportProductT & Partial<SubProductInfoT>)[];
    isImportReqListSuccess?: boolean;
    supplierList?: ApiSupplierT[];
    submitBtnText?: string;
  };
  
  /*
   * @brief Form chung cho create và update price quotation
   *
   * Created on Thu Jan 05 2023
   * Copyright (c) 2023 HaVT
   */
  const PriceQuotationForm = (props: Props) => {
    // responsive
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    return (
      <Formik
        onSubmit={props.handleSubmit}
        initialValues={props.initialValues}
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
                  name="supplier_id"
                  value={values.supplier_id}
                  onChange={handleChange}
                >
                  {props.isSupplierListSuccess ? (
                    props.supplierList?.map((supplier) => {
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
                  id="product_id"
                  name="product_id"
                  value={values.product_id}
                  onChange={handleChange}
                >
                  {props.isImportReqListSuccess ? (
                    props.importRequestList?.map((req) => {
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
                value={values.unit_price}
                name="unit_price"
                error={!!touched.unit_price && !!errors.unit_price}
                helperText={touched.unit_price && errors.unit_price}
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
                {props.submitBtnText}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    );
  };
  
  export default PriceQuotationForm;
  