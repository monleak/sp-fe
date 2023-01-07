import { Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { LinkWithPreserveQuery } from "../components/common/LinkWithPreserveQuery";
import { getPid } from "../utils/string";
import { GridColumns } from "@mui/x-data-grid";
import React from "react";

export type PriceQuotationBasicColumnsT = {
  id?: number;
  supplier_id?: number;
  supplier?: string;
  unit_price?: number;
  note?: string;
};

/**
 * Lấy các cột của báo giá sử dụng trong Datagrid
 * @param additionalColumns
 * @returns
 */
const usePriceQuotationBasicColumns = <T extends {}>(
  additionalColumns?: GridColumns<T>
) => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // table columns
  const columns = React.useMemo<GridColumns<PriceQuotationBasicColumnsT & T>>(
    () => [
      { field: "id", headerName: "ID" },
      {
        field: "supplier_id",
        headerName: "Mã NCC",
        renderCell: (param) => (
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
      // Thêm các cột khác
      ...(additionalColumns || []),
    ],
    [additionalColumns, colors.greenAccent]
  );

  return columns;
};

export default usePriceQuotationBasicColumns;
