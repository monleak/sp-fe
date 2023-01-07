import {
    Box,
    Button,
    TextField,
  } from "@mui/material";
  import { Formik } from "formik";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  
  // form attributes
  export type SupplierFormT = {
    name: string,
    phone: string,
    email: string,
    address: string,
  };
  const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    phone: yup.string().required("required"),
    email: yup.string().email("invalid Email").required("required"),
    address: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
  
  });
  
  // props
  type Props = {
    initialValues: SupplierFormT;
    handleSubmit: (value: SupplierFormT) => any;
    submitBtnText?: string;
  };
  const SupplierForm = (props: Props) => {
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
                type="string"
                label="Tên"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Số điện thoại"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Box display="flex">  
                <Button color="secondary" variant="contained">
                    Cancel
                  </Button>
                </Box>
              <Box display="flex">
                <Button type="submit" color="secondary" variant="contained">
                  {props.submitBtnText}
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    );
  };
  
  export default SupplierForm;