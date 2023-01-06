import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { LinkWithPreserveQuery } from "../../components/common/LinkWithPreserveQuery";

type Props = {};

function NotFound({}: Props) {
  return (
    <Box>
      <Typography>Not found</Typography>
      <LinkWithPreserveQuery to={"/"}>Go home</LinkWithPreserveQuery>
    </Box>
  );
}

export default NotFound;
