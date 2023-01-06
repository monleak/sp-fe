import {
  Box,
  Button,
  Card,
  Chip,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link, Outlet, useParams } from "react-router-dom";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ApiImportProductT,
  BASE_URL,
  ProductT,
  SubProductInfoT,
  deletePriceQuotation,
  getImportProductItem,
  getPriceQuotationListOfImportRequest,
  getSubProductList,
  updateImportProduct,
  updatePriceQuotation,
} from "../../api";
import React from "react";
import CardContentItem from "../../components/CardContentItem";
import { useNavigate } from "react-router-dom";
import CreatePriceQuotation from "./CreatePriceQuotationForm";
import usePageModal from "../../hooks/usePageModal";
import PageModal from "../../components/modal/PageModal";
import usePreserveQueryNavigate from "../../hooks/usePreserveQueryNavigate";
import { LinkWithPreserveQuery } from "../../components/common/LinkWithPreserveQuery";
import { getPid } from "../../utils/string";

/*
 * @brief Danh sách báo giá cho 1 yêu cầu nhập hàng
 *
 * Created on Thu Dec 29 2022
 * Copyright (c) 2022 HaVT
 */
const PriceQuotationList = () => {
  const { handleClose, handleOpen, isOpen } = usePageModal(false);
  // url param
  const navigate = usePreserveQueryNavigate();
  const { importRequestId } = useParams();
  const id = Number.parseInt(importRequestId || "");

  // api
  const { data: productList } = useQuery(
    ["sub-product-list"],
    getSubProductList
  );

  const { data: importRequest, isSuccess: isImpFetchSuccess } = useQuery(
    ["import-request-item", id],
    React.useCallback(() => getImportProductItem(id), [id]),
    {
      select: (data): ApiImportProductT & Partial<SubProductInfoT> => {
        return {
          ...data,
          ...productList?.find(
            (p) =>
              p.product_id === data.product_id &&
              p.subproduct_id === data.subproduct_id
          ),
        };
      },
    }
  );

  const isPQAssignDone = React.useCallback(() => {
    return !importRequest || importRequest?.status === "Q_P_ASSIGNED";
  }, [importRequest]);

  const { data: priceQuotationList, isLoading: isPriceQuotaionListLoading } =
    useQuery(
      ["price-quotation-list", id],
      () => {
        return getPriceQuotationListOfImportRequest(id);
      },
      {
        select: (data) => {
          return data.map((item: any) => {
            return {
              ...item,
              key: item.id,
              product: "abc",
              supplier: item?.SupplierModel?.name,
              selectedId: item?.ImportProductModel.price_quotation_id,
            };
          });
        },
      }
    );

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deletePriceQuotation,
    onSuccess: () => {
      queryClient.invalidateQueries(["price-quotation-list", id]);
    },
  });
  const { mutate: setImportPriceQuotation } = useMutation({
    // update import id
    mutationFn: updateImportProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["price-quotation-list"]);
      queryClient.invalidateQueries(["import-request-item", id]);
    },
  });

  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // table columns
  const columns: GridColumns<any> = [
    { field: "id", headerName: "ID" },
    {
      field: "supplier_id",
      headerName: "Mã NCC",
      renderCell: (param: any) => (
        <LinkWithPreserveQuery to={`/suppliers/${param.row?.supplier_id}`}>
          <Typography color={"white"}>
            {getPid("NCC", param.row?.supplier_id)}
          </Typography>
        </LinkWithPreserveQuery>
      ),
    },
    {
      field: "supplier",
      headerName: "Nhà cung cấp",
      flex: 1,
      renderCell: (param: any) => (
        <LinkWithPreserveQuery to={`/suppliers/${param.row?.supplier_id}`}>
          <Typography color={"white"}>{param.row?.supplier}</Typography>
        </LinkWithPreserveQuery>
      ),
    },
    {
      field: "unit_price",
      headerName: "Đơn giá",
      flex: 1,
      renderCell: (params: any) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.unit_price}đ
        </Typography>
      ),
    },
    {
      field: "note",
      headerName: "Ghi chú",
      flex: 1,
    },
    {
      field: "Status",
      renderCell: (param: any) => {
        return (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={param.row?.selectedId === param.row?.id ? 1 : 0}
            label="Status"
            disabled={isPQAssignDone()}
            onChange={(e) => {
              const v: number = e.target.value as number;
              if (v) {
                setImportPriceQuotation({
                  id: param.row?.import_id,
                  imp: {
                    price_quotation_id: param.row?.id,
                  },
                });
              } else {
                setImportPriceQuotation({
                  id: param.row?.import_id,
                  imp: {
                    price_quotation_id: null,
                  },
                });
              }
            }}
          >
            <MenuItem value={1}>
              <Chip color="success" variant="outlined" label="Selected" />
            </MenuItem>
            <MenuItem value={0}>
              <Chip color="warning" variant="outlined" label="Waiting" />
            </MenuItem>
          </Select>
        );
      },
    },
    {
      field: "Edit",
      renderCell: (param: GridRenderCellParams<any, any, any>) => {
        // console.log(param.row);
        return (
          <Button
            variant="outlined"
            color="warning"
            disabled={isPQAssignDone()}
            onClick={() => {
              navigate(
                `/imports/${importRequestId}/price-quotation-list/update/${param.row?.id}`,
                { state: param.row }
              );
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "Delete",
      renderCell: (param: GridRenderCellParams<any, any, any>) => {
        return (
          <Button
            variant="outlined"
            color="error"
            disabled={isPQAssignDone()}
            onClick={() => {
              mutate(param.row?.id);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      {/* NOTE: Nested modal using nested route react router dom */}
      <Outlet />
      {/* modal */}

      <Header
        title="Danh sách báo giá"
        subtitle={`Danh sách báo giá của yêu cầu nhập hàng`}
        rightChildren={
          <Box>
            <Button
              variant="contained"
              color="secondary"
              disabled={isPQAssignDone()}
              onClick={() => {
                navigate(
                  `/imports/${importRequestId}/price-quotation-list/create`
                );
              }}
            >
              Thêm báo giá mới
            </Button>

            <Button
              variant="contained"
              color="info"
              disabled={isPQAssignDone()}
              onClick={() => {
                if (
                  !!importRequest?.price_quotation_id &&
                  !!importRequest?.id
                ) {
                  setImportPriceQuotation({
                    id: importRequest?.id,
                    imp: {
                      price_quotation_id: importRequest?.price_quotation_id,
                      status: "Q_P_ASSIGNED",
                    },
                  });
                } else {
                  handleOpen();
                }
                // console.log(importRequest?.price_quotation_id);
                // console.log(isImpFetchSuccess);
                // console.log(!isPriceQuotaionListLoading);
              }}
              style={{
                marginLeft: 24,
              }}
            >
              {isPQAssignDone()
                ? "Đã xác nhận nhập hàng"
                : "Xác nhận nhập hàng"}
            </Button>
          </Box>
        }
      />
      <Card
        variant="outlined"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <CardContentItem
          loading={isImpFetchSuccess}
          title="Mã yêu cầu"
          value={importRequest?.id}
        />
        <CardContentItem
          title="Mã sản phẩm"
          value={`${importRequest?.product_id} - ${importRequest?.subproduct_id}`}
          loading={isImpFetchSuccess}
        />
        <CardContentItem
          title="Tên sản phẩm"
          value={`${importRequest?.name}`}
          loading={isImpFetchSuccess}
        />
        <CardContentItem
          title="Loại"
          value={`${importRequest?.category}`}
          loading={isImpFetchSuccess}
        />
        <CardContentItem
          title="Màu"
          value={`${importRequest?.color}`}
          loading={isImpFetchSuccess}
        />
        <CardContentItem
          title="Số lượng"
          value={`${importRequest?.quantity}`}
          loading={isImpFetchSuccess}
        />
        <CardContentItem
          title="Trạng thái"
          value={`${importRequest?.status}`}
          loading={isImpFetchSuccess}
        />
        <CardContentItem
          title="Ngày tạo"
          value={`${importRequest?.createdAt}`}
          loading={isImpFetchSuccess}
        ></CardContentItem>
      </Card>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          // checkboxSelection
          // rows={mockDataImportStoryList}
          rows={priceQuotationList || []}
          columns={columns}
          loading={isPriceQuotaionListLoading}
        />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isOpen}
        onClose={handleClose}
        message="Cần chọn 1 báo giá trước khi xác nhận nhập hàng"
        key={"snackbar"}
      />
    </Box>
  );
};

export default PriceQuotationList;
