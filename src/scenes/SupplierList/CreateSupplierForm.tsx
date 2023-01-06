import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiImportProductT,
  SubProductInfoT,
  createNewPriceQuotation,
  getImportAcceptedList,
  getSubProductList,
  getSupplierList,
} from "../../api";
import React from "react";
import { transformJoinSubProductList } from "../../api/transform";
import { useNavigate, useParams } from "react-router-dom";
import SupplierForm, {
    SupplierFormT,
} from "../../components/SupplierForm/SupplierForm";

const initialValues: SupplierFormT = {
    name: "",
    phone: "",
    email: "",
    address: "",
  };