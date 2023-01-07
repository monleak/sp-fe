import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {

  ApiSupplierT,
  updateSupplier,
} from "../../api";
import React from "react";
import SupplierForm,{SupplierFormT} from "../../components/SupplierForm/SupplierForm";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultAnimate } from "@nivo/core";

type UpdateSupplierFormProps = {
    initialValues: SupplierFormT;
    supplier_id: number;
}

const UpdateSupplier = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const param = location.state as ApiSupplierT;
    const queryClient = useQueryClient();

    const { isLoading, isError, error, mutate } = useMutation({
      mutationFn: updateSupplier,
      onSuccess: () => {
        queryClient.invalidateQueries(["supplier"]);
      },
    });

    const handleFormSubmit = (values: SupplierFormT) => {
        // console.log(values);
        if (param.id) {
          mutate({
            id: param.id,
            s: {
                ...param,
                ...values,
            }
          });
        }
        navigate(-1); // go back
      };
      return (
        <Box mt="20px" width="650px" margin="100px auto">
          <Header
            title="Chỉnh sửa nhà cung cấp"
            subtitle="Chỉnh sửa một nhà cung cấp"
          />
          {/*  */}
          <SupplierForm
            handleSubmit={handleFormSubmit}
            initialValues={{
                name: param.name || "",
                phone: param.phone || "",
                email: param.email || "",
                address: param.address || "",
            }}
            submitBtnText={"Cập nhật"}
          />
          {/*  */}
        </Box>
      );
}

export default UpdateSupplier;