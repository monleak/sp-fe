import { Box } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { ApiSupplierT, updateSupplier } from "../../api";
import Header from "../../components/Header";
import SupplierForm, {
  SupplierFormT,
} from "../../components/SupplierForm/SupplierForm";
import usePreserveQueryNavigate from "../../hooks/usePreserveQueryNavigate";

type UpdateSupplierFormProps = {
  initialValues: SupplierFormT;
  supplier_id: number;
};

const UpdateSupplier = () => {
  const navigate = usePreserveQueryNavigate();
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
        },
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
};

export default UpdateSupplier;
