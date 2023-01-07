import { Card } from "@mui/material";
import React from "react";
import CardContentItem from "../common/CardContentItem";

type Props = {
  id?: number | string;
  product_id?: number | string;
  subproduct_id?: number | string;
  name?: number | string;
  category?: number | string;
  color?: number | string;
  quantity?: number | string;
  status?: number | string;
  createdAt?: number | string;
  isFetchSuccess?: boolean;
};

function ImportRequestCard(props: Props) {
  return (
    <Card
      variant="outlined"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <CardContentItem
        loading={props.isFetchSuccess}
        title="Mã yêu cầu"
        value={props?.id}
      />
      <CardContentItem
        title="Mã sản phẩm"
        value={`${props?.product_id} - ${props?.subproduct_id}`}
        loading={props.isFetchSuccess}
      />
      <CardContentItem
        title="Tên sản phẩm"
        value={`${props?.name}`}
        loading={props.isFetchSuccess}
      />
      <CardContentItem
        title="Loại"
        value={`${props?.category}`}
        loading={props.isFetchSuccess}
      />
      <CardContentItem
        title="Màu"
        value={`${props?.color}`}
        loading={props.isFetchSuccess}
      />
      <CardContentItem
        title="Số lượng"
        value={`${props?.quantity}`}
        loading={props.isFetchSuccess}
      />
      <CardContentItem
        title="Trạng thái"
        value={`${props?.status}`}
        loading={props.isFetchSuccess}
      />
      <CardContentItem
        title="Ngày tạo"
        value={`${props?.createdAt}`}
        loading={props.isFetchSuccess}
      ></CardContentItem>
    </Card>
  );
}

export default ImportRequestCard;
