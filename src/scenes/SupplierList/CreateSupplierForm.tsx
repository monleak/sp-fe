import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewSupplier,
} from "../../api";
import React from "react";
import { useNavigate } from "react-router-dom";
import SupplierForm,{SupplierFormT} from "../../components/SupplierForm/SupplierForm";

const initialValues: SupplierFormT = {
    name: "",
    phone: "",
    email: "",
    address: "",
}

const CreateSupplier = () => {
    const navigate = useNavigate();
  
    const queryClient = useQueryClient();
    const { isLoading, isError, error, mutate } = useMutation({
      mutationFn: createNewSupplier,
      onSuccess: () => {
        queryClient.invalidateQueries(["supplier-list"]);
      },
    });
  
    // form
    const handleFormSubmit = React.useCallback(
      (values: SupplierFormT) => {
        mutate({
          name: values.name,
          phone: values.phone,
          email: values.email,
          address: values.address,
        });
        // console.log(values);
        navigate(-1); // go back
      },
      [mutate, navigate]
    );
  
    // jsx
    return (
      <Box mt="20px" width="650px" margin="100px auto">
        <Header
          title="Thêm nhà cung cấp"
          subtitle="Thêm một nhà cung cấp mới"
        />
        {/*  */}
        <SupplierForm
          handleSubmit={handleFormSubmit}
          initialValues={initialValues}
          submitBtnText={"Tạo nhà cung cấp"}
        />
        {/*  */}
      </Box>
    );
  };

export default CreateSupplier;