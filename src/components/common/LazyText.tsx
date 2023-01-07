import React from "react";
import { Skeleton, Typography, TypographyTypeMap } from "@mui/material";
import { OverrideProps } from "@mui/material/OverridableComponent";

type Props = OverrideProps<TypographyTypeMap<{}, "span">, typeof Typography> & {
  loading?: boolean;
};

/*
 * @brief Hiển thị text load từ api
 *
 * Created on Thu Jan 05 2023
 * Copyright (c) 2023 HaVT
 */
export default function LazyText(props: Props) {
  if (props?.loading === false) {
    return <Skeleton width={60} />;
  }
  return <Typography {...props}></Typography>;
}
