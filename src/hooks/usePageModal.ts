import React from "react";

/**
 * @brief Sử dụng cùng component PageModal
 * Created on Thu Jan 05 2023
 * Copyright (c) 2023 HaVT
 *
 * @see PageModal
 *
 * @param initOpen
 * @returns
 */
const usePageModal = (initOpen?: boolean) => {
  const [isOpen, setOpen] = React.useState<boolean>(initOpen || false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return {
    isOpen,
    handleClose,
    handleOpen,
  };
};

export default usePageModal;
