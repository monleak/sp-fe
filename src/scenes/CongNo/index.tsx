import * as React from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { mockDataReceivable, mockDataCollected } from "./data";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { BootstrapDialog, BootstrapDialogTitle, DialogTitleProps } from "./Dialog";

const CongNo = () => {
  const clickHandler = (v: any) => {
    setContent(v.row);
    setOpen(true)
  }
  const closeHandler = () => {
    setOpen(false)
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let countRow = 0;
  let countRow1 = 0;
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
  const columns = [
    { field: "stt", headerName: "STT", flex: 0.2 },
    { field: "id", headerName: "ID Hóa đơn", flex: 1 },
    { field: "date", headerName: "Ngày thu dự kiến", flex: 1 },
    { field: "price", headerName: "Số tiền", flex: 1 },
    {
      field: "info", headerName: "Chi tiết", flex: 0.5, renderCell: (v: any) => {

        return (
          <Button
            onClick={() => { clickHandler(v) }}
            variant="text"
            startIcon={<VisibilityIcon style={{ color: "white" }}
            />}
          ></Button >
        )
      }
    }
  ]
  return (

    <Box m="20px">
      <Header title="Công nợ" subtitle="Danh sách công nợ" />
      <Box>
        <Typography width="50%" display="inline-block" variant="h2" fontWeight="bold" color={colors.greenAccent[400]} textAlign="center">
          Công nợ chưa thu
        </Typography>
        <Typography width="50%" display="inline-block" variant="h2" fontWeight="bold" color={colors.greenAccent[400]} textAlign="center">
          Công nợ đã thu
        </Typography>
        <Box
          display="inline-block"
          m="0 10px 0 0"
          height="60vh"
          width="calc(50% - 10px)"
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
          }}>
          <DataGrid
            rows={mockDataReceivable.map((v) => { return { ...v, stt: ++countRow } })}
            columns={columns}
          />
        </Box>
        <Box
          m="0 0 0 10px"
          display="inline-block"
          height="60vh"
          width="calc(50% - 10px)"
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
          }}>
          <DataGrid
            rows={mockDataCollected.map((v) => { return { ...v, stt: ++countRow1 } })}
            columns={columns}
          />
        </Box>
      </Box>
      <BootstrapDialog
        onClose={closeHandler}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={closeHandler}>
          Chi tiết công nợ
        </BootstrapDialogTitle>
        <DialogContent dividers>

          {(ct => {
            console.log(ct);
            return (
              <Typography gutterBottom>
                hello
              </Typography>
            )
          })(content)}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeHandler}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  )
}

export default CongNo