import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

type Props = {
  isOpen: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

/*
 * @brief Tạo trang modal (không sửa route)
 * @see usePageModal
 *
 * Created on Thu Jan 05 2023
 * Copyright (c) 2023 HaVT
 */
function PageModal({ isOpen, handleClose, children }: Props) {
  return (
    <Modal
      open={isOpen}
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
        {children}
      </Box>
    </Modal>
  );
}

export default PageModal;
