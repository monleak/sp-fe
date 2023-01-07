import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ApiImportProductT, ApiSupplierT, SubProductInfoT } from "../../api";
import usePageModal from "../../hooks/usePageModal";
import { getPid } from "../../utils/string";

// form attributes
export type PriceQuotationFormT = {
  import_id: number;
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
  supplierList?: ApiSupplierT[];

  importRequestList?: (ApiImportProductT & Partial<SubProductInfoT>)[];
  isImportReqListSuccess?: boolean;
  isImportReqListDisable?: boolean;
  isImportReqListDefault?: number;

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
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          {/*  */}
          <Box
            display={"flex"}
            flex={1}
            justifyContent="center"
            alignItems={"center"}
          >
            <FormControl fullWidth sx={{ minWidth: 240, mb: 3 }}>
              <Autocomplete
                id="supplier_id"
                sx={{ width: 300 }}
                open={isOpen}
                onOpen={handleOpen}
                onClose={handleClose}
                onChange={(e, value) => {
                  setFieldValue("supplier_id", value?.id);
                }}
                defaultValue={
                  props.initialValues.supplier_id
                    ? {
                        id: props.initialValues.supplier_id,
                        address: "",
                        name:
                          props.supplierList?.find(
                            (item) =>
                              item.id === props.initialValues.supplier_id
                          )?.name || "",
                      }
                    : undefined
                }
                // includeInputInList
                isOptionEqualToValue={(option: any, value: any) => {
                  if (option?.id === value?.id) {
                    return true;
                  }
                  return false;
                }}
                getOptionLabel={(option) =>
                  option?.id && option?.id > 0
                    ? `${getPid("NCC", option.id)} - ${option?.name}`
                    : ""
                }
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
              <Autocomplete
                id="import_id"
                disabled={props.isImportReqListDisable}
                sx={{ width: 300 }}
                open={isOpen2}
                onOpen={handleOpen2}
                onClose={handleClose2}
                defaultValue={{
                  id: props.initialValues.import_id,
                  note: props.initialValues.note,
                  product_id: props.initialValues.product_id,
                  subproduct_id: props.initialValues.subproduct_id,
                  supplier_id: props.initialValues.supplier_id,
                  // unit_price: props.initialValues.unit_price,
                }}
                onChange={(e, value) => {
                  setFieldValue("import_id", value?.id);
                  setFieldValue("product_id", value?.product_id);
                  setFieldValue("subproduct_id", value?.subproduct_id);
                }}
                isOptionEqualToValue={(option, value) => {
                  if (option.id === value.id) {
                    return true;
                  }
                  return false;
                }}
                getOptionLabel={(option) =>
                  `${getPid("IMP", option.id)} - ${option.name} - ${getPid(
                    "P",
                    option.product_id
                  )} - ${getPid("SP", option.subproduct_id)}`
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
