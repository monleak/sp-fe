import { QueryClient, useMutation } from "@tanstack/react-query";
import { deletePriceQuotation, updateImportProduct } from "../api";
import React from "react";

export const useApiDeletePQ = (queryClient: QueryClient, importId: number) => {
  const { mutate } = useMutation({
    mutationFn: deletePriceQuotation,
    onSuccess: () => {
      queryClient.invalidateQueries(["price-quotation-list", importId]);
    },
  });

  return mutate;
};

export const useApiImpSetPQ = (queryClient: QueryClient, importId: number) => {
  const { mutate } = useMutation({
    // update import id
    mutationFn: updateImportProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["price-quotation-list"]);
      queryClient.invalidateQueries(["import-request-item", importId]);
    },
  });

  /**
   * Set price_quotation_id attr
   */
  const setImportPQId = React.useCallback(
    (pqId: number) => {
      mutate({
        id: importId,
        imp: {
          price_quotation_id: pqId,
        },
      });
    },
    [importId, mutate]
  );

  /**
   * Confirm price_quotation_id attr
   */
  const confirmSetImportPQId = React.useCallback(
    (pqId: number) => {
      mutate({
        id: importId,
        imp: {
          price_quotation_id: pqId,
          status: "Q_P_ASSIGNED",
        },
      });
    },
    [importId, mutate]
  );

  return {
    setImportPQId,
    confirmSetImportPQId,
  };
};
