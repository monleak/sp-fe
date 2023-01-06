import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { display } from '@mui/system';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ApiImportProductT,
  createNewImportHistoryList,
  getALlImportHistoryList,
  getImportAcceptedList,
  getSubProductList,
  getSupplierList,
  SubProductInfoT,
} from '../../api';
import { useNavigate } from 'react-router-dom';
import ImportForm, {
  ImportProductFormT,
} from '../../components/importForm/ImportForm';
import { transformJoinSubProductList } from '../../api/transform';

const ImportProductsForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const navigate = useNavigate();

  // api get
  const { data: productList } = useQuery(
    ['sub-product-list'],
    getSubProductList
  );

  const { data: supplierList, isSuccess: isSupplierListSuccess } = useQuery(
    ['supplier-list'],
    getSupplierList
  );

  const { data: importRequestList, isSuccess: isImportReqListSuccess } =
    useQuery(['import-request'], getALlImportHistoryList, {
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

  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: createNewImportHistoryList,
    onSuccess: () => {
      queryClient.invalidateQueries(['import-product']);
    },
  });

  // form
  const handleFormSubmit = React.useCallback(
    (values: ImportProductFormT) => {
      mutate({
        product_id: values.product_id,
        supplier_id: 0,
        subproduct_id: values.subproduct_id,
        quantity: values.quantity,
        status: values.status,
        note: values.note,
        created_by: values.created_by,
        updated_by: '',
        total_cost: 0,
      });
      navigate(-1); // go back
    },
    [mutate, navigate]
  );

  return (
    <Box mt='20px' width='650px' margin='100px auto'>
      <Header title='Form ' subtitle='Tạo yêu cầu nhập hàng' />

      <ImportForm
        handleSubmit={handleFormSubmit}
        importRequestList={importRequestList}
        initialValues={initialValues}
        supplierList={supplierList}
        isImportReqListSuccess={isImportReqListSuccess}
        isSupplierListSuccess={isSupplierListSuccess}
        submitBtnText={'Tạo yêu cầu mới'}
        create_update={'created_by'}
      />
    </Box>
  );
};

const initialValues = {
  supplier_id: 0,
  product_id: 0,
  subproduct_id: 0,
  quantity: 0,
  status: '',
  created_by: '',
  updated_by: '',
  note: '',
};

export default ImportProductsForm;
