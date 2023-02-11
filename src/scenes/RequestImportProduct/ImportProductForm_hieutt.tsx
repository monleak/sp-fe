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
import {
  ApiImportProductT,
  ApiProductInfoT,
  ApiSupplierT,
  SubProductInfoT,
} from "../../api";

// form attributes
export type ImportProductFormT = {
  product_id: number;
  subproduct_id: number;
  quantity: number;
  note: string;
};

// validate form
const checkoutSchema = yup.object().shape({
  subproduct_id: yup.number().min(0).required("required"),
  product_id: yup.number().min(0).required("required"),
  note: yup.string().required("required"),
});

// props
type Props = {
  initialValues: ImportProductFormT;
  handleSubmit: (value: ImportProductFormT) => any;
  infoProductList?: ApiProductInfoT[];
  isInfoProductListSuccess?: boolean;
  submitBtnText?: string;
};

/*
 * @brief Form chung cho create và update price quotation
 *
 * Created on Thu Jan 05 2023
 * Copyright (c) 2023 HaVT
 */
const ImportProductForm_hieutt = (props: Props) => {
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
              <InputLabel id="select-idproduct">Chọn ID Product</InputLabel>
              <Select
                labelId="select-idproduct"
                label="Chọn ID Product *"
                name="product_id"
                value={values.product_id}
                onChange={handleChange}
              >
                {props.isInfoProductListSuccess ? (
                  props.infoProductList?.map((info) => {
                    return (
                      <MenuItem key={info.id} value={info.id}>
                        {info.id}
                        {" - "}
                        {info.name}
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
              <InputLabel id="select-subidproduct">
                Chọn SubID Product
              </InputLabel>
              <Select
                labelId="select-subidproduct"
                label="Chọn SubID Product"
                id="subproduct_id"
                name="subproduct_id"
                value={values.subproduct_id}
                onChange={handleChange}
              >
                {props.isInfoProductListSuccess ? (
                  props.infoProductList
                    ?.find((product) => {
                      if (product.id === values.product_id) {
                        return true;
                      } else {
                        return false;
                      }
                    })
                    ?.sub_products.map((sub) => {
                      return (
                        <MenuItem key={sub.id} value={sub.id}>
                          <Typography>
                            {sub.id}
                            {" - "}
                            {sub.size && ` - ${sub.size}`}
                            {sub.color && ` - ${sub.color}`}
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
              label="Số lượng"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.quantity}
              name="quantity"
              error={!!touched.quantity && !!errors.quantity}
              helperText={touched.quantity && errors.quantity}
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

export default ImportProductForm_hieutt;
