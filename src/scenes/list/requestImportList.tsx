import { Box, Button, Typography, useTheme, IconButton,Chip, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataImportStoryList } from "../../data/mockData";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../components/Header";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import MoreOutlinedIcon from '@mui/icons-material/MoreOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import ImportProductsForm from "../form/ImportProductForm";
import { useNavigate } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
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
  getSubProductList,
  getSupplierList,
  deleteImportHistory,
} from "../../api";
import React from "react";



const RequestImportList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { importRequestId } = useParams();
  const id = Number.parseInt(importRequestId || "");

  const { data: importRequestList, isSuccess: isImportReqListSuccess } = useQuery(
    ["import-request"],
    getImportRequestList
    );

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
      mutationFn: deleteImportHistory,
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
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
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
      <Header 
        title="Danh sách" 
        subtitle="Danh sách yêu cầu nhập hàng" 
        />
    
      <>
            <IconButton color="success" aria-label="add to shopping cart" onClick={handleOpen}>
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
                <ImportProductsForm />
              </Box>
            </Modal>
          </>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">ID nhà cung cấp</StyledTableCell>
            <StyledTableCell align="center">ID sản phẩm</StyledTableCell>
            <StyledTableCell align="center">Số lượng</StyledTableCell>
            <StyledTableCell align="center">Tổng số tiền</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell> </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {importRequestList?.map((importRequest) => (
            <StyledTableRow
              key={importRequest.id}
            >
              <StyledTableCell align="center">
                {importRequest.id}
              </StyledTableCell>
              <StyledTableCell align="center">{importRequest.supplier_id}</StyledTableCell>
              <StyledTableCell align="center">{importRequest.product_id}{":"}{importRequest.subproduct_id}</StyledTableCell>
              <StyledTableCell align="center">{importRequest.quantity}</StyledTableCell>
              <StyledTableCell align="center">
                <Typography color={colors.greenAccent[500]}>
                  ${importRequest.total_cost}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Chip color="warning" variant="outlined" label="Waiting" />
              </StyledTableCell>
              <StyledTableCell align="center">{importRequest.createdAt}</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                variant="text"
                startIcon={<MoreOutlinedIcon style={{ color: "white" }} />}
                onClick={() => {
                  navigate(
                    `/imports/update/${importRequest.id}`,
                    { state: importRequest }
                  );
                }}
                ></Button>
                <Button
                variant="text"
                startIcon={<DeleteForeverIcon style={{ color: "white" }} />}
                onClick={() => {
                  mutate(importRequest.id);
                }}
                ></Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default RequestImportList;
