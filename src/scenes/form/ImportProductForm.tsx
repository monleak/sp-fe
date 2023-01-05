import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { display } from '@mui/system';

const ImportProductsForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Box mt='20px' width='650px' margin='100px auto'>
      <Header title='Form ' subtitle='Tạo yêu cầu nhập hàng' />

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
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Supplier Id'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.supplierId}
                name='supplierId'
                error={!!touched.supplierId && !!errors.supplierId}
                helperText={touched.supplierId && errors.supplierId}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Product Id'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productId}
                name='productId'
                error={!!touched.productId && !!errors.productId}
                helperText={touched.productId && errors.productId}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Quantity'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name='quantity'
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Note'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.note}
                name='note'
                error={!!touched.note && !!errors.note}
                helperText={touched.note && errors.note}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Tạo yêu cầu
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  supplierId: yup.string().required('required'),
  productId: yup.string().required('required'),
  quantity: yup.string().required('required'),
  note: yup.string().required('required'),
});
const initialValues = {
  supplierId: '',
  productId: '',
  quantity: '',
  note: '',
};

export default ImportProductsForm;
