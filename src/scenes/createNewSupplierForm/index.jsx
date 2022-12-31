import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
        {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Thêm nhà cung cấp" subtitle="" />
      </Box>
      {/* <Formik
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
        }) => ( */}
          <form > 
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
                type="text"
                label="Name"
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.Name}
                name="Name"
                // error={!!touched.Name && !!errors.Name}
                // helperText={touched.Name && errors.Name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.Phone}
                name="Phone"
                // error={!!touched.Phone && !!errors.Phone}
                // helperText={touched.Phone && errors.Phone}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.Email}
                name="Email"
                // error={!!touched.Email && !!errors.Email}
                // helperText={touched.Email && errors.Email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.Address}
                name="Address"
                // error={!!touched.Address && !!errors.Address}
                // helperText={touched.Address && errors.Address}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        {/* )}
      </Formik> */}
    </Box>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   Name: yup.string().required("required"),
//   Phone: yup.string().required("required"),
//   Email: yup.string().Email("invalid Email").required("required"),
//   Address: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("required"),

// });
const initialValues = {
  Name: "",
  Phone: "",
  Email: "",
  Address: "",
};

export default Form;
