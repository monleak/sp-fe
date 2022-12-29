import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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

/*
 * @brief Danh sách báo giá cho 1 yêu cầu nhập hàng
 *
 * Created on Thu Dec 29 2022
 * Copyright (c) 2022 HaVT
 */
const PriceQuotationList = () => {
  // url param
  const { importRequestId } = useParams();
  const id = Number.parseInt(importRequestId || "");

  // api
  const { data: productList } = useQuery(
    ["sub-product-list"],
    getSubProductList
  );

  const { data: importRequest } = useQuery(
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

  const { data: priceQuotationList } = useQuery(
    ["price-quotation-list", id],
    () => {
      return getPriceQuotationListOfImportRequest(id);
    }
  );

  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // table columns
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "supplier_id", headerName: "Supplier Id" },
    { field: "supplier", headerName: "Supplier ", flex: 1 },
    { field: "product_id", headerName: "Product Id" },
    { field: "product", headerName: "Product ", flex: 1 },
    { field: "subproduct_id", headerName: "Subproduct Id" },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "total_cost",
      headerName: "Total Cost",
      flex: 1,
      renderCell: (params: any) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "note",
      headerName: "Note",
      flex: 1,
    },
    {
      field: "created_by",
      headerName: "Created By",
      flex: 1,
    },
    {
      field: "update_by",
      headerName: "Updated By",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Danh sách báo giá"
        subtitle={`Danh sách báo giá của yêu cầu nhập hàng`}
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
        <CardContentItem title="Mã yêu cầu" value={importRequest?.id} />
        <CardContentItem
          title="Mã sản phẩm"
          value={`${importRequest?.product_id} - ${importRequest?.subproduct_id}`}
        />
        <CardContentItem
          title="Tên sản phẩm"
          value={`${importRequest?.name}`}
        />
        <CardContentItem title="Loại" value={`${importRequest?.category}`} />
        <CardContentItem title="Màu" value={`${importRequest?.color}`} />
        <CardContentItem
          title="Số lượng"
          value={`${importRequest?.quantity}`}
        />
        <CardContentItem
          title="Ngày tạo"
          value={`${importRequest?.createdAt}`}
        />
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
          rows={mockDataImportStoryList}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default PriceQuotationList;
