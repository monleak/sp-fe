import { CardContent, Typography } from "@mui/material";
import React from "react";
import LazyText from "./LazyText";

type Props = {
  title?: string;
  value?: string | number;
  loading?: boolean;
};

const CardContentItem = (props: Props) => {
  return (
    <CardContent
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props?.title}
      </Typography>
      <LazyText
        variant="h5"
        loading={props.loading}
        // component="div"
      >
        {props?.value}
      </LazyText>
    </CardContent>
  );
};

export default CardContentItem;
