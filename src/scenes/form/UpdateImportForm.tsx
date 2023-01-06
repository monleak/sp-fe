import { Box } from '@mui/material';
import Header from '../../components/Header';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ApiImportProductT,
  SubProductInfoT,
  getImportAcceptedList,
  getSubProductList,
  getSupplierList,
  updatePriceQuotation,
} from '../../api';
import React from 'react';
import { transformJoinSubProductList } from '../../api/transform';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ImportForm, {
  ImportProductFormT,
} from '../../components/importForm/ImportForm';

/*
 * @brief Form cập nhật báo giá
 *
 * Created on Thu Jan 06 2022
 * Copyright (c) 2022 AnNV
 */

const UpdateImportForm = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const param = location.state as ApiImportProductT;

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
    useQuery(['import-request'], getImportAcceptedList, {
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
    mutationFn: updatePriceQuotation,
    onSuccess: () => {
      queryClient.invalidateQueries(['price-quotation-list']);
    },
  });

  // form
  const handleFormSubmit = (values: ImportProductFormT) => {
    // console.log(values);
    if (param.id) {
      mutate({
        id: param.id,
        pq: {
          // ...param,
          ...values,
        },
      });
    }
    navigate(-1); // go back
  };

  // jsx
  return (
    <Box mt='20px' width='650px' margin='100px auto'>
      <Header title='Cập nhật ' subtitle='Cập nhật lịch sử nhập hàng' />
      {/*  */}
      <ImportForm
        handleSubmit={handleFormSubmit}
        importRequestList={importRequestList}
        initialValues={{
          note: param.note || '',
          product_id: param.product_id || 0,
          subproduct_id: param.subproduct_id || 0,
          supplier_id: param.supplier_id || 0,
          quantity: param.quantity || 0,
        }}
        supplierList={supplierList}
        isImportReqListSuccess={isImportReqListSuccess}
        isSupplierListSuccess={isSupplierListSuccess}
        submitBtnText={'Cập nhật'}
      />
      {/*  */}
    </Box>
  );
};

export default UpdateImportForm;
