import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Modal,
  Skeleton,
  Typography,
  TypographyTypeMap,
  useTheme,
} from "@mui/material";
import { OverrideProps } from "@mui/material/OverridableComponent";

type Props = OverrideProps<TypographyTypeMap<{}, "span">, typeof Typography> & {
  loading?: boolean;
};

export default function LazyText(props: Props) {
  if (props?.loading === false) {
    return <Skeleton width={60} />;
  }
  return <Typography {...props}></Typography>;
}
