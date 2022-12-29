import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getImportRequestList, getSupplierList } from "../../api";

const CreatePriceQuotation = () => {
  // responsive
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // form
  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  // api
  const { data: supplierList } = useQuery(["supplier-list"], getSupplierList);

  const { data: importRequestList } = useQuery(
    ["import-request"],
    getImportRequestList
  );

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
                  {supplierList?.map((supplier) => {
                    return (
                      <MenuItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </MenuItem>
                    );
                  })}
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
                  {importRequestList?.map((req) => {
                    return (
                      <MenuItem key={req.id} value={req.id}>
                        {req.id}
                      </MenuItem>
                    );
                  })}
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
