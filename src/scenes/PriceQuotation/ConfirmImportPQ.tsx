import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import ImportRequestCard from "../../components/ImportRequest/ImportRequestCard";
import { useNavigate, useParams } from "react-router-dom";
import {
  ApiImportProductT,
  SubProductInfoT,
  getImportProductItem,
  getPriceQuotationListOfImportRequest,
  getSubProductList,
  updateImportProduct,
} from "../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  transformFindAndAddAttrFromArr,
  transformFindAndAddAttrFromSubProductList,
} from "../../api/transform";
import { Formik } from "formik";
import { useApiImpSetPQ } from "../../hooks/useApiPQMutation";

type Props = {};

type ConfirmFormT = {
  unit_price: number;
  quantity: number;
  tax: number;
};

const initialValues: ConfirmFormT = {
  unit_price: 0,
  quantity: 0,
  tax: 0,
};

const ConfirmImportPQ = (props: Props) => {
  // state

  // url param
  const navigate = useNavigate();
  const { importRequestId } = useParams();
  const id = Number.parseInt(importRequestId || "");

  // api get
  // Láy danh sách sản phẩm
  const { data: productList } = useQuery(
    ["sub-product-list"],
    getSubProductList
  );

  // Lấy danh sách báo giá của yêu cầu nhập hàng có importId
  const { data: priceQuotationList, isLoading: isPriceQuotaionListLoading } =
    useQuery(["price-quotation-list", id], () => {
      return getPriceQuotationListOfImportRequest(id);
    });

  // Lấy 1 yêu cầu nhập hàng với id
  const { data: importRequest, isSuccess: isImpFetchSuccess } = useQuery(
    ["import-request-item", id],
    React.useCallback(() => getImportProductItem(id), [id]),
    {
      select: (data) => {
        const imp_prod = transformFindAndAddAttrFromSubProductList(
          data,
          productList || []
        );
        const imp_prod_pq = transformFindAndAddAttrFromArr(
          imp_prod as ApiImportProductT &
            Partial<SubProductInfoT> & { price_quotation_id: any },
          priceQuotationList?.map((i) => ({
            ...i,
            price_quotation_id: i.id,
          })) || [],
          ["price_quotation_id"]
        );
        return imp_prod_pq;
      },
    }
  );

  useEffect(() => {
    initialValues["quantity"] = importRequest?.quantity || 0;
    initialValues["unit_price"] = importRequest?.unit_price || 0;
    initialValues["tax"] =
      (initialValues["quantity"] * initialValues["unit_price"]) / 10;
  }, [importRequest]);

  const queryClient = useQueryClient();
  const { confirmSetImportPQId, setImportPQId } = useApiImpSetPQ(
    queryClient,
    id
  );
  const { mutate: updateImportProductApi } = useMutation({
    // update import id
    mutationFn: updateImportProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["price-quotation-list"]);
      queryClient.invalidateQueries(["import-request-item", id]);
    },
  });

  const handleSubmit = React.useCallback(
    (values: ConfirmFormT) => {
      updateImportProductApi({
        id,
        imp: {
          total_cost: values.quantity * values.unit_price + values.tax,
        },
      });
      confirmSetImportPQId(importRequest?.price_quotation_id);
      navigate(-1);
    },
    [updateImportProductApi, id, confirmSetImportPQId, importRequest]
  );

  return (
    <Box>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        enableReinitialize
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
            <Card
              sx={{
                minWidth: 275,
                width: 1200,
                margin: "auto",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 28 }}
                  color="text.primary"
                  gutterBottom
                >
                  Xác nhận lựa chọn báo giá
                </Typography>
                <ImportRequestCard
                  category={importRequest?.category}
                  color={importRequest?.color}
                  createdAt={importRequest?.createdAt}
                  id={importRequest?.id}
                  name={importRequest?.name}
                  product_id={importRequest?.product_id}
                  quantity={importRequest?.quantity}
                  status={importRequest?.status}
                  subproduct_id={importRequest?.subproduct_id}
                  isFetchSuccess={isImpFetchSuccess}
                />
                <Stack
                  margin={2}
                  spacing={1}
                  maxWidth={800}
                  padding={1}
                  style={{ margin: "auto", marginTop: 20 }}
                >
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: 8,
                      marginRight: 8,
                    }}
                  >
                    <Typography variant="h4">Đơn giá:</Typography>
                    <TextField
                      name="unit_price"
                      value={values.unit_price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      size="small"
                      color="warning"
                    />
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: 8,
                      marginRight: 8,
                    }}
                  >
                    <Typography variant="h4">Số lượng:</Typography>
                    <TextField
                      name="quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      size="small"
                      color="warning"
                    />
                  </Box>
                  <Divider />
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: 8,
                      marginRight: 8,
                    }}
                  >
                    <Typography variant="h4"></Typography>
                    <TextField
                      type="number"
                      size="small"
                      color="warning"
                      value={values.quantity * values.unit_price}
                      disabled={true}
                    />
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: 8,
                      marginRight: 8,
                    }}
                  >
                    <Typography variant="h4">
                      Tiền thuế (Mặc định 10%):
                    </Typography>
                    <TextField
                      name="tax"
                      value={values.tax}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      size="small"
                      color="warning"
                    />
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: 8,
                      marginRight: 8,
                    }}
                  >
                    <Typography variant="h4">Tổng:</Typography>
                    <TextField
                      name="total_cost"
                      value={values.tax + values.quantity * values.unit_price}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      disabled
                      type="number"
                      size="small"
                      color="warning"
                    />
                  </Box>
                </Stack>
              </CardContent>
              <CardActions style={{ float: "right", margin: 16 }}>
                <Button
                  onClick={() => navigate(-1)}
                  size="medium"
                  variant="outlined"
                  color="error"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  size="medium"
                  variant="contained"
                  color="success"
                >
                  Xác nhận
                </Button>
              </CardActions>
            </Card>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ConfirmImportPQ;
