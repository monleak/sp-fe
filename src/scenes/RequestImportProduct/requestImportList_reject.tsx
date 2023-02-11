import {
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  Chip,
  Modal,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataImportStoryList } from "../../data/mockData";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../components/Header";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import MoreOutlinedIcon from "@mui/icons-material/MoreOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Table from "@mui/material/Table";
import Tooltip from "@mui/material/Tooltip";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import ImportProductsForm from "../form/ImportProductForm";
import { useNavigate } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import EditImportProductsForm from "./ImportProductForm_hieutt";
import CreateImportProduct from "./createImportProduct";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ApiImportProductT,
  SubProductInfoT,
  getImportRequestList,
  getImportLists,
  getSubProductList,
  getSupplierList,
  deleteImportHistory,
  updateImportHistory,
} from "../../api";
import React from "react";

export type statusUpdate = {
  status: string;
};

/**
 * Request Import List with status REJECT
 */
const RequestImportList_REJECT = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { importRequestId } = useParams();
  const id = Number.parseInt(importRequestId || "");

  const { data: importRequestList, isSuccess: isImportReqListSuccess } =
    useQuery(["import-request"], getImportLists);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteImportHistory,
    onSuccess: () => {
      queryClient.invalidateQueries(["import-request", id]);
    },
  });
  const {
    isLoading,
    isError,
    error,
    mutate: mutateAccept,
  } = useMutation({
    mutationFn: updateImportHistory,
    onSuccess: () => {
      queryClient.invalidateQueries(["import-request"]);
    },
  });
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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
      <Outlet />
      <Header title="Danh sách" subtitle="Danh sách yêu cầu nhập hàng" />
      {/* /imports/create_hieutt */}
      {/* <IconButton color="success"
            aria-label="add to shopping cart"
            onClick={() => {
              navigate(
                "/imports/request/create_hieutt"
              );
            }}>
            <PlaylistAddIcon />Thêm yêu cầu nhập hàng
          </IconButton> */}

      {/* <>
          <IconButton color="success"
            aria-label="add to shopping cart"
            onClick={handleOpen}>
            <PlaylistAddIcon />Thêm yêu cầu nhập hàng
          </IconButton>
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
              <CreateImportProduct />
            </Box>
          </Modal>
        </> */}
      <Box display="flex" justifyContent="left" alignItems="center">
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: "0 10px",
            width: "150px",
          }}
          onClick={() => {
            navigate("/imports/request");
          }}
        >
          Cần phê duyệt
        </Button>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: "0 10px",
            width: "150px",
          }}
          onClick={() => {
            navigate("/imports/request/accept");
          }}
        >
          Đã chấp nhận
        </Button>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: "0 10px",
            width: "150px",
          }}
          onClick={() => {
            navigate("/imports/request/reject");
          }}
        >
          Đã từ chối
        </Button>
      </Box>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">ID sản phẩm</StyledTableCell>
              <StyledTableCell align="center">Số lượng</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell> </StyledTableCell>
              <StyledTableCell> </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {importRequestList
              ?.filter((reqImport) => reqImport.status === "REJECT")
              .map((importRequest) => (
                <StyledTableRow key={importRequest.id}>
                  <StyledTableCell align="center">
                    {importRequest.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {importRequest.product_id}
                    {":"}
                    {importRequest.subproduct_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {importRequest.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {importRequest.status == "REQUEST" ? (
                      <Chip
                        color="warning"
                        variant="outlined"
                        label="Request"
                      />
                    ) : (
                      ""
                    )}
                    {importRequest.status == "ACCEPT" ? (
                      <Chip
                        color="success"
                        variant="outlined"
                        label="Accepted"
                      />
                    ) : (
                      ""
                    )}
                    {importRequest.status == "REJECT" ? (
                      <Chip color="error" variant="outlined" label="Rejected" />
                    ) : (
                      ""
                    )}
                    {importRequest.status !== "REQUEST" &&
                    importRequest.status !== "ACCEPT" &&
                    importRequest.status !== "REJECT" ? (
                      <Chip color="error" variant="outlined" label="Null" />
                    ) : (
                      ""
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {importRequest.createdAt}
                  </StyledTableCell>
                  {importRequest.status == "REQUEST" ? (
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        endIcon={<CheckCircleIcon />}
                        onClick={() => {
                          mutateAccept({
                            id: importRequest.id || -1,
                            pq: {
                              // ...param,
                              ...{
                                product_id: importRequest.product_id,
                                subproduct_id: importRequest.subproduct_id,
                                status: "ACCEPT",
                              },
                            },
                          });
                        }}
                      >
                        Accept
                      </Button>
                      {"   "}
                      <Button
                        variant="contained"
                        color="error"
                        endIcon={<DoDisturbIcon />}
                        onClick={() => {
                          mutateAccept({
                            id: importRequest.id || -1,
                            pq: {
                              // ...param,
                              ...{
                                product_id: importRequest.product_id,
                                subproduct_id: importRequest.subproduct_id,
                                status: "REJECT",
                              },
                            },
                          });
                        }}
                      >
                        Reject
                      </Button>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        endIcon={<CheckCircleIcon />}
                        disabled
                      >
                        Accept
                      </Button>
                      {"   "}
                      <Button
                        variant="contained"
                        color="error"
                        endIcon={<DoDisturbIcon />}
                        disabled
                      >
                        Reject
                      </Button>
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="right">
                    <Tooltip title="Edit">
                      <Button
                        variant="text"
                        startIcon={
                          <MoreOutlinedIcon style={{ color: "white" }} />
                        }
                        onClick={() => {
                          navigate(`/imports/edit/${importRequest.id}`, {
                            state: importRequest,
                          });
                        }}
                      ></Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button
                        variant="text"
                        startIcon={
                          <DeleteForeverIcon style={{ color: "white" }} />
                        }
                        onClick={() => {
                          if (importRequest.id) {
                            mutate(importRequest.id);
                          }
                        }}
                      ></Button>
                    </Tooltip>
                    <Tooltip title="Báo giá">
                      <Button
                        variant="text"
                        startIcon={<LocalAtmIcon style={{ color: "white" }} />}
                        onClick={() => {
                          navigate(
                            `/imports/${importRequest.id}/price-quotation-list/`
                          );
                        }}
                        disabled
                      ></Button>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RequestImportList_REJECT;
