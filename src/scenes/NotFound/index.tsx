import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

function NotFound({}: Props) {
  return (
    <Box>
      <Typography>Not found</Typography>
      <Link to={"/"}>Go home</Link>
    </Box>
  );
}

export default NotFound;
