import { Box, Button, Chip, MenuItem, Select, Snackbar } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Outlet, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import React from "react";
import usePageModal from "../../hooks/usePageModal";
import usePreserveQueryNavigate from "../../hooks/usePreserveQueryNavigate";
import ImportRequestCard from "../../components/ImportRequest/ImportRequestCard";
import TableContainer from "../../components/common/TableContainer";
import usePriceQuotationBasicColumns from "../../hooks/usePriceQuotationColumns";
import useApiPQListOfImpReq from "../../hooks/useApiPQListOfImpReq";
import { useApiDeletePQ, useApiImpSetPQ } from "../../hooks/useApiPQMutation";

/*
 * @brief Danh sách báo giá cho 1 yêu cầu nhập hàng
 *
 * Created on Thu Dec 29 2022
 * Copyright (c) 2022 HaVT
 */
const PriceQuotationList = () => {
  const navigate = usePreserveQueryNavigate();
  // snackbar
  const { handleClose, handleOpen, isOpen } = usePageModal(false);
  // url param
  const { importRequestId } = useParams();
  const id = Number.parseInt(importRequestId || "");

  // api get
  const {
    importRequest,
    isImpFetchSuccess,
    isPriceQuotaionListLoading,
    priceQuotationList,
    productList,
  } = useApiPQListOfImpReq(id);

  // kiểm tra yêu cầu đã xác nhận báo giá chưa
  const isPQAssignDone = React.useCallback(() => {
    return (
      !importRequest ||
      !importRequest?.status ||
      ["Q_P_ASSIGNED", "COMPLETED"].includes(importRequest?.status)
    );
  }, [importRequest]);

  // mutation
  const queryClient = useQueryClient();
  const deletePQ = useApiDeletePQ(queryClient, id);
  const { confirmSetImportPQId, setImportPQId } = useApiImpSetPQ(
    queryClient,
    id
  );

  const columns = usePriceQuotationBasicColumns<{ selectedId?: number }>([
    {
      field: "Trạng thái",
      renderCell: (param: any) => {
        return (
          <Select
            labelId="select-pq"
            id="select-pq"
            value={param.row?.selectedId === param.row?.id ? 1 : 0}
            label="Trạng thái"
            disabled={isPQAssignDone()}
            onChange={(e) => {
              // nếu value = 1 -> gọi api chọn báo giá này
              const v: number = e.target.value as number;
              setImportPQId(v === 1 ? param.row?.id : null);
            }}
          >
            <MenuItem value={1}>
              <Chip color="success" variant="outlined" label="ĐÃ chọn" />
            </MenuItem>
            <MenuItem value={0}>
              <Chip color="warning" variant="outlined" label="Không chọn" />
            </MenuItem>
          </Select>
        );
      },
    },
    {
      field: "Edit",
      renderCell: (param: GridRenderCellParams<any, any, any>) => {
        return (
          <Button
            variant="outlined"
            color="warning"
            disabled={isPQAssignDone()}
            onClick={() => {
              // navigate to edit screen
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
              // navigate to call api delete
              deletePQ(param.row?.id);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ]);

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
                  navigate(`/imports/${id}/price-quotation-list/confirm`);
                  // confirmSetImportPQId(importRequest?.price_quotation_id);
                } else {
                  handleOpen();
                }
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
      {/*  */}
      <ImportRequestCard
        {...importRequest}
        isFetchSuccess={isImpFetchSuccess}
      />

      <TableContainer>
        <DataGrid
          rows={priceQuotationList || []}
          columns={columns}
          loading={isPriceQuotaionListLoading}
        />
      </TableContainer>
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
