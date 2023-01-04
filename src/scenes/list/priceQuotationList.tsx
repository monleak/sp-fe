import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataImportStoryList } from "../../data/mockData";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ApiImportProductT,
  BASE_URL,
  ProductT,
  SubProductInfoT,
  getImportProductItem,
  getPriceQuotationListOfImportRequest,
  getSubProductList,
} from "../../api";
import React from "react";
import CardContentItem from "../../components/CardContentItem";
import { useNavigate } from "react-router-dom";
import CreatePriceQuotation from "../form/CreatePriceQuotationForm";
import LazyText from "../../components/LazyText";

/*
 * @brief Danh sách báo giá cho 1 yêu cầu nhập hàng
 *
 * Created on Thu Dec 29 2022
 * Copyright (c) 2022 HaVT
 */
const PriceQuotationList = () => {
  // url param
  const navigate = useNavigate();
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
              // key: item.id,
              product: "abc",
              supplier: item?.SupplierModel?.name,
            };
          });
        },
      }
    );

  console.log(priceQuotationList);

  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // table columns
  const columns: GridColumns<any> = [
    { field: "id", headerName: "ID" },
    { field: "supplier_id", headerName: "Mã NCC" },
    { field: "supplier", headerName: "Nhà cung cấp", flex: 1 },
    {
      field: "unit_price",
      headerName: "Đơn giá",
      flex: 1,
      renderCell: (params: any) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.unit_price}
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
        return <Chip color="success" variant="outlined" label="Accepted" />;
      },
    },
    {
      field: "Edit",
      renderCell: (param: any) => {
        console.log(param.id);
        return (
          <Button variant="outlined" color="warning">
            Edit
          </Button>
        );
      },
    },
  ];

  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box m="20px">
      <Header
        title="Danh sách báo giá"
        subtitle={`Danh sách báo giá của yêu cầu nhập hàng`}
        rightChildren={
          <>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Thêm báo giá mới
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box
                sx={{
                  margin: 10,
                  marginLeft: 20,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  pr: 4,
                }}
              >
                <CreatePriceQuotation />
              </Box>
            </Modal>
          </>
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
          checkboxSelection
          // rows={mockDataImportStoryList}
          rows={priceQuotationList || []}
          columns={columns}
          loading={isPriceQuotaionListLoading}
        />
      </Box>
    </Box>
  );
};

export default PriceQuotationList;
