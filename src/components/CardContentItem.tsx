import { CardContent, Typography } from "@mui/material";
import React from "react";

type Props = {
  title?: string;
  value?: string | number;
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
      <Typography variant="h5" component="div">
        {props?.value}
      </Typography>
    </CardContent>
  );
};

export default CardContentItem;
