import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { LinkWithPreserveQuery } from "../../components/common/LinkWithPreserveQuery";

function NotFound() {
  return (
    <Box>
      <Typography>Not found</Typography>
      <LinkWithPreserveQuery to={"/"}>Go home</LinkWithPreserveQuery>
    </Box>
  );
}

export default NotFound;
