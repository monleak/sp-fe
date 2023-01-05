import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
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
import usePageModal from "../../hooks/usePageModal";

// form attributes
export type PriceQuotationFormT = {
  supplier_id: number;
  product_id: number;
  subproduct_id: number;
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

  const { handleClose, handleOpen, isOpen } = usePageModal(false);
  const {
    handleClose: handleClose2,
    handleOpen: handleOpen2,
    isOpen: isOpen2,
  } = usePageModal(false);

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
              {/* <InputLabel id="select-supplier">Chọn nhà cung cấp</InputLabel>
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
              </Select> */}
              <Autocomplete
                id="select-supplier"
                sx={{ width: 300 }}
                open={isOpen}
                onOpen={handleOpen}
                onClose={handleClose}
                onChange={(e, value) => {
                  values.supplier_id = value?.id || -1;
                }}
                includeInputInList
                isOptionEqualToValue={(option: any, value: any) => {
                  if (option?.name === value?.name) {
                    return true;
                  }
                  return false;
                }}
                getOptionLabel={(option) => `${option.id} - ${option?.name}`}
                // options={options}
                options={props.supplierList || []}
                loading={!props.isSupplierListSuccess}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chọn nhà cung cấp *"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {!props.isSupplierListSuccess ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>

            <div style={{ width: 60 }}></div>
            {/*  */}
            <FormControl fullWidth sx={{ minWidth: 240, mb: 3 }}>
              {/* <InputLabel id="select-import-request">
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
              </Select> */}
              <Autocomplete
                id="select-import-request"
                sx={{ width: 300 }}
                open={isOpen2}
                onOpen={handleOpen2}
                onClose={handleClose2}
                onChange={(e, value) => {
                  values.product_id = value?.product_id || -1;
                  values.subproduct_id = value?.subproduct_id || -1;
                }}
                isOptionEqualToValue={(option, value) => {
                  if (option.id === value.id) {
                    return true;
                  }
                  return false;
                }}
                getOptionLabel={(option) =>
                  `${option.id} - ${option.name} ${option.product_id} ${option.subproduct_id}`
                }
                options={props.importRequestList || []}
                loading={!props.isImportReqListSuccess}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chọn yêu cầu nhập hàng *"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {!props.isSupplierListSuccess ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
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
